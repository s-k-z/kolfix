# kolfix

Provides shortcuts for setting commonly used [KoLmafia](https://github.com/kolmafia/kolmafia/) preferences. Useful for users who have had their preferences recently lost.

__Currently supported things__:

&#x2611; [\[glitch season reward name\]](https://kol.coldfront.net/thekolwiki/index.php/Glitch_season_reward_name)

&#x2611; Calculate the Universe from the [Manual of Numberology](https://kol.coldfront.net/thekolwiki/index.php/Manual_of_Numberology)

&#x2611; [Gingerbread City](https://kol.coldfront.net/thekolwiki/index.php/Civic_Planning_Office)

&#x2611; [June Cleaver](https://kol.coldfront.net/thekolwiki/index.php/June_cleaver)

&#x2611; Puzzle Champ from [Witchess](https://kol.coldfront.net/thekolwiki/index.php/Your_Witchess_Set)

&#x2611; Rack 'em up at [A Shark's Chum](https://kol.coldfront.net/thekolwiki/index.php/A_Shark's_Chum)

&#x2610; [Source Terminal](https://kol.coldfront.net/thekolwiki/index.php/Source_Terminal) (partial)

&#x2611; [Tunnel of L.O.V.E.](https://kol.coldfront.net/thekolwiki/index.php/The_Tunnel_of_L.O.V.E.)

## Installation

To install, copy and paste the following into the KoLmafia Graphical CLI aka GCLI:

```
git checkout https://github.com/s-k-z/kolfix.git release
```

## Usage

__For a full list of options in KoLmafia__:
```
kolfix
```

__Examples__:

Set the June Cleaver counters to safe values, such that other scripts can continue automating with it:
```
kolfix cleaver
```

Check any properties that can be automatically updated, and then set all upgrades to the maximum:
```
kolfix auto maxAll
```

Set the quantity of manuals of numberology used to 3, and rack 'em up count to 10:
```
kolfix numberology=3 pool=10
```

To set the number of [glitch season reward name] implementations, either fight the %monster% today and record the big meat drop (same value as hp and mp restored) or search your most recent session log for this value. Calculate: 

`X = today's %monster% meat drop / (5 x [glitch season reward names] owned)`

for example: `100 = 1000 meat / (5 x 2 [glitch season reward names])`
```
kolfix glitch=100
```