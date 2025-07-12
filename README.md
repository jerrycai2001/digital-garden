I'm building a digital garden, which finally creates and end-to-end pipeline for publishing my Obsidian vault. 


content/                     ← all Markdown lives here
└─ work-log/
   ├─ 2025-05-10.md
   ├─ 2025-07-03.md
   └─ 2025-07-12.md

src/
├─ content/
│  └─ config.ts              ← the ONLY config.ts
├─ layouts/
│  └─ BaseLayout.astro
└─ pages/
   ├─ index.astro            ← your home page
   └─ work-log/
      ├─ index.astro         ← list of logs
      └─ [slug].astro        ← single-log template
