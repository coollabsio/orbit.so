import json
import re
import subprocess
import urllib.error
import urllib.request
from html import unescape
from pathlib import Path

root = Path(__file__).resolve().parent.parent
routes = {
    "/": None,
    "/pricing": "Pricing.",
    "/fun-facts": None,
    "/sponsorships": "Sponsor us.",
    "/linear-notion-slack-alternative": "Is there one open-source app that replaces Linear, Notion and Slack?",
    "/flat-price-team-workspace": "Is there a team workspace with a flat price, not per user?",
    "/self-hosted-workspace-mcp": "Which self-hosted workspace lets Claude read our tasks and docs?",
    "/huly-alternative": "What is a lighter alternative to Huly?",
}
container = subprocess.check_output([
    "docker", "run", "--rm", "-d", "-p", "127.0.0.1::80",
    "-v", f"{root / 'dist'}:/usr/share/nginx/html:ro",
    "-v", f"{root / 'nginx.conf'}:/etc/nginx/conf.d/default.conf:ro",
    "nginx:latest",
], text=True).strip()
try:
    subprocess.run(["docker", "exec", container, "nginx", "-t"], check=True)
    binding = subprocess.check_output(["docker", "port", container, "80/tcp"], text=True).strip()
    base = f"http://{binding}"
    print(f"Checking nginx at {base}", flush=True)
    subprocess.run([
        "curl", "--silent", "--show-error", "--output", "/dev/null",
        "--retry", "20", "--retry-connrefused", "--retry-delay", "1",
        "--connect-timeout", "2", "--max-time", "5", base + "/",
    ], check=True)

    def fetch(path):
        try:
            response = urllib.request.urlopen(base + path, timeout=10)
        except urllib.error.HTTPError as error:
            response = error
        with response:
            return response.status, response.headers, response.read().decode()

    for route, heading in routes.items():
        status, headers, body = fetch(route)
        assert status == 200, (route, status)
        canonical = re.findall(r'<link rel="canonical" href="([^"]+)"', body)
        assert canonical == ["https://orbit.so" + route], (route, canonical)
        h1 = re.findall(r"<h1[^>]*>(.*?)</h1>", body, re.S)
        assert len(h1) == 1, (route, h1)
        if heading:
            assert unescape(re.sub(r"<[^>]*>", "", h1[0])) == heading, (route, h1)
        assert 'href="https://github.com/coollabsio/orbit"' in body
        assert 'href="{github}"' not in body
        schemas = [json.loads(value) for value in re.findall(
            r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', body, re.S
        )]
        if route == "/":
            app = next(value for value in schemas if value["@type"] == "SoftwareApplication")
            assert app["offers"][1]["price"] == "10"
            assert app["license"] == "https://www.apache.org/licenses/LICENSE-2.0"
        elif route not in ("/fun-facts", "/sponsorships"):
            faq = next(value for value in schemas if value["@type"] == "FAQPage")
            assert len(faq["mainEntity"]) == (8 if route == "/pricing" else 2)
            visible = unescape(re.sub(r"<script.*?</script>|<[^>]*>", " ", body, flags=re.S))
            visible = " ".join(visible.split())
            for item in faq["mainEntity"]:
                assert item["name"] in visible
                assert item["acceptedAnswer"]["text"] in visible
        print(f"PASS {route} 200, canonical, H1, GitHub link and schema")

    for route in ["/not-a-real-orbit-page", "/earlyyears", "/missing/deep/page", "/missing.css"]:
        status, headers, body = fetch(route)
        assert status == 404 and "Page not found" in body, (route, status)
        assert 'name="robots" content="noindex"' in body
        print(f"PASS {route} 404 with branded noindex page")

    status, headers, body = fetch("/llms.txt")
    assert status == 200 and headers.get_content_type() == "text/plain"
    assert body == (root / "public/llms.txt").read_text()
    for route in list(routes)[4:]:
        assert "https://orbit.so" + route in body
    print("PASS /llms.txt 200 text/plain with all four guides")

    status, headers, body = fetch("/sitemap-0.xml")
    assert status == 200
    for route in list(routes)[4:]:
        assert "https://orbit.so" + route in body
    assert "/404" not in body
    print("PASS sitemap includes all four guides and excludes 404")

    diff = subprocess.check_output(["git", "diff", "--cached", "--", "."], cwd=root, text=True)
    for line in diff.splitlines():
        if line.startswith("+") and not line.startswith("+++"):
            assert "\u2013" not in line and "\u2014" not in line, line
    print("PASS no em or en dashes in added copy")
finally:
    subprocess.run(["docker", "stop", container], check=True, stdout=subprocess.DEVNULL)
