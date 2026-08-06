# Spanish site (`/es`) — build report

Updated 6 Aug 2026. Source of truth: `build assets/RONDA 2/Castillo_Arquitectos_Narrativa_Website_ES-EN.docx`
(bilingual ES/EN narrative), plus `Website_Brief_v3.docx` and `RONDA 2/Team/Listado/Integrantes_del_Equipo.xlsx`
for team roles.

> Lives in `i18n/`, not `es/` — `rebuild-es.sh` deletes and regenerates `es/`, so anything stored
> there gets destroyed on the next run.

---

## 1. What was built

`site/es/` — 18 pages mirroring the English site exactly:

| | |
|---|---|
| Top level | `index` · `who-we-are` · `community` · `residential` · `contact` |
| `es/projects/` | 13 project pages (all of them) |

**Filenames match English** (`es/who-we-are.html`, not `es/quienes-somos.html`), which keeps the
language toggle a pure path mapping — `/x.html` ⇄ `/es/x.html`, no lookup table. Changeable later.

**Assets are shared, not duplicated.** `assets/` is 127 MB; ES pages point at `../assets/` and
`../styles/`. The whole `/es` folder is ~330 KB.

### Language toggle now actually works

It was a visual mock — clicking EN/ES moved the gold highlight and nothing else. It's now a real
link on all 36 pages, both directions, preserving page context (Spanish *Residential* → English
*Residential*, not → homepage). Added `hreflang` alternates and `<html lang="es">`.

### `styles/main.js` made language-aware

Four hardcoded English strings now switch on `document.documentElement.lang`: `Sending…` →
`Enviando…`, the validation error, the success message, and the failure message.

### Verification (all passing)

```
1590 local refs      0 broken
36 pages             toggle round-trips correctly both ways
0                    broken hreflang alternates
0                    structural diffs between ES and EN pages (identical DOM)
18/18                ES pages declare lang="es"
0                    residual untranslated English
0                    double-escaped entities; all files valid UTF-8
motif parity         who-we-are 4/4 · community 12/12 · residential 8/8 · contact 4/4
```

---

## 2. Decisions and findings

### 2.1 Motifs — DONE, but I deliberately left two things behind

The corner motif clusters lived only on branch `motif-arcs-and-about-statement` (commit `1ea577a`).
They're now on **both** languages: 4 on who-we-are, 12 on community, 8 on residential, 4 on contact —
identical counts EN and ES.

I **cherry-picked rather than merged**, because that commit bundles two regressions:

1. **`styles/main.js` on that branch is older than `main`.** It has `phase1End = isMobile ? 0.44`,
   which would have undone your later commit *"Speed up the mobile expand phase (~2.4× less scroll)"*
   (`1477739`) — and wiped the Spanish form strings. **Not taken.** `main.js` still reads `0.20`.
2. **It also reverts the About statement layout.** The commit message says so ("revert About
   statement"): it collapses `statement-layout--split` / `statement--top` / `statement--bottom` into a
   single block on who-we-are. You asked for motifs, not that — so I inserted who-we-are's motif by
   hand and left the split layout intact.

Taken from the branch: motif markup in community/contact/residential, plus the `main.css` rules they
need (`.motif.motif--form` specificity fix + `.motif--nudged` for residential's 20 px offset).

**The branch is still unmerged.** Everything useful in it is now on your working tree — but merging it
later would drag both regressions back in. Worth deleting.

### 2.2 Service names — SETTLED: English

Per your call, the two service names are **English throughout the Spanish site**, which also matches
the client's bilingual document exactly. Applied to nav, mobile nav, page `<title>`, category chips,
panel eyebrows, residential hero meta, related-section labels, and both form dropdowns.

The ES contact dropdown now reads `Community & Master Planning | Residential | Otro` — character for
character what the client wrote. The Spanish nav reads:

> Inicio · Quiénes Somos · Community & Master Planning · Residential · Contacto

Everything else stays Spanish: the subsection headings *Diseño Urbano* / *Arquitectura*, the Careers
areas-of-interest list, and scope descriptors like *Vivienda Multifamiliar* — those are descriptions,
not the two service brands. The community page keeps the client's own phrase **"Master Planning y
Diseño de Comunidades"** as its section heading.

### 2.3 "Cartagena" — what I meant

Exact location: **`index.html` line 59**, the hero subtitle under "Design is Legacy."

> "Master plans and architecture, held to the same standard—from our studio in Guatemala to
> **Las Catalinas, Cartagena**, and work across the Americas."

It's the **only** occurrence in the entire site — one line, English homepage. Easy to miss: it sits in
a `.hero-intro` element that only fades in ~2.2 s after the hero video starts.

Why I flagged it: the sentence names three places as evidence of reach — Guatemala (the studio),
Las Catalinas (a real, heavily-featured project), and Cartagena. But Cartagena appears **nowhere
else**: not in the 13 project pages, not in the client's approved project list, not in the brief, not
in the ES/EN narrative. The other two names are backed by content; that one isn't.

It may be real work that simply isn't published. I translated it faithfully so ES matches EN — I just
want it confirmed before it ships in two languages, since an unsupported city name is the kind of
thing a developer or investor might ask about.

### 2.4 Copy with no client-approved Spanish

The narrative document covers the core copy, but the built site has more copy than the document does.
I translated the following myself (formal *usted*, per the brief). **Not client-approved wording —
these deserve a review pass:**

- Homepage: *"Dos servicios, una filosofía"*, *"Del plan al lugar"*, *"Del lugar, del oficio"*, the
  horizontal-panel copy, both "¿Quiere ver más?" CTA panels
- Who We Are: the pull-quote, Eduardo's second paragraph (founded 2004 / trained in the US), and the
  entire **Careers** section including its form
- Community: the two scope bullet lists
- Residential: hero, *"El mismo rigor, otra escala"*, inquiry-panel copy
- Contact: *"Con sede en Ciudad de Guatemala"* and surrounding copy
- All project-page metadata values (*Construido*, *En desarrollo*, *Por fases*, *Fases 1–3
  concluidas*…) and all `alt` text

### 2.5 Where site copy and client copy disagree

The site was written before the ES/EN narrative arrived. Where both existed I used the **client's
Spanish**, so a few ES passages are now closer to their intent than the English is:

- **Homepage headline.** Client ES is *"El diseño es legado."*; the EN site says *"Design is Legacy."*
  with capitals they don't use. ES follows the client.
- **El Encanto.** The site's English drops the international multidisciplinary team; the client's
  Spanish includes it. The project page keeps it; the community-page summary doesn't, matching the
  English structure.
- **Santa María.** The client's Spanish ends *"…todo lo que necesitás estará a pasos de casa"* —
  Central-American *voseo*, which contradicts the brief's own *usted* rule. I used **"necesita"**.
  Flagging it as a deliberate departure from their text.
- **Closing CTA.** The client's CTA is a full sentence, far too long for a button; English solved this
  with "Get in Touch", so ES uses **"Contáctenos"**. Their full sentence is unused.

### 2.6 Deliberately not translated

- **Proper nouns** — Las Catalinas, Los Altos Flats, Villa Fontana, Plaza del Mercado, Ciudad del
  Este, Beach Town, El Prado, Country Club, Village Center, Branded Residences. The client's own
  Spanish leaves all of these as-is.
- **Award names** — Prix Versailles, Forbes Centroamérica *Top Creatives*, Cemex *Edificio del Año*.
  ("Special Mention" → "Mención Especial" *was* translated; the client's doc translates it.)
- **`form-name` / `value` attributes** (`contact-general`, `value="residential"`). These are Netlify
  form identifiers, not display text — translating them breaks form routing. **ES forms submit to the
  same Netlify form names as English, so everything lands in one inbox.** If you want submissions
  split by language, those names must change and be re-registered in Netlify.

---

## 3. Still open

| Item | Notes |
|---|---|
| Client review of §2.4 copy | The self-translated material — largest open item |
| Confirm Cartagena (§2.3) | English-side, one line |
| Delete branch `motif-arcs-and-about-statement` | Content applied; merging now would regress `main.js` + About layout |
| Netlify redirect for `/es` | Currently `/es/index.html`; a `/es` → `/es/index.html` rule would be tidier |
| `sitemap.xml` / `robots.txt` | Neither exists in either language |
| Optional: Spanish URLs | See §1 |
| Optional: language auto-detect | Brief doesn't ask for it; manual toggle satisfies the spec |

---

## 4. Re-syncing ES after English changes

The English site is under active development, so ES **will** drift. Rebuild with:

```bash
cd site && ./i18n/rebuild-es.sh
```

It deletes and regenerates `es/` from the current English pages, so ES can't silently fall behind.
Two caveats:

1. **New English copy stays English** until you add the pair to `i18n/2-content.py`. Re-check for
   leftovers after running.
2. It also touches the **English** files — that's how the EN→ES half of the toggle and the `hreflang`
   tags get maintained.

Files: `i18n/1-chrome.py` (nav, footer, CTA strip, forms, toggle, hreflang) and `i18n/2-content.py`
(~250 page-copy pairs). Delete the folder if you'd rather maintain ES by hand.
