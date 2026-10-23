# Siddhrans InfoTech: V2 design review (Gate 2b)

Date: 2026-10-23 · Status: **awaiting your approval**. Nothing pushed, deployed or modified in production. No DNS, nginx or live-site changes. The full website is not built.

## 1. What changed from the first design round

You asked for an image-rich, premium site rather than a text-heavy brochure. The engineering-sheet language (hairline rules, numbered sections, title blocks, mono tags) stays, but photography now carries each section.

- **Photographic hero** on the home page: robotic laboratory automation, full-bleed, with a dark left-to-right overlay for text legibility.
- **Photo hero on every inner page**, each a different image, so there is no repeated hero.
- **Capability mosaic** (home): one large photo tile for Embedded & Industrial IoT, then photo tiles for software, AI, security and cloud, and original line-illustration tiles for RPA, data and managed services. This avoids stretching stock images over topics they do not fit.
- **Industries strip**: four tall photo panels (pharma manufacturing, healthcare, energy, water).
- **Embedded & IoT band**: factory photograph, signal chain, and three examples with thumbnails.
- **Use-case rows** now have a thumbnail (photo or original illustration) and the status tag.
- **Products page** no longer repeats one wireframe 15 times: four distinct interface schematics, one per product family, with the names listed beside each.
- Capability stack diagram kept but moved from the hero into the "approach" section.

## 2. The seven requested previews (plus design notes)

Open `site/design-preview/<page>.html` in a browser. Screenshots are in `site/design-preview/screenshots/` as `<page>-desktop.png` (1440), `-tablet.png` (820) and `-mobile.png` (390, 2x).

| # | Page | File |
|---|---|---|
| 1 | Home (photographic hero) | `index` |
| 2 | Services overview | `services` |
| 3 | Embedded Systems & Industrial IoT | `services-embedded-iot` |
| 4 | Engineering Use Cases | `engineering-use-cases` |
| 5 | Products & Solutions | `products` |
| 6 | About Siddhrans | `about` |
| 7 | Contact | `contact` |
| – | Design notes, logo specimen, image credits | `design-notes` |

## 3. Imagery

- 14 licensed photographs, all from Pexels (free commercial licence, checked today). Each was inspected at high resolution for third-party logos; a number of candidates were rejected for visible branding or lettering, and one was cropped to remove a coat emblem. The register with source URL, photographer, licence, logo check and intended pages is `docs/IMAGE_REGISTER.md`.
- Photographs are always captioned "Illustrative image" and the footer states they are not Siddhrans project photographs. No photograph is presented as project work.
- Nothing from the supplied presentation or from search engines is used.
- Where no suitable unbranded photograph was found (cold chain, logistics, drone, vision, safety, HVAC), original line illustrations are used.
- **Performance:** all images are WebP with 480/960/1600 px `srcset`, width and height attributes, lazy loading, and a high-priority hero. The home page loads 445 KB of images on desktop and 322 KB on a phone after scrolling the whole page.
- **Open point:** the photographer names come from Pexels file names and were not confirmed on each photo page (two are marked "verify"). They do not affect the licence.

## 4. Original logo: verified

- Master `C:\Projects\Siddhrans\Siddhrans_Logo.png` and the copy `site/design-preview/assets/Siddhrans_Logo.png` are byte-identical. SHA-256 `9bfd52b5aa328b90dc5c0ca9a7e7b8966746787ea22b5688e6f902e56fb7dfa7`, unchanged from Phase 1.
- Re-run after the V2 changes with `node design-preview/logo-check.mjs`: hash equal; rendered aspect ratio 1.9838 against the native 2200:1109 at 1440, 820, 390 and 320 px, for both the header and footer instances; no filter or transform; artwork box fully inside the CSS container. **All checks pass.**
- The logo is still shown only on light surfaces. The tagline is readable only at large sizes (footer).

## 5. GitHub repository

Checked read-only with `git ls-remote` and the public GitHub API. Nothing was cloned, pushed or configured.

| Item | Finding |
|---|---|
| Repository | `sapradeep123/siddhransV2`, **public**, default branch `main` |
| Existing content | **Empty**: size 0, no branches, no tags (created 2026-10-23 04:25 UTC) |
| History to protect | None |
| Local remote | None yet. `site/` and `C:\Projects\Siddhrans` are not git repositories. I will add `origin` only after you approve implementation |

## 6. Git author identity

- `git config user.name` → **VOne PM Developer**; `git config user.email` → **developer@vonepm.com**. Both come from your global `C:\Users\srira\.gitconfig`. Your other repository (`C:\Projects\LLMApp`, origin `sapradeep123/LLMApp`) uses the same identity.
- **I could not verify that this identity is the one associated with your GitHub account.** The GitHub CLI is not installed, and this email differs from your account email in this session. GitHub links commits to a profile by email, so commits made with an unlinked email will show as an unknown author.
- I have **not** changed or invented any identity, and I will not set Claude, Anthropic or any agent as author or co-author. **Please confirm this identity is correct, or tell me which name and email to use for this repository** (I would set it repository-locally, not globally).

## 7. Claude Code attribution: configured

- Installed version: **Claude Code 2.1.309**. Verified against the official docs (settings reference): the `attribution` object with `commit`, `pr` and `sessionUrl` is supported. The boolean `attribution: false` is also supported from v2.1.281, so it would work here, but I used the object form you specified.
- Merged into the existing `C:\Users\srira\.claude\settings.json` without touching other keys (permissions, model, effort level, auto-mode, etc.):

  ```json
  "attribution": { "commit": "", "pr": "", "sessionUrl": false }
  ```

- JSON validated after the edit. `settings.local.json` has no `attribution` key, so nothing overrides it. No project-level `.claude` settings exist yet.
- Docs state an empty string hides the commit trailer and the PR footer, and `sessionUrl: false` removes the session link.
- Settings are read at session start, so this takes full effect from your next Claude Code session. I have made no commits or PRs in this project, and I will add no attribution text to any commit message, PR or document.
- **Pre-push checks:** before any future push I will run `git log -1 --format=full` and `git log -1 --format=%B`, check author, email, message and any `Co-Authored-By` or `Claude-Session` trailer, and stop and report if anything is wrong. I can also add a local `commit-msg` hook that rejects those trailers if you want it (needs your approval).

## 8. Content rules still enforced

Client names, testimonials, ISO history and all unverified statistics (including "6 sectors", 40%, 97%, 15–20%, ROI) remain withheld. Bheeshmaa-sourced material appears only as labelled engineering use cases (Designed system / Proposed solution / Reference prototype / Capability example), never as Siddhrans-delivered projects. The company profile remains the source for history and delivered products. The "Show internal approval notes" toggle on the use-case page lists, per entry, why it needs approval.

## 9. Checks run

- 8 pages × 3 viewports (24 screenshots): no horizontal overflow, no broken images, no console errors, fonts load.
- Logo integrity and rendering checks (section 4).
- Image weight measured on the home page (section 3).
- **Not yet run** (Phase 4): Lighthouse, keyboard and screen-reader testing, WCAG contrast audit, link crawl. Screenshots were taken with reduced motion on, so animations are not captured. The preview loads fonts from Google Fonts; the final build will self-host them.

## 10. Known weaknesses of this preview

- Some stock photographs are dark (solder bench, code screen) and are mostly seen through the text overlay; the hero and mosaic carry the visual weight.
- Photographs are stock and will look generic next to real project photography. Real photographs (with permission) would improve credibility more than any further design work.
- The AI/network photograph may be a rendered composite; its origin is not stated by Pexels.

## 11. Decisions I need from you

1. Do you approve this visual direction (photographic hero and mosaic with the engineering-sheet detailing)? Tell me what to change on any of the seven pages.
2. Is the Git identity `VOne PM Developer <developer@vonepm.com>` correct for this repository, or which name and email should I use?
3. Do you want the local `commit-msg` hook that blocks AI co-author trailers?
4. Do you have real Siddhrans project or office photographs (with permission to publish) to replace stock images, especially in the hero?
5. Are you comfortable with the Pexels photographs (people non-identifiable, no logos) for launch, with the "Illustrative image" captions kept?
6. Still pending from before: confirm the "15 named systems" wording, the phone number and email, and which Bheeshmaa-sourced items are cleared for publication.

I will stop here until you approve. No implementation, push or deployment will happen before that.
