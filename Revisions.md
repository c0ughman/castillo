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

⚠️ **Netlify Forms needs one manual step:** form notifications must be pointed at info@castilloarquitectos.com in the Netlify dashboard (Site settings → Forms → Form notifications). Detection happens on deploy; forms will not appear until the first build after this push.

---

## 🟡 Bigger design/dev work (takes more time)

- [ ] **Spanish language layer** — narrativa supplies complete ES for every page; the site has no toggle yet. Brief 4.1: toggle must preserve page context, not redirect home. **Next session.**
- [ ] **Separate the two audiences** clearly in nav + structure — two distinct worlds, must not bleed into each other
- [ ] **Distinct visual treatments** for Residential vs. Community & Master Planning
- [ ] **Apply lines → watercolor → photo animation** to the homepage hero (already exists on Community & Master Planning)
- [ ] **Boost architecture presence in Community & Master Planning** — partly addressed (Los Altos Flats and Las Catalinas now have their own entries); still worth a dedicated visual treatment

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
