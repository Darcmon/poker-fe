# Scrollable 3D Animation with Three.js

- Watch the [full tutorial](https://youtu.be/Q7AOvWpIVHU) on YouTube
- [Scrollable Three.js Animation](https://fireship.io/snippets/threejs-scrollbar-animation) Snippet

## Usage

```
git clone <this-repo>
npm install
npm run dev
```

## Poker Game State in JSON

```json
{
  "deck": [
    "AS",
    "KS",
    "AH",
    "QS",
    "AC",
    "JS",
    "9S",
    "2S",
    "5H",
    "AD",
    "TS",
    "7D",
    "2D"
  ],
  "players": [
    {
      "first_name": "Shad",
      "last_name": "Sharma",
      "email": "shadanan@gmail.com",
      "pool": 500,
      "state": 0, // 0: fold, 1: call, 2: raise
      "bet": 200
    },
    {
      "first_name": "Sachie",
      "last_name": "Sharma",
      "email": "sachie@gmail.com",
      "pool": 50,
      "state": 1, // 0: fold, 1: call, 2: raise
      "bet": 50
    },
    {
      "first_name": "Richard",
      "last_name": "Ngo",
      "email": "richard1ngo@gmail.com",
      "pool": 500,
      "state": 2, // 0: fold, 1: call, 2: raise
      "bet": 200
    },
    {
      "first_name": "Niwako",
      "last_name": "Sugimura",
      "email": "niwako@gmail.com",
      "pool": 500,
      "state": 1, // 0: fold, 1: call, 2: raise
      "bet": 6
    }
  ],
  "dealer": 0, // Index into players
  "bet_size": 2, // 0: ante, 1: flop, 2: turn, 3: river
  "turn": 3,
  "round": 0
}
```

Example of JSON:

```json
{
  "first_name": "Shad",
  "last_name": "Sharma",
  "a_list": [1, 2, 3, 4, 5],
  "a_list_of_dictionaries": [
    {
      "first_name": "Shad",
      "last_name": "Sharma"
    },
    {
      "first_name": "Sachie",
      "last_name": "Sharma"
    },
    {
      "first_name": "Niwako",
      "last_name": "Sugimura"
    }
  ]
}
```
