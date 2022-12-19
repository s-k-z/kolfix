# kolfix

Provides shortcuts for setting commonly used [KoLmafia](https://github.com/kolmafia/kolmafia/) preferences.

## Usage

__For a full list of options in KoLmafia__:
```
kolfix help
```

__Examples__:


To set everything to the maximum value:
```
kolfix maxAll
```

To set the quantity of manuals of numberology used to 3, and set the expected Puzzle Champ familiar weight from Witchess to 15:
```
kolfix numberology=3 witchess=15
```

To set the number of [glitch season reward name] implementations, either fight the %monster% today and record the big meat drop (same value as hp and mp restored) or search your most recent session log for this value. Calculate: 

`X = today's %monster% meat drop / (5 x [glitch season reward names] owned)`

for example: `100 = 1000 meat / (5 x 2 [glitch season reward names])`
```
kolfix glitch=100
```