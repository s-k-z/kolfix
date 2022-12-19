# kolfix

Provides shortcuts for setting commonly used [KoLmafia](https://github.com/kolmafia/kolmafia/) preferences. Useful for users who have had their preferences recently lost.

## Installation

To install, copy and paste the following into the KoLmafia Graphical CLI aka GCLI:

```
git checkout https://github.com/s-k-z/kolfix.git release
```

## Usage

__For a full list of options in KoLmafia__:
```
kolfix help
```

__Examples__:

Set the June Cleaver counters to safe values, such that other scripts can continue automating with it:
```
kolfix cleaver
```

Set every upgrade to the maximum value, even things you might not own:
```
kolfix maxAll
```

Set the quantity of manuals of numberology used to 3, and update puzzle champ familiar weight to the in-game value:
```
kolfix numberology=3 witchess
```

To set the number of [glitch season reward name] implementations, either fight the %monster% today and record the big meat drop (same value as hp and mp restored) or search your most recent session log for this value. Calculate: 

`X = today's %monster% meat drop / (5 x [glitch season reward names] owned)`

for example: `100 = 1000 meat / (5 x 2 [glitch season reward names])`
```
kolfix glitch=100
```