# Ratel

[![GitHub forks](https://img.shields.io/github/forks/ainilili/ratel?style=flat-square)](https://github.com/ainilili/ratel/network)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/ainilili/ratel?style=flat-square)
![GitHub all releases](https://img.shields.io/github/downloads/ainilili/ratel/total?logo=spring&style=flat-square)
[![GitHub stars](https://img.shields.io/github/stars/ainilili/ratel?logo=java&style=flat-square)](https://github.com/ainilili/ratel/stargazers)
[![GitHub license](https://img.shields.io/github/license/ainilili/ratel?logo=apache&style=flat-square)](https://github.com/ainilili/ratel/blob/master/LICENSE)
![Build ratel(Java with Maven)](https://github.com/ainilili/ratel/workflows/Build%20ratel(Java%20with%20Maven)/badge.svg?branch=master)
![Docker Image Version (latest by date)](https://img.shields.io/docker/v/kebyn/ratel?label=Docker&logo=docker&style=flat-square)

# Gomoku Game Server-Client

## Introduction
Command-line Gomoku (Five-in-a-Row) game based on Netty, converted from the original Landlords game~

## Installation
First download and package, ensure maven and JRE environment are installed locally:
```powershell
git clone https://github.com/ainilili/ratel.git
cd ratel
mvn install package
```
Next, run the Jar packages in the ``target`` folders of ``landlords-client`` and ``landlords-server`` respectively:
```powershell
java -jar landlords-server/target/landlords-server-#{version}.jar -p 1024
java -jar landlords-client/target/landlords-client-#{version}.jar -p 1024 -h 127.0.0.1
```
The client can also run directly, the program will automatically pull public servers from [Serverlist](https://github.com/ainilili/ratel/blob/master/serverlist.json):
```powershell
java -jar landlords-client/target/landlords-client-#{version}.jar
```
**Note**, please replace ``#{version}`` with the current running version in actual execution!
## Gameplay Introduction
Play Gomoku (Five-in-a-Row) on a 15x15 board!

![demo](demo.gif)

### Game Rules
- Two players take turns placing black and white pieces on a 15x15 board
- The first player uses black pieces, the second player uses white pieces
- The goal is to be the first to form an unbroken line of five pieces horizontally, vertically, or diagonally
- The game ends when one player achieves five in a row or the board is full (draw)

### Game Commands
```
Board positions are specified as: row,col (e.g., 7,7 for center)
```
Examples:
 - Make a move: ``7,7`` (place piece at row 7, column 7)
 - Show board: ``board`` or ``b``
 - Show move history: ``history`` or ``h``
 - Pass turn: ``pass`` or ``p``
 - Exit: ``exit`` or ``e``
 - Reset game: ``reset`` or ``r`` (room owner only)

#### Protocol Support
 - TCP
 - Websocket

Websocket protocol address is ``ws://host:port/ratel``, Websocket port needs to be original port plus 1 (if tcp port is 1024, then ws port should be 1025)
## Game Features
- Support for Player vs Player (PVP) mode
- Support for Player vs AI (PVE) mode  
- Real-time spectator mode
- Move history tracking
- Automatic win detection

## Ecosystem
 - [go-ratel-client](https://github.com/ZuoFuhong/go-ratel)
 - [javafx-ratel-client](https://github.com/marmot-z/javafx-ratel-client)
 - [javascript-ratel-client](https://github.com/marmot-z/js-ratel-client)
 
## Tutorial
 - [Ratel Analysis] (https://github.com/HelloGitHub-Team/Article/blob/master/contents/Java/landlords/content.md)
 - [Ratel Gameplay Video Tutorial] (https://www.bilibili.com/video/av97603585)

## Changelog
 - [Changelog](https://github.com/ainilili/ratel/blob/master/UPDATE.md)

## Plans
 - Support for advanced difficulty AI
 - Tournament mode support
 - Ranking system
 - Replay system

## More
 - [Serverlist.json](https://github.com/ainilili/ratel/blob/master/serverlist.json) is the current server list. If your server is deployed with the current latest version of the server and shared with everyone, you can submit it to us through PR!
 - If you want to contribute code, PRs are very welcome, we will merge excellent code.
 - If you found a bug, Issues are very welcome.
 - Welcome to extend clients in other languages.
 - Contact us by email at ``ainililia@163.com``.
