---
role: video-production-gateway
summary: |
  OpenMontage is an instruction-driven AI video production system. Read this skill when
  the user wants to create any video content — explainers, trailers, clips, demos,
  avatar videos, or animations. This skill covers what OpenMontage can produce, when to
  use it, and how to hand off the task. Read delegate.md to begin production.
see-also:
  - delegate.md: Step-by-step protocol for engaging the OpenMontage workspace
  - pipelines.md: Pipeline catalogue — match a brief to the right pipeline
---

# OpenMontage

OpenMontage is a local AI video production system. The agent reads pipeline manifests and
stage director skills, then uses Python tools to produce videos end-to-end. You are a
**gateway agent** — understand the brief, select the pipeline, and delegate execution to
the OpenMontage workspace via the protocol in `delegate.md`.

## When to activate

- User asks to **make, create, produce, or generate any video**
- User describes a video idea (explainer, trailer, demo, pitch, animation, clip, reel)
- User wants to turn written content (blog post, script, notes, URL) into a video
- User asks what video formats or styles are possible
- User says "make me a video about X" or "can you create a video for Y"
- **User provides a video URL or local file as inspiration** — "make something like this",
  "I love this YouTube Short, make me something similar", "use this Reel as a reference".
  This is a first-class workflow: run reference analysis before capability audit. Read
  `delegate.md` — it covers the reference-video path specifically.

## What OpenMontage produces

Full production pipelines end-to-end: research → script → scene plan → assets → edit →
compose → render. Most pipelines have a zero-cost path; `cinematic` and
`avatar-spokesperson` require paid APIs (video gen and HeyGen respectively).

### Output types

| What you want | Pipeline | Free path? | Premium cost |
|---|---|---|---|
| Animated explainer (data viz, charts, text) | `animated-explainer` | Yes | ~$0.80–$2 |
| Cinematic trailer or teaser | `cinematic` | No (needs motion clips) | ~$1.50–$3 |
| Motion graphics / kinetic typography | `animation` | Yes | ~$0.15 (FLUX images) |
| Avatar or spokesperson video | `avatar-spokesperson` | No (HeyGen) | ~$1–$2 |
| Screen recording / developer walkthrough | `screen-demo` | Yes | $0 |
| Source footage editing | `hybrid` | Yes | $0 |
| Multi-clip factory from long source | `clip-factory` | Yes | $0 |
| Translated / dubbed video | `localization-dub` | No (HeyGen) | varies |

### Composition runtimes

OpenMontage renders via three engines. **Always present both Remotion and HyperFrames to
the user** when both are available — never silently pick one.

| Runtime | Best for |
|---|---|
| **Remotion** | Animated charts, stat cards, comparison cards, callouts, spring-animated text, TikTok-style captions, anime/Ghibli scenes, terminal demos |
| **HyperFrames** | Kinetic typography, product launch reels, website-to-video, registry-block-driven scenes (requires Node ≥ 22) |
| **FFmpeg** | Straight cuts, concat, subtitle burn — always available |

### Provider tiers (cost guidance)

- **Zero key:** Piper TTS + stock media + Remotion + FFmpeg → full pipeline, $0
- **FAL_KEY only (~$0.15–$1.50):** FLUX image generation → AI-generated visuals
- **Full setup (~$1–$3):** Veo/Kling/Runway + ElevenLabs + music gen → broadcast quality

## Next step

Read `delegate.md` — it contains the step-by-step protocol for handing this task to the
OpenMontage workspace. If you need to choose a pipeline first, read `pipelines.md`.
