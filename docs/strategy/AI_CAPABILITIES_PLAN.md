# AI capabilities plan

> Revision 2: pillar 1 is **AI & Intelligent Automation**. New demonstrations are no longer assumed (§5 now decides case by case). Evidence classifications are unchanged.

Purpose: make AI the flagship of the site **without** claiming more than the company can evidence, and make it as relevant to a customer with no hardware as to one with a machine.

## 1. The honest starting point
- Company profile (as summarised in `PHASE1_DISCOVERY.md`): AI/ML is **engineering capability, "designed, prototyped and applied on engagement"**; "we do not claim production AI deployments we cannot evidence."
- The only AI/vision/NLP examples on file come from a deck derived from Bheeshmaa Business Services documents. Ownership by Siddhrans is unconfirmed, figures are unverified (40 %, 97 %, ROI withheld by guardrail tests), client names and images are not publishable.
- The delivered, evidenced asset is **15 software systems** (database-backed, workflow-driven), which is the platform AI plugs into.
Therefore: "AI-led" is a positioning and capability statement today. It becomes a proof statement only if the founders can supply evidence (§5, §7). The site must not invent AI deployments.

## 2. Evidence ladder (public labels)
| Label | Use for AI | Requires |
|---|---|---|
| **Systems built** | Only the 15 software systems (not AI features unless confirmed) | Profile |
| **Engineering capability** | All AI capability descriptions | Profile wording |
| **Prototype** *(new)* | A working Siddhrans demo | A real demo, link or recording, dated |
| **Designed system** | Architecture designed, not validated | Existing label |
| **Proposed solution** | Pilot/architecture proposal | Existing label |
| **Concept** | Illustrations, AI-generated images, mock interfaces | Caption (existing policy) |
Rules: no accuracy/ROI/time-saving numbers; no named clients; no "deployed at"; every AI visual carries a Concept or Illustrative label unless it is a real screenshot of a real demo.

## 3. The eight capabilities: what to say, what proof exists, what is missing
| # | Capability | What the page can say now (capability) | Existing evidence | Gap (close only if evidence exists) |
|---|---|---|---|---|
| 1 | **AI agents & intelligent assistants** | Role-specific assistants and multi-agent workflows with people in the loop; tools, approvals, audit | Profile capability bullets | Reference agent demo; architecture; guardrail/approval design |
| 2 | **Enterprise copilots & RAG** | Copilots grounded in enterprise documents and systems; retrieval, citations, access control | Profile bullets ("enterprise knowledge retrieval") | Working RAG demo on synthetic documents; evaluation method; deployment options (cloud/on-prem) |
| 3 | **Document intelligence & knowledge processing** | Extraction, classification, summarisation, search over documents | Profile ("intelligent document processing"); deck: product-data enrichment, label matching (provenance caveat) | Sample extraction demo (synthetic invoices/forms) |
| 4 | **AI-enabled web & mobile apps** | Adding search, assistants and automation to applications | 15 delivered systems = the base; no AI feature claimed | One internal prototype adding an AI feature to a Siddhrans system (e.g. LMS assistant), labelled Prototype |
| 5 | **Predictive analytics & ML** | Forecasting, classification, anomaly detection, decision support | Profile bullet; deck: vibration monitoring (designed), NLP (capability example) | One worked example with public/synthetic data and method |
| 6 | **Computer vision & industrial inspection** | Detection, counting, label/defect matching, inspection dashboards | Deck: vehicle detection, label inspection (capability examples); prepared visuals | Own demo video/screens; no third-party brand or plates |
| 7 | **Intelligent workflow & process automation** | Rules + AI inside approval/RPA workflows; humans for exceptions | Profile RPA capability; delivered workflow systems | Workflow demo showing AI step + human approval |
| 8 | **Edge AI & embedded intelligence** | Models and anomaly logic on microcontrollers/gateways; sensor-to-model-to-action | Deck: vibration, machine health, vision; prepared ESP32/motor/pump images | One real edge demo (ESP32 + simple anomaly model on the existing prototype board) |

**AI for customers with no hardware:** #1-#5 and #7 stand alone and lead the AI hub; hardware appears only in #6/#8 and in the "AI meets machines" section.

## 4. How the AI hub (`/ai/`) is presented
1. **Hero:** "AI that works inside your operations." Three outcome chips: *Assist* (agents, copilots) · *Understand* (documents, vision) · *Predict & act* (ML, automation).
2. **Capability grid:** the eight capabilities as cards (concept visual, three bullets, status chip, link).
3. **How we build AI (steps):** Data & documents → Retrieval & models → Agents & copilots → Workflow action → Human oversight (from the existing AI page) turned into an animated flow diagram.
4. **Architecture diagrams (original):** RAG pipeline, agent with tool use and approval, document-intelligence pipeline, edge anomaly pipeline.
5. **Runs where you need it:** cloud / private / on-prem; data stays under your control; security layers (links to cybersecurity page). Only statements the team confirms.
6. **Evidence:** status legend + the prototypes once they exist.
7. **With or without hardware:** two paths ("Digital" → software pillar, "Machines" → IoT/edge).
8. **CTA:** "Describe the workflow or data you want to put AI on."

## 5. Do we need new demonstrations? (revised)
Decision rule: **no new demo is built if existing evidence is enough for a capability-level presentation.** Existing artefacts, repositories and approvals were reviewed (CURRENT_SITE_AUDIT §7). Verdict per capability:

| # | Capability | Existing artefacts | Verdict |
|---|---|---|---|
| 1 | Agents & assistants | Profile capability wording only | **Gap**: no artefact |
| 2 | Copilots & RAG | Profile wording ("enterprise knowledge retrieval") only | **Gap**: no artefact |
| 3 | Document intelligence | Profile wording; deck: product-data enrichment, label/work-order matching; label-mismatch output image | **Sufficient** at capability level; label-mismatch output is the concrete visual |
| 4 | AI-enabled web/mobile apps | 15 delivered systems (platform base); no AI feature documented | **Gap** for AI features; **sufficient** for "we build the application layer" |
| 5 | Predictive analytics & ML | Profile wording; deck: vibration monitoring (designed), NLP (capability) | **Sufficient** at capability level |
| 6 | Computer vision & inspection | Supplied vision outputs (label mismatch, vehicle detection with boxes), capsule concept, deck examples | **Sufficient** at capability level (needs plate blur / brand check) |
| 7 | Intelligent workflow & automation | Profile RPA capability; delivered workflow systems | **Sufficient** |
| 8 | Edge AI & embedded intelligence | Supplied prototype images (ESP32 + current clamp + probes; motor + vibration sensor + display), pump monitoring concept and real pump photo, architecture diagram | **Sufficient** at capability/designed-system level |

**Recommendation:**
1. **First, a 30-minute evidence interview** with the founders (questions in §7). Often something exists (a pilot, an internal tool, code) that closes gaps 1, 2 and 4 with no new work.
2. If the answer is "nothing exists" for agents/RAG, present those as **Engineering capability with concept visuals only** (current policy). That is honest and acceptable.
3. **At most one optional prototype**, a small RAG-or-agent demo over synthetic documents, and only if the founders want proof for those capabilities. It would be labelled *Prototype*, is not required for launch, and is **not recommended by default**.
4. Edge AI needs **no new build**: if the team has the code that ran on the ESP32 prototype boards, a screenshot or short clip of it would upgrade the claim to *Prototype*; otherwise the images stay "Illustrative" and the use case stays "Designed system".
5. Architecture diagrams (RAG, agent, document, edge) are original artwork (design work, not demos) and are included in the plan regardless.

## 6. Content gate before publishing sub-pages
A sub-page under `/ai/` is published only if it has (a) an architecture diagram or existing artefact (a working demo is optional), (b) ≥ 400 words of specific, non-generic content, (c) a status chip, (d) company sign-off. Otherwise it remains a section of `/ai/`.

## 7. Open questions for the founders (AI evidence interview)
1. Which AI work has actually run for a customer (even a pilot or PoC), and may it be described anonymously?
2. Do the Bheeshmaa-derived AI use cases belong to Siddhrans, and may they be published as capability examples (already assumed)?
3. Preferred model providers and hosting (public API, private cloud, on-prem, open-weight models)? What data-handling promises are true today?
4. Team size and roles in AI/ML (publishable?).
5. Are there AI features inside any of the 15 systems?
6. Do the vision outputs (label mismatch, vehicle detection) come from work Siddhrans can describe, and may the number plate be blurred?
7. Does the ESP32 / motor prototype code exist, and may a screenshot or clip be shown?
8. Is any other project on the VPS (not opened) Siddhrans work that can be described?
