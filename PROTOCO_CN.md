[toc]
# Ratel-Client Development Documentation
## Introduction
### What is Ratel
[Ratel](https://github.com/ainilili/ratel) is a project that allows you to play Landlords (Dou Di Zhu) in the command line. You can use a compact jar package to play games in terminals with JVM environment, supporting both player vs player and player vs AI modes to enrich your leisure time!

Ratel is developed using Java language, with [Netty 4.x](https://github.com/netty/netty) network framework combined with [protobuf](https://github.com/protocolbuffers/protobuf) data protocol, supporting multiple clients playing simultaneously.

### Ratel-Client Extension
Ratel is designed with reactive architecture, communicating through event codes. For Ratel-Client, it supports cross-platform extension. In other words, any backend language can develop Ratel-Client!

Before developing Ratel-Client, you should know:
- Ratel Server-Client interaction network protocol is ``TCP/IP``.
- Ratel Server-Client interaction data protocol is [protobuf](https://github.com/protocolbuffers/protobuf).
- Ratel is event-driven, connecting various components in the Client.
- All text content in Ratel is displayed by the Client.

## Integration
### Architect Your Client
We can rewrite the Ratel client using any backend language. The default Ratel client is written in Java. If you want to rewrite it in other languages, here's a recommended architecture:
![](https://user-gold-cdn.xitu.io/2018/11/17/16720fa649dfaea0?w=898&h=500&f=png&s=33655)

This architecture is very friendly for event handling. You can design an abstract ``Event-Listener`` interface, then develop different implementations to handle response data for different ``CODE`` values. For example, a simple example - Poker display, here's the pseudo code for our processing flow:
```
1. Decode server response data -> 

decode(msg)

2. Decoded data ->

ClientData{
    String code;
    String data;
}

3. Find corresponding EventListener through code ->

showPokersEventListener = Map<code, EventListener>.get(code)

4. Process response data ->

showPokersEventListener.call(server, data){
    show(data);
    server.write(msg);
}
```
The above is just a simple ``Server-Client`` interaction flow. Sometimes there might be ``Client-Client`` scenarios, such as displaying client option panels. When we switch from layer A to layer B, then return from layer B to layer A, we need to handle ``Client-Client`` interactions.

Of course, most interactions focus on ``Server-Client``. On the other hand, clients mostly handle and display server response data, with little actual business interaction. For clients, as long as events are absolutely rich, the client flow will be absolutely flexible. Therefore, Ratel's client response events are several times more numerous than server response events, so the architectural requirement for clients is to have sufficient flexibility to support the following two business flows:
- Server-Client-Server
- Server-Client-Client-Server

Next, let's move to the next step!
### Define Data Entities
For data interaction between client and server, we need to design two classes to store encoded and decoded data. It's worth mentioning that client and server have the same data structure, both composed of three fields: ``CODE``, ``DATA``, and ``INFO``:
- CODE - Corresponding event
- DATA - Transmitted data
- INFO - Information (not used for now)

Our encoding/decoding method is ``Protobuf`` serialization. Please refer to the files [here](https://github.com/ainilili/ratel/tree/master/protoc-resource).

### Integration Protocol
After preparing for integration, you can start implementing client business through the following protocol documentation!

#### Client Events
##### Connection Success Event
 - ``CODE`` - CODE_CLIENT_CONNECT
 - ``TYPE`` - TEXT
 - ``DATA`` - Client assigned ID

##### Exit Room Event
 - ``CODE`` - CODE_CLIENT_EXIT
 - ``TYPE`` - JSON
 - ``DATA`` - As follows

Field Name | Meaning
---|---
roomId | Room ID
exitClientId | Exiting player ID
exitClientNickname | Exiting player nickname

Reference data:
```
{"roomId":14,"exitClientId":64330,"exitClientNickname":"nico"}
```

##### Client Kick Event
 - ``CODE`` - CODE_CLIENT_KICK
 - ``TYPE`` - Text
 - ``DATA`` - NULL

##### Set Nickname Event
 - ``CODE`` - CODE_CLIENT_NICKNAME_SET
 - ``TYPE`` - JSON
 - ``DATA`` - As follows

Field Name | Meaning
---|---
invalidLength | Valid length, this field is returned when setting nickname exceeds 10 bytes

Reference data:
```
{"invalidLength":10}
```

##### Landlord Election - Landlord Confirmed Event
 - ``CODE`` - CODE_GAME_LANDLORD_CONFIRM
 - ``TYPE`` - JSON
 - ``DATA`` - As follows

Field Name | Meaning
---|---
roomId | Room ID
roomOwner | Room owner nickname
roomClientCount | Room player count
landlordNickname | Landlord nickname
landlordId | Landlord ID
additionalPokers | Additional three cards

Reference data:
```
{"roomId":14,"roomOwner":"nico","roomClientCount":3,"landlordNickname":"robot_2","landlordId":-8,"additionalPokers":[{"level":"LEVEL_5","type":"DIAMOND"},{"level":"LEVEL_6","type":"CLUB"},{"level":"LEVEL_A","type":"DIAMOND"}]}
```

##### Landlord Election - No One Elected Event
 - ``CODE`` - CODE_GAME_LANDLORD_CYCLE
 - ``TYPE`` - TEXT
 - ``DATA`` - NULL

TIP: After this event triggers, a restart game event will be triggered continuously

##### Landlord Election - Landlord Election Decision Event
 - ``CODE`` - CODE_GAME_LANDLORD_ELECT
 - ``TYPE`` - JSON
 - ``DATA`` - As follows

Field Name | Meaning
---|---
roomId | Room ID
roomOwner | Room owner nickname
roomClientCount | Room player count
preClientNickname | Previous client nickname
nextClientNickname | Next client nickname
nextClientId | Next client ID

Reference data:
```
{"roomId":14,"roomOwner":"nico","roomClientCount":3,"preClientNickname":"nico1","nextClientNickname":"nico2","nextClientId":2}
```

##### Game Over Event
 - ``CODE`` - CODE_GAME_OVER
 - ``TYPE`` - JSON
 - ``DATA`` - As follows

Field Name | Meaning
---|---
winnerNickname | Winner nickname
winnerType | Winner type (Landlord? Peasant)

Reference data:
```
{"winnerNickname":"nico","winnerType":"LANDLORD?PEASANT"}
```












