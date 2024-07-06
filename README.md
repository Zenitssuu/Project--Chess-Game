# Chess Game Project

This is a real-time, multiplayer chess game application that allows two players to compete against each other while others can watch as spectators. The game follows standard chess rules and regulations. The backend is built using Express, Socket.io, and MongoDB, while the frontend uses EJS templates.

## Features

- **Two-Player Mode**: Two players can play a game of chess at a time.
- **Spectator Mode**: Additional users can join the game as spectators.
- **Real-Time Connection**: The game state is updated in real-time using Socket.io.
- **Chess Rules and Regulations**: Game logic is implemented using a chess library.
- **Player Assignment**: The first player to join gets the white pieces, and the second player gets the black pieces.
- **Game Interruption**: If one of the players disconnects, the match will stop.

## Technologies Used

- **Backend**: Node.js, Express, Socket.io, MongoDB
- **Frontend**: EJS
- **Chess Logic**: Chess.js library (or any other suitable chess library)

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/chess-game.git
    cd chess-game
    ```

2. Install backend dependencies:
    ```sh
    npm install
    ```

3. Configure environment variables:
    - Create a `.env` file in the root directory.
    - Add the necessary environment variables for MongoDB:
        ```plaintext
        MONGO_URI=<Your MongoDB URI>
        PORT=<Your preferred port number>
        ```

### Running the App

1. Start the backend server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:<Your preferred port number>`.

## Usage

### Playing the Game

1. **Join as Player**: The first two users to join the game will be assigned as players. The first player will get the white pieces, and the second player will get the black pieces.
2. **Join as Spectator**: Additional users will join as spectators and can watch the game in real-time.
3. **Play the Game**: Players can make moves according to standard chess rules. The game state will be updated in real-time for both players and spectators.
4. **Game Interruption**: If one of the players disconnects, the game will stop.
