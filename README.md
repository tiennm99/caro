# Ratel

[![GitHub forks](https://img.shields.io/github/forks/ainilili/ratel?style=flat-square)](https://github.com/ainilili/ratel/network)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/ainilili/ratel?style=flat-square)
![GitHub all releases](https://img.shields.io/github/downloads/ainilili/ratel/total?logo=spring&style=flat-square)
[![GitHub stars](https://img.shields.io/github/stars/ainilili/ratel?logo=java&style=flat-square)](https://github.com/ainilili/ratel/stargazers)
[![GitHub license](https://img.shields.io/github/license/ainilili/ratel?logo=apache&style=flat-square)](https://github.com/ainilili/ratel/blob/master/LICENSE)
![Build ratel(Java with Maven)](https://github.com/ainilili/ratel/workflows/Build%20ratel(Java%20with%20Maven)/badge.svg?branch=master)
![Docker Image Version (latest by date)](https://img.shields.io/docker/v/kebyn/ratel?label=Docker&logo=docker&style=flat-square)

# This project is no longer maintained, please try the [👉 new version](https://github.com/ratel-online/server), which supports joker mode, Texas Hold'em, adds timeout mechanism, and perfectly recreates Happy Landlords, [online experience](http://ratel.isnico.com/)

## Introduction
Command-line Landlords game based on Netty, born for procrastination and leisure~

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
Online trial: [Portal](http://ratel.isnico.com)

![demo](demo.gif)

### Card Playing Rules
All card types:
```
┌──┐──┐──┐──┐──┐──┐──┐──┐──┐──┐──┐──┐──┐──┐──┐
│3 |4 |5 |6 |7 |8 |9 |10|J |Q |K |A |2 |S |X |
│♦ |♦ |♦ |♦ |♦ |♦ |♦ |♦ |♦ |♦ |♦ |♦ |♦ |  |  |
└──┘──┘──┘──┘──┘──┘──┘──┘──┘──┘──┘──┘──┘──┘──┘
```
Examples:
 - King bomb: ``sx``
 - Straight: ``34567``
 - Three with one: ``3334``
 - Airplane: ``333444a2``
 - Single 10: ``0`` or ``t``
 - Single A: ``a`` or ``1``
 - Max straight: ``34567890jqka``
 - Don't want to play: ``pass`` or ``p``
 - Exit: ``exit`` or ``e``
 - [More](https://zh.wikipedia.org/zh-sg/%E9%AC%A5%E5%9C%B0%E4%B8%BB)

#### Protocol Support
 - TCP
 - Websocket

Websocket protocol address is ``ws://host:port/ratel``, Websocket port needs to be original port plus 1 (if tcp port is 1024, then ws port should be 1025)
## Procrastination Club
QQ Group ``948365095``, procrastination feels great for a moment, keep procrastinating always feels great!

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
 - Support for advanced difficulty robots

## More
 - [Serverlist.json](https://github.com/ainilili/ratel/blob/master/serverlist.json) is the current server list. If your server is deployed with the current latest version of the server and shared with everyone, you can submit it to us through PR!
 - If you want to contribute code, PRs are very welcome, we will merge excellent code.
 - If you found a bug, Issues are very welcome.
 - Welcome to extend clients in other languages.
 - Contact us by email at ``ainililia@163.com``.
