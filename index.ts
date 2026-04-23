import type { OpenClawPluginApi } from "openclaw/plugin-sdk";

const plugin = {
  id: "openmontage",
  name: "OpenMontage",
  description:
    "AI video production — animated explainers, cinematic trailers, avatar videos, screen demos, and more.",

  register(_api: OpenClawPluginApi) {
    // Skills-only plugin. No runtime registrations needed.
    // Skills are declared in openclaw.plugin.json -> skills: ["./skills"]
    // and injected into the agent system prompt automatically.
  },
};

export default plugin;
