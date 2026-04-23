---
role: delegation-protocol
summary: |
  Step-by-step protocol for engaging the OpenMontage workspace from OpenClaw.
  Follow this exactly when the user has a video production request. Do not skip
  preflight. Do not begin production without user approval on the plan.
see-also:
  - openmontage.md: Capability overview and activation triggers
  - pipelines.md: Pipeline selection guide
---

# Delegation Protocol

Follow these steps in order. Each step has a hard gate — do not proceed past a step
that fails.

---

## Step 1 — Resolve the workspace path

Get the workspace path from the plugin config key
`plugins.entries.openmontage.config.workspacePath`.

If it is not set, tell the user and stop:

> "OpenMontage isn't configured yet. Set the workspace path:
> `openclaw config set plugins.entries.openmontage.config.workspacePath /path/to/OpenMontage`
> Get OpenMontage at https://github.com/itsuzef/OpenMontage"

Verify the path exists before continuing.

---

## Step 2 — Read AGENT_GUIDE.md

Read the operating guide from the workspace before doing any production work:

```
{workspacePath}/AGENT_GUIDE.md
```

This file contains the full agent contract: preflight rules, pipeline execution
protocol, the decision communication contract, composition runtime selection rules,
and the checkpoint policy. **You must read it before proceeding.** Its rules govern
everything that follows.

---

## Step 3 — Run preflight

Discover which tools and providers are configured in the OpenMontage workspace:

```bash
cd {workspacePath}
python -c "
from tools.tool_registry import registry
import json
registry.discover()
print(json.dumps(registry.provider_menu_summary(), indent=2))
"
```

Present the output to the user as a capability menu. Follow the presentation format
from AGENT_GUIDE.md → "Mandatory Preflight". Key fields to surface:

- `composition_runtimes` — which of `ffmpeg`, `remotion`, `hyperframes` are available
- `capabilities[]` — "N of M configured" per capability family
- `setup_offers[]` — quick unlocks (1-minute env-var fixes)
- `runtime_warnings[]` — surface these verbatim

**Do not begin creative work before the user understands their real capability envelope.**

---

## Step 4 — Select a pipeline

Match the brief to a pipeline using `pipelines.md` or the pipeline defs in the workspace:

```
{workspacePath}/pipeline_defs/
```

Read the chosen pipeline manifest:

```
{workspacePath}/pipeline_defs/{pipeline}.yaml
```

Check `required_tools` against the registry. Report `passed`, `degraded`, or `blocked`.

---

## Step 5 — Present the production plan

Before any asset generation, present all of the following to the user:

1. Chosen pipeline and rationale
2. Tool path — which specific providers will be used for TTS, image gen, video gen, music
3. **Composition runtime options** — if Remotion and HyperFrames are both available, present
   both with a recommendation. This is a hard rule in AGENT_GUIDE.md — never silently pick one.
4. Cost estimate (free vs. paid paths)
5. Music plan — check `{workspacePath}/music_library/` for existing tracks, then list
   API options; always give the user an explicit choice (see AGENT_GUIDE.md → Music Plan)
6. Stage-by-stage production plan

**Wait for explicit user approval before advancing to asset generation.**

---

## Step 6 — Execute stage by stage

For each stage, read its director skill before doing any work:

```
{workspacePath}/skills/pipelines/{pipeline}/{stage}-director.md
```

Stages: `idea` → `script` → `scene_plan` → `assets` → `edit` → `compose`

Before calling any generation tool (video, image, TTS, music), check the tool's
`agent_skills` field in the registry and read the referenced Layer 3 skill from
`{workspacePath}/.agents/skills/`. This is mandatory — it contains provider-specific
prompting guidance that significantly affects output quality.

Checkpoint after each stage. Pause for human approval on creative stages
(`idea`, `script`, `scene_plan`). Technical stages (`assets`, `edit`, `compose`)
typically auto-proceed — confirm via `human_approval_default` in the pipeline manifest.

---

## Step 7 — Deliver the result

After the `compose` stage completes, verify the render report:

```
{workspacePath}/projects/{project-name}/renders/final.mp4
```

Present the output path and a concise summary: pipeline used, runtime, providers, cost
incurred, and duration.

---

## Rules that must not be broken

These come directly from AGENT_GUIDE.md and apply for the entire session:

- **All production goes through a pipeline.** No ad-hoc Python scripts to call tools directly.
- **Read the stage director skill before each stage.** The quality intelligence is in the skills.
- **Read Layer 3 skills before writing any generation prompt.** Generic prompts produce generic output.
- **Present both Remotion and HyperFrames** when both are available. Silently picking one is forbidden.
- **Do not begin asset generation before user approval** on the production plan.
- **Escalate blockers explicitly.** State what was attempted, what failed, and what the options are.
  Do not silently substitute a provider or runtime — get user approval first.
- **Do not change provider, model, or render path** without telling the user and getting approval.
