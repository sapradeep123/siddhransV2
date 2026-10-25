# Content approvals and open items

What the public site says is limited to the supplied company profile and clearly labelled engineering reference material. These items still need a decision from the company before or soon after launch. None blocks the code.

## Decisions that affect the live site
| # | Item | Current behaviour | Needed |
|---|---|---|---|
| 1 | Enquiry recipient | `gururaj.n@siddhrans.com` (profile contact) | Confirm it is the right inbox, or give a general address |
| 2 | Phone `+91 89712 34343` | Shown in header CTA, footer, contact, schema.org | Confirm it is publishable |
| 3 | "15 named systems" | Counted from the profile (exactly 15). The profile's stats page says "15+" | Confirm wording |
| 4 | Favicon | **None.** A blank icon is used. No icon was derived from the logo | Supply or approve one |
| 5 | Canonical domain | `https://siddhrans.com` (set via `NEXT_PUBLIC_SITE_URL`) | Confirm; decide the existing redirect to `cyyberaix.in` |
| 6 | Privacy notice | Drafted from how the site actually behaves (form emails, no storage, no analytics) | Company review (not legal advice) |
| 7 | Street address | None published (none in the sources) | Provide if wanted |
| 8 | Leadership | Names and titles only, as in the profile | Biographies or photographs only if supplied with permission |

## Engineering use cases (Bheeshmaa-derived material)
The 20 entries on `/engineering-use-cases/` come from the supplied deck, which says its sources are historical Bheeshmaa documents. CORRECTED: Siddhrans has designed, developed and delivered engineering solutions for clients; equipment is often handed over or confidential, so images are representative. The site now uses five statuses (Developed & Delivered, Prototype Developed / Tested, Designed Solution, Proposed Solution, Engineering Capability) and keeps project status separate from image provenance. No entry is marked Delivered or Prototype until the company confirms it: see `docs/USE_CASE_STATUS.md`.

Please confirm you are entitled to publish these as capability examples, in particular:
- Contactless powder mixing, Secure laboratory access (source claims development; no evidence supplied)
- Handheld Bluetooth ECG, Wearable PPG (medical devices: no regulatory or clinical status is stated on the site)
- Vehicle detection, product-label inspection, product-data enrichment, NLP sentiment, NLP data-leak prevention (historic client-linked profile material; client names and images are not used)

Withheld on purpose (the automated tests fail the build if they appear): the 40%, 97%, 15–20% figures, all ROI and savings numbers, "prototype sold to a US company", compliance claims, client names, testimonials, ISO certification, "6 sectors", SAP ECC and enterprise-portal case material (slides 23–26 of the deck are not published at all).

## Industries page mapping
"Systems built" per industry follow the profile's sector list (Dialysis under healthcare, Cargo under logistics, Inventory under retail and business operations). Please confirm Dialysis and Cargo are fine to name.

## Imagery
All photographs are Pexels stock images (see `IMAGE_REGISTER.md`), captioned as illustrative. Photographer names come from Pexels file names and two are unverified. Replace with real project or office photographs (with permission) when available. No image from the supplied presentation is used. No AI-generated image is used.

## Logo
The supplied PNG is shipped byte-for-byte (`SHA-256 9bfd52b5aa328b90dc5c0ca9a7e7b8966746787ea22b5688e6f902e56fb7dfa7`). The tagline is only legible at large sizes, so it is displayed large in the footer; the header always sits on a light surface.
