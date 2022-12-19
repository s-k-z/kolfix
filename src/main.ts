import { Args } from "grimoire-kolmafia";
import { Effect, print, Skill, toInt, visitUrl } from "kolmafia";
import { $effect, get, set } from "libram";

const config = Args.create("kolfix", "Update important KoLmafia settings", {
  auto: Args.flag({
    help: "Check any properties that can be automatically updated",
    setting: "",
  }),
  cleaver: Args.flag({
    help: "In case KoLmafia doesn't know what your June Cleaver counters should be, set them to safe values (until rollover or ascension)",
    setting: "",
  }),
  fullDiagnostic: Args.flag({
    help: "Check basically everything in the game that KoLmafia knows about (WARNING: SLOW)",
    setting: "",
  }),
  gingerbread: Args.flag({
    help: "Toggle all gingerbread city upgrades",
    setting: "",
  }),
  glitch: Args.number({
    help: "Set the number of times you've implemented your [glitch season reward name].\nTo calculate:\nX = today's %monster% meat reward / (5 x [glitch season reward names] owned)",
    setting: "",
  }),
  love: Args.flag({
    help: "Toggle Tunnel of L.O.V.E. permanent unlock",
    setting: "",
  }),
  max: Args.flag({
    help: "Set all the properties to the maximum values listed below. This option is for quickly telling KoLmafia you've fully upgraded numberology, pool, source terminal",
    setting: "",
  }),
  maxAll: Args.flag({
    help: "Maximize all the properties and mark Tunnel of L.O.V.E./Gingerbread City as fully owned and upgraded",
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
});

export default function main(command = "help"): void {
  Args.fill(config, command);
  if (config.help) {
    Args.showHelp(config);
    return;
  }

  if (config.auto || config.fullDiagnostic) {
    print("Checking properties");
    visitUrl("place.php?whichplace=town_wrong");
    visitUrl("place.php?whichplace=town_right");
    visitUrl("campground.php?action=terminal");
    visitUrl(`desc_effect.php?whicheffect=${$effect`Puzzle Champ`.descid}`);
  }

  if (config.cleaver) {
    print("Setting June Cleaver to safe values");
    set("_juneCleaverEncounters", 10);
    set("_juneCleaverSkips", 5);
    set("_juneCleaverFightsLeft", 30);
  }

  if (config.fullDiagnostic) {
    print("Checking all effect descriptions");
    for (const e of Effect.all()) {
      visitUrl(`desc_effect.php?whicheffect=${e.descid}`);
    }
    print("Checking all skill descriptions");
    for (const s of Skill.all()) {
      visitUrl(`desc_skill.php?whichskill=${toInt(s)}`);
    }
  }

  const toggle = (prop: string) => set(prop, config.maxAll || !get(prop));

  if (config.gingerbread || config.maxAll) {
    print("Unlocking everything for Gingerbread City");
    toggle("gingerAdvanceClockUnlocked");
    toggle("gingerExtraAdventures");
    toggle("gingerRetailUnlocked");
    toggle("gingerSewersUnlocked");
  }

  if (config.glitch) set("glitchItemImplementationCount", config.glitch);

  if (config.love || config.maxAll) toggle("loveTunnelAvailable");

  if (config.max || config.maxAll) {
    print("Maximizing properties");
    config.numberology = 5;
    config.pool = 25;
    config.sourceGram = 10;
    config.sourcePram = 10;
    config.sourceSpam = 10;
  }

  if (config.numberology) set("skillLevel144", config.numberology);
  if (config.pool) set("poolSharkCount", config.pool);
  if (config.sourceGram) set("sourceTerminalGram", config.sourceGram);
  if (config.sourcePram) set("sourceTerminalPram", config.sourcePram);
  if (config.sourceSpam) set("sourceTerminalSpam", config.sourceSpam);

  print("Presto fixo! All done.");
}
