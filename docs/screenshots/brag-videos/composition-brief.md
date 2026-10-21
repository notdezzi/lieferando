# Hyperframes Composition Brief: lieferando (Drink & Drive)

## Objective
Create a short launch-style brag video for lieferando, a full food-ordering platform (customer storefront + shop-owner dashboard) built on Next.js, Prisma/MySQL, NextAuth.

## Output
- Composition directory: `C:\Users\notdezzi\Desktop\notdezzi\brag-videos\lieferando\composition\`
- Rendered video: `C:\Users\notdezzi\Desktop\notdezzi\brag-videos\lieferando\brag.mp4`
- Format: landscape — 1920x1080
- Duration: 20 seconds

## Source Material
- Project root: `C:\Users\notdezzi\Desktop\notdezzi\github-portfolio\lieferando`
- Primary files read: README.md, app/page.tsx, app/page.module.css, app/globals.css, app/stores/page.tsx, components/header.component.tsx, components/ShopDashboard.tsx, prisma/schema.prisma, prisma/seed.ts
- Product name: lieferando (logo wordmark: "Drink & Drive")
- Tagline / strongest claim: two complete experiences — customer ordering + shop-owner dashboard — on one Prisma/MySQL data model
- Key UI or visual moment to recreate: the landing search bar with the German placeholder, the "All Stores" star-rated cards, the store menu with real seeded dishes, and the dashboard stats + area chart
- Copy that must appear verbatim:
  - "Suche hier nach deiner Postleitzahl..." (search placeholder)
  - "All Stores" (stores page heading)
  - "Hungry?" (hook framing word — free invention, asserts nothing)
  - "Monthly Income", "Orders Last Month", "Top Products" (real dashboard card labels)
  - "One app. Two sides." (framing line)
  - "Food delivery, full stack." (tagline)
  - "Not affiliated with Lieferando. Obviously." (punchline, grounded in README note "it is not affiliated with Lieferando or Takeaway.com")
- Real dish data from prisma/seed.ts: Margherita Pizza €12.99 ("Classic tomato and mozzarella"), Pasta Carbonara €16.99, California Roll €12.99. Store card names follow the real UI pattern "<owner>'s Store" with seeded owners John Doe, Jane Smith, Mike Wilson.
- Fictional stand-in data (declared): dashboard sample figures ($4,281.60 monthly income, 132 orders last month, Margherita Pizza — 214 sales) and the star ratings shown — plausible mock content for the recreated dashboard, not product claims.

## Creative Direction
- Tone preset: default
- Creative direction: "warm delivery-app launch reel with a straight face and a wink at the logo"
- Interpretation: 5 comfortable scenes, playful clean type, the product's green palette does the branding; humor only where the project itself is funny (the logo, the disclaimer). Crossfade / clean-slide transitions.
- Angle: a real two-sided delivery product played straight; the "Drink & Drive" wordmark carries the joke in the outro.
- Hook: the real search bar with the German placeholder, "10157" typed into it, "Hungry?" slamming in above.
- Outro / punchline: "Drink & Drive" logo lockup → "Food delivery, full stack." → "Not affiliated with Lieferando. Obviously."
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign

## Visual Identity
- Background: #f7fbf8 (near-white tinted toward the project green); dark scene #080d0a (the project's text color as background)
- Text: #080d0a (light scenes) / #e8f5ec (dark scene)
- Accent: #169c16 (search-button green), primary #5eaf85, secondary #97ceb2, accent #7dc7a1
- Display font: Geist Sans — ship the project's own font files (app/fonts/GeistVF.woff, GeistMonoVF.woff) via in-file @font-face from composition/assets/fonts/
- Body font: Geist Sans; Geist Mono for data points (prices, stats)
- Visual references from the project: green nav bar strip, pill-shaped buttons (border-radius high), star ratings on store cards, green area chart

## Storyboard
Use the storyboard in `brag-plan.md` as the creative contract.

Scene summary (root data-duration 20):
1. Hook: search the ZIP — 3.0s — "Hungry?" slams in; real search bar with placeholder "Suche hier nach deiner Postleitzahl..."; "10157" types in; green button pulses.
2. Reveal: All Stores — 3.5s — heading "All Stores"; three store cards pop in one by one (~1.0s apart, readable), each with description + star ratings; full set holds.
3. The order — 4.5s — menu rows with real dishes and prices; cursor clicks Margherita's "Add to cart"; cart badge ticks 1 → 2; strip "Order → Payment → Confirmation".
4. The other side — 4.5s — dark scene; "One app. Two sides."; stat cards (Monthly Income $4,281.60 counting up, Orders Last Month 132, Top Products); green area chart draws itself; "Powered by Prisma + MySQL".
5. Outro — 4.5s — "Drink & Drive" wordmark; "Food delivery, full stack."; punchline "Not affiliated with Lieferando. Obviously." Music fades under the last 1.5s.

## Audio
- Audio role: warm bed with tasteful motion-matched accents
- Audio arc: upbeat bed from frame one → slight dip under the dashboard scene → clean fade-out over the final 1.5s of the outro
- Music: happy-beats-business-moves-vol-1-by-ende-dot-app.mp3 (copied to composition/assets/music/)
- Music treatment: data-volume ~0.32, starts at 0s; volume automation fades to 0 over the last ~1.5s
- Music cue guidance: bundled preset at `<skill-dir>/assets/music/cues/happy-beats-business-moves-vol-1-by-ende-dot-app.music-cues.json` (tempo ~120.19 BPM, beat grid every ~0.5s). Strong cues in window: 16.02s, 17.02s, 17.52s, 18.52s, 20.02s. Locks: logo landing at 16.02s; punchline at 18.52s. Scene-2 card sequence snaps to every other beat: 3.52s, 4.52s, 5.52s. Ignore cues where they hurt readability.
- Audio-reactive treatment: none per plan — clean product look. If extraction is unavailable or adds risk, skip without blocking the render.
- Audio-coupled moments:
  - Scene 1 typing — keyboard keypress ticks per character
  - Scene 2 card sequence — soft pop per card (card-place / drop family)
  - Scene 3 Add-to-cart — click SFX at the simulated click; tick on the badge counter
  - Scene 4 chart draw — rising whoosh/charm as the line draws; count-up ticks on income
  - Scene 5 logo — one bell/impact cue at 16.02s
- SFX selection guidance: default tone, moderate energy, 4-6 cues total; use `<skill-dir>/assets/sfx/sfx-analysis.md`; prefer low high-frequency-risk files for repeated moments
- Exact SFX choice: Hyperframes chooses filenames, timestamps, density, volume based on the implemented animation
- Audio files: copy chosen music + SFX into `composition/assets/` (music/ and sfx/ subfolders)

## Hyperframes Instructions
Load the composition-building Hyperframes domain skills — `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-cli`. /brag is its own workflow: do not enter the `hyperframes` entry-point intent interview and do not route into its generic promo / launch-video workflow. Prefer native Hyperframes conventions over anything in `/brag`.

Requirements:
- Show at least one real UI, copy, or visual element from the source project (multiple required here: search bar placeholder, store cards, menu dishes, dashboard labels).
- Keep all text readable in the final render.
- Keep the video within 15-25 seconds (target 20).
- Include the planned music/SFX layer.
- Treat /brag audio notes as guidance, not a fixed cue sheet. Choose SFX after the visual animation exists.
- Treat music cue metadata as optional timing hints; ignore cues that hurt readability, pacing, or the product story.
- Major reveals may move toward nearby strong cues within about 0.15s. Use only 1-3 strong cue locks.
- Use local assets for audio and any required runtime/media dependencies when possible.
- Run `hyperframes check` before render — it is brag's single gate.
- Keep creation and rendering local. Remote or publishing workflows require a separate explicit user request.
