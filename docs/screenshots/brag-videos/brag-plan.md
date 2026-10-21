# Brag Plan: lieferando (Drink & Drive)

## What is this app?
A complete food-ordering platform in one Next.js app: customers browse stores, fill a cart and pay, while shop owners get their own dashboard with charts, product/menu management and incoming orders — all on one Prisma/MySQL data model with NextAuth.

## The angle
It's a real two-sided delivery product — and the owner named the logo "Drink & Drive". The video plays the product straight (warm, confident) and lets the logo carry the joke in the outro, closed out with the README's own disclaimer: "not affiliated with Lieferando." Specificity sources: the German search placeholder ("Suche hier nach deiner Postleitzahl..."), real seeded dishes (Margherita Pizza, Pasta Carbonara, Dragon Roll), star ratings on store cards, and the dashboard's Monthly Income / Orders Last Month / Top Products stats.

## Hook (first 2-3 seconds)
The app's actual landing hero: the search bar with the real German placeholder, and text being typed into it — "10157". One glance says "this is a German food-delivery app" and the typing + green button pulse is instant motion. Overlay hook word: "Hungry?" lands at ~0.3s, before the typing finishes.

## Key moments (the middle)
- "All Stores" cards popping in one by one with real star ratings (★★★★☆) — the browse beat.
- Store menu with real seeded dishes; cursor clicks "Add to cart", the cart badge ticks 1 → 2 — the order beat.
- The owner side: dashboard cards (Monthly Income $4,281.60, Orders Last Month 132) and an area chart drawing itself — with the line "One app. Two sides."

## Outro / punchline
The logo lockup "Drink & Drive" with tagline "Food delivery, full stack." — then the small-print punchline: "Not affiliated with Lieferando. Obviously." (straight from the README).

## User flow worth showing
Search ZIP → browse stores with ratings → add "Margherita Pizza" to cart → (cut) shop owner sees the order side: stats + chart on /dashboard. Entry → key action → result, with the two-sided twist as the payoff.

## Tone
- Preset: default
- Creative direction: "warm delivery-app launch reel with a straight face and a wink at the logo"
- Interpretation: 5 comfortable scenes, playful clean type, product colors doing the branding; humor only where the project itself is funny (the logo, the disclaimer). Crossfade/clean-slide transitions.

## Format: landscape — 1920x1080
## Duration: 20s

## Visual identity (from the project)
- Background: #ffffff (storefront) with dark section #080d0a for the dashboard side
- Accent: #169c16 (search button green), primary #5eaf85, secondary #97ceb2, accent #7dc7a1
- Text: #080d0a
- Display font: Geist Sans (project font) — substitute closest clean geometric sans available in the composition runtime
- Body font: same family, regular weight
- Strongest visual element: the green search bar + the star-rated store cards; the dashboard area chart for the owner side

## Share copy (draft)
Just shipped lieferando — a full food-ordering platform where customers order and shop owners get a real analytics dashboard, all on one Next.js + Prisma stack. The logo says Drink & Drive; the code says otherwise.

## Audio direction
- Role: warm bed with tasteful motion-matched accents
- Music: happy-beats-business-moves-vol-1-by-ende-dot-app.mp3 (bundled)
- Music treatment: start at 0s at moderate volume under the hook, dip slightly under the dashboard scene, fade out over the final 1.5s of the outro
- Music cue guidance: preset read — track tempo ~120.19 BPM. Strong cues in window: 17.02s, 17.52s, 18.52s, 20.02s, 23.02s. Use grid beats every 0.5s; align the store-card sequence (scene 2) to every other beat (~1.0s apart) so each card is readable, and land the dashboard chart reveal on a strong cue.
- Audio-reactive treatment: none (clean product look)
- SFX posture: sparse-moderate; keyboard ticks while the ZIP types, a soft pop per store card, a click on "Add to cart", a rising whoosh/charm for the chart draw
- Audio-coupled moments: typed text in scene 1, card-by-card sequence in scene 2, cart-badge counter tick in scene 3, chart line draw in scene 4
- Restraint rule: no SFX stacking over text entrances; the outro plays mostly clean with just the music fade

## Storyboard

### Scene 1 — Hook: search the ZIP — 3.0s
Cream/white background. Recreated landing search bar (rounded input with real placeholder "Suche hier nach deiner Postleitzahl..." and the round #169c16 search button). Big display word "Hungry?" slams in above at 0.3s. Text types "10157" into the field character by character; the green button pulses.
Sequential/interaction: yes — simulated typing into the real search bar (placeholder visible first), then button pulse.
Audio intent: immediate, friendly, momentum from beat one.
Audio-coupled idea: subtle key ticks per typed character; soft thump when "Hungry?" lands.
Music: warm upbeat bed, already moving.
Transition mood: clean slide → Scene 2

### Scene 2 — Reveal: All Stores — 3.5s
Recreated /stores page: heading "All Stores" and three store cards arriving one by one — "John Doe's Store", "Jane Smith's Store", "Mike Wilson's Store" — each with a short description line and real star ratings (★★★★☆, ★★★★★, ★★★☆☆).
Sequential/interaction: yes — cards pop in one by one (~1.0s apart, aligned to every other music beat), full set holds on screen afterward for reading.
Audio intent: playful build, each card a small reward.
Audio-coupled idea: soft pop per card arrival.
Music: bed continues, light rhythmic alignment.
Transition mood: clean wipe → Scene 3

### Scene 3 — The order: menu + cart — 4.5s
Recreated store page menu with real seeded dishes and prices: "Margherita Pizza €8.50", "Pasta Carbonara €11.90", "Dragon Roll €13.50". A cursor moves to Margherita's "Add to cart" button and clicks it; the header cart badge ticks 1 → 2. Bottom strip flashes the checkout path: Order → Payment → Confirmation.
Sequential/interaction: yes — simulated cursor click on Add to cart; badge count ticks up.
Audio intent: satisfying, tactile.
Audio-coupled idea: click SFX on the button, tick on the badge counter.
Music: bed continues.
Transition mood: hard-ish clean cut → Scene 4

### Scene 4 — The other side: owner dashboard — 4.5s
Inverted dark scene (#080d0a). Line: "One app. Two sides." Dashboard recreation: cards "Monthly Income $4,281.60", "Orders Last Month 132", and "Top Products" (Margherita Pizza — 214 sales). A green area chart draws itself left to right (Recharts-style). "Powered by Prisma + MySQL" appears as small data-model credit.
Sequential/interaction: yes — stat cards land first, then the chart draws; monthly-income number counts up.
Audio intent: shift to confident, slightly weightier tone.
Audio-coupled idea: count-up ticks on income; rising whoosh/charm with the chart draw, landing on a strong cue.
Music: bed dips slightly, then lifts.
Transition mood: soft crossfade → Scene 5

### Scene 5 — Outro: the logo — 4.5s
White background. The logo lockup "Drink & Drive" (green wordmark treatment) with tagline "Food delivery, full stack." Holds. Then the small-print punchline fades in below: "Not affiliated with Lieferando. Obviously." Music fades out over the last 1.5s.
Sequential/interaction: none — logo, tagline, punchline in sequence with generous holds.
Audio intent: clean landing, smile at the end.
Audio-coupled idea: none (restraint).
Music: fade to silence.

**Music mood for this video:** upbeat
**Audio summary:** Warm upbeat bed from the first frame, sparse tactile SFX on typing, card pops, a cart click and a chart-draw charm, ending on a clean music fade under the logo punchline.

Scene total: 3.0 + 3.5 + 4.5 + 4.5 + 4.5 = 20.0s
