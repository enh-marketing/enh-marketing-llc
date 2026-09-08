import re, json
slugs = open("urls.txt").read().split()
inv = {r["slug"]: r for r in json.load(open("inventory.json"))}
slugs.sort(key=lambda s: inv[s]["iso"], reverse=True)
def ident(slug):
    parts = re.split(r"[^a-zA-Z0-9]+", slug)
    name = parts[0] + "".join(p[:1].upper() + p[1:] for p in parts[1:])
    return "n" + name[:1].upper() + name[1:]
imports = "\n".join(f'import {{ note as {ident(s)} }} from "@/content/insights/{s}";' for s in slugs)
entries = "\n".join(f"  {ident(s)}," for s in slugs)
open("/Users/sourabh/Desktop/My Claude/Code/ENH V3/src/content/insights/posts.ts","w",encoding="utf-8").write(f'''// The archive, as one array.
//
// ONE FILE PER POST, which is the convention src/content/services already uses
// for its service documents. A single file holding seventy-two article bodies
// would be several hundred kilobytes, unreviewable in a diff, and a merge
// conflict every time two posts are touched at once.
//
// Generated, newest first — though the order is not load-bearing: `all()` in
// src/content/insights.ts sorts by date and every consumer reads through it.
//
// {len(slugs)} posts migrated from enhmedia.com/blog. Each file names the URL it came
// from and was checked word for word against it.

import type {{ Note }} from "@/content/insights";

{imports}

export const posts: Note[] = [
{entries}
];
''')
print(f"posts.ts: {len(slugs)} imports")
