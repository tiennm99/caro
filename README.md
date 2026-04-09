# Caro (Gomoku)

A command-line Gomoku (Five-in-a-Row) game with client-server architecture, built on Netty.

Based on [Ratel](https://github.com/ainilili/ratel).

## Installation

Requires Maven and JRE (Java 8+):

```bash
git clone https://github.com/tiennm99/caro.git
cd caro
mvn install package
```

## Running

Start the server:
```bash
java -jar landlords-server/target/landlords-server-1.4.0.jar -p 1024
```

Start a client:
```bash
java -jar landlords-client/target/landlords-client-1.4.0.jar -h 127.0.0.1 -p 1024
```

## Game Rules

- Two players take turns placing black and white pieces on a 15x15 board
- Black moves first
- First to form an unbroken line of 5 pieces (horizontal, vertical, or diagonal) wins
- The game ends in a draw if the board is full

## Game Modes

- **PVP** - Player vs Player
- **PVE** - Player vs AI (Easy / Medium / Hard)
- **Spectator** - Watch ongoing games

## Game Commands

Moves are entered as `row,col` (e.g. `7,7` for center).

- `exit` or `e` - Leave the game

## Protocol Support

- TCP (default, port 1024)
- WebSocket (port = TCP port + 1)

WebSocket address: `ws://host:port/ratel`

## License

See [LICENSE](LICENSE) file.
