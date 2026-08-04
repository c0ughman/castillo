# Castillo Arquitectos — Revisions Tracker

Based on client feedback. Items are checked off as they're completed.
Last updated: 2026-07-30

**Source of truth:** `build assets/RONDA 2/` (client delivery, July 2026).
- `Castillo_Arquitectos_Narrativa_Website_ES-EN.docx` — approved bilingual copy. Newest; wins on wording and project scope.
- `Castillo_Arquitectos_Website_Brief_v3.docx` — structure, brand system, dev spec. Byte-identical to the April copy already in `build assets/` (a re-send, not a new version). Still authoritative for anything narrativa doesn't cover.
- `Imagenes/Aprobados|Aprobadas` — **the approved-projects list.** Nothing under `NoAprobados` may reach the site.
- `Team/` — 13 headshots + `Listado/Integrantes_del_Equipo.xlsx` (names, ES/EN roles).

---

## ✅ Done — RONDA 2 round (2026-07-30)

- [x] **Approved-projects list applied** — `Aprobados`/`Aprobadas` folders are now the gate
- [x] **Removed Antigua Pedrera** (Urban Design entry + La Fábrica architecture entry) — moved to `NoAprobados`
- [x] **Confirmed still excluded** — Costa Elena, Villa Rocha, La Candelaria, Curridabat master plan, Calle del Prado 11 & 94
- [x] **Image pipeline** — 139 approved project images + 13 team photos → WebP at 1920 (hero) and 1200 (gallery); 127 MB total, down from 1.5 GB of originals
- [x] **13 project pages built** — 7 community, 6 residential (was 2)
- [x] **Residential completed** — added Casas en Barrio El Prado (grouped page, 4 houses) and Villa Fontana; renamed Virginia → Casa Virginia, Menta → Casa Menta per narrativa
- [x] **Team section added** to Who We Are — 13-member grid with ES/EN roles
- [x] **Eduardo's portrait** swapped to the RONDA 2 high-res original
- [x] **Hero copy** — sub-headline dropped, CTA now "Discover our work" (narrativa)
- [x] **Closing CTA** — "Let's build something meaningful together." + supporting line, applied site-wide
- [x] **Service entry panels** — narrativa copy, links now read "Learn more"
- [x] **Next Project flow fixed** — residential and community are separate rings; residential never jumps to a master plan
- [x] **Fixed Nueva Miramar mislabelled as Honduras** on the home page (it's Guatemala)
- [x] **Home page placeholders replaced** — Casa Virginia and Casa Curuba now use real photography
- [x] **Legacy .jpg/.png assets removed** — all image references now point at the RONDA 2 WebP set

---

## ✅ Done — forms + copy audit round (2026-07-30)

- [x] **Copy audited against narrativa**, paragraph by paragraph. Two real gaps found and closed:
  - Who We Are firm statement was still brief v3's 3-paragraph version; replaced with narrativa's 4 paragraphs
  - Community page was missing the "Master Planning & Community Design is the studio's primary service" lead-in (2 paragraphs)
- [x] **Voice reverted to narrativa verbatim** — earlier third-person adaptation ("its clients") undone in favour of the client's own wording ("our clients"). See open question below.
- [x] **Four working forms**, all reusing contact.html styling and wired to Netlify Forms with AJAX submit (brief 4.4 — no redirect, honeypot not CAPTCHA):
  - `contact-general` (Contact) — was previously inert markup with no handler at all
  - `inquiry-community` (Community & Master Planning, project type preset)
  - `inquiry-residential` (Residential, project type preset)
  - `careers` (Who We Are, directly under the team grid)
- [x] **Master planning image order fixed** — realistic photography/renders now lead; CAD plans demoted to the mid-page drawing slot:
  - El Encanto hero: flat CAD site plan → built Casa Club pool photography
  - Nueva Miramar hero: master plan → built Phase 1 aerial
  - Same correction applied to both community.html listing thumbnails

- [x] **Community & Master Planning merged into one project list** — narrativa presents these as one service with a single numbered 01–06 run, and the client's own image folders confirm it (`01_ElEncanto/{MasterPlan,Arquitectura}`). Urban Design and Architecture are now capability descriptions, not separate portfolios. Each project page carries labelled **Master Plan** and **Architecture** movements.
- [x] **Los Altos Flats nested under Las Catalinas** — narrativa has it as a sub-entry, not a peer project
- [x] **Stale root `index.html` archived** to `_archive/` — a second file of that name at the project root made it easy to open the wrong one

⚠️ **Netlify Forms needs one manual step:** form notifications must be pointed at info@castilloarquitectos.com in the Netlify dashboard (Site settings → Forms → Form notifications). Detection happens on deploy; forms will not appear until the first build after this push.

---

## ✅ Done — review round 2 (2026-07-30)

- [x] **Las Catalinas town description removed from Residential** — the town is a Community & Master Planning project (03) and is described there. Residential now only describes the *houses*, with an inline cross-link to the community project.
- [x] **Stray line beside Los Altos Flats removed** — the nested sub-entry used a `border-left` that read as a stray rule. Replaced with a "Within Las Catalinas" kicker.
- [x] **Community page intro restructured** — was three visually identical stacked blocks (primary service / Urban Design / Architecture). Now one lead statement, then the two phases side by side as numbered 01 / 02 columns. All three texts are narrativa's; only the presentation changed.
- [x] **Forms restyled** — the three new forms were lone centred panels. They now use the contact page's two-column layout (context and direct contact left, form panel right) with identical classes.
- [x] **Heroes swapped**: Palmerola → golden-hour street render; Nueva Miramar → built commercial street render; Santa María → village centre at golden hour (its previous feature image was an annotated massing diagram with Spanish labels).
- [x] **Residential listing images**: Casa Curuba → coral facade with arched green doors; Casa Menta → green facade above the cobbled street. Casa Menta's previous thumbnail was a portrait image in a landscape slot, which cropped badly.

⚠️ **`santa-maria/view-05` is excluded from the site** — it has Spanish marketing text ("5,000 m² de parque en Country Club") burned into the image, which cannot be used on the English pages. Ask the client for a clean version if the shot is wanted.

---

## ✅ Done — residential imagery pass (2026-08-03)

Heroes on the residential pages now lead with the watercolor drawings rather than photography:

- [x] **Casa Los Monos** — hero is the watercolor perspective (`los-monos-06`); the courtyard photo (`los-monos-01`) is the plate below it
- [x] **Casa Virginia** — hero is the `VIRGINIA 07` elevation; the photo he liked (`virginia-01`) moves to the closing slot
- [x] **Casa Menta** — hero is the watercolor section (`menta-08`); the old hero photo moves to the gallery tail
- [x] **Casas en Barrio El Prado** — hero is `ruta-del-llano-61-04`; the old hero joins the Aquática group. **No drawing exists in this folder**, so this hero is photography.
- [x] **Villa Fontana** — photo hero kept; `fontana-03` moves directly under it and the watercolor elevation (`fontana-04`) now sits beside the first block of text

- [x] **New `hero--drawing` treatment** — `.hero--project` crops edge-to-edge with `object-fit: cover` and has no scrim, which would have cropped the drawings and left white overlay text on white paper. Drawing heroes now sit contained on a navy field with a top/bottom scrim so the nav and hero text stay legible.

Every residential image is now used exactly once per page — no duplicates, no orphans.

### Still open on Residential

- [ ] **Barrio El Prado bento redesign** — currently four stacked titled galleries. Wants restructuring into per-house sections (title, gallery, drawing, text) in a bento layout keyed to each house's colour. Deferred by request.
- [ ] **Casa Curuba hero** — not mentioned in this pass, so left as photography. Its drawing-style image is `curuba-06`. Confirm whether the drawing-hero rule should apply here too.

---

## ✅ Done — image placement pass (2026-08-03)

Reversed the previous round: **heroes are photography/renders again, and the drawings sit as the plate directly under the hero.** The `hero--drawing` treatment (drawing contained on a navy field) is removed — that was the source of the dark blue bars on the sides.

Hero image is now also used as the thumbnail on the category page and the home page, so a project reads with one main image everywhere.

| Project | Hero / thumbnail | Plate under hero |
|---|---|---|
| El Encanto | `casa-club-09` | `casa-club-08` |
| Ciudad del Este | `phase-1-04` | `aerial-01` |
| Las Catalinas | `plaza-del-mercado-01` (kept) | `plaza-del-mercado-drawing` |
| Los Altos Flats | `los-altos-flats-01` (kept) | `los-altos-flats-drawing01` |
| Nueva Miramar | `view-04` | `view-01` |
| Palmerola | unchanged, by request | — |
| Santa María | unchanged, by request | — |
| Casa Curuba | `curuba-02` | `curuba-06` (drawing) |
| Casa Los Monos | `los-monos-01` | `los-monos-06` (drawing) |
| Casa Menta | `menta-05` | `menta-02` — drawing `menta-08` sits beside the first text block instead |
| Casa Virginia | `virginia-01` (kept) | `virginia-05` (drawing) |
| Casas en Barrio El Prado | `paseo-del-parque-33-01` | `aquatica-01` |
| Villa Fontana | `fontana-01` (kept) | `fontana-03`; drawing `fontana-04` beside first text |

Las Catalinas gallery order reshuffled as requested.

### Client to supply
- [ ] **More images for Palmerola and Santa María** — both left as-is because the folders have only 4 and 5 approved images, too few to improve the sequence.

### Still open
- [ ] **Barrio El Prado bento redesign** — four stacked titled galleries today. Wants per-house sections (title, gallery, drawing, text) in a bento layout keyed to each house's colour. Deferred by request.

---

## ✅ Done — showcase, home duplicates, El Prado bento (2026-08-03)

- [x] **`.project-showcase` padding removed** — it had `padding: 0 clamp(1rem,3vw,2rem)` over a navy background, so every wide image sat inset with navy bars down both sides.
- [x] **Home page repeats fixed.** Featured projects appear in **neither** client document — narrativa's Home is hero + two service panels + closing CTA only, and brief 3.1 says of the entry cards: *"No project names at this level — atmosphere and category only."* Per instruction, the duplicated featured projects were swapped out rather than the entry images changed: Plaza del Mercado → El Encanto, Casa Los Monos → Villa Fontana, and the Residential intro drawing → Casa Menta. Every project now appears exactly once on the home page.
- [x] **Community sub-nav removed** — the Urban Design / Architecture / Selected Projects selector was left over from the split layout.
- [x] **El Encanto** — the mid-page CAD map (`master-plan-01`) replaced with `casa-club-05`; the map moves to the gallery tail.
- [x] **Ciudad del Este** — hero re-cropped from the original with the **top 30% cut** (was mostly sky); `master-plan-01` **rotated 90°** into a landscape plate (`master-plan-01-rotated`); first and second content images swapped, so `phase-1-03` sits under the hero and `aerial-01` beside the Master Plan text.
- [x] **Los Altos Flats** — drawing and the photo beside the first text block swapped.
- [x] **Nueva Miramar** — first and third content images swapped (`view-05` under the hero, `view-01` lower down).
- [x] **Barrio El Prado rebuilt as per-house sections.** Each house now has its own tinted section with a large title, its elevation drawing beside the title, and its photography beneath. Tints sampled from each facade: Aquática `#E9F1ED`, Paseo del Parque 33 `#ECEDF4`, Paseo del Parque 36 `#F8F2DC`, Ruta del Llano 61 `#F8EAE2`. No body text yet, by request.

⚠️ **Ruta del Llano 61 has no drawing** in the approved folder — its section uses the best facade photo in the drawing slot. The other three houses each have a real elevation.

### Client to supply
- [ ] More images for **Palmerola** (4) and **Santa María** (5) — too few to improve the sequence
- [ ] An elevation drawing for **Ruta del Llano 61**
- [ ] Body text per house for the El Prado sections

---

## 🟡 Bigger design/dev work (takes more time)

- [ ] **Spanish language layer** — narrativa supplies complete ES for every page; the site has no toggle yet. Brief 4.1: toggle must preserve page context, not redirect home. **Next session.**
- [ ] **Separate the two audiences** clearly in nav + structure — two distinct worlds, must not bleed into each other
- [ ] **Distinct visual treatments** for Residential vs. Community & Master Planning
- [ ] **Apply lines → watercolor → photo animation** to the homepage hero (already exists on Community & Master Planning)
- [x] **Boost architecture presence in Community & Master Planning** — addressed by the merge: architecture now appears inside every project rather than in a separate list

---

## ⏳ Blocked — waiting on client input

- [ ] **El Prado house copy** — narrativa gives one group paragraph, no per-house text. Images exist for all four (Aquática, Paseo del Parque 33 & 36, Ruta del Llano 61). Shipped as one grouped page; individual pages need client copy.
- [ ] **Nueva Miramar phase status** — narrativa says Phase 1 architecture is *in design*; brief v3 says *built and in use*. Site currently says "in design" (newer doc). Confirm.
- [ ] **Display typeface** — brief 2.2 table says "Merriwheater", the note below says "HV Preston Bold". Site loads Merriweather; `assets/fonts/` only has Preston. Confirm which is correct.
- [ ] **Phone number in footer** — narrativa footer shows a "Teléfono" placeholder; +502 2317 8172 comes from brief 3.5. Confirm it's still current.

---

## 🔧 Notes / production side

- [ ] **8 hero images sit 306–363 KB**, slightly over the brief's 300 KB budget (4.3). Single-pass encodes from the originals — pushing further would visibly degrade them. Flag if the budget is hard.
- [ ] **Awards** — narrativa names Prix Versailles 2019 and Cemex Building of the Year inside Ciudad del Este body copy. Kept as inline text, no badges (brief 1: "awards referenced discreetly if at all").
- [ ] **Voice conflict** — narrativa's EN uses first person ("our clients", "we've earned"); brief 2.4 mandates third person. Site now follows **narrativa verbatim** (first person) since it is the newer client-authored text. If brief 2.4 wins instead, this is a one-pass rewrite. **Needs a decision.**
- [ ] Unused logo asset `assets/logos/ad.png` (Architectural Digest) is still on disk though removed from all pages.
