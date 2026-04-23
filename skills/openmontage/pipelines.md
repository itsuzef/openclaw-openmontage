---
role: pipeline-reference
summary: |
  Quick reference for matching a video brief to the right OpenMontage pipeline.
  Use this before delegating to the workspace when the pipeline choice is not obvious.
see-also:
  - openmontage.md: Full capability overview and activation triggers
  - delegate.md: Step-by-step delegation protocol
---

# Pipeline Reference

Match the user's brief to a pipeline. When genuinely uncertain, ask one clarifying
question (topic, target platform, or intended audience) rather than guessing. See
`{workspacePath}/pipeline_defs/` for the full manifests.

---

## Production pipelines (stable)

### `animated-explainer`
**Best for:** Concept explainers, educational content, data storytelling, developer
education, turning written content into video.

Use when the goal is explaining something. Remotion renders animated charts, stat cards,
comparison cards, callout boxes, text cards, and word-level captions. HyperFrames is a
strong option for typography-heavy or kinetic-motion treatments.

**Free path:** Yes — Piper TTS + stock media + Remotion + FFmpeg.

**Example briefs:**
- "Explain how CRISPR gene editing works"
- "Make a data-driven video about coffee consumption worldwide"
- "Turn my blog post about AI trends into a 90-second video"
- "Developer education: how Git rebase works vs merge"

---

### `cinematic`
**Best for:** Trailers, teasers, hype edits, mood-led content, product launch films.

Use when the brief depends on motion footage and cinematic pacing. Requires video
generation APIs (Veo, Kling, Runway, or Seedance) for motion clips. Seedance 2.0 is
the preferred premium model — supports multi-shot, native audio, and lip-sync.

Still-image fallback is not a silent substitute — escalate if video gen is unavailable.

**Example briefs:**
- "30-second sci-fi trailer: humanity receives a warning from 1000 years in the future"
- "Cinematic teaser for our product launch"
- "Hype reel for a music festival"

---

### `animation`
**Best for:** Motion-graphics-first videos, Ghibli/anime-style, abstract visuals,
image-animation sequences, launch reels driven by HTML/GSAP.

Supports `image_animation` (FLUX stills + camera motion + particles via Remotion's
`AnimeScene`) and pure Remotion motion graphics. HyperFrames with registry blocks is
the right pick for kinetic typography and shader-transition-driven scenes.

**Free path:** Yes for Remotion-only. ~$0.15 with FLUX images (FAL_KEY).

**Example briefs:**
- "Ghibli-style animated video of a floating library at golden hour"
- "25-second product launch reel with kinetic typography and shader transitions"
- "Abstract animated background for a podcast intro"

---

### `screen-demo`
**Best for:** CLI walkthroughs, developer tool demos, install flows, API demos,
terminal-based educational content.

**Critical rule:** When the demo is a terminal/CLI sequence, always use the
**synthetic screen recording** via Remotion's `TerminalScene` — deterministic,
privacy-safe, no OS capture needed. Use real capture (`playwright`, `screen_recorder`)
only when the demo requires a live GUI or unpredictable browser interaction.

**Example briefs:**
- "Create a demo showing how to install and configure our CLI"
- "Walk through a Git rebase workflow with an animated terminal"
- "60-second REST API demo showing request/response with latency numbers"

---

### `avatar-spokesperson`
**Best for:** Presenter-led videos, company announcements, product overviews, rebrand
videos. Uses HeyGen avatar or talking-photo lip sync. Requires HeyGen API key.

**Example briefs:**
- "60-second spokesperson video announcing our company rebrand"
- "Product overview with a professional on-screen presenter"

---

### `hybrid`
**Best for:** User-supplied footage plus AI support visuals. Run `source_media_review`
before pipeline selection to understand the footage quality and duration.

---

## Beta pipelines (rough edges expected)

| Pipeline | Best for |
|---|---|
| `talking-head` | User's own speaker footage (vertical or horizontal) |
| `clip-factory` | Many short clips from one long source (podcast, lecture, stream) |
| `podcast-repurpose` | Podcast highlights, audiogram clips |
| `localization-dub` | Translate and dub an existing video into another language |

Always tell the user when you're selecting a beta pipeline.

---

## Selection heuristics

| Signal in the brief | Likely pipeline |
|---|---|
| "explain", "how does X work", "educational", "data" | `animated-explainer` |
| "trailer", "teaser", "cinematic", "hype", "motion footage" | `cinematic` |
| "animated", "Ghibli", "anime", "motion graphics", "kinetic" | `animation` |
| "demo", "walkthrough", "terminal", "CLI", "install" | `screen-demo` |
| "avatar", "spokesperson", "presenter", "lip-sync" | `avatar-spokesperson` |
| "my footage", "edit this", "cut this down" | `hybrid` |
| "translate", "dub", "subtitle in Spanish" | `localization-dub` |
| "clips from", "repurpose my podcast" | `clip-factory` or `podcast-repurpose` |
| URL to a website + "make a video" | `animation` with HyperFrames website-to-video |

When the brief has multiple signals, prefer the pipeline that matches the
**primary deliverable** — not the supporting elements.
