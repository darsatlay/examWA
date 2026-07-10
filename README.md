# Exam #2: "Battleship"
## Student: s336760 SATLAIKINA DARIA 

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

## API Server
- Route `/`**
  - Home page of the application.
  - Provides navigation to start a new game, tournaments, statistics and match history.

- Route `/login`**
  - User authentication page.
  - Allows registered users to log into the application.

- Route `/register`**
  - User registration page.
  - Creates a new account with username and password.

- Route `/new-game`**
  - Allows the player to choose the difficulty (Easy, Intermediate, Hard) and start a new casual game.

- Route `/game/:id`**
  - Displays the Battleship board for the selected match.
  - Allows firing torpedoes.
  - Shows match information (difficulty, remaining torpedoes, ships).
  - Reveals ships when the match ends.

- Route `/tournament`**
  - Allows authenticated users to create a tournament or join an existing one using a tournament code.

- Route `/statistics`**
  - Displays global statistics for every player and every difficulty level.
  - Accessible without authentication.

- Route `/history`**
  - Displays all matches played by the authenticated user.


## Authentication

### POST `/api/sessions/register`

Creates a new user.

**Request body**

```json
{
  "username": "player",
  "password": "secret"
}
```

**Response**

```json
{
  "message": "User created"
}
```

---

### POST `/api/sessions`

Authenticates a user.

**Request body**

```json
{
  "username": "player",
  "password": "secret"
}
```

**Response**

```json
{
  "id": 1,
  "username": "player"
}
```

---

### GET `/api/sessions/current`

Returns the currently authenticated user.

---

### DELETE `/api/sessions/current`

Logs out the current user.

---

## Games

### POST `/api/games`

Creates a new game.

**Request body**

```json
{
  "difficulty": "easy"
}
```

**Response**

```json
{
  "id": 10,
  "difficulty": "easy",
  "gridSize": 6,
  "torpedoes": 15,
  "ships": 5
}
```

---

### GET `/api/games`

Returns all matches played by the authenticated user.

---

### GET `/api/games/:id`

Returns the current game state.

Before the match ends:

```json
{
  "match": {...},
  "shots": [...]
}
```

After the match ends:

```json
{
  "match": {...},
  "shots": [...],
  "ships": [...]
}
```

---

### POST `/api/games/:id/fire`

Fires a torpedo.

**Request**

```json
{
  "row": 3,
  "col": 2
}
```

**Response**

```json
{
  "result": "hit",
  "gameOver": false
}
```

Possible results:

- water
- hit
- hit and sunk

---

## Tournament

### POST `/api/tournaments`

Creates a new tournament.

**Request**

```json
{
  "difficulty": "hard"
}
```

**Response**

```json
{
  "code": "A1BC23",
  "tournamentId": 4,
  "matchId": 17
}
```

---

### POST `/api/tournaments/join`

Joins an existing tournament.

**Request**

```json
{
  "code": "A1BC23"
}
```

**Response**

```json
{
  "tournamentId": 4,
  "matchId": 18
}
```

---

## Statistics

### GET `/api/statistics`

Returns statistics for every player and difficulty level.

---
## Database Tables

### users

Stores registered users.

- id
- username
- hash
- salt

---

### matches

Stores every played match.

- id
- user_id
- tournament_id
- difficulty
- game_mode
- grid_size
- torpedoes_initial
- torpedoes_left
- ships_total
- ships_sunk
- result
- started_at
- finished_at

---

### ships

Stores ship positions for each match.

- id
- match_id
- ship_index
- size
- start_row
- start_col
- orientation
- sunk

---

### shots

Stores all torpedo launches.

- id
- match_id
- row
- col
- result

---

### tournaments

Stores tournament information.

- tournament_id
- code
- difficulty
- grid_size
- created_by

---

### tournament_ships

Stores the board template shared among tournament participants.

- tournament_id
- ship_index
- size
- start_row
- start_col
- orientation

## Main React Components

### App

Main application component.
Configures routing and authentication state.

---

### Navbar

Navigation bar.
Displays different menu items depending on whether the user is authenticated.

---

### HomePage

Application home page.

---

### LoginPage

Authentication form.

---

### RegisterPage

Registration form.

---

### NewGamePage

Allows the user to configure and start a new match.

---

### GamePage

Main gameplay component.

Displays:

- game board
- torpedoes
- ships
- match result

Handles firing torpedoes.

---

### Board

Renders the Battleship grid.

---

### Cell

Represents one cell of the board.
Displays:

- water
- hit
- sunk ship
- hidden ship after the game ends

---

### TournamentPage

Allows users to create and join tournaments.

---

### StatisticsPage

Displays global player statistics.

---

### HistoryPage

Displays all matches played by the authenticated player.

---

## Screenshot

![Screenshot1](.screen/game.png)
![Screenshot2](.screen/homepage.png)

## Users Credentials

- alice, password
- dasha, pass
Also you can create new user

## Use of AI Tools
AI tools (ChatGPT) were used during the development of this project to assist with understanding project requirements, debugging, improving the application architecture, and refining the user interface. Parts with generated code was reviewed and integrated,tested before being included in the final implementation. Additional manual testing was performed using Postman and VS debug console to verify correctness.
