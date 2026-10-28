// Screenshots of the Orbit web app (demo data), captured at 1600x1000 @2x and resized to 2400px WebP.
const shot = (file, area, title, text) => ({
  src: `/images/screenshots/${file}.webp`,
  area,
  title,
  text,
  alt: `Orbit ${area}: ${title}`,
});

export const screenshots = [
  shot("board", "Tasks", "Board", "Drag tasks between the statuses of your own workflow, across every project."),
  shot("list", "Tasks", "List", "All tasks grouped by status, with labels, projects, due dates and assignees."),
  shot("roadmap", "Tasks", "Timeline", "Zoom by week, month or quarter, and drag tasks along the timeline to schedule them."),
  shot("detail", "Tasks", "Task detail", "A rich description that the team edits together live, with checklists, properties, relations and comments."),
  shot("palette", "Tasks", "Command palette", "Press Ctrl+K to find tasks, pages and actions from anywhere."),
  shot("home", "Home", "Home", "Your tasks due this week, unread notifications and recently updated docs."),
  shot("docs-page", "Docs", "Pages", "A page tree with teamspaces, favorites, covers, icons and a rich editor."),
  shot("docs-rich", "Docs", "Rich content", "Diagrams, tables, code blocks and checklists on one page."),
  shot("chat", "Chat", "Channels", "Channels with code blocks, reactions, mentions and links to your pull requests."),
  shot("chat-thread", "Chat", "Threads", "Keep a discussion in a thread. A reply can also go to the channel."),
  shot("dm", "Chat", "Direct messages", "Talk one to one with a teammate."),
  shot("mail", "Mail", "Shared inbox", "A shared inbox for the team, next to tasks and docs. Coming soon."),
  shot("members", "Admin", "Members", "Invite people by email or with a link, and give each one a role."),
  shot("admin", "Admin", "Users", "The root user manages every account on the instance."),
];

export const indexOf = (file) => screenshots.findIndex((s) => s.src.endsWith(`/${file}.webp`));
