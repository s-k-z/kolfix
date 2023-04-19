import { Args } from "grimoire-kolmafia";
import {
  handlingChoice,
  print,
  printHtml,
  propertyDefaultValue,
  sessionLogs,
  setProperty,
  visitUrl,
} from "kolmafia";
import { $effect, $item, get, PropertiesManager, set } from "libram";

const config = Args.create("kolfix", "For updating important KoLmafia settings", {
  auto: Args.flag({
    help: "Check any properties that can be automatically updated",
    setting: "",
  }),
  cleaver: Args.flag({
    help: "In case KoLmafia doesn't know what your June Cleaver counters should be, set them to safe values (until rollover or ascension)",
    setting: "",
  }),
  disableAll: Args.flag({
    help: "Sets daily/lifetime flags below to their disabled state, and sets cleaver to safe values",
    setting: "",
  }),
  disableCombatSkills: Args.flag({
    help: "Sets daily limited combat skills to their fully expended states (until rollover or ascension)",
    setting: "",
  }),
  disableLegendaryPizzas: Args.flag({
    help: "Sets legendary cookbookbat pizzas to eaten (until ascension)",
    setting: "",
  }),
  disableLocket: Args.flag({
    help: 'Set the _locketMonstersFought property to "0,0,0" (until rollover or ascension)',
    setting: "",
  }),
  disableSausageGoblin: Args.flag({
    help: "Set the Kramco _lastSausageMonsterTurn to max integer (until rollover or ascension)",
    setting: "",
  }),
  disableShotglass: Args.flag({
    help: "Set the Mime Army Shotglass flag to used (until rollover or ascension)",
    setting: "",
  }),
  gingerbread: Args.flag({
    help: "Toggle Gingerbread City permanent unlock and Wall-Thickening. (Digital Clock Tower, Retail District, and Sewers can be checked with auto)",
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
  mall: Args.number({
    help: "Set the autoBuyPriceLimit (no max, but not recommended above 250k)",
    setting: "",
  }),
  max: Args.flag({
    help: "Set permanent pool skill and manuals of numberology to the maximum values.",
    setting: "",
  }),
  maxAll: Args.flag({
    help: "Set permanent pool skill and manuals of numberology to the maximum values, mark Tunnel of L.O.V.E. permanently unlocked, and Gingerbread City as permanently unlocked with wall thickening",
    setting: "",
  }),
  maximizer: Args.flag({
    help: "Set the maximizer recent history to the default value. This is useful for when the maximizer history is no longer updating properly.",
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
  popups: Args.flag({
    help: "Toggle the suppressNegativeStatusPopup flag. This suppresses mini-browser windows from opening when using various items, typically those with detrimental effects.",
    setting: "",
  }),
  recommend: Args.flag({
    help: "Print a list of manual recommendations.",
    setting: "",
  }),
  voa: Args.number({
    help: "Set the valueOfAdventure (no max, but not recommended above 10k)",
    setting: "",
  }),
  session: Args.flag({
    help: "Parse session log to try recover any changed preferences using what was logged",
    setting: "",
  }),
});

const places = [
  "bathole",
  "beanstalk",
  "canadia",
  "da.php",
  "desertbeach",
  "gingerbreadcity",
  "hiddencity",
  "highlands",
  "main.php",
  "manor1",
  "manor2",
  "manor3",
  "manor4",
  "marais",
  "mclargehuge?action=cloudypeak",
  "mclargehuge?action=trappercabin",
  "monorail",
  "mountains.php",
  "orc_chasm",
  "plains",
  "pyramid",
  "questlog.php?which=1",
  "questlog.php?which=2",
  "realm_fantasy",
  "realm_pirate",
  "sea_oldman",
  "spacegate",
  "spacegate&action=sg_vaccinator",
  "speakeasy",
  "tavern",
  "town_right",
  "town_wrong",
  "town",
  "woods",
  "campaway", // explicitly checked after woods
  "zeppelin",
] as const;

export default function main(command = "help"): void {
  const color = "green";

  Args.fill(config, command);
  if (config.help) {
    Args.showHelp(config);
    return;
  }

  const propertyManager = new PropertiesManager();
  propertyManager.set({ logPreferenceChange: true });

  try {
    if (config.auto) {
      print("Checking properties", color);

      print("Touring the Kingdom", color);
      for (const place of places) {
        visitUrl(place.includes(".php") ? place : `place.php?whichplace=${place}`);
      }

      visitUrl(`desc_item.php?whichitem=${$item`designer sweatpants`.descid}`);

      const locketResponse = visitUrl("inventory.php?reminisce=1", false);
      if (locketResponse.includes("You don't want to reminisce any more today.")) {
        const oldLocket = get("_locketMonstersFought").split(",");
        const newLocket = oldLocket.concat(new Array(3).fill(0)).slice(0, 3);
        set("_locketMonstersFought", newLocket);
      }

      visitUrl("campground.php?action=terminal");
      if (handlingChoice()) {
        for (const text of ["status", "enhance", "enquiry", "educate", "extrude"]) {
          visitUrl(`choice.php?pwd&whichchoice=1191&option=1&input=${text}`);
        }
        visitUrl("main.php");
      }

      visitUrl(`desc_effect.php?whicheffect=${$effect`Puzzle Champ`.descid}`);

      print("Checking recipes", color);
      for (const craft of ["cocktail", "combine", "cook", "multi", "smith"]) {
        visitUrl(`craft.php?mode=discoveries&what=${craft}`);
      }
    }

    if (config.cleaver || config.disableAll) {
      print("Setting June Cleaver to safe values", color);
      visitUrl(`desc_item.php?whichitem=${$item`June cleaver`.descid}`);
      set("_juneCleaverEncounters", 10);
      set("_juneCleaverSkips", 5);
      set("_juneCleaverFightsLeft", 30);
    }

    if (config.disableLegendaryPizzas || config.disableAll) {
      print("Setting all Cookbookbat legendary pizzas as eaten this lifetime", color);
      set("calzoneOfLegendEaten", true);
      set("deepDishOfLegendEaten", true);
      set("pizzaOfLegendEaten", true);
    }

    if (config.disableLocket || config.disableAll) {
      set("_locketMonstersFought", "0,0,0");
    }

    if (config.disableShotglass || config.disableAll) {
      set("_mimeArmyShotglassUsed", true);
    }

    if (config.disableSausageGoblin || config.disableAll) {
      set("_lastSausageMonsterTurn", Number.MAX_SAFE_INTEGER);
    }

    if (config.disableCombatSkills || config.disableAll) {
      set("_chestXRayUsed", 3);
      set("_drunkPygmyBanishes", 11);
      set("_feelHatredUsed", 3);
      set("_feelLostUsed", 3);
      set("_firedJokestersGun", true);
      set("_gingerbreadMobHitUsed", true);
      set("_glarkCableUses", 5);
      set("_humanMuskUses", 3);
      set("_kgbTranquilizerDartUses", 3);
      set("_latteBanishUsed", true);
      set("_macrometeoriteUses", 10);
      set("_mafiaMiddleFingerRingUsed", true);
      set("_missileLauncherUsed", true);
      set("_monstersMapped", 3);
      set("_navelRunaways", 3);
      set("_reflexHammerUsed", 3);
      set("_saberForceUses", 5);
      set("_shatteringPunchUsed", 3);
      set("_snokebombUsed", 3);
      set("_steelyEyedSquintUsed", true);
      set("_stinkyCheeseBanisherUsed", true);
      set("_usedReplicaBatoomerang", 3);
      set("_vmaskBanisherUsed", true);
    }

    if (config.session) {
      const logs = sessionLogs(1);

      if (logs.length > 0) {
        const prefs: Map<string, string> = new Map();
        const prefRegex = /^Preference (.+?) changed from (?:.*?) to (.*)$/;

        for (const line of logs[0].split(/[\n\r]+/)) {
          const match = line.match(prefRegex);

          if (match === null) continue;

          prefs.set(match[1], match[2]);
        }

        for (const [pref, value] of prefs) {
          setProperty(pref, value);
        }
      }
    }

    const toggle = (prop: string) => set(prop, config.maxAll || !get(prop));

    if (config.gingerbread || config.maxAll) {
      print(
        `${
          config.maxAll ? "Unlocking" : "Toggling"
        } Gingerbread City permanent unlock and wall-thickening`,
        color
      );
      toggle("gingerbreadCityAvailable");
      toggle("gingerExtraAdventures");
    }

    if (config.glitch) set("glitchItemImplementationCount", config.glitch);

    if (config.love || config.maxAll) {
      print(`${config.maxAll ? "Unlocking" : "Toggling"} Tunnel of L.O.V.E.`, color);
      toggle("loveTunnelAvailable");
    }

    if (config.max || config.maxAll) {
      config.numberology = config.numberology ?? 5;
      config.pool = config.pool ?? 25;
    }

    if (config.maximizer) {
      print("Resetting maximizer history");
      set("maximizerMRUList", propertyDefaultValue("maximizerMRUList"));
    }

    if (config.numberology) set("skillLevel144", config.numberology);
    if (config.pool) set("poolSharkCount", config.pool);

    if (config.popups) {
      set("suppressNegativeStatusPopup", !get("suppressNegativeStatusPopup", false));
    }

    const warn = (key: string, value: number) => {
      print(`Warning: ${key} ${value} is not recommended, red`);
    };

    if (config.mall) {
      if (config.mall > 250000) warn("autoBuyPriceLimit", config.mall);
      set("autoBuyPriceLimit", config.mall);
    }

    if (config.voa) {
      if (config.voa > 10000) warn("valueOfAdventure", config.voa);
      set("valueOfAdventure", config.voa);
    }

    if (config.recommend) {
      printHtml(
        [
          "Recommended properties to inspect",
          "Property names and values case sensitive when being set otherwise they may not work.",
          "Use the command <b>prefref property</b> to check values.",
          `Use the commmand <b>set caseSensitiveProperty = "new value"</b> to change it.`,
          "",
        ].join("<br>")
      );
      const props: Record<string, { msg: string; rec?: string }> = {
        battleAction: {
          msg: "controls how to handle combat",
          rec: "custom combat script",
        },
        autoSatisfyWithCloset: {
          msg: "will automatically take items from the closet",
        },
        autoSatisfyWithStash: {
          msg: "will automatically take items from clan stash",
        },
        autoSatisfyWithStorage: {
          msg: "will automatically take items from Hankg's storage",
          rec: "true",
        },
        autoSatisfyWithNPCs: {
          msg: "will automatically buy items from npc stores with meat",
          rec: "true",
        },
        autoSatisfyWithCoinmasters: {
          msg: "will automatically buy items from npc stores with other currency",
          rec: "true",
        },
        autoSatisfyWithMall: {
          msg: "will automatically buy items from the mall",
          rec: "true",
        },
      };
      for (const [prop, val] of Object.entries(props)) {
        const warn = val.rec && val.rec?.toString() !== get(prop).toString();
        printHtml(
          `<b>${prop}</b> ${val.msg}.${val.rec ? ` Recommend: <b>${val.rec}</b>` : ""} Currently: ${
            warn ? `<a color="red">` : ""
          }<b>${get(prop)}</b>${warn ? "</a>" : ""}`
        );
      }
    }

    print("Presto fixo! All done.", color);
  } finally {
    propertyManager.resetAll();
  }
}
