import { Args } from "grimoire-kolmafia";
import { visitUrl } from "kolmafia";
import { $effect, set } from "libram";

const config = Args.create("kolfix", "Update important KoLmafia settings", {
  check: Args.flag({
    help: "Update any properties that can be automatically fixed",
    setting: "",
  }),
  cleaver: Args.flag({
    help: "In case KoLmafia doesn't know what your June Cleaver counters should be, set them to safe values (until rollover or ascension)",
    setting: "",
  }),
  glitch: Args.number({
    help: "Set the number of times you've implemented your [glitch season reward name] \n\tto calculate:\nX = today's %monster% meat reward / (5 x [glitch season reward names] owned)",
    setting: "",
  }),
  maxAll: Args.flag({
    help: "Set all the properties to the maximum values listed below. This option is for quickly telling KoLmafia you've fully upgraded skills/iotms/quests",
    setting: "",
  }),
  numberology: Args.number({
    help: "Set the number of Manuals of Numberology you've enumerated (max 5)",
    setting: "",
  }),
  pool: Args.number({
    help: "Set the number of times you've Rack'd 'em up at a Shark's Chum for pool skill (max 25)",
    setting: "",
  }),
  source: Args.flag({
    help: "Check what is installed in the Source Terminal",
    setting: "",
  }),
  sourceGram: Args.number({
    help: "Set the number of Source Terminal GRAM chips used (enquiry rollover effect duration, max 10)",
    setting: "",
  }),
  sourcePram: Args.number({
    help: "Set the number of Source Terminal PRAM chips used (enhance effect duration, max 10)",
    setting: "",
  }),
  sourceSpam: Args.number({
    help: "Set the number of Source Terminal SPAM chips used (educate mp cost reduction, max 10)",
    setting: "",
  }),
  witchess: Args.flag({
    help: "Check Witchess's puzzle champ familiar weight",
    setting: "",
  }),
});

export default function main(command = ""): void {
  Args.fill(config, command);
  if (config.help) {
    Args.showHelp(config);
    return;
  }

  if (config.check) {
    config.source = true;
    config.witchess = true;
  }

  if (config.cleaver) {
    set("_juneCleaverEncounters", 10);
    set("_juneCleaverSkips", 5);
    set("_juneCleaverFightsLeft", 30);
  }

  if (config.glitch) set("glitchItemImplementationCount", config.glitch);

  if (config.maxAll) {
    config.numberology = 5;
    config.pool = 25;
    config.source = true;
    config.sourceGram = 10;
    config.sourcePram = 10;
    config.sourceSpam = 10;
    config.witchess = true;
  }

  if (config.numberology) set("skillLevel144", config.numberology);
  if (config.pool) set("poolSharkCount", config.pool);

  if (config.source) {
    // I don't know yet
    visitUrl("campground.php?action=terminal");
  }

  if (config.sourceGram) set("sourceTerminalGram", config.sourceGram);
  if (config.sourcePram) set("sourceTerminalPram", config.sourcePram);
  if (config.sourceSpam) set("sourceTerminalSpam", config.sourceSpam);
  if (config.witchess) visitUrl(`desc_effect.php?whicheffect=${$effect`Puzzle Champ`.descid}`);
}
