# openclaw-openmontage

An [OpenClaw](https://openclaw.ai) plugin that adds AI video production capabilities
via a local [OpenMontage](https://github.com/itsuzef/OpenMontage) workspace.

## What it does

Injects skills that teach OpenClaw agents to delegate video production tasks —
animated explainers, cinematic trailers, avatar videos, screen demos, motion graphics,
and more — to your local OpenMontage installation.

The plugin contributes no runtime JS code. It is a **skills package**: structured
markdown files that get injected into the agent's system prompt and teach it how to
engage OpenMontage's instruction-driven pipeline system.

## Requirements

- [OpenClaw](https://openclaw.ai) ≥ 2026.1.26
- [OpenMontage](https://github.com/itsuzef/OpenMontage) cloned locally and set up
  (run `make setup` in the OpenMontage repo)

## Install

```bash
openclaw install @itsuzef/openclaw-openmontage
```

Or from a local checkout:

```json
{
  "plugins": {
    "installs": [
      { "source": "path", "sourcePath": "/path/to/openclaw-openmontage" }
    ]
  }
}
```

## Configure

```bash
openclaw config set plugins.entries.openmontage.enabled true
openclaw config set plugins.entries.openmontage.config.workspacePath /path/to/OpenMontage
```

Or in your openclaw config JSON directly:

```json
{
  "plugins": {
    "entries": {
      "openmontage": {
        "enabled": true,
        "config": {
          "workspacePath": "/Users/you/Documents/OpenMontage"
        }
      }
    }
  }
}
```

## Usage

Once configured, ask your OpenClaw agent anything video-related:

- "Make a 60-second animated explainer about how black holes form"
- "Create a Ghibli-style animated video of an underwater city at dusk"
- "Build a cinematic trailer for our product launch"
- "Make a screen demo showing how to install our CLI tool"
- "Turn this blog post into a 90-second video"
- "25-second kinetic typography launch reel using HyperFrames"

The agent will run preflight, present a production plan and cost estimate, and execute
the pipeline with human approval gates at each creative stage.

## Cost

Most pipelines have a zero-cost path using free tools (Piper TTS + stock media +
Remotion + FFmpeg). Premium paths add AI image/video generation and ElevenLabs TTS.

| Path | Cost | Unlocks |
|---|---|---|
| Zero key | $0 | Pipelines with a free path (explainer, animation, screen-demo, hybrid, clip-factory) |
| FAL_KEY | ~$0.15–$1.50 | FLUX AI image generation |
| Full setup | ~$1–$3 | Video gen (Veo/Kling/Runway/Seedance) + ElevenLabs + music |

## Pipelines

| Pipeline | Best For | Status |
|---|---|---|
| `animated-explainer` | Explainers, educational content, data viz | production |
| `cinematic` | Trailers, teasers, hype edits | production |
| `animation` | Motion graphics, Ghibli/anime-style | production |
| `screen-demo` | CLI demos, developer walkthroughs | production |
| `avatar-spokesperson` | Presenter videos, announcements | production |
| `hybrid` | Source footage + AI support visuals | production |
| `talking-head` | Speaker videos | beta |
| `clip-factory` | Multi-clip from long source | beta |
| `podcast-repurpose` | Podcast highlights | beta |
| `localization-dub` | Translate and dub | beta |
| `documentary-montage` | Real-footage montage, tone-poem style | beta |

## How it works

OpenMontage is agent-driven: the AI agent reads pipeline manifests and stage director
skills, makes creative decisions, and uses Python tools for actual generation. This
plugin teaches OpenClaw agents:

1. What OpenMontage can produce (`skills/openmontage/openmontage.md`)
2. How to engage the workspace — preflight, pipeline selection, plan presentation
   (`skills/openmontage/delegate.md`)
3. Which pipeline fits which brief (`skills/openmontage/pipelines.md`)

The agent navigates to your OpenMontage workspace using its existing file and shell
tools, reads `AGENT_GUIDE.md` from that workspace, and follows the instruction-driven
pipeline system from there.

## Contributing

Improvements to the skill content are the most valuable contributions. If OpenMontage
adds a new pipeline or changes its capability surface, update the matching skill file.

1. Fork and clone this repo
2. Edit `skills/openmontage/*.md`
3. Test by pointing your local plugin install at the fork
4. Open a PR with a clear description of what changed and why
