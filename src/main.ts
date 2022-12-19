import { Args } from "grimoire-kolmafia";
import { Effect, handlingChoice, print, Skill, toInt, visitUrl } from "kolmafia";
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
    help: "Set all the properties to the maximum values listed below. This option is for quickly telling KoLmafia you've fully upgraded numberology and rack 'em up pool skill",
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
});

export default function main(command = "help"): void {
  Args.fill(config, command);
  if (config.help) {
    Args.showHelp(config);
    return;
  }

  const color = "green";

  if (config.auto || config.fullDiagnostic) {
    print("Checking properties", color);
    visitUrl("place.php?whichplace=town_wrong");
    visitUrl("place.php?whichplace=town_right");
    visitUrl("campground.php?action=terminal");
    if (handlingChoice()) {
      visitUrl("choice.php?pwd&whichchoice=1191&option=1&input=status");
      visitUrl("choice.php?pwd&whichchoice=1191&option=1&input=enhance");
      visitUrl("choice.php?pwd&whichchoice=1191&option=1&input=enquiry");
      visitUrl("choice.php?pwd&whichchoice=1191&option=1&input=educate");
      visitUrl("choice.php?pwd&whichchoice=1191&option=1&input=extrude");
      visitUrl("main.php");
    }
    visitUrl(`desc_effect.php?whicheffect=${$effect`Puzzle Champ`.descid}`);
  }

  if (config.cleaver) {
    print("Setting June Cleaver to safe values", color);
    set("_juneCleaverEncounters", 10);
    set("_juneCleaverSkips", 5);
    set("_juneCleaverFightsLeft", 30);
  }

  if (config.fullDiagnostic) {
    print("Checking all effect descriptions", color);
    for (const e of Effect.all()) {
      visitUrl(`desc_effect.php?whicheffect=${e.descid}`);
    }
    print("Checking all skill descriptions", color);
    for (const s of Skill.all()) {
      visitUrl(`desc_skill.php?whichskill=${toInt(s)}`);
    }
  }

  const toggle = (prop: string) => set(prop, config.maxAll || !get(prop));

  if (config.gingerbread || config.maxAll) {
    print(`${config.maxAll ? "Unlocking" : "Toggling" } everything for Gingerbread City`, color);
    toggle("gingerAdvanceClockUnlocked");
    toggle("gingerExtraAdventures");
    toggle("gingerRetailUnlocked");
    toggle("gingerSewersUnlocked");
  }

  if (config.glitch) set("glitchItemImplementationCount", config.glitch);

  if (config.love || config.maxAll) toggle("loveTunnelAvailable");

  if (config.max || config.maxAll) {
    print("Maximizing properties", color);
    config.numberology = 5;
    config.pool = 25;
  }

  if (config.numberology) set("skillLevel144", config.numberology);
  if (config.pool) set("poolSharkCount", config.pool);

  print("Presto fixo! All done.", color);
}
