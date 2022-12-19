import { Args } from "grimoire-kolmafia";
import { visitUrl } from "kolmafia";
import { set } from "libram";

const config = Args.create("kolfix", "Update important KoLmafia settings", {
  glitch: Args.number({
    help: "Set the number of times you've implemented your [glitch season reward name] \n\tto calculate:\nX = today's %monster% meat reward / (5 x [glitch season reward names] owned)",
    setting: "",
  }),
  maxAll: Args.flag({
    help: "Set all the properties to their fully upgraded values (excludes glitch reward)",
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
    help: "Check what is installed in the Source Terminal !!!Not implemented yet!!!",
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
  witchess: Args.number({
    help: "Set the strength of your Witchess puzzle champ effect (max 20)",
    setting: "",
  }),
});

export default function main(command = ""): void {
  Args.fill(config, command);
  if (config.help) {
    Args.showHelp(config);
    return;
  }

  if (config.glitch) {
    set("glitchItemImplementationCount", config.glitch);
    return;
  }

  if (config.maxAll) {
    config.numberology = 5;
    config.pool = 25;
    config.source = true;
    config.sourceGram = 10;
    config.sourcePram = 10;
    config.sourceSpam = 10;
    config.witchess = 20;
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
  if (config.witchess) set("puzzleChampBonus", config.witchess);
}
