/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const miti99 = $root.miti99 = (() => {

    /**
     * Namespace miti99.
     * @exports miti99
     * @namespace
     */
    const miti99 = {};

    miti99.caro = (function() {

        /**
         * Namespace caro.
         * @memberof miti99
         * @namespace
         */
        const caro = {};

        caro.protocol = (function() {

            /**
             * Namespace protocol.
             * @memberof miti99.caro
             * @namespace
             */
            const protocol = {};

            protocol.Request = (function() {

                /**
                 * Properties of a Request.
                 * @memberof miti99.caro.protocol
                 * @interface IRequest
                 * @property {miti99.caro.protocol.IHeartbeatRequest|null} [heartbeat] Request heartbeat
                 * @property {miti99.caro.protocol.ISetNicknameRequest|null} [setNickname] Request setNickname
                 * @property {miti99.caro.protocol.ISetClientInfoRequest|null} [setClientInfo] Request setClientInfo
                 * @property {miti99.caro.protocol.ICreateRoomRequest|null} [createRoom] Request createRoom
                 * @property {miti99.caro.protocol.ICreatePveRoomRequest|null} [createPveRoom] Request createPveRoom
                 * @property {miti99.caro.protocol.IGetRoomsRequest|null} [getRooms] Request getRooms
                 * @property {miti99.caro.protocol.IJoinRoomRequest|null} [joinRoom] Request joinRoom
                 * @property {miti99.caro.protocol.IGameStartingRequest|null} [gameStarting] Request gameStarting
                 * @property {miti99.caro.protocol.IGameReadyRequest|null} [gameReady] Request gameReady
                 * @property {miti99.caro.protocol.IGameMoveRequest|null} [gameMove] Request gameMove
                 * @property {miti99.caro.protocol.IGameResetRequest|null} [gameReset] Request gameReset
                 * @property {miti99.caro.protocol.IWatchGameRequest|null} [watchGame] Request watchGame
                 * @property {miti99.caro.protocol.IWatchGameExitRequest|null} [watchGameExit] Request watchGameExit
                 * @property {miti99.caro.protocol.IClientExitRequest|null} [clientExit] Request clientExit
                 */

                /**
                 * Constructs a new Request.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a Request.
                 * @implements IRequest
                 * @constructor
                 * @param {miti99.caro.protocol.IRequest=} [properties] Properties to set
                 */
                function Request(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Request heartbeat.
                 * @member {miti99.caro.protocol.IHeartbeatRequest|null|undefined} heartbeat
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 */
                Request.prototype.heartbeat = null;

                /**
                 * Request setNickname.
                 * @member {miti99.caro.protocol.ISetNicknameRequest|null|undefined} setNickname
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 */
                Request.prototype.setNickname = null;

                /**
                 * Request setClientInfo.
                 * @member {miti99.caro.protocol.ISetClientInfoRequest|null|undefined} setClientInfo
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 */
                Request.prototype.setClientInfo = null;

                /**
                 * Request createRoom.
                 * @member {miti99.caro.protocol.ICreateRoomRequest|null|undefined} createRoom
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 */
                Request.prototype.createRoom = null;

                /**
                 * Request createPveRoom.
                 * @member {miti99.caro.protocol.ICreatePveRoomRequest|null|undefined} createPveRoom
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 */
                Request.prototype.createPveRoom = null;

                /**
                 * Request getRooms.
                 * @member {miti99.caro.protocol.IGetRoomsRequest|null|undefined} getRooms
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 */
                Request.prototype.getRooms = null;

                /**
                 * Request joinRoom.
                 * @member {miti99.caro.protocol.IJoinRoomRequest|null|undefined} joinRoom
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 */
                Request.prototype.joinRoom = null;

                /**
                 * Request gameStarting.
                 * @member {miti99.caro.protocol.IGameStartingRequest|null|undefined} gameStarting
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 */
                Request.prototype.gameStarting = null;

                /**
                 * Request gameReady.
                 * @member {miti99.caro.protocol.IGameReadyRequest|null|undefined} gameReady
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 */
                Request.prototype.gameReady = null;

                /**
                 * Request gameMove.
                 * @member {miti99.caro.protocol.IGameMoveRequest|null|undefined} gameMove
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 */
                Request.prototype.gameMove = null;

                /**
                 * Request gameReset.
                 * @member {miti99.caro.protocol.IGameResetRequest|null|undefined} gameReset
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 */
                Request.prototype.gameReset = null;

                /**
                 * Request watchGame.
                 * @member {miti99.caro.protocol.IWatchGameRequest|null|undefined} watchGame
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 */
                Request.prototype.watchGame = null;

                /**
                 * Request watchGameExit.
                 * @member {miti99.caro.protocol.IWatchGameExitRequest|null|undefined} watchGameExit
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 */
                Request.prototype.watchGameExit = null;

                /**
                 * Request clientExit.
                 * @member {miti99.caro.protocol.IClientExitRequest|null|undefined} clientExit
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 */
                Request.prototype.clientExit = null;

                // OneOf field names bound to virtual getters and setters
                let $oneOfFields;

                /**
                 * Request payload.
                 * @member {"heartbeat"|"setNickname"|"setClientInfo"|"createRoom"|"createPveRoom"|"getRooms"|"joinRoom"|"gameStarting"|"gameReady"|"gameMove"|"gameReset"|"watchGame"|"watchGameExit"|"clientExit"|undefined} payload
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 */
                Object.defineProperty(Request.prototype, "payload", {
                    get: $util.oneOfGetter($oneOfFields = ["heartbeat", "setNickname", "setClientInfo", "createRoom", "createPveRoom", "getRooms", "joinRoom", "gameStarting", "gameReady", "gameMove", "gameReset", "watchGame", "watchGameExit", "clientExit"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new Request instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.Request
                 * @static
                 * @param {miti99.caro.protocol.IRequest=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.Request} Request instance
                 */
                Request.create = function create(properties) {
                    return new Request(properties);
                };

                /**
                 * Encodes the specified Request message. Does not implicitly {@link miti99.caro.protocol.Request.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.Request
                 * @static
                 * @param {miti99.caro.protocol.IRequest} message Request message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Request.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.heartbeat != null && Object.hasOwnProperty.call(message, "heartbeat"))
                        $root.miti99.caro.protocol.HeartbeatRequest.encode(message.heartbeat, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.setNickname != null && Object.hasOwnProperty.call(message, "setNickname"))
                        $root.miti99.caro.protocol.SetNicknameRequest.encode(message.setNickname, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.setClientInfo != null && Object.hasOwnProperty.call(message, "setClientInfo"))
                        $root.miti99.caro.protocol.SetClientInfoRequest.encode(message.setClientInfo, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.createRoom != null && Object.hasOwnProperty.call(message, "createRoom"))
                        $root.miti99.caro.protocol.CreateRoomRequest.encode(message.createRoom, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.createPveRoom != null && Object.hasOwnProperty.call(message, "createPveRoom"))
                        $root.miti99.caro.protocol.CreatePveRoomRequest.encode(message.createPveRoom, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.getRooms != null && Object.hasOwnProperty.call(message, "getRooms"))
                        $root.miti99.caro.protocol.GetRoomsRequest.encode(message.getRooms, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    if (message.joinRoom != null && Object.hasOwnProperty.call(message, "joinRoom"))
                        $root.miti99.caro.protocol.JoinRoomRequest.encode(message.joinRoom, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                    if (message.gameStarting != null && Object.hasOwnProperty.call(message, "gameStarting"))
                        $root.miti99.caro.protocol.GameStartingRequest.encode(message.gameStarting, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                    if (message.gameReady != null && Object.hasOwnProperty.call(message, "gameReady"))
                        $root.miti99.caro.protocol.GameReadyRequest.encode(message.gameReady, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                    if (message.gameMove != null && Object.hasOwnProperty.call(message, "gameMove"))
                        $root.miti99.caro.protocol.GameMoveRequest.encode(message.gameMove, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                    if (message.gameReset != null && Object.hasOwnProperty.call(message, "gameReset"))
                        $root.miti99.caro.protocol.GameResetRequest.encode(message.gameReset, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                    if (message.watchGame != null && Object.hasOwnProperty.call(message, "watchGame"))
                        $root.miti99.caro.protocol.WatchGameRequest.encode(message.watchGame, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                    if (message.watchGameExit != null && Object.hasOwnProperty.call(message, "watchGameExit"))
                        $root.miti99.caro.protocol.WatchGameExitRequest.encode(message.watchGameExit, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                    if (message.clientExit != null && Object.hasOwnProperty.call(message, "clientExit"))
                        $root.miti99.caro.protocol.ClientExitRequest.encode(message.clientExit, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Request message, length delimited. Does not implicitly {@link miti99.caro.protocol.Request.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.Request
                 * @static
                 * @param {miti99.caro.protocol.IRequest} message Request message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Request.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Request message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.Request
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.Request} Request
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Request.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.Request();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.heartbeat = $root.miti99.caro.protocol.HeartbeatRequest.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.setNickname = $root.miti99.caro.protocol.SetNicknameRequest.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.setClientInfo = $root.miti99.caro.protocol.SetClientInfoRequest.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                message.createRoom = $root.miti99.caro.protocol.CreateRoomRequest.decode(reader, reader.uint32());
                                break;
                            }
                        case 5: {
                                message.createPveRoom = $root.miti99.caro.protocol.CreatePveRoomRequest.decode(reader, reader.uint32());
                                break;
                            }
                        case 6: {
                                message.getRooms = $root.miti99.caro.protocol.GetRoomsRequest.decode(reader, reader.uint32());
                                break;
                            }
                        case 7: {
                                message.joinRoom = $root.miti99.caro.protocol.JoinRoomRequest.decode(reader, reader.uint32());
                                break;
                            }
                        case 8: {
                                message.gameStarting = $root.miti99.caro.protocol.GameStartingRequest.decode(reader, reader.uint32());
                                break;
                            }
                        case 9: {
                                message.gameReady = $root.miti99.caro.protocol.GameReadyRequest.decode(reader, reader.uint32());
                                break;
                            }
                        case 10: {
                                message.gameMove = $root.miti99.caro.protocol.GameMoveRequest.decode(reader, reader.uint32());
                                break;
                            }
                        case 11: {
                                message.gameReset = $root.miti99.caro.protocol.GameResetRequest.decode(reader, reader.uint32());
                                break;
                            }
                        case 12: {
                                message.watchGame = $root.miti99.caro.protocol.WatchGameRequest.decode(reader, reader.uint32());
                                break;
                            }
                        case 13: {
                                message.watchGameExit = $root.miti99.caro.protocol.WatchGameExitRequest.decode(reader, reader.uint32());
                                break;
                            }
                        case 14: {
                                message.clientExit = $root.miti99.caro.protocol.ClientExitRequest.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Request message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.Request
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.Request} Request
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Request.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Request message.
                 * @function verify
                 * @memberof miti99.caro.protocol.Request
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Request.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    let properties = {};
                    if (message.heartbeat != null && message.hasOwnProperty("heartbeat")) {
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.HeartbeatRequest.verify(message.heartbeat);
                            if (error)
                                return "heartbeat." + error;
                        }
                    }
                    if (message.setNickname != null && message.hasOwnProperty("setNickname")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.SetNicknameRequest.verify(message.setNickname);
                            if (error)
                                return "setNickname." + error;
                        }
                    }
                    if (message.setClientInfo != null && message.hasOwnProperty("setClientInfo")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.SetClientInfoRequest.verify(message.setClientInfo);
                            if (error)
                                return "setClientInfo." + error;
                        }
                    }
                    if (message.createRoom != null && message.hasOwnProperty("createRoom")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.CreateRoomRequest.verify(message.createRoom);
                            if (error)
                                return "createRoom." + error;
                        }
                    }
                    if (message.createPveRoom != null && message.hasOwnProperty("createPveRoom")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.CreatePveRoomRequest.verify(message.createPveRoom);
                            if (error)
                                return "createPveRoom." + error;
                        }
                    }
                    if (message.getRooms != null && message.hasOwnProperty("getRooms")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.GetRoomsRequest.verify(message.getRooms);
                            if (error)
                                return "getRooms." + error;
                        }
                    }
                    if (message.joinRoom != null && message.hasOwnProperty("joinRoom")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.JoinRoomRequest.verify(message.joinRoom);
                            if (error)
                                return "joinRoom." + error;
                        }
                    }
                    if (message.gameStarting != null && message.hasOwnProperty("gameStarting")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.GameStartingRequest.verify(message.gameStarting);
                            if (error)
                                return "gameStarting." + error;
                        }
                    }
                    if (message.gameReady != null && message.hasOwnProperty("gameReady")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.GameReadyRequest.verify(message.gameReady);
                            if (error)
                                return "gameReady." + error;
                        }
                    }
                    if (message.gameMove != null && message.hasOwnProperty("gameMove")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.GameMoveRequest.verify(message.gameMove);
                            if (error)
                                return "gameMove." + error;
                        }
                    }
                    if (message.gameReset != null && message.hasOwnProperty("gameReset")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.GameResetRequest.verify(message.gameReset);
                            if (error)
                                return "gameReset." + error;
                        }
                    }
                    if (message.watchGame != null && message.hasOwnProperty("watchGame")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.WatchGameRequest.verify(message.watchGame);
                            if (error)
                                return "watchGame." + error;
                        }
                    }
                    if (message.watchGameExit != null && message.hasOwnProperty("watchGameExit")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.WatchGameExitRequest.verify(message.watchGameExit);
                            if (error)
                                return "watchGameExit." + error;
                        }
                    }
                    if (message.clientExit != null && message.hasOwnProperty("clientExit")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.ClientExitRequest.verify(message.clientExit);
                            if (error)
                                return "clientExit." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a Request message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.Request
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.Request} Request
                 */
                Request.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.Request)
                        return object;
                    let message = new $root.miti99.caro.protocol.Request();
                    if (object.heartbeat != null) {
                        if (typeof object.heartbeat !== "object")
                            throw TypeError(".miti99.caro.protocol.Request.heartbeat: object expected");
                        message.heartbeat = $root.miti99.caro.protocol.HeartbeatRequest.fromObject(object.heartbeat);
                    }
                    if (object.setNickname != null) {
                        if (typeof object.setNickname !== "object")
                            throw TypeError(".miti99.caro.protocol.Request.setNickname: object expected");
                        message.setNickname = $root.miti99.caro.protocol.SetNicknameRequest.fromObject(object.setNickname);
                    }
                    if (object.setClientInfo != null) {
                        if (typeof object.setClientInfo !== "object")
                            throw TypeError(".miti99.caro.protocol.Request.setClientInfo: object expected");
                        message.setClientInfo = $root.miti99.caro.protocol.SetClientInfoRequest.fromObject(object.setClientInfo);
                    }
                    if (object.createRoom != null) {
                        if (typeof object.createRoom !== "object")
                            throw TypeError(".miti99.caro.protocol.Request.createRoom: object expected");
                        message.createRoom = $root.miti99.caro.protocol.CreateRoomRequest.fromObject(object.createRoom);
                    }
                    if (object.createPveRoom != null) {
                        if (typeof object.createPveRoom !== "object")
                            throw TypeError(".miti99.caro.protocol.Request.createPveRoom: object expected");
                        message.createPveRoom = $root.miti99.caro.protocol.CreatePveRoomRequest.fromObject(object.createPveRoom);
                    }
                    if (object.getRooms != null) {
                        if (typeof object.getRooms !== "object")
                            throw TypeError(".miti99.caro.protocol.Request.getRooms: object expected");
                        message.getRooms = $root.miti99.caro.protocol.GetRoomsRequest.fromObject(object.getRooms);
                    }
                    if (object.joinRoom != null) {
                        if (typeof object.joinRoom !== "object")
                            throw TypeError(".miti99.caro.protocol.Request.joinRoom: object expected");
                        message.joinRoom = $root.miti99.caro.protocol.JoinRoomRequest.fromObject(object.joinRoom);
                    }
                    if (object.gameStarting != null) {
                        if (typeof object.gameStarting !== "object")
                            throw TypeError(".miti99.caro.protocol.Request.gameStarting: object expected");
                        message.gameStarting = $root.miti99.caro.protocol.GameStartingRequest.fromObject(object.gameStarting);
                    }
                    if (object.gameReady != null) {
                        if (typeof object.gameReady !== "object")
                            throw TypeError(".miti99.caro.protocol.Request.gameReady: object expected");
                        message.gameReady = $root.miti99.caro.protocol.GameReadyRequest.fromObject(object.gameReady);
                    }
                    if (object.gameMove != null) {
                        if (typeof object.gameMove !== "object")
                            throw TypeError(".miti99.caro.protocol.Request.gameMove: object expected");
                        message.gameMove = $root.miti99.caro.protocol.GameMoveRequest.fromObject(object.gameMove);
                    }
                    if (object.gameReset != null) {
                        if (typeof object.gameReset !== "object")
                            throw TypeError(".miti99.caro.protocol.Request.gameReset: object expected");
                        message.gameReset = $root.miti99.caro.protocol.GameResetRequest.fromObject(object.gameReset);
                    }
                    if (object.watchGame != null) {
                        if (typeof object.watchGame !== "object")
                            throw TypeError(".miti99.caro.protocol.Request.watchGame: object expected");
                        message.watchGame = $root.miti99.caro.protocol.WatchGameRequest.fromObject(object.watchGame);
                    }
                    if (object.watchGameExit != null) {
                        if (typeof object.watchGameExit !== "object")
                            throw TypeError(".miti99.caro.protocol.Request.watchGameExit: object expected");
                        message.watchGameExit = $root.miti99.caro.protocol.WatchGameExitRequest.fromObject(object.watchGameExit);
                    }
                    if (object.clientExit != null) {
                        if (typeof object.clientExit !== "object")
                            throw TypeError(".miti99.caro.protocol.Request.clientExit: object expected");
                        message.clientExit = $root.miti99.caro.protocol.ClientExitRequest.fromObject(object.clientExit);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Request message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.Request
                 * @static
                 * @param {miti99.caro.protocol.Request} message Request
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Request.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (message.heartbeat != null && message.hasOwnProperty("heartbeat")) {
                        object.heartbeat = $root.miti99.caro.protocol.HeartbeatRequest.toObject(message.heartbeat, options);
                        if (options.oneofs)
                            object.payload = "heartbeat";
                    }
                    if (message.setNickname != null && message.hasOwnProperty("setNickname")) {
                        object.setNickname = $root.miti99.caro.protocol.SetNicknameRequest.toObject(message.setNickname, options);
                        if (options.oneofs)
                            object.payload = "setNickname";
                    }
                    if (message.setClientInfo != null && message.hasOwnProperty("setClientInfo")) {
                        object.setClientInfo = $root.miti99.caro.protocol.SetClientInfoRequest.toObject(message.setClientInfo, options);
                        if (options.oneofs)
                            object.payload = "setClientInfo";
                    }
                    if (message.createRoom != null && message.hasOwnProperty("createRoom")) {
                        object.createRoom = $root.miti99.caro.protocol.CreateRoomRequest.toObject(message.createRoom, options);
                        if (options.oneofs)
                            object.payload = "createRoom";
                    }
                    if (message.createPveRoom != null && message.hasOwnProperty("createPveRoom")) {
                        object.createPveRoom = $root.miti99.caro.protocol.CreatePveRoomRequest.toObject(message.createPveRoom, options);
                        if (options.oneofs)
                            object.payload = "createPveRoom";
                    }
                    if (message.getRooms != null && message.hasOwnProperty("getRooms")) {
                        object.getRooms = $root.miti99.caro.protocol.GetRoomsRequest.toObject(message.getRooms, options);
                        if (options.oneofs)
                            object.payload = "getRooms";
                    }
                    if (message.joinRoom != null && message.hasOwnProperty("joinRoom")) {
                        object.joinRoom = $root.miti99.caro.protocol.JoinRoomRequest.toObject(message.joinRoom, options);
                        if (options.oneofs)
                            object.payload = "joinRoom";
                    }
                    if (message.gameStarting != null && message.hasOwnProperty("gameStarting")) {
                        object.gameStarting = $root.miti99.caro.protocol.GameStartingRequest.toObject(message.gameStarting, options);
                        if (options.oneofs)
                            object.payload = "gameStarting";
                    }
                    if (message.gameReady != null && message.hasOwnProperty("gameReady")) {
                        object.gameReady = $root.miti99.caro.protocol.GameReadyRequest.toObject(message.gameReady, options);
                        if (options.oneofs)
                            object.payload = "gameReady";
                    }
                    if (message.gameMove != null && message.hasOwnProperty("gameMove")) {
                        object.gameMove = $root.miti99.caro.protocol.GameMoveRequest.toObject(message.gameMove, options);
                        if (options.oneofs)
                            object.payload = "gameMove";
                    }
                    if (message.gameReset != null && message.hasOwnProperty("gameReset")) {
                        object.gameReset = $root.miti99.caro.protocol.GameResetRequest.toObject(message.gameReset, options);
                        if (options.oneofs)
                            object.payload = "gameReset";
                    }
                    if (message.watchGame != null && message.hasOwnProperty("watchGame")) {
                        object.watchGame = $root.miti99.caro.protocol.WatchGameRequest.toObject(message.watchGame, options);
                        if (options.oneofs)
                            object.payload = "watchGame";
                    }
                    if (message.watchGameExit != null && message.hasOwnProperty("watchGameExit")) {
                        object.watchGameExit = $root.miti99.caro.protocol.WatchGameExitRequest.toObject(message.watchGameExit, options);
                        if (options.oneofs)
                            object.payload = "watchGameExit";
                    }
                    if (message.clientExit != null && message.hasOwnProperty("clientExit")) {
                        object.clientExit = $root.miti99.caro.protocol.ClientExitRequest.toObject(message.clientExit, options);
                        if (options.oneofs)
                            object.payload = "clientExit";
                    }
                    return object;
                };

                /**
                 * Converts this Request to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.Request
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Request.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Request
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.Request
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.Request";
                };

                return Request;
            })();

            protocol.HeartbeatRequest = (function() {

                /**
                 * Properties of a HeartbeatRequest.
                 * @memberof miti99.caro.protocol
                 * @interface IHeartbeatRequest
                 */

                /**
                 * Constructs a new HeartbeatRequest.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a HeartbeatRequest.
                 * @implements IHeartbeatRequest
                 * @constructor
                 * @param {miti99.caro.protocol.IHeartbeatRequest=} [properties] Properties to set
                 */
                function HeartbeatRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new HeartbeatRequest instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.HeartbeatRequest
                 * @static
                 * @param {miti99.caro.protocol.IHeartbeatRequest=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.HeartbeatRequest} HeartbeatRequest instance
                 */
                HeartbeatRequest.create = function create(properties) {
                    return new HeartbeatRequest(properties);
                };

                /**
                 * Encodes the specified HeartbeatRequest message. Does not implicitly {@link miti99.caro.protocol.HeartbeatRequest.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.HeartbeatRequest
                 * @static
                 * @param {miti99.caro.protocol.IHeartbeatRequest} message HeartbeatRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HeartbeatRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified HeartbeatRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.HeartbeatRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.HeartbeatRequest
                 * @static
                 * @param {miti99.caro.protocol.IHeartbeatRequest} message HeartbeatRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HeartbeatRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a HeartbeatRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.HeartbeatRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.HeartbeatRequest} HeartbeatRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HeartbeatRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.HeartbeatRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a HeartbeatRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.HeartbeatRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.HeartbeatRequest} HeartbeatRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HeartbeatRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a HeartbeatRequest message.
                 * @function verify
                 * @memberof miti99.caro.protocol.HeartbeatRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                HeartbeatRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a HeartbeatRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.HeartbeatRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.HeartbeatRequest} HeartbeatRequest
                 */
                HeartbeatRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.HeartbeatRequest)
                        return object;
                    return new $root.miti99.caro.protocol.HeartbeatRequest();
                };

                /**
                 * Creates a plain object from a HeartbeatRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.HeartbeatRequest
                 * @static
                 * @param {miti99.caro.protocol.HeartbeatRequest} message HeartbeatRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                HeartbeatRequest.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this HeartbeatRequest to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.HeartbeatRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                HeartbeatRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for HeartbeatRequest
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.HeartbeatRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                HeartbeatRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.HeartbeatRequest";
                };

                return HeartbeatRequest;
            })();

            protocol.SetNicknameRequest = (function() {

                /**
                 * Properties of a SetNicknameRequest.
                 * @memberof miti99.caro.protocol
                 * @interface ISetNicknameRequest
                 * @property {string|null} [nickname] SetNicknameRequest nickname
                 */

                /**
                 * Constructs a new SetNicknameRequest.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a SetNicknameRequest.
                 * @implements ISetNicknameRequest
                 * @constructor
                 * @param {miti99.caro.protocol.ISetNicknameRequest=} [properties] Properties to set
                 */
                function SetNicknameRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * SetNicknameRequest nickname.
                 * @member {string} nickname
                 * @memberof miti99.caro.protocol.SetNicknameRequest
                 * @instance
                 */
                SetNicknameRequest.prototype.nickname = "";

                /**
                 * Creates a new SetNicknameRequest instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.SetNicknameRequest
                 * @static
                 * @param {miti99.caro.protocol.ISetNicknameRequest=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.SetNicknameRequest} SetNicknameRequest instance
                 */
                SetNicknameRequest.create = function create(properties) {
                    return new SetNicknameRequest(properties);
                };

                /**
                 * Encodes the specified SetNicknameRequest message. Does not implicitly {@link miti99.caro.protocol.SetNicknameRequest.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.SetNicknameRequest
                 * @static
                 * @param {miti99.caro.protocol.ISetNicknameRequest} message SetNicknameRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetNicknameRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.nickname);
                    return writer;
                };

                /**
                 * Encodes the specified SetNicknameRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.SetNicknameRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.SetNicknameRequest
                 * @static
                 * @param {miti99.caro.protocol.ISetNicknameRequest} message SetNicknameRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetNicknameRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a SetNicknameRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.SetNicknameRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.SetNicknameRequest} SetNicknameRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetNicknameRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.SetNicknameRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.nickname = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a SetNicknameRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.SetNicknameRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.SetNicknameRequest} SetNicknameRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetNicknameRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SetNicknameRequest message.
                 * @function verify
                 * @memberof miti99.caro.protocol.SetNicknameRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SetNicknameRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.nickname != null && message.hasOwnProperty("nickname"))
                        if (!$util.isString(message.nickname))
                            return "nickname: string expected";
                    return null;
                };

                /**
                 * Creates a SetNicknameRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.SetNicknameRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.SetNicknameRequest} SetNicknameRequest
                 */
                SetNicknameRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.SetNicknameRequest)
                        return object;
                    let message = new $root.miti99.caro.protocol.SetNicknameRequest();
                    if (object.nickname != null)
                        message.nickname = String(object.nickname);
                    return message;
                };

                /**
                 * Creates a plain object from a SetNicknameRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.SetNicknameRequest
                 * @static
                 * @param {miti99.caro.protocol.SetNicknameRequest} message SetNicknameRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SetNicknameRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.nickname = "";
                    if (message.nickname != null && message.hasOwnProperty("nickname"))
                        object.nickname = message.nickname;
                    return object;
                };

                /**
                 * Converts this SetNicknameRequest to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.SetNicknameRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SetNicknameRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for SetNicknameRequest
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.SetNicknameRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                SetNicknameRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.SetNicknameRequest";
                };

                return SetNicknameRequest;
            })();

            protocol.SetClientInfoRequest = (function() {

                /**
                 * Properties of a SetClientInfoRequest.
                 * @memberof miti99.caro.protocol
                 * @interface ISetClientInfoRequest
                 * @property {string|null} [version] SetClientInfoRequest version
                 */

                /**
                 * Constructs a new SetClientInfoRequest.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a SetClientInfoRequest.
                 * @implements ISetClientInfoRequest
                 * @constructor
                 * @param {miti99.caro.protocol.ISetClientInfoRequest=} [properties] Properties to set
                 */
                function SetClientInfoRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * SetClientInfoRequest version.
                 * @member {string} version
                 * @memberof miti99.caro.protocol.SetClientInfoRequest
                 * @instance
                 */
                SetClientInfoRequest.prototype.version = "";

                /**
                 * Creates a new SetClientInfoRequest instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.SetClientInfoRequest
                 * @static
                 * @param {miti99.caro.protocol.ISetClientInfoRequest=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.SetClientInfoRequest} SetClientInfoRequest instance
                 */
                SetClientInfoRequest.create = function create(properties) {
                    return new SetClientInfoRequest(properties);
                };

                /**
                 * Encodes the specified SetClientInfoRequest message. Does not implicitly {@link miti99.caro.protocol.SetClientInfoRequest.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.SetClientInfoRequest
                 * @static
                 * @param {miti99.caro.protocol.ISetClientInfoRequest} message SetClientInfoRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetClientInfoRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
                    return writer;
                };

                /**
                 * Encodes the specified SetClientInfoRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.SetClientInfoRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.SetClientInfoRequest
                 * @static
                 * @param {miti99.caro.protocol.ISetClientInfoRequest} message SetClientInfoRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetClientInfoRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a SetClientInfoRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.SetClientInfoRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.SetClientInfoRequest} SetClientInfoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetClientInfoRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.SetClientInfoRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.version = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a SetClientInfoRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.SetClientInfoRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.SetClientInfoRequest} SetClientInfoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetClientInfoRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SetClientInfoRequest message.
                 * @function verify
                 * @memberof miti99.caro.protocol.SetClientInfoRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SetClientInfoRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.version != null && message.hasOwnProperty("version"))
                        if (!$util.isString(message.version))
                            return "version: string expected";
                    return null;
                };

                /**
                 * Creates a SetClientInfoRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.SetClientInfoRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.SetClientInfoRequest} SetClientInfoRequest
                 */
                SetClientInfoRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.SetClientInfoRequest)
                        return object;
                    let message = new $root.miti99.caro.protocol.SetClientInfoRequest();
                    if (object.version != null)
                        message.version = String(object.version);
                    return message;
                };

                /**
                 * Creates a plain object from a SetClientInfoRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.SetClientInfoRequest
                 * @static
                 * @param {miti99.caro.protocol.SetClientInfoRequest} message SetClientInfoRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SetClientInfoRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.version = "";
                    if (message.version != null && message.hasOwnProperty("version"))
                        object.version = message.version;
                    return object;
                };

                /**
                 * Converts this SetClientInfoRequest to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.SetClientInfoRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SetClientInfoRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for SetClientInfoRequest
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.SetClientInfoRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                SetClientInfoRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.SetClientInfoRequest";
                };

                return SetClientInfoRequest;
            })();

            protocol.CreateRoomRequest = (function() {

                /**
                 * Properties of a CreateRoomRequest.
                 * @memberof miti99.caro.protocol
                 * @interface ICreateRoomRequest
                 */

                /**
                 * Constructs a new CreateRoomRequest.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a CreateRoomRequest.
                 * @implements ICreateRoomRequest
                 * @constructor
                 * @param {miti99.caro.protocol.ICreateRoomRequest=} [properties] Properties to set
                 */
                function CreateRoomRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new CreateRoomRequest instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.CreateRoomRequest
                 * @static
                 * @param {miti99.caro.protocol.ICreateRoomRequest=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.CreateRoomRequest} CreateRoomRequest instance
                 */
                CreateRoomRequest.create = function create(properties) {
                    return new CreateRoomRequest(properties);
                };

                /**
                 * Encodes the specified CreateRoomRequest message. Does not implicitly {@link miti99.caro.protocol.CreateRoomRequest.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.CreateRoomRequest
                 * @static
                 * @param {miti99.caro.protocol.ICreateRoomRequest} message CreateRoomRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CreateRoomRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified CreateRoomRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.CreateRoomRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.CreateRoomRequest
                 * @static
                 * @param {miti99.caro.protocol.ICreateRoomRequest} message CreateRoomRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CreateRoomRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CreateRoomRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.CreateRoomRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.CreateRoomRequest} CreateRoomRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CreateRoomRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.CreateRoomRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a CreateRoomRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.CreateRoomRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.CreateRoomRequest} CreateRoomRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CreateRoomRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CreateRoomRequest message.
                 * @function verify
                 * @memberof miti99.caro.protocol.CreateRoomRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CreateRoomRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a CreateRoomRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.CreateRoomRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.CreateRoomRequest} CreateRoomRequest
                 */
                CreateRoomRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.CreateRoomRequest)
                        return object;
                    return new $root.miti99.caro.protocol.CreateRoomRequest();
                };

                /**
                 * Creates a plain object from a CreateRoomRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.CreateRoomRequest
                 * @static
                 * @param {miti99.caro.protocol.CreateRoomRequest} message CreateRoomRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CreateRoomRequest.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this CreateRoomRequest to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.CreateRoomRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CreateRoomRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for CreateRoomRequest
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.CreateRoomRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                CreateRoomRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.CreateRoomRequest";
                };

                return CreateRoomRequest;
            })();

            protocol.CreatePveRoomRequest = (function() {

                /**
                 * Properties of a CreatePveRoomRequest.
                 * @memberof miti99.caro.protocol
                 * @interface ICreatePveRoomRequest
                 * @property {number|null} [difficulty] CreatePveRoomRequest difficulty
                 */

                /**
                 * Constructs a new CreatePveRoomRequest.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a CreatePveRoomRequest.
                 * @implements ICreatePveRoomRequest
                 * @constructor
                 * @param {miti99.caro.protocol.ICreatePveRoomRequest=} [properties] Properties to set
                 */
                function CreatePveRoomRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * CreatePveRoomRequest difficulty.
                 * @member {number} difficulty
                 * @memberof miti99.caro.protocol.CreatePveRoomRequest
                 * @instance
                 */
                CreatePveRoomRequest.prototype.difficulty = 0;

                /**
                 * Creates a new CreatePveRoomRequest instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.CreatePveRoomRequest
                 * @static
                 * @param {miti99.caro.protocol.ICreatePveRoomRequest=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.CreatePveRoomRequest} CreatePveRoomRequest instance
                 */
                CreatePveRoomRequest.create = function create(properties) {
                    return new CreatePveRoomRequest(properties);
                };

                /**
                 * Encodes the specified CreatePveRoomRequest message. Does not implicitly {@link miti99.caro.protocol.CreatePveRoomRequest.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.CreatePveRoomRequest
                 * @static
                 * @param {miti99.caro.protocol.ICreatePveRoomRequest} message CreatePveRoomRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CreatePveRoomRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.difficulty != null && Object.hasOwnProperty.call(message, "difficulty"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.difficulty);
                    return writer;
                };

                /**
                 * Encodes the specified CreatePveRoomRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.CreatePveRoomRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.CreatePveRoomRequest
                 * @static
                 * @param {miti99.caro.protocol.ICreatePveRoomRequest} message CreatePveRoomRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CreatePveRoomRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a CreatePveRoomRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.CreatePveRoomRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.CreatePveRoomRequest} CreatePveRoomRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CreatePveRoomRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.CreatePveRoomRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.difficulty = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a CreatePveRoomRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.CreatePveRoomRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.CreatePveRoomRequest} CreatePveRoomRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CreatePveRoomRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CreatePveRoomRequest message.
                 * @function verify
                 * @memberof miti99.caro.protocol.CreatePveRoomRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CreatePveRoomRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.difficulty != null && message.hasOwnProperty("difficulty"))
                        if (!$util.isInteger(message.difficulty))
                            return "difficulty: integer expected";
                    return null;
                };

                /**
                 * Creates a CreatePveRoomRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.CreatePveRoomRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.CreatePveRoomRequest} CreatePveRoomRequest
                 */
                CreatePveRoomRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.CreatePveRoomRequest)
                        return object;
                    let message = new $root.miti99.caro.protocol.CreatePveRoomRequest();
                    if (object.difficulty != null)
                        message.difficulty = object.difficulty | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a CreatePveRoomRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.CreatePveRoomRequest
                 * @static
                 * @param {miti99.caro.protocol.CreatePveRoomRequest} message CreatePveRoomRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CreatePveRoomRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.difficulty = 0;
                    if (message.difficulty != null && message.hasOwnProperty("difficulty"))
                        object.difficulty = message.difficulty;
                    return object;
                };

                /**
                 * Converts this CreatePveRoomRequest to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.CreatePveRoomRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CreatePveRoomRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for CreatePveRoomRequest
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.CreatePveRoomRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                CreatePveRoomRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.CreatePveRoomRequest";
                };

                return CreatePveRoomRequest;
            })();

            protocol.GetRoomsRequest = (function() {

                /**
                 * Properties of a GetRoomsRequest.
                 * @memberof miti99.caro.protocol
                 * @interface IGetRoomsRequest
                 */

                /**
                 * Constructs a new GetRoomsRequest.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a GetRoomsRequest.
                 * @implements IGetRoomsRequest
                 * @constructor
                 * @param {miti99.caro.protocol.IGetRoomsRequest=} [properties] Properties to set
                 */
                function GetRoomsRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new GetRoomsRequest instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.GetRoomsRequest
                 * @static
                 * @param {miti99.caro.protocol.IGetRoomsRequest=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.GetRoomsRequest} GetRoomsRequest instance
                 */
                GetRoomsRequest.create = function create(properties) {
                    return new GetRoomsRequest(properties);
                };

                /**
                 * Encodes the specified GetRoomsRequest message. Does not implicitly {@link miti99.caro.protocol.GetRoomsRequest.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.GetRoomsRequest
                 * @static
                 * @param {miti99.caro.protocol.IGetRoomsRequest} message GetRoomsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetRoomsRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified GetRoomsRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.GetRoomsRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.GetRoomsRequest
                 * @static
                 * @param {miti99.caro.protocol.IGetRoomsRequest} message GetRoomsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetRoomsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetRoomsRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.GetRoomsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.GetRoomsRequest} GetRoomsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetRoomsRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.GetRoomsRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetRoomsRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.GetRoomsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.GetRoomsRequest} GetRoomsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetRoomsRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetRoomsRequest message.
                 * @function verify
                 * @memberof miti99.caro.protocol.GetRoomsRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetRoomsRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a GetRoomsRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.GetRoomsRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.GetRoomsRequest} GetRoomsRequest
                 */
                GetRoomsRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.GetRoomsRequest)
                        return object;
                    return new $root.miti99.caro.protocol.GetRoomsRequest();
                };

                /**
                 * Creates a plain object from a GetRoomsRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.GetRoomsRequest
                 * @static
                 * @param {miti99.caro.protocol.GetRoomsRequest} message GetRoomsRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetRoomsRequest.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this GetRoomsRequest to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.GetRoomsRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetRoomsRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetRoomsRequest
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.GetRoomsRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetRoomsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.GetRoomsRequest";
                };

                return GetRoomsRequest;
            })();

            protocol.JoinRoomRequest = (function() {

                /**
                 * Properties of a JoinRoomRequest.
                 * @memberof miti99.caro.protocol
                 * @interface IJoinRoomRequest
                 * @property {number|null} [roomId] JoinRoomRequest roomId
                 */

                /**
                 * Constructs a new JoinRoomRequest.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a JoinRoomRequest.
                 * @implements IJoinRoomRequest
                 * @constructor
                 * @param {miti99.caro.protocol.IJoinRoomRequest=} [properties] Properties to set
                 */
                function JoinRoomRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * JoinRoomRequest roomId.
                 * @member {number} roomId
                 * @memberof miti99.caro.protocol.JoinRoomRequest
                 * @instance
                 */
                JoinRoomRequest.prototype.roomId = 0;

                /**
                 * Creates a new JoinRoomRequest instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.JoinRoomRequest
                 * @static
                 * @param {miti99.caro.protocol.IJoinRoomRequest=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.JoinRoomRequest} JoinRoomRequest instance
                 */
                JoinRoomRequest.create = function create(properties) {
                    return new JoinRoomRequest(properties);
                };

                /**
                 * Encodes the specified JoinRoomRequest message. Does not implicitly {@link miti99.caro.protocol.JoinRoomRequest.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.JoinRoomRequest
                 * @static
                 * @param {miti99.caro.protocol.IJoinRoomRequest} message JoinRoomRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                JoinRoomRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roomId);
                    return writer;
                };

                /**
                 * Encodes the specified JoinRoomRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.JoinRoomRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.JoinRoomRequest
                 * @static
                 * @param {miti99.caro.protocol.IJoinRoomRequest} message JoinRoomRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                JoinRoomRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a JoinRoomRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.JoinRoomRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.JoinRoomRequest} JoinRoomRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                JoinRoomRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.JoinRoomRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.roomId = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a JoinRoomRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.JoinRoomRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.JoinRoomRequest} JoinRoomRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                JoinRoomRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a JoinRoomRequest message.
                 * @function verify
                 * @memberof miti99.caro.protocol.JoinRoomRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                JoinRoomRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        if (!$util.isInteger(message.roomId))
                            return "roomId: integer expected";
                    return null;
                };

                /**
                 * Creates a JoinRoomRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.JoinRoomRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.JoinRoomRequest} JoinRoomRequest
                 */
                JoinRoomRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.JoinRoomRequest)
                        return object;
                    let message = new $root.miti99.caro.protocol.JoinRoomRequest();
                    if (object.roomId != null)
                        message.roomId = object.roomId | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a JoinRoomRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.JoinRoomRequest
                 * @static
                 * @param {miti99.caro.protocol.JoinRoomRequest} message JoinRoomRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                JoinRoomRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.roomId = 0;
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        object.roomId = message.roomId;
                    return object;
                };

                /**
                 * Converts this JoinRoomRequest to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.JoinRoomRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                JoinRoomRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for JoinRoomRequest
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.JoinRoomRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                JoinRoomRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.JoinRoomRequest";
                };

                return JoinRoomRequest;
            })();

            protocol.GameStartingRequest = (function() {

                /**
                 * Properties of a GameStartingRequest.
                 * @memberof miti99.caro.protocol
                 * @interface IGameStartingRequest
                 */

                /**
                 * Constructs a new GameStartingRequest.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a GameStartingRequest.
                 * @implements IGameStartingRequest
                 * @constructor
                 * @param {miti99.caro.protocol.IGameStartingRequest=} [properties] Properties to set
                 */
                function GameStartingRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new GameStartingRequest instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.GameStartingRequest
                 * @static
                 * @param {miti99.caro.protocol.IGameStartingRequest=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.GameStartingRequest} GameStartingRequest instance
                 */
                GameStartingRequest.create = function create(properties) {
                    return new GameStartingRequest(properties);
                };

                /**
                 * Encodes the specified GameStartingRequest message. Does not implicitly {@link miti99.caro.protocol.GameStartingRequest.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.GameStartingRequest
                 * @static
                 * @param {miti99.caro.protocol.IGameStartingRequest} message GameStartingRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameStartingRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified GameStartingRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameStartingRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.GameStartingRequest
                 * @static
                 * @param {miti99.caro.protocol.IGameStartingRequest} message GameStartingRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameStartingRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GameStartingRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.GameStartingRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.GameStartingRequest} GameStartingRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameStartingRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.GameStartingRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GameStartingRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.GameStartingRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.GameStartingRequest} GameStartingRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameStartingRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GameStartingRequest message.
                 * @function verify
                 * @memberof miti99.caro.protocol.GameStartingRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GameStartingRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a GameStartingRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.GameStartingRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.GameStartingRequest} GameStartingRequest
                 */
                GameStartingRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.GameStartingRequest)
                        return object;
                    return new $root.miti99.caro.protocol.GameStartingRequest();
                };

                /**
                 * Creates a plain object from a GameStartingRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.GameStartingRequest
                 * @static
                 * @param {miti99.caro.protocol.GameStartingRequest} message GameStartingRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GameStartingRequest.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this GameStartingRequest to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.GameStartingRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GameStartingRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GameStartingRequest
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.GameStartingRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GameStartingRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.GameStartingRequest";
                };

                return GameStartingRequest;
            })();

            protocol.GameReadyRequest = (function() {

                /**
                 * Properties of a GameReadyRequest.
                 * @memberof miti99.caro.protocol
                 * @interface IGameReadyRequest
                 */

                /**
                 * Constructs a new GameReadyRequest.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a GameReadyRequest.
                 * @implements IGameReadyRequest
                 * @constructor
                 * @param {miti99.caro.protocol.IGameReadyRequest=} [properties] Properties to set
                 */
                function GameReadyRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new GameReadyRequest instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.GameReadyRequest
                 * @static
                 * @param {miti99.caro.protocol.IGameReadyRequest=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.GameReadyRequest} GameReadyRequest instance
                 */
                GameReadyRequest.create = function create(properties) {
                    return new GameReadyRequest(properties);
                };

                /**
                 * Encodes the specified GameReadyRequest message. Does not implicitly {@link miti99.caro.protocol.GameReadyRequest.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.GameReadyRequest
                 * @static
                 * @param {miti99.caro.protocol.IGameReadyRequest} message GameReadyRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameReadyRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified GameReadyRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameReadyRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.GameReadyRequest
                 * @static
                 * @param {miti99.caro.protocol.IGameReadyRequest} message GameReadyRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameReadyRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GameReadyRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.GameReadyRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.GameReadyRequest} GameReadyRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameReadyRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.GameReadyRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GameReadyRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.GameReadyRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.GameReadyRequest} GameReadyRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameReadyRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GameReadyRequest message.
                 * @function verify
                 * @memberof miti99.caro.protocol.GameReadyRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GameReadyRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a GameReadyRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.GameReadyRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.GameReadyRequest} GameReadyRequest
                 */
                GameReadyRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.GameReadyRequest)
                        return object;
                    return new $root.miti99.caro.protocol.GameReadyRequest();
                };

                /**
                 * Creates a plain object from a GameReadyRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.GameReadyRequest
                 * @static
                 * @param {miti99.caro.protocol.GameReadyRequest} message GameReadyRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GameReadyRequest.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this GameReadyRequest to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.GameReadyRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GameReadyRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GameReadyRequest
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.GameReadyRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GameReadyRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.GameReadyRequest";
                };

                return GameReadyRequest;
            })();

            protocol.GameMoveRequest = (function() {

                /**
                 * Properties of a GameMoveRequest.
                 * @memberof miti99.caro.protocol
                 * @interface IGameMoveRequest
                 * @property {number|null} [row] GameMoveRequest row
                 * @property {number|null} [col] GameMoveRequest col
                 */

                /**
                 * Constructs a new GameMoveRequest.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a GameMoveRequest.
                 * @implements IGameMoveRequest
                 * @constructor
                 * @param {miti99.caro.protocol.IGameMoveRequest=} [properties] Properties to set
                 */
                function GameMoveRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GameMoveRequest row.
                 * @member {number} row
                 * @memberof miti99.caro.protocol.GameMoveRequest
                 * @instance
                 */
                GameMoveRequest.prototype.row = 0;

                /**
                 * GameMoveRequest col.
                 * @member {number} col
                 * @memberof miti99.caro.protocol.GameMoveRequest
                 * @instance
                 */
                GameMoveRequest.prototype.col = 0;

                /**
                 * Creates a new GameMoveRequest instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.GameMoveRequest
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveRequest=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.GameMoveRequest} GameMoveRequest instance
                 */
                GameMoveRequest.create = function create(properties) {
                    return new GameMoveRequest(properties);
                };

                /**
                 * Encodes the specified GameMoveRequest message. Does not implicitly {@link miti99.caro.protocol.GameMoveRequest.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.GameMoveRequest
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveRequest} message GameMoveRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameMoveRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.row != null && Object.hasOwnProperty.call(message, "row"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.row);
                    if (message.col != null && Object.hasOwnProperty.call(message, "col"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.col);
                    return writer;
                };

                /**
                 * Encodes the specified GameMoveRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameMoveRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.GameMoveRequest
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveRequest} message GameMoveRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameMoveRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GameMoveRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.GameMoveRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.GameMoveRequest} GameMoveRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameMoveRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.GameMoveRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.row = reader.int32();
                                break;
                            }
                        case 2: {
                                message.col = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GameMoveRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.GameMoveRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.GameMoveRequest} GameMoveRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameMoveRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GameMoveRequest message.
                 * @function verify
                 * @memberof miti99.caro.protocol.GameMoveRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GameMoveRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.row != null && message.hasOwnProperty("row"))
                        if (!$util.isInteger(message.row))
                            return "row: integer expected";
                    if (message.col != null && message.hasOwnProperty("col"))
                        if (!$util.isInteger(message.col))
                            return "col: integer expected";
                    return null;
                };

                /**
                 * Creates a GameMoveRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.GameMoveRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.GameMoveRequest} GameMoveRequest
                 */
                GameMoveRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.GameMoveRequest)
                        return object;
                    let message = new $root.miti99.caro.protocol.GameMoveRequest();
                    if (object.row != null)
                        message.row = object.row | 0;
                    if (object.col != null)
                        message.col = object.col | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a GameMoveRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.GameMoveRequest
                 * @static
                 * @param {miti99.caro.protocol.GameMoveRequest} message GameMoveRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GameMoveRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.row = 0;
                        object.col = 0;
                    }
                    if (message.row != null && message.hasOwnProperty("row"))
                        object.row = message.row;
                    if (message.col != null && message.hasOwnProperty("col"))
                        object.col = message.col;
                    return object;
                };

                /**
                 * Converts this GameMoveRequest to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.GameMoveRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GameMoveRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GameMoveRequest
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.GameMoveRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GameMoveRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.GameMoveRequest";
                };

                return GameMoveRequest;
            })();

            protocol.GameResetRequest = (function() {

                /**
                 * Properties of a GameResetRequest.
                 * @memberof miti99.caro.protocol
                 * @interface IGameResetRequest
                 */

                /**
                 * Constructs a new GameResetRequest.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a GameResetRequest.
                 * @implements IGameResetRequest
                 * @constructor
                 * @param {miti99.caro.protocol.IGameResetRequest=} [properties] Properties to set
                 */
                function GameResetRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new GameResetRequest instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.GameResetRequest
                 * @static
                 * @param {miti99.caro.protocol.IGameResetRequest=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.GameResetRequest} GameResetRequest instance
                 */
                GameResetRequest.create = function create(properties) {
                    return new GameResetRequest(properties);
                };

                /**
                 * Encodes the specified GameResetRequest message. Does not implicitly {@link miti99.caro.protocol.GameResetRequest.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.GameResetRequest
                 * @static
                 * @param {miti99.caro.protocol.IGameResetRequest} message GameResetRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameResetRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified GameResetRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameResetRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.GameResetRequest
                 * @static
                 * @param {miti99.caro.protocol.IGameResetRequest} message GameResetRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameResetRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GameResetRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.GameResetRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.GameResetRequest} GameResetRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameResetRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.GameResetRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GameResetRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.GameResetRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.GameResetRequest} GameResetRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameResetRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GameResetRequest message.
                 * @function verify
                 * @memberof miti99.caro.protocol.GameResetRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GameResetRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a GameResetRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.GameResetRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.GameResetRequest} GameResetRequest
                 */
                GameResetRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.GameResetRequest)
                        return object;
                    return new $root.miti99.caro.protocol.GameResetRequest();
                };

                /**
                 * Creates a plain object from a GameResetRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.GameResetRequest
                 * @static
                 * @param {miti99.caro.protocol.GameResetRequest} message GameResetRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GameResetRequest.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this GameResetRequest to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.GameResetRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GameResetRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GameResetRequest
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.GameResetRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GameResetRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.GameResetRequest";
                };

                return GameResetRequest;
            })();

            protocol.WatchGameRequest = (function() {

                /**
                 * Properties of a WatchGameRequest.
                 * @memberof miti99.caro.protocol
                 * @interface IWatchGameRequest
                 * @property {number|null} [roomId] WatchGameRequest roomId
                 */

                /**
                 * Constructs a new WatchGameRequest.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a WatchGameRequest.
                 * @implements IWatchGameRequest
                 * @constructor
                 * @param {miti99.caro.protocol.IWatchGameRequest=} [properties] Properties to set
                 */
                function WatchGameRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * WatchGameRequest roomId.
                 * @member {number} roomId
                 * @memberof miti99.caro.protocol.WatchGameRequest
                 * @instance
                 */
                WatchGameRequest.prototype.roomId = 0;

                /**
                 * Creates a new WatchGameRequest instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.WatchGameRequest
                 * @static
                 * @param {miti99.caro.protocol.IWatchGameRequest=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.WatchGameRequest} WatchGameRequest instance
                 */
                WatchGameRequest.create = function create(properties) {
                    return new WatchGameRequest(properties);
                };

                /**
                 * Encodes the specified WatchGameRequest message. Does not implicitly {@link miti99.caro.protocol.WatchGameRequest.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.WatchGameRequest
                 * @static
                 * @param {miti99.caro.protocol.IWatchGameRequest} message WatchGameRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                WatchGameRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roomId);
                    return writer;
                };

                /**
                 * Encodes the specified WatchGameRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.WatchGameRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.WatchGameRequest
                 * @static
                 * @param {miti99.caro.protocol.IWatchGameRequest} message WatchGameRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                WatchGameRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a WatchGameRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.WatchGameRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.WatchGameRequest} WatchGameRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                WatchGameRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.WatchGameRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.roomId = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a WatchGameRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.WatchGameRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.WatchGameRequest} WatchGameRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                WatchGameRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a WatchGameRequest message.
                 * @function verify
                 * @memberof miti99.caro.protocol.WatchGameRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                WatchGameRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        if (!$util.isInteger(message.roomId))
                            return "roomId: integer expected";
                    return null;
                };

                /**
                 * Creates a WatchGameRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.WatchGameRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.WatchGameRequest} WatchGameRequest
                 */
                WatchGameRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.WatchGameRequest)
                        return object;
                    let message = new $root.miti99.caro.protocol.WatchGameRequest();
                    if (object.roomId != null)
                        message.roomId = object.roomId | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a WatchGameRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.WatchGameRequest
                 * @static
                 * @param {miti99.caro.protocol.WatchGameRequest} message WatchGameRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                WatchGameRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.roomId = 0;
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        object.roomId = message.roomId;
                    return object;
                };

                /**
                 * Converts this WatchGameRequest to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.WatchGameRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                WatchGameRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for WatchGameRequest
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.WatchGameRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                WatchGameRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.WatchGameRequest";
                };

                return WatchGameRequest;
            })();

            protocol.WatchGameExitRequest = (function() {

                /**
                 * Properties of a WatchGameExitRequest.
                 * @memberof miti99.caro.protocol
                 * @interface IWatchGameExitRequest
                 */

                /**
                 * Constructs a new WatchGameExitRequest.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a WatchGameExitRequest.
                 * @implements IWatchGameExitRequest
                 * @constructor
                 * @param {miti99.caro.protocol.IWatchGameExitRequest=} [properties] Properties to set
                 */
                function WatchGameExitRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new WatchGameExitRequest instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.WatchGameExitRequest
                 * @static
                 * @param {miti99.caro.protocol.IWatchGameExitRequest=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.WatchGameExitRequest} WatchGameExitRequest instance
                 */
                WatchGameExitRequest.create = function create(properties) {
                    return new WatchGameExitRequest(properties);
                };

                /**
                 * Encodes the specified WatchGameExitRequest message. Does not implicitly {@link miti99.caro.protocol.WatchGameExitRequest.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.WatchGameExitRequest
                 * @static
                 * @param {miti99.caro.protocol.IWatchGameExitRequest} message WatchGameExitRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                WatchGameExitRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified WatchGameExitRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.WatchGameExitRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.WatchGameExitRequest
                 * @static
                 * @param {miti99.caro.protocol.IWatchGameExitRequest} message WatchGameExitRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                WatchGameExitRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a WatchGameExitRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.WatchGameExitRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.WatchGameExitRequest} WatchGameExitRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                WatchGameExitRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.WatchGameExitRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a WatchGameExitRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.WatchGameExitRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.WatchGameExitRequest} WatchGameExitRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                WatchGameExitRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a WatchGameExitRequest message.
                 * @function verify
                 * @memberof miti99.caro.protocol.WatchGameExitRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                WatchGameExitRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a WatchGameExitRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.WatchGameExitRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.WatchGameExitRequest} WatchGameExitRequest
                 */
                WatchGameExitRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.WatchGameExitRequest)
                        return object;
                    return new $root.miti99.caro.protocol.WatchGameExitRequest();
                };

                /**
                 * Creates a plain object from a WatchGameExitRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.WatchGameExitRequest
                 * @static
                 * @param {miti99.caro.protocol.WatchGameExitRequest} message WatchGameExitRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                WatchGameExitRequest.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this WatchGameExitRequest to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.WatchGameExitRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                WatchGameExitRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for WatchGameExitRequest
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.WatchGameExitRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                WatchGameExitRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.WatchGameExitRequest";
                };

                return WatchGameExitRequest;
            })();

            protocol.ClientExitRequest = (function() {

                /**
                 * Properties of a ClientExitRequest.
                 * @memberof miti99.caro.protocol
                 * @interface IClientExitRequest
                 */

                /**
                 * Constructs a new ClientExitRequest.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a ClientExitRequest.
                 * @implements IClientExitRequest
                 * @constructor
                 * @param {miti99.caro.protocol.IClientExitRequest=} [properties] Properties to set
                 */
                function ClientExitRequest(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new ClientExitRequest instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.ClientExitRequest
                 * @static
                 * @param {miti99.caro.protocol.IClientExitRequest=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.ClientExitRequest} ClientExitRequest instance
                 */
                ClientExitRequest.create = function create(properties) {
                    return new ClientExitRequest(properties);
                };

                /**
                 * Encodes the specified ClientExitRequest message. Does not implicitly {@link miti99.caro.protocol.ClientExitRequest.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.ClientExitRequest
                 * @static
                 * @param {miti99.caro.protocol.IClientExitRequest} message ClientExitRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ClientExitRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified ClientExitRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.ClientExitRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.ClientExitRequest
                 * @static
                 * @param {miti99.caro.protocol.IClientExitRequest} message ClientExitRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ClientExitRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ClientExitRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.ClientExitRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.ClientExitRequest} ClientExitRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ClientExitRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.ClientExitRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ClientExitRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.ClientExitRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.ClientExitRequest} ClientExitRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ClientExitRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ClientExitRequest message.
                 * @function verify
                 * @memberof miti99.caro.protocol.ClientExitRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ClientExitRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a ClientExitRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.ClientExitRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.ClientExitRequest} ClientExitRequest
                 */
                ClientExitRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.ClientExitRequest)
                        return object;
                    return new $root.miti99.caro.protocol.ClientExitRequest();
                };

                /**
                 * Creates a plain object from a ClientExitRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.ClientExitRequest
                 * @static
                 * @param {miti99.caro.protocol.ClientExitRequest} message ClientExitRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ClientExitRequest.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this ClientExitRequest to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.ClientExitRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ClientExitRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ClientExitRequest
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.ClientExitRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ClientExitRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.ClientExitRequest";
                };

                return ClientExitRequest;
            })();

            protocol.Response = (function() {

                /**
                 * Properties of a Response.
                 * @memberof miti99.caro.protocol
                 * @interface IResponse
                 * @property {miti99.caro.protocol.IClientConnectResponse|null} [clientConnect] Response clientConnect
                 * @property {miti99.caro.protocol.INicknameSetResponse|null} [nicknameSet] Response nicknameSet
                 * @property {miti99.caro.protocol.IShowOptionsResponse|null} [showOptions] Response showOptions
                 * @property {miti99.caro.protocol.IShowRoomsResponse|null} [showRooms] Response showRooms
                 * @property {miti99.caro.protocol.IRoomCreateSuccessResponse|null} [roomCreateSuccess] Response roomCreateSuccess
                 * @property {miti99.caro.protocol.IRoomJoinSuccessResponse|null} [roomJoinSuccess] Response roomJoinSuccess
                 * @property {miti99.caro.protocol.IRoomJoinFailFullResponse|null} [roomJoinFailFull] Response roomJoinFailFull
                 * @property {miti99.caro.protocol.IRoomJoinFailNotFoundResponse|null} [roomJoinFailNotFound] Response roomJoinFailNotFound
                 * @property {miti99.caro.protocol.IRoomPlayFailNotFoundResponse|null} [roomPlayFailNotFound] Response roomPlayFailNotFound
                 * @property {miti99.caro.protocol.IGameStartingResponse|null} [gameStarting] Response gameStarting
                 * @property {miti99.caro.protocol.IGameReadyResponse|null} [gameReady] Response gameReady
                 * @property {miti99.caro.protocol.IGameMoveSuccessResponse|null} [gameMoveSuccess] Response gameMoveSuccess
                 * @property {miti99.caro.protocol.IGameMoveInvalidResponse|null} [gameMoveInvalid] Response gameMoveInvalid
                 * @property {miti99.caro.protocol.IGameMoveOccupiedResponse|null} [gameMoveOccupied] Response gameMoveOccupied
                 * @property {miti99.caro.protocol.IGameMoveOutOfBoundsResponse|null} [gameMoveOutOfBounds] Response gameMoveOutOfBounds
                 * @property {miti99.caro.protocol.IGameMoveNotYourTurnResponse|null} [gameMoveNotYourTurn] Response gameMoveNotYourTurn
                 * @property {miti99.caro.protocol.IGameOverResponse|null} [gameOver] Response gameOver
                 * @property {miti99.caro.protocol.IPveDifficultyNotSupportResponse|null} [pveDifficultyNotSupport] Response pveDifficultyNotSupport
                 * @property {miti99.caro.protocol.IWatchGameSuccessResponse|null} [watchGameSuccess] Response watchGameSuccess
                 * @property {miti99.caro.protocol.IClientExitResponse|null} [clientExit] Response clientExit
                 */

                /**
                 * Constructs a new Response.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a Response.
                 * @implements IResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IResponse=} [properties] Properties to set
                 */
                function Response(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Response clientConnect.
                 * @member {miti99.caro.protocol.IClientConnectResponse|null|undefined} clientConnect
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.clientConnect = null;

                /**
                 * Response nicknameSet.
                 * @member {miti99.caro.protocol.INicknameSetResponse|null|undefined} nicknameSet
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.nicknameSet = null;

                /**
                 * Response showOptions.
                 * @member {miti99.caro.protocol.IShowOptionsResponse|null|undefined} showOptions
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.showOptions = null;

                /**
                 * Response showRooms.
                 * @member {miti99.caro.protocol.IShowRoomsResponse|null|undefined} showRooms
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.showRooms = null;

                /**
                 * Response roomCreateSuccess.
                 * @member {miti99.caro.protocol.IRoomCreateSuccessResponse|null|undefined} roomCreateSuccess
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.roomCreateSuccess = null;

                /**
                 * Response roomJoinSuccess.
                 * @member {miti99.caro.protocol.IRoomJoinSuccessResponse|null|undefined} roomJoinSuccess
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.roomJoinSuccess = null;

                /**
                 * Response roomJoinFailFull.
                 * @member {miti99.caro.protocol.IRoomJoinFailFullResponse|null|undefined} roomJoinFailFull
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.roomJoinFailFull = null;

                /**
                 * Response roomJoinFailNotFound.
                 * @member {miti99.caro.protocol.IRoomJoinFailNotFoundResponse|null|undefined} roomJoinFailNotFound
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.roomJoinFailNotFound = null;

                /**
                 * Response roomPlayFailNotFound.
                 * @member {miti99.caro.protocol.IRoomPlayFailNotFoundResponse|null|undefined} roomPlayFailNotFound
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.roomPlayFailNotFound = null;

                /**
                 * Response gameStarting.
                 * @member {miti99.caro.protocol.IGameStartingResponse|null|undefined} gameStarting
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.gameStarting = null;

                /**
                 * Response gameReady.
                 * @member {miti99.caro.protocol.IGameReadyResponse|null|undefined} gameReady
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.gameReady = null;

                /**
                 * Response gameMoveSuccess.
                 * @member {miti99.caro.protocol.IGameMoveSuccessResponse|null|undefined} gameMoveSuccess
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.gameMoveSuccess = null;

                /**
                 * Response gameMoveInvalid.
                 * @member {miti99.caro.protocol.IGameMoveInvalidResponse|null|undefined} gameMoveInvalid
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.gameMoveInvalid = null;

                /**
                 * Response gameMoveOccupied.
                 * @member {miti99.caro.protocol.IGameMoveOccupiedResponse|null|undefined} gameMoveOccupied
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.gameMoveOccupied = null;

                /**
                 * Response gameMoveOutOfBounds.
                 * @member {miti99.caro.protocol.IGameMoveOutOfBoundsResponse|null|undefined} gameMoveOutOfBounds
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.gameMoveOutOfBounds = null;

                /**
                 * Response gameMoveNotYourTurn.
                 * @member {miti99.caro.protocol.IGameMoveNotYourTurnResponse|null|undefined} gameMoveNotYourTurn
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.gameMoveNotYourTurn = null;

                /**
                 * Response gameOver.
                 * @member {miti99.caro.protocol.IGameOverResponse|null|undefined} gameOver
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.gameOver = null;

                /**
                 * Response pveDifficultyNotSupport.
                 * @member {miti99.caro.protocol.IPveDifficultyNotSupportResponse|null|undefined} pveDifficultyNotSupport
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.pveDifficultyNotSupport = null;

                /**
                 * Response watchGameSuccess.
                 * @member {miti99.caro.protocol.IWatchGameSuccessResponse|null|undefined} watchGameSuccess
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.watchGameSuccess = null;

                /**
                 * Response clientExit.
                 * @member {miti99.caro.protocol.IClientExitResponse|null|undefined} clientExit
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Response.prototype.clientExit = null;

                // OneOf field names bound to virtual getters and setters
                let $oneOfFields;

                /**
                 * Response payload.
                 * @member {"clientConnect"|"nicknameSet"|"showOptions"|"showRooms"|"roomCreateSuccess"|"roomJoinSuccess"|"roomJoinFailFull"|"roomJoinFailNotFound"|"roomPlayFailNotFound"|"gameStarting"|"gameReady"|"gameMoveSuccess"|"gameMoveInvalid"|"gameMoveOccupied"|"gameMoveOutOfBounds"|"gameMoveNotYourTurn"|"gameOver"|"pveDifficultyNotSupport"|"watchGameSuccess"|"clientExit"|undefined} payload
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 */
                Object.defineProperty(Response.prototype, "payload", {
                    get: $util.oneOfGetter($oneOfFields = ["clientConnect", "nicknameSet", "showOptions", "showRooms", "roomCreateSuccess", "roomJoinSuccess", "roomJoinFailFull", "roomJoinFailNotFound", "roomPlayFailNotFound", "gameStarting", "gameReady", "gameMoveSuccess", "gameMoveInvalid", "gameMoveOccupied", "gameMoveOutOfBounds", "gameMoveNotYourTurn", "gameOver", "pveDifficultyNotSupport", "watchGameSuccess", "clientExit"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new Response instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.Response
                 * @static
                 * @param {miti99.caro.protocol.IResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.Response} Response instance
                 */
                Response.create = function create(properties) {
                    return new Response(properties);
                };

                /**
                 * Encodes the specified Response message. Does not implicitly {@link miti99.caro.protocol.Response.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.Response
                 * @static
                 * @param {miti99.caro.protocol.IResponse} message Response message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Response.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.clientConnect != null && Object.hasOwnProperty.call(message, "clientConnect"))
                        $root.miti99.caro.protocol.ClientConnectResponse.encode(message.clientConnect, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.nicknameSet != null && Object.hasOwnProperty.call(message, "nicknameSet"))
                        $root.miti99.caro.protocol.NicknameSetResponse.encode(message.nicknameSet, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.showOptions != null && Object.hasOwnProperty.call(message, "showOptions"))
                        $root.miti99.caro.protocol.ShowOptionsResponse.encode(message.showOptions, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.showRooms != null && Object.hasOwnProperty.call(message, "showRooms"))
                        $root.miti99.caro.protocol.ShowRoomsResponse.encode(message.showRooms, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.roomCreateSuccess != null && Object.hasOwnProperty.call(message, "roomCreateSuccess"))
                        $root.miti99.caro.protocol.RoomCreateSuccessResponse.encode(message.roomCreateSuccess, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    if (message.roomJoinSuccess != null && Object.hasOwnProperty.call(message, "roomJoinSuccess"))
                        $root.miti99.caro.protocol.RoomJoinSuccessResponse.encode(message.roomJoinSuccess, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    if (message.roomJoinFailFull != null && Object.hasOwnProperty.call(message, "roomJoinFailFull"))
                        $root.miti99.caro.protocol.RoomJoinFailFullResponse.encode(message.roomJoinFailFull, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                    if (message.roomJoinFailNotFound != null && Object.hasOwnProperty.call(message, "roomJoinFailNotFound"))
                        $root.miti99.caro.protocol.RoomJoinFailNotFoundResponse.encode(message.roomJoinFailNotFound, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                    if (message.roomPlayFailNotFound != null && Object.hasOwnProperty.call(message, "roomPlayFailNotFound"))
                        $root.miti99.caro.protocol.RoomPlayFailNotFoundResponse.encode(message.roomPlayFailNotFound, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                    if (message.gameStarting != null && Object.hasOwnProperty.call(message, "gameStarting"))
                        $root.miti99.caro.protocol.GameStartingResponse.encode(message.gameStarting, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                    if (message.gameReady != null && Object.hasOwnProperty.call(message, "gameReady"))
                        $root.miti99.caro.protocol.GameReadyResponse.encode(message.gameReady, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                    if (message.gameMoveSuccess != null && Object.hasOwnProperty.call(message, "gameMoveSuccess"))
                        $root.miti99.caro.protocol.GameMoveSuccessResponse.encode(message.gameMoveSuccess, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                    if (message.gameMoveInvalid != null && Object.hasOwnProperty.call(message, "gameMoveInvalid"))
                        $root.miti99.caro.protocol.GameMoveInvalidResponse.encode(message.gameMoveInvalid, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                    if (message.gameMoveOccupied != null && Object.hasOwnProperty.call(message, "gameMoveOccupied"))
                        $root.miti99.caro.protocol.GameMoveOccupiedResponse.encode(message.gameMoveOccupied, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
                    if (message.gameMoveOutOfBounds != null && Object.hasOwnProperty.call(message, "gameMoveOutOfBounds"))
                        $root.miti99.caro.protocol.GameMoveOutOfBoundsResponse.encode(message.gameMoveOutOfBounds, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
                    if (message.gameMoveNotYourTurn != null && Object.hasOwnProperty.call(message, "gameMoveNotYourTurn"))
                        $root.miti99.caro.protocol.GameMoveNotYourTurnResponse.encode(message.gameMoveNotYourTurn, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
                    if (message.gameOver != null && Object.hasOwnProperty.call(message, "gameOver"))
                        $root.miti99.caro.protocol.GameOverResponse.encode(message.gameOver, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
                    if (message.pveDifficultyNotSupport != null && Object.hasOwnProperty.call(message, "pveDifficultyNotSupport"))
                        $root.miti99.caro.protocol.PveDifficultyNotSupportResponse.encode(message.pveDifficultyNotSupport, writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
                    if (message.watchGameSuccess != null && Object.hasOwnProperty.call(message, "watchGameSuccess"))
                        $root.miti99.caro.protocol.WatchGameSuccessResponse.encode(message.watchGameSuccess, writer.uint32(/* id 19, wireType 2 =*/154).fork()).ldelim();
                    if (message.clientExit != null && Object.hasOwnProperty.call(message, "clientExit"))
                        $root.miti99.caro.protocol.ClientExitResponse.encode(message.clientExit, writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Response message, length delimited. Does not implicitly {@link miti99.caro.protocol.Response.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.Response
                 * @static
                 * @param {miti99.caro.protocol.IResponse} message Response message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Response.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Response message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.Response
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.Response} Response
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Response.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.Response();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.clientConnect = $root.miti99.caro.protocol.ClientConnectResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.nicknameSet = $root.miti99.caro.protocol.NicknameSetResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.showOptions = $root.miti99.caro.protocol.ShowOptionsResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                message.showRooms = $root.miti99.caro.protocol.ShowRoomsResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 5: {
                                message.roomCreateSuccess = $root.miti99.caro.protocol.RoomCreateSuccessResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 6: {
                                message.roomJoinSuccess = $root.miti99.caro.protocol.RoomJoinSuccessResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 7: {
                                message.roomJoinFailFull = $root.miti99.caro.protocol.RoomJoinFailFullResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 8: {
                                message.roomJoinFailNotFound = $root.miti99.caro.protocol.RoomJoinFailNotFoundResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 9: {
                                message.roomPlayFailNotFound = $root.miti99.caro.protocol.RoomPlayFailNotFoundResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 10: {
                                message.gameStarting = $root.miti99.caro.protocol.GameStartingResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 11: {
                                message.gameReady = $root.miti99.caro.protocol.GameReadyResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 12: {
                                message.gameMoveSuccess = $root.miti99.caro.protocol.GameMoveSuccessResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 13: {
                                message.gameMoveInvalid = $root.miti99.caro.protocol.GameMoveInvalidResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 14: {
                                message.gameMoveOccupied = $root.miti99.caro.protocol.GameMoveOccupiedResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 15: {
                                message.gameMoveOutOfBounds = $root.miti99.caro.protocol.GameMoveOutOfBoundsResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 16: {
                                message.gameMoveNotYourTurn = $root.miti99.caro.protocol.GameMoveNotYourTurnResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 17: {
                                message.gameOver = $root.miti99.caro.protocol.GameOverResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 18: {
                                message.pveDifficultyNotSupport = $root.miti99.caro.protocol.PveDifficultyNotSupportResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 19: {
                                message.watchGameSuccess = $root.miti99.caro.protocol.WatchGameSuccessResponse.decode(reader, reader.uint32());
                                break;
                            }
                        case 20: {
                                message.clientExit = $root.miti99.caro.protocol.ClientExitResponse.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Response message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.Response
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.Response} Response
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Response.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Response message.
                 * @function verify
                 * @memberof miti99.caro.protocol.Response
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Response.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    let properties = {};
                    if (message.clientConnect != null && message.hasOwnProperty("clientConnect")) {
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.ClientConnectResponse.verify(message.clientConnect);
                            if (error)
                                return "clientConnect." + error;
                        }
                    }
                    if (message.nicknameSet != null && message.hasOwnProperty("nicknameSet")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.NicknameSetResponse.verify(message.nicknameSet);
                            if (error)
                                return "nicknameSet." + error;
                        }
                    }
                    if (message.showOptions != null && message.hasOwnProperty("showOptions")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.ShowOptionsResponse.verify(message.showOptions);
                            if (error)
                                return "showOptions." + error;
                        }
                    }
                    if (message.showRooms != null && message.hasOwnProperty("showRooms")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.ShowRoomsResponse.verify(message.showRooms);
                            if (error)
                                return "showRooms." + error;
                        }
                    }
                    if (message.roomCreateSuccess != null && message.hasOwnProperty("roomCreateSuccess")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.RoomCreateSuccessResponse.verify(message.roomCreateSuccess);
                            if (error)
                                return "roomCreateSuccess." + error;
                        }
                    }
                    if (message.roomJoinSuccess != null && message.hasOwnProperty("roomJoinSuccess")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.RoomJoinSuccessResponse.verify(message.roomJoinSuccess);
                            if (error)
                                return "roomJoinSuccess." + error;
                        }
                    }
                    if (message.roomJoinFailFull != null && message.hasOwnProperty("roomJoinFailFull")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.RoomJoinFailFullResponse.verify(message.roomJoinFailFull);
                            if (error)
                                return "roomJoinFailFull." + error;
                        }
                    }
                    if (message.roomJoinFailNotFound != null && message.hasOwnProperty("roomJoinFailNotFound")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.RoomJoinFailNotFoundResponse.verify(message.roomJoinFailNotFound);
                            if (error)
                                return "roomJoinFailNotFound." + error;
                        }
                    }
                    if (message.roomPlayFailNotFound != null && message.hasOwnProperty("roomPlayFailNotFound")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.RoomPlayFailNotFoundResponse.verify(message.roomPlayFailNotFound);
                            if (error)
                                return "roomPlayFailNotFound." + error;
                        }
                    }
                    if (message.gameStarting != null && message.hasOwnProperty("gameStarting")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.GameStartingResponse.verify(message.gameStarting);
                            if (error)
                                return "gameStarting." + error;
                        }
                    }
                    if (message.gameReady != null && message.hasOwnProperty("gameReady")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.GameReadyResponse.verify(message.gameReady);
                            if (error)
                                return "gameReady." + error;
                        }
                    }
                    if (message.gameMoveSuccess != null && message.hasOwnProperty("gameMoveSuccess")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.GameMoveSuccessResponse.verify(message.gameMoveSuccess);
                            if (error)
                                return "gameMoveSuccess." + error;
                        }
                    }
                    if (message.gameMoveInvalid != null && message.hasOwnProperty("gameMoveInvalid")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.GameMoveInvalidResponse.verify(message.gameMoveInvalid);
                            if (error)
                                return "gameMoveInvalid." + error;
                        }
                    }
                    if (message.gameMoveOccupied != null && message.hasOwnProperty("gameMoveOccupied")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.GameMoveOccupiedResponse.verify(message.gameMoveOccupied);
                            if (error)
                                return "gameMoveOccupied." + error;
                        }
                    }
                    if (message.gameMoveOutOfBounds != null && message.hasOwnProperty("gameMoveOutOfBounds")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.GameMoveOutOfBoundsResponse.verify(message.gameMoveOutOfBounds);
                            if (error)
                                return "gameMoveOutOfBounds." + error;
                        }
                    }
                    if (message.gameMoveNotYourTurn != null && message.hasOwnProperty("gameMoveNotYourTurn")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.GameMoveNotYourTurnResponse.verify(message.gameMoveNotYourTurn);
                            if (error)
                                return "gameMoveNotYourTurn." + error;
                        }
                    }
                    if (message.gameOver != null && message.hasOwnProperty("gameOver")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.GameOverResponse.verify(message.gameOver);
                            if (error)
                                return "gameOver." + error;
                        }
                    }
                    if (message.pveDifficultyNotSupport != null && message.hasOwnProperty("pveDifficultyNotSupport")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.PveDifficultyNotSupportResponse.verify(message.pveDifficultyNotSupport);
                            if (error)
                                return "pveDifficultyNotSupport." + error;
                        }
                    }
                    if (message.watchGameSuccess != null && message.hasOwnProperty("watchGameSuccess")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.WatchGameSuccessResponse.verify(message.watchGameSuccess);
                            if (error)
                                return "watchGameSuccess." + error;
                        }
                    }
                    if (message.clientExit != null && message.hasOwnProperty("clientExit")) {
                        if (properties.payload === 1)
                            return "payload: multiple values";
                        properties.payload = 1;
                        {
                            let error = $root.miti99.caro.protocol.ClientExitResponse.verify(message.clientExit);
                            if (error)
                                return "clientExit." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a Response message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.Response
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.Response} Response
                 */
                Response.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.Response)
                        return object;
                    let message = new $root.miti99.caro.protocol.Response();
                    if (object.clientConnect != null) {
                        if (typeof object.clientConnect !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.clientConnect: object expected");
                        message.clientConnect = $root.miti99.caro.protocol.ClientConnectResponse.fromObject(object.clientConnect);
                    }
                    if (object.nicknameSet != null) {
                        if (typeof object.nicknameSet !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.nicknameSet: object expected");
                        message.nicknameSet = $root.miti99.caro.protocol.NicknameSetResponse.fromObject(object.nicknameSet);
                    }
                    if (object.showOptions != null) {
                        if (typeof object.showOptions !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.showOptions: object expected");
                        message.showOptions = $root.miti99.caro.protocol.ShowOptionsResponse.fromObject(object.showOptions);
                    }
                    if (object.showRooms != null) {
                        if (typeof object.showRooms !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.showRooms: object expected");
                        message.showRooms = $root.miti99.caro.protocol.ShowRoomsResponse.fromObject(object.showRooms);
                    }
                    if (object.roomCreateSuccess != null) {
                        if (typeof object.roomCreateSuccess !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.roomCreateSuccess: object expected");
                        message.roomCreateSuccess = $root.miti99.caro.protocol.RoomCreateSuccessResponse.fromObject(object.roomCreateSuccess);
                    }
                    if (object.roomJoinSuccess != null) {
                        if (typeof object.roomJoinSuccess !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.roomJoinSuccess: object expected");
                        message.roomJoinSuccess = $root.miti99.caro.protocol.RoomJoinSuccessResponse.fromObject(object.roomJoinSuccess);
                    }
                    if (object.roomJoinFailFull != null) {
                        if (typeof object.roomJoinFailFull !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.roomJoinFailFull: object expected");
                        message.roomJoinFailFull = $root.miti99.caro.protocol.RoomJoinFailFullResponse.fromObject(object.roomJoinFailFull);
                    }
                    if (object.roomJoinFailNotFound != null) {
                        if (typeof object.roomJoinFailNotFound !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.roomJoinFailNotFound: object expected");
                        message.roomJoinFailNotFound = $root.miti99.caro.protocol.RoomJoinFailNotFoundResponse.fromObject(object.roomJoinFailNotFound);
                    }
                    if (object.roomPlayFailNotFound != null) {
                        if (typeof object.roomPlayFailNotFound !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.roomPlayFailNotFound: object expected");
                        message.roomPlayFailNotFound = $root.miti99.caro.protocol.RoomPlayFailNotFoundResponse.fromObject(object.roomPlayFailNotFound);
                    }
                    if (object.gameStarting != null) {
                        if (typeof object.gameStarting !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.gameStarting: object expected");
                        message.gameStarting = $root.miti99.caro.protocol.GameStartingResponse.fromObject(object.gameStarting);
                    }
                    if (object.gameReady != null) {
                        if (typeof object.gameReady !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.gameReady: object expected");
                        message.gameReady = $root.miti99.caro.protocol.GameReadyResponse.fromObject(object.gameReady);
                    }
                    if (object.gameMoveSuccess != null) {
                        if (typeof object.gameMoveSuccess !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.gameMoveSuccess: object expected");
                        message.gameMoveSuccess = $root.miti99.caro.protocol.GameMoveSuccessResponse.fromObject(object.gameMoveSuccess);
                    }
                    if (object.gameMoveInvalid != null) {
                        if (typeof object.gameMoveInvalid !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.gameMoveInvalid: object expected");
                        message.gameMoveInvalid = $root.miti99.caro.protocol.GameMoveInvalidResponse.fromObject(object.gameMoveInvalid);
                    }
                    if (object.gameMoveOccupied != null) {
                        if (typeof object.gameMoveOccupied !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.gameMoveOccupied: object expected");
                        message.gameMoveOccupied = $root.miti99.caro.protocol.GameMoveOccupiedResponse.fromObject(object.gameMoveOccupied);
                    }
                    if (object.gameMoveOutOfBounds != null) {
                        if (typeof object.gameMoveOutOfBounds !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.gameMoveOutOfBounds: object expected");
                        message.gameMoveOutOfBounds = $root.miti99.caro.protocol.GameMoveOutOfBoundsResponse.fromObject(object.gameMoveOutOfBounds);
                    }
                    if (object.gameMoveNotYourTurn != null) {
                        if (typeof object.gameMoveNotYourTurn !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.gameMoveNotYourTurn: object expected");
                        message.gameMoveNotYourTurn = $root.miti99.caro.protocol.GameMoveNotYourTurnResponse.fromObject(object.gameMoveNotYourTurn);
                    }
                    if (object.gameOver != null) {
                        if (typeof object.gameOver !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.gameOver: object expected");
                        message.gameOver = $root.miti99.caro.protocol.GameOverResponse.fromObject(object.gameOver);
                    }
                    if (object.pveDifficultyNotSupport != null) {
                        if (typeof object.pveDifficultyNotSupport !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.pveDifficultyNotSupport: object expected");
                        message.pveDifficultyNotSupport = $root.miti99.caro.protocol.PveDifficultyNotSupportResponse.fromObject(object.pveDifficultyNotSupport);
                    }
                    if (object.watchGameSuccess != null) {
                        if (typeof object.watchGameSuccess !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.watchGameSuccess: object expected");
                        message.watchGameSuccess = $root.miti99.caro.protocol.WatchGameSuccessResponse.fromObject(object.watchGameSuccess);
                    }
                    if (object.clientExit != null) {
                        if (typeof object.clientExit !== "object")
                            throw TypeError(".miti99.caro.protocol.Response.clientExit: object expected");
                        message.clientExit = $root.miti99.caro.protocol.ClientExitResponse.fromObject(object.clientExit);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Response message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.Response
                 * @static
                 * @param {miti99.caro.protocol.Response} message Response
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Response.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (message.clientConnect != null && message.hasOwnProperty("clientConnect")) {
                        object.clientConnect = $root.miti99.caro.protocol.ClientConnectResponse.toObject(message.clientConnect, options);
                        if (options.oneofs)
                            object.payload = "clientConnect";
                    }
                    if (message.nicknameSet != null && message.hasOwnProperty("nicknameSet")) {
                        object.nicknameSet = $root.miti99.caro.protocol.NicknameSetResponse.toObject(message.nicknameSet, options);
                        if (options.oneofs)
                            object.payload = "nicknameSet";
                    }
                    if (message.showOptions != null && message.hasOwnProperty("showOptions")) {
                        object.showOptions = $root.miti99.caro.protocol.ShowOptionsResponse.toObject(message.showOptions, options);
                        if (options.oneofs)
                            object.payload = "showOptions";
                    }
                    if (message.showRooms != null && message.hasOwnProperty("showRooms")) {
                        object.showRooms = $root.miti99.caro.protocol.ShowRoomsResponse.toObject(message.showRooms, options);
                        if (options.oneofs)
                            object.payload = "showRooms";
                    }
                    if (message.roomCreateSuccess != null && message.hasOwnProperty("roomCreateSuccess")) {
                        object.roomCreateSuccess = $root.miti99.caro.protocol.RoomCreateSuccessResponse.toObject(message.roomCreateSuccess, options);
                        if (options.oneofs)
                            object.payload = "roomCreateSuccess";
                    }
                    if (message.roomJoinSuccess != null && message.hasOwnProperty("roomJoinSuccess")) {
                        object.roomJoinSuccess = $root.miti99.caro.protocol.RoomJoinSuccessResponse.toObject(message.roomJoinSuccess, options);
                        if (options.oneofs)
                            object.payload = "roomJoinSuccess";
                    }
                    if (message.roomJoinFailFull != null && message.hasOwnProperty("roomJoinFailFull")) {
                        object.roomJoinFailFull = $root.miti99.caro.protocol.RoomJoinFailFullResponse.toObject(message.roomJoinFailFull, options);
                        if (options.oneofs)
                            object.payload = "roomJoinFailFull";
                    }
                    if (message.roomJoinFailNotFound != null && message.hasOwnProperty("roomJoinFailNotFound")) {
                        object.roomJoinFailNotFound = $root.miti99.caro.protocol.RoomJoinFailNotFoundResponse.toObject(message.roomJoinFailNotFound, options);
                        if (options.oneofs)
                            object.payload = "roomJoinFailNotFound";
                    }
                    if (message.roomPlayFailNotFound != null && message.hasOwnProperty("roomPlayFailNotFound")) {
                        object.roomPlayFailNotFound = $root.miti99.caro.protocol.RoomPlayFailNotFoundResponse.toObject(message.roomPlayFailNotFound, options);
                        if (options.oneofs)
                            object.payload = "roomPlayFailNotFound";
                    }
                    if (message.gameStarting != null && message.hasOwnProperty("gameStarting")) {
                        object.gameStarting = $root.miti99.caro.protocol.GameStartingResponse.toObject(message.gameStarting, options);
                        if (options.oneofs)
                            object.payload = "gameStarting";
                    }
                    if (message.gameReady != null && message.hasOwnProperty("gameReady")) {
                        object.gameReady = $root.miti99.caro.protocol.GameReadyResponse.toObject(message.gameReady, options);
                        if (options.oneofs)
                            object.payload = "gameReady";
                    }
                    if (message.gameMoveSuccess != null && message.hasOwnProperty("gameMoveSuccess")) {
                        object.gameMoveSuccess = $root.miti99.caro.protocol.GameMoveSuccessResponse.toObject(message.gameMoveSuccess, options);
                        if (options.oneofs)
                            object.payload = "gameMoveSuccess";
                    }
                    if (message.gameMoveInvalid != null && message.hasOwnProperty("gameMoveInvalid")) {
                        object.gameMoveInvalid = $root.miti99.caro.protocol.GameMoveInvalidResponse.toObject(message.gameMoveInvalid, options);
                        if (options.oneofs)
                            object.payload = "gameMoveInvalid";
                    }
                    if (message.gameMoveOccupied != null && message.hasOwnProperty("gameMoveOccupied")) {
                        object.gameMoveOccupied = $root.miti99.caro.protocol.GameMoveOccupiedResponse.toObject(message.gameMoveOccupied, options);
                        if (options.oneofs)
                            object.payload = "gameMoveOccupied";
                    }
                    if (message.gameMoveOutOfBounds != null && message.hasOwnProperty("gameMoveOutOfBounds")) {
                        object.gameMoveOutOfBounds = $root.miti99.caro.protocol.GameMoveOutOfBoundsResponse.toObject(message.gameMoveOutOfBounds, options);
                        if (options.oneofs)
                            object.payload = "gameMoveOutOfBounds";
                    }
                    if (message.gameMoveNotYourTurn != null && message.hasOwnProperty("gameMoveNotYourTurn")) {
                        object.gameMoveNotYourTurn = $root.miti99.caro.protocol.GameMoveNotYourTurnResponse.toObject(message.gameMoveNotYourTurn, options);
                        if (options.oneofs)
                            object.payload = "gameMoveNotYourTurn";
                    }
                    if (message.gameOver != null && message.hasOwnProperty("gameOver")) {
                        object.gameOver = $root.miti99.caro.protocol.GameOverResponse.toObject(message.gameOver, options);
                        if (options.oneofs)
                            object.payload = "gameOver";
                    }
                    if (message.pveDifficultyNotSupport != null && message.hasOwnProperty("pveDifficultyNotSupport")) {
                        object.pveDifficultyNotSupport = $root.miti99.caro.protocol.PveDifficultyNotSupportResponse.toObject(message.pveDifficultyNotSupport, options);
                        if (options.oneofs)
                            object.payload = "pveDifficultyNotSupport";
                    }
                    if (message.watchGameSuccess != null && message.hasOwnProperty("watchGameSuccess")) {
                        object.watchGameSuccess = $root.miti99.caro.protocol.WatchGameSuccessResponse.toObject(message.watchGameSuccess, options);
                        if (options.oneofs)
                            object.payload = "watchGameSuccess";
                    }
                    if (message.clientExit != null && message.hasOwnProperty("clientExit")) {
                        object.clientExit = $root.miti99.caro.protocol.ClientExitResponse.toObject(message.clientExit, options);
                        if (options.oneofs)
                            object.payload = "clientExit";
                    }
                    return object;
                };

                /**
                 * Converts this Response to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.Response
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Response.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Response
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.Response
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.Response";
                };

                return Response;
            })();

            protocol.ClientConnectResponse = (function() {

                /**
                 * Properties of a ClientConnectResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IClientConnectResponse
                 * @property {number|null} [clientId] ClientConnectResponse clientId
                 */

                /**
                 * Constructs a new ClientConnectResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a ClientConnectResponse.
                 * @implements IClientConnectResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IClientConnectResponse=} [properties] Properties to set
                 */
                function ClientConnectResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ClientConnectResponse clientId.
                 * @member {number} clientId
                 * @memberof miti99.caro.protocol.ClientConnectResponse
                 * @instance
                 */
                ClientConnectResponse.prototype.clientId = 0;

                /**
                 * Creates a new ClientConnectResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.ClientConnectResponse
                 * @static
                 * @param {miti99.caro.protocol.IClientConnectResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.ClientConnectResponse} ClientConnectResponse instance
                 */
                ClientConnectResponse.create = function create(properties) {
                    return new ClientConnectResponse(properties);
                };

                /**
                 * Encodes the specified ClientConnectResponse message. Does not implicitly {@link miti99.caro.protocol.ClientConnectResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.ClientConnectResponse
                 * @static
                 * @param {miti99.caro.protocol.IClientConnectResponse} message ClientConnectResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ClientConnectResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.clientId);
                    return writer;
                };

                /**
                 * Encodes the specified ClientConnectResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.ClientConnectResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.ClientConnectResponse
                 * @static
                 * @param {miti99.caro.protocol.IClientConnectResponse} message ClientConnectResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ClientConnectResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ClientConnectResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.ClientConnectResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.ClientConnectResponse} ClientConnectResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ClientConnectResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.ClientConnectResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.clientId = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ClientConnectResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.ClientConnectResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.ClientConnectResponse} ClientConnectResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ClientConnectResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ClientConnectResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.ClientConnectResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ClientConnectResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.clientId != null && message.hasOwnProperty("clientId"))
                        if (!$util.isInteger(message.clientId))
                            return "clientId: integer expected";
                    return null;
                };

                /**
                 * Creates a ClientConnectResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.ClientConnectResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.ClientConnectResponse} ClientConnectResponse
                 */
                ClientConnectResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.ClientConnectResponse)
                        return object;
                    let message = new $root.miti99.caro.protocol.ClientConnectResponse();
                    if (object.clientId != null)
                        message.clientId = object.clientId | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a ClientConnectResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.ClientConnectResponse
                 * @static
                 * @param {miti99.caro.protocol.ClientConnectResponse} message ClientConnectResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ClientConnectResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.clientId = 0;
                    if (message.clientId != null && message.hasOwnProperty("clientId"))
                        object.clientId = message.clientId;
                    return object;
                };

                /**
                 * Converts this ClientConnectResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.ClientConnectResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ClientConnectResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ClientConnectResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.ClientConnectResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ClientConnectResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.ClientConnectResponse";
                };

                return ClientConnectResponse;
            })();

            protocol.NicknameSetResponse = (function() {

                /**
                 * Properties of a NicknameSetResponse.
                 * @memberof miti99.caro.protocol
                 * @interface INicknameSetResponse
                 * @property {number|null} [invalidLength] NicknameSetResponse invalidLength
                 */

                /**
                 * Constructs a new NicknameSetResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a NicknameSetResponse.
                 * @implements INicknameSetResponse
                 * @constructor
                 * @param {miti99.caro.protocol.INicknameSetResponse=} [properties] Properties to set
                 */
                function NicknameSetResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * NicknameSetResponse invalidLength.
                 * @member {number} invalidLength
                 * @memberof miti99.caro.protocol.NicknameSetResponse
                 * @instance
                 */
                NicknameSetResponse.prototype.invalidLength = 0;

                /**
                 * Creates a new NicknameSetResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.NicknameSetResponse
                 * @static
                 * @param {miti99.caro.protocol.INicknameSetResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.NicknameSetResponse} NicknameSetResponse instance
                 */
                NicknameSetResponse.create = function create(properties) {
                    return new NicknameSetResponse(properties);
                };

                /**
                 * Encodes the specified NicknameSetResponse message. Does not implicitly {@link miti99.caro.protocol.NicknameSetResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.NicknameSetResponse
                 * @static
                 * @param {miti99.caro.protocol.INicknameSetResponse} message NicknameSetResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NicknameSetResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.invalidLength != null && Object.hasOwnProperty.call(message, "invalidLength"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.invalidLength);
                    return writer;
                };

                /**
                 * Encodes the specified NicknameSetResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.NicknameSetResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.NicknameSetResponse
                 * @static
                 * @param {miti99.caro.protocol.INicknameSetResponse} message NicknameSetResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NicknameSetResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a NicknameSetResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.NicknameSetResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.NicknameSetResponse} NicknameSetResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NicknameSetResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.NicknameSetResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.invalidLength = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a NicknameSetResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.NicknameSetResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.NicknameSetResponse} NicknameSetResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NicknameSetResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a NicknameSetResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.NicknameSetResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                NicknameSetResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.invalidLength != null && message.hasOwnProperty("invalidLength"))
                        if (!$util.isInteger(message.invalidLength))
                            return "invalidLength: integer expected";
                    return null;
                };

                /**
                 * Creates a NicknameSetResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.NicknameSetResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.NicknameSetResponse} NicknameSetResponse
                 */
                NicknameSetResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.NicknameSetResponse)
                        return object;
                    let message = new $root.miti99.caro.protocol.NicknameSetResponse();
                    if (object.invalidLength != null)
                        message.invalidLength = object.invalidLength | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a NicknameSetResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.NicknameSetResponse
                 * @static
                 * @param {miti99.caro.protocol.NicknameSetResponse} message NicknameSetResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                NicknameSetResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.invalidLength = 0;
                    if (message.invalidLength != null && message.hasOwnProperty("invalidLength"))
                        object.invalidLength = message.invalidLength;
                    return object;
                };

                /**
                 * Converts this NicknameSetResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.NicknameSetResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                NicknameSetResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for NicknameSetResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.NicknameSetResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                NicknameSetResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.NicknameSetResponse";
                };

                return NicknameSetResponse;
            })();

            protocol.ShowOptionsResponse = (function() {

                /**
                 * Properties of a ShowOptionsResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IShowOptionsResponse
                 */

                /**
                 * Constructs a new ShowOptionsResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a ShowOptionsResponse.
                 * @implements IShowOptionsResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IShowOptionsResponse=} [properties] Properties to set
                 */
                function ShowOptionsResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new ShowOptionsResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.ShowOptionsResponse
                 * @static
                 * @param {miti99.caro.protocol.IShowOptionsResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.ShowOptionsResponse} ShowOptionsResponse instance
                 */
                ShowOptionsResponse.create = function create(properties) {
                    return new ShowOptionsResponse(properties);
                };

                /**
                 * Encodes the specified ShowOptionsResponse message. Does not implicitly {@link miti99.caro.protocol.ShowOptionsResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.ShowOptionsResponse
                 * @static
                 * @param {miti99.caro.protocol.IShowOptionsResponse} message ShowOptionsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ShowOptionsResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified ShowOptionsResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.ShowOptionsResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.ShowOptionsResponse
                 * @static
                 * @param {miti99.caro.protocol.IShowOptionsResponse} message ShowOptionsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ShowOptionsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ShowOptionsResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.ShowOptionsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.ShowOptionsResponse} ShowOptionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ShowOptionsResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.ShowOptionsResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ShowOptionsResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.ShowOptionsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.ShowOptionsResponse} ShowOptionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ShowOptionsResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ShowOptionsResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.ShowOptionsResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ShowOptionsResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a ShowOptionsResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.ShowOptionsResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.ShowOptionsResponse} ShowOptionsResponse
                 */
                ShowOptionsResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.ShowOptionsResponse)
                        return object;
                    return new $root.miti99.caro.protocol.ShowOptionsResponse();
                };

                /**
                 * Creates a plain object from a ShowOptionsResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.ShowOptionsResponse
                 * @static
                 * @param {miti99.caro.protocol.ShowOptionsResponse} message ShowOptionsResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ShowOptionsResponse.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this ShowOptionsResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.ShowOptionsResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ShowOptionsResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ShowOptionsResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.ShowOptionsResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ShowOptionsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.ShowOptionsResponse";
                };

                return ShowOptionsResponse;
            })();

            protocol.RoomSummary = (function() {

                /**
                 * Properties of a RoomSummary.
                 * @memberof miti99.caro.protocol
                 * @interface IRoomSummary
                 * @property {number|null} [roomId] RoomSummary roomId
                 * @property {string|null} [roomOwner] RoomSummary roomOwner
                 * @property {number|null} [roomClientCount] RoomSummary roomClientCount
                 * @property {string|null} [roomType] RoomSummary roomType
                 */

                /**
                 * Constructs a new RoomSummary.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a RoomSummary.
                 * @implements IRoomSummary
                 * @constructor
                 * @param {miti99.caro.protocol.IRoomSummary=} [properties] Properties to set
                 */
                function RoomSummary(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RoomSummary roomId.
                 * @member {number} roomId
                 * @memberof miti99.caro.protocol.RoomSummary
                 * @instance
                 */
                RoomSummary.prototype.roomId = 0;

                /**
                 * RoomSummary roomOwner.
                 * @member {string} roomOwner
                 * @memberof miti99.caro.protocol.RoomSummary
                 * @instance
                 */
                RoomSummary.prototype.roomOwner = "";

                /**
                 * RoomSummary roomClientCount.
                 * @member {number} roomClientCount
                 * @memberof miti99.caro.protocol.RoomSummary
                 * @instance
                 */
                RoomSummary.prototype.roomClientCount = 0;

                /**
                 * RoomSummary roomType.
                 * @member {string} roomType
                 * @memberof miti99.caro.protocol.RoomSummary
                 * @instance
                 */
                RoomSummary.prototype.roomType = "";

                /**
                 * Creates a new RoomSummary instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.RoomSummary
                 * @static
                 * @param {miti99.caro.protocol.IRoomSummary=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.RoomSummary} RoomSummary instance
                 */
                RoomSummary.create = function create(properties) {
                    return new RoomSummary(properties);
                };

                /**
                 * Encodes the specified RoomSummary message. Does not implicitly {@link miti99.caro.protocol.RoomSummary.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.RoomSummary
                 * @static
                 * @param {miti99.caro.protocol.IRoomSummary} message RoomSummary message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RoomSummary.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roomId);
                    if (message.roomOwner != null && Object.hasOwnProperty.call(message, "roomOwner"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.roomOwner);
                    if (message.roomClientCount != null && Object.hasOwnProperty.call(message, "roomClientCount"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.roomClientCount);
                    if (message.roomType != null && Object.hasOwnProperty.call(message, "roomType"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.roomType);
                    return writer;
                };

                /**
                 * Encodes the specified RoomSummary message, length delimited. Does not implicitly {@link miti99.caro.protocol.RoomSummary.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.RoomSummary
                 * @static
                 * @param {miti99.caro.protocol.IRoomSummary} message RoomSummary message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RoomSummary.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a RoomSummary message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.RoomSummary
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.RoomSummary} RoomSummary
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RoomSummary.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.RoomSummary();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.roomId = reader.int32();
                                break;
                            }
                        case 2: {
                                message.roomOwner = reader.string();
                                break;
                            }
                        case 3: {
                                message.roomClientCount = reader.int32();
                                break;
                            }
                        case 4: {
                                message.roomType = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a RoomSummary message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.RoomSummary
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.RoomSummary} RoomSummary
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RoomSummary.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RoomSummary message.
                 * @function verify
                 * @memberof miti99.caro.protocol.RoomSummary
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RoomSummary.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        if (!$util.isInteger(message.roomId))
                            return "roomId: integer expected";
                    if (message.roomOwner != null && message.hasOwnProperty("roomOwner"))
                        if (!$util.isString(message.roomOwner))
                            return "roomOwner: string expected";
                    if (message.roomClientCount != null && message.hasOwnProperty("roomClientCount"))
                        if (!$util.isInteger(message.roomClientCount))
                            return "roomClientCount: integer expected";
                    if (message.roomType != null && message.hasOwnProperty("roomType"))
                        if (!$util.isString(message.roomType))
                            return "roomType: string expected";
                    return null;
                };

                /**
                 * Creates a RoomSummary message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.RoomSummary
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.RoomSummary} RoomSummary
                 */
                RoomSummary.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.RoomSummary)
                        return object;
                    let message = new $root.miti99.caro.protocol.RoomSummary();
                    if (object.roomId != null)
                        message.roomId = object.roomId | 0;
                    if (object.roomOwner != null)
                        message.roomOwner = String(object.roomOwner);
                    if (object.roomClientCount != null)
                        message.roomClientCount = object.roomClientCount | 0;
                    if (object.roomType != null)
                        message.roomType = String(object.roomType);
                    return message;
                };

                /**
                 * Creates a plain object from a RoomSummary message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.RoomSummary
                 * @static
                 * @param {miti99.caro.protocol.RoomSummary} message RoomSummary
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RoomSummary.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.roomId = 0;
                        object.roomOwner = "";
                        object.roomClientCount = 0;
                        object.roomType = "";
                    }
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        object.roomId = message.roomId;
                    if (message.roomOwner != null && message.hasOwnProperty("roomOwner"))
                        object.roomOwner = message.roomOwner;
                    if (message.roomClientCount != null && message.hasOwnProperty("roomClientCount"))
                        object.roomClientCount = message.roomClientCount;
                    if (message.roomType != null && message.hasOwnProperty("roomType"))
                        object.roomType = message.roomType;
                    return object;
                };

                /**
                 * Converts this RoomSummary to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.RoomSummary
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RoomSummary.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RoomSummary
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.RoomSummary
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RoomSummary.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.RoomSummary";
                };

                return RoomSummary;
            })();

            protocol.ShowRoomsResponse = (function() {

                /**
                 * Properties of a ShowRoomsResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IShowRoomsResponse
                 * @property {Array.<miti99.caro.protocol.IRoomSummary>|null} [rooms] ShowRoomsResponse rooms
                 */

                /**
                 * Constructs a new ShowRoomsResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a ShowRoomsResponse.
                 * @implements IShowRoomsResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IShowRoomsResponse=} [properties] Properties to set
                 */
                function ShowRoomsResponse(properties) {
                    this.rooms = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ShowRoomsResponse rooms.
                 * @member {Array.<miti99.caro.protocol.IRoomSummary>} rooms
                 * @memberof miti99.caro.protocol.ShowRoomsResponse
                 * @instance
                 */
                ShowRoomsResponse.prototype.rooms = $util.emptyArray;

                /**
                 * Creates a new ShowRoomsResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.ShowRoomsResponse
                 * @static
                 * @param {miti99.caro.protocol.IShowRoomsResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.ShowRoomsResponse} ShowRoomsResponse instance
                 */
                ShowRoomsResponse.create = function create(properties) {
                    return new ShowRoomsResponse(properties);
                };

                /**
                 * Encodes the specified ShowRoomsResponse message. Does not implicitly {@link miti99.caro.protocol.ShowRoomsResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.ShowRoomsResponse
                 * @static
                 * @param {miti99.caro.protocol.IShowRoomsResponse} message ShowRoomsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ShowRoomsResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.rooms != null && message.rooms.length)
                        for (let i = 0; i < message.rooms.length; ++i)
                            $root.miti99.caro.protocol.RoomSummary.encode(message.rooms[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ShowRoomsResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.ShowRoomsResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.ShowRoomsResponse
                 * @static
                 * @param {miti99.caro.protocol.IShowRoomsResponse} message ShowRoomsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ShowRoomsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ShowRoomsResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.ShowRoomsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.ShowRoomsResponse} ShowRoomsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ShowRoomsResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.ShowRoomsResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                if (!(message.rooms && message.rooms.length))
                                    message.rooms = [];
                                message.rooms.push($root.miti99.caro.protocol.RoomSummary.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ShowRoomsResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.ShowRoomsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.ShowRoomsResponse} ShowRoomsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ShowRoomsResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ShowRoomsResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.ShowRoomsResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ShowRoomsResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.rooms != null && message.hasOwnProperty("rooms")) {
                        if (!Array.isArray(message.rooms))
                            return "rooms: array expected";
                        for (let i = 0; i < message.rooms.length; ++i) {
                            let error = $root.miti99.caro.protocol.RoomSummary.verify(message.rooms[i]);
                            if (error)
                                return "rooms." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a ShowRoomsResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.ShowRoomsResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.ShowRoomsResponse} ShowRoomsResponse
                 */
                ShowRoomsResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.ShowRoomsResponse)
                        return object;
                    let message = new $root.miti99.caro.protocol.ShowRoomsResponse();
                    if (object.rooms) {
                        if (!Array.isArray(object.rooms))
                            throw TypeError(".miti99.caro.protocol.ShowRoomsResponse.rooms: array expected");
                        message.rooms = [];
                        for (let i = 0; i < object.rooms.length; ++i) {
                            if (typeof object.rooms[i] !== "object")
                                throw TypeError(".miti99.caro.protocol.ShowRoomsResponse.rooms: object expected");
                            message.rooms[i] = $root.miti99.caro.protocol.RoomSummary.fromObject(object.rooms[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ShowRoomsResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.ShowRoomsResponse
                 * @static
                 * @param {miti99.caro.protocol.ShowRoomsResponse} message ShowRoomsResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ShowRoomsResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.rooms = [];
                    if (message.rooms && message.rooms.length) {
                        object.rooms = [];
                        for (let j = 0; j < message.rooms.length; ++j)
                            object.rooms[j] = $root.miti99.caro.protocol.RoomSummary.toObject(message.rooms[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this ShowRoomsResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.ShowRoomsResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ShowRoomsResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ShowRoomsResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.ShowRoomsResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ShowRoomsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.ShowRoomsResponse";
                };

                return ShowRoomsResponse;
            })();

            protocol.RoomCreateSuccessResponse = (function() {

                /**
                 * Properties of a RoomCreateSuccessResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IRoomCreateSuccessResponse
                 * @property {number|null} [id] RoomCreateSuccessResponse id
                 * @property {string|null} [roomOwner] RoomCreateSuccessResponse roomOwner
                 * @property {string|null} [roomType] RoomCreateSuccessResponse roomType
                 */

                /**
                 * Constructs a new RoomCreateSuccessResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a RoomCreateSuccessResponse.
                 * @implements IRoomCreateSuccessResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IRoomCreateSuccessResponse=} [properties] Properties to set
                 */
                function RoomCreateSuccessResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RoomCreateSuccessResponse id.
                 * @member {number} id
                 * @memberof miti99.caro.protocol.RoomCreateSuccessResponse
                 * @instance
                 */
                RoomCreateSuccessResponse.prototype.id = 0;

                /**
                 * RoomCreateSuccessResponse roomOwner.
                 * @member {string} roomOwner
                 * @memberof miti99.caro.protocol.RoomCreateSuccessResponse
                 * @instance
                 */
                RoomCreateSuccessResponse.prototype.roomOwner = "";

                /**
                 * RoomCreateSuccessResponse roomType.
                 * @member {string} roomType
                 * @memberof miti99.caro.protocol.RoomCreateSuccessResponse
                 * @instance
                 */
                RoomCreateSuccessResponse.prototype.roomType = "";

                /**
                 * Creates a new RoomCreateSuccessResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.RoomCreateSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.IRoomCreateSuccessResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.RoomCreateSuccessResponse} RoomCreateSuccessResponse instance
                 */
                RoomCreateSuccessResponse.create = function create(properties) {
                    return new RoomCreateSuccessResponse(properties);
                };

                /**
                 * Encodes the specified RoomCreateSuccessResponse message. Does not implicitly {@link miti99.caro.protocol.RoomCreateSuccessResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.RoomCreateSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.IRoomCreateSuccessResponse} message RoomCreateSuccessResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RoomCreateSuccessResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                    if (message.roomOwner != null && Object.hasOwnProperty.call(message, "roomOwner"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.roomOwner);
                    if (message.roomType != null && Object.hasOwnProperty.call(message, "roomType"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.roomType);
                    return writer;
                };

                /**
                 * Encodes the specified RoomCreateSuccessResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.RoomCreateSuccessResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.RoomCreateSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.IRoomCreateSuccessResponse} message RoomCreateSuccessResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RoomCreateSuccessResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a RoomCreateSuccessResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.RoomCreateSuccessResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.RoomCreateSuccessResponse} RoomCreateSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RoomCreateSuccessResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.RoomCreateSuccessResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.id = reader.int32();
                                break;
                            }
                        case 2: {
                                message.roomOwner = reader.string();
                                break;
                            }
                        case 3: {
                                message.roomType = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a RoomCreateSuccessResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.RoomCreateSuccessResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.RoomCreateSuccessResponse} RoomCreateSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RoomCreateSuccessResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RoomCreateSuccessResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.RoomCreateSuccessResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RoomCreateSuccessResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isInteger(message.id))
                            return "id: integer expected";
                    if (message.roomOwner != null && message.hasOwnProperty("roomOwner"))
                        if (!$util.isString(message.roomOwner))
                            return "roomOwner: string expected";
                    if (message.roomType != null && message.hasOwnProperty("roomType"))
                        if (!$util.isString(message.roomType))
                            return "roomType: string expected";
                    return null;
                };

                /**
                 * Creates a RoomCreateSuccessResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.RoomCreateSuccessResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.RoomCreateSuccessResponse} RoomCreateSuccessResponse
                 */
                RoomCreateSuccessResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.RoomCreateSuccessResponse)
                        return object;
                    let message = new $root.miti99.caro.protocol.RoomCreateSuccessResponse();
                    if (object.id != null)
                        message.id = object.id | 0;
                    if (object.roomOwner != null)
                        message.roomOwner = String(object.roomOwner);
                    if (object.roomType != null)
                        message.roomType = String(object.roomType);
                    return message;
                };

                /**
                 * Creates a plain object from a RoomCreateSuccessResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.RoomCreateSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.RoomCreateSuccessResponse} message RoomCreateSuccessResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RoomCreateSuccessResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.id = 0;
                        object.roomOwner = "";
                        object.roomType = "";
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.roomOwner != null && message.hasOwnProperty("roomOwner"))
                        object.roomOwner = message.roomOwner;
                    if (message.roomType != null && message.hasOwnProperty("roomType"))
                        object.roomType = message.roomType;
                    return object;
                };

                /**
                 * Converts this RoomCreateSuccessResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.RoomCreateSuccessResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RoomCreateSuccessResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RoomCreateSuccessResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.RoomCreateSuccessResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RoomCreateSuccessResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.RoomCreateSuccessResponse";
                };

                return RoomCreateSuccessResponse;
            })();

            protocol.RoomJoinSuccessResponse = (function() {

                /**
                 * Properties of a RoomJoinSuccessResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IRoomJoinSuccessResponse
                 * @property {number|null} [clientId] RoomJoinSuccessResponse clientId
                 * @property {string|null} [clientNickname] RoomJoinSuccessResponse clientNickname
                 * @property {number|null} [roomId] RoomJoinSuccessResponse roomId
                 * @property {string|null} [roomOwner] RoomJoinSuccessResponse roomOwner
                 * @property {number|null} [roomClientCount] RoomJoinSuccessResponse roomClientCount
                 */

                /**
                 * Constructs a new RoomJoinSuccessResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a RoomJoinSuccessResponse.
                 * @implements IRoomJoinSuccessResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IRoomJoinSuccessResponse=} [properties] Properties to set
                 */
                function RoomJoinSuccessResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RoomJoinSuccessResponse clientId.
                 * @member {number} clientId
                 * @memberof miti99.caro.protocol.RoomJoinSuccessResponse
                 * @instance
                 */
                RoomJoinSuccessResponse.prototype.clientId = 0;

                /**
                 * RoomJoinSuccessResponse clientNickname.
                 * @member {string} clientNickname
                 * @memberof miti99.caro.protocol.RoomJoinSuccessResponse
                 * @instance
                 */
                RoomJoinSuccessResponse.prototype.clientNickname = "";

                /**
                 * RoomJoinSuccessResponse roomId.
                 * @member {number} roomId
                 * @memberof miti99.caro.protocol.RoomJoinSuccessResponse
                 * @instance
                 */
                RoomJoinSuccessResponse.prototype.roomId = 0;

                /**
                 * RoomJoinSuccessResponse roomOwner.
                 * @member {string} roomOwner
                 * @memberof miti99.caro.protocol.RoomJoinSuccessResponse
                 * @instance
                 */
                RoomJoinSuccessResponse.prototype.roomOwner = "";

                /**
                 * RoomJoinSuccessResponse roomClientCount.
                 * @member {number} roomClientCount
                 * @memberof miti99.caro.protocol.RoomJoinSuccessResponse
                 * @instance
                 */
                RoomJoinSuccessResponse.prototype.roomClientCount = 0;

                /**
                 * Creates a new RoomJoinSuccessResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.RoomJoinSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.IRoomJoinSuccessResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.RoomJoinSuccessResponse} RoomJoinSuccessResponse instance
                 */
                RoomJoinSuccessResponse.create = function create(properties) {
                    return new RoomJoinSuccessResponse(properties);
                };

                /**
                 * Encodes the specified RoomJoinSuccessResponse message. Does not implicitly {@link miti99.caro.protocol.RoomJoinSuccessResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.RoomJoinSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.IRoomJoinSuccessResponse} message RoomJoinSuccessResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RoomJoinSuccessResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.clientId);
                    if (message.clientNickname != null && Object.hasOwnProperty.call(message, "clientNickname"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.clientNickname);
                    if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.roomId);
                    if (message.roomOwner != null && Object.hasOwnProperty.call(message, "roomOwner"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.roomOwner);
                    if (message.roomClientCount != null && Object.hasOwnProperty.call(message, "roomClientCount"))
                        writer.uint32(/* id 5, wireType 0 =*/40).int32(message.roomClientCount);
                    return writer;
                };

                /**
                 * Encodes the specified RoomJoinSuccessResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.RoomJoinSuccessResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.RoomJoinSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.IRoomJoinSuccessResponse} message RoomJoinSuccessResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RoomJoinSuccessResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a RoomJoinSuccessResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.RoomJoinSuccessResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.RoomJoinSuccessResponse} RoomJoinSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RoomJoinSuccessResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.RoomJoinSuccessResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.clientId = reader.int32();
                                break;
                            }
                        case 2: {
                                message.clientNickname = reader.string();
                                break;
                            }
                        case 3: {
                                message.roomId = reader.int32();
                                break;
                            }
                        case 4: {
                                message.roomOwner = reader.string();
                                break;
                            }
                        case 5: {
                                message.roomClientCount = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a RoomJoinSuccessResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.RoomJoinSuccessResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.RoomJoinSuccessResponse} RoomJoinSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RoomJoinSuccessResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RoomJoinSuccessResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.RoomJoinSuccessResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RoomJoinSuccessResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.clientId != null && message.hasOwnProperty("clientId"))
                        if (!$util.isInteger(message.clientId))
                            return "clientId: integer expected";
                    if (message.clientNickname != null && message.hasOwnProperty("clientNickname"))
                        if (!$util.isString(message.clientNickname))
                            return "clientNickname: string expected";
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        if (!$util.isInteger(message.roomId))
                            return "roomId: integer expected";
                    if (message.roomOwner != null && message.hasOwnProperty("roomOwner"))
                        if (!$util.isString(message.roomOwner))
                            return "roomOwner: string expected";
                    if (message.roomClientCount != null && message.hasOwnProperty("roomClientCount"))
                        if (!$util.isInteger(message.roomClientCount))
                            return "roomClientCount: integer expected";
                    return null;
                };

                /**
                 * Creates a RoomJoinSuccessResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.RoomJoinSuccessResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.RoomJoinSuccessResponse} RoomJoinSuccessResponse
                 */
                RoomJoinSuccessResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.RoomJoinSuccessResponse)
                        return object;
                    let message = new $root.miti99.caro.protocol.RoomJoinSuccessResponse();
                    if (object.clientId != null)
                        message.clientId = object.clientId | 0;
                    if (object.clientNickname != null)
                        message.clientNickname = String(object.clientNickname);
                    if (object.roomId != null)
                        message.roomId = object.roomId | 0;
                    if (object.roomOwner != null)
                        message.roomOwner = String(object.roomOwner);
                    if (object.roomClientCount != null)
                        message.roomClientCount = object.roomClientCount | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a RoomJoinSuccessResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.RoomJoinSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.RoomJoinSuccessResponse} message RoomJoinSuccessResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RoomJoinSuccessResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.clientId = 0;
                        object.clientNickname = "";
                        object.roomId = 0;
                        object.roomOwner = "";
                        object.roomClientCount = 0;
                    }
                    if (message.clientId != null && message.hasOwnProperty("clientId"))
                        object.clientId = message.clientId;
                    if (message.clientNickname != null && message.hasOwnProperty("clientNickname"))
                        object.clientNickname = message.clientNickname;
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        object.roomId = message.roomId;
                    if (message.roomOwner != null && message.hasOwnProperty("roomOwner"))
                        object.roomOwner = message.roomOwner;
                    if (message.roomClientCount != null && message.hasOwnProperty("roomClientCount"))
                        object.roomClientCount = message.roomClientCount;
                    return object;
                };

                /**
                 * Converts this RoomJoinSuccessResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.RoomJoinSuccessResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RoomJoinSuccessResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RoomJoinSuccessResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.RoomJoinSuccessResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RoomJoinSuccessResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.RoomJoinSuccessResponse";
                };

                return RoomJoinSuccessResponse;
            })();

            protocol.RoomJoinFailFullResponse = (function() {

                /**
                 * Properties of a RoomJoinFailFullResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IRoomJoinFailFullResponse
                 * @property {number|null} [roomId] RoomJoinFailFullResponse roomId
                 * @property {string|null} [roomOwner] RoomJoinFailFullResponse roomOwner
                 */

                /**
                 * Constructs a new RoomJoinFailFullResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a RoomJoinFailFullResponse.
                 * @implements IRoomJoinFailFullResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IRoomJoinFailFullResponse=} [properties] Properties to set
                 */
                function RoomJoinFailFullResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RoomJoinFailFullResponse roomId.
                 * @member {number} roomId
                 * @memberof miti99.caro.protocol.RoomJoinFailFullResponse
                 * @instance
                 */
                RoomJoinFailFullResponse.prototype.roomId = 0;

                /**
                 * RoomJoinFailFullResponse roomOwner.
                 * @member {string} roomOwner
                 * @memberof miti99.caro.protocol.RoomJoinFailFullResponse
                 * @instance
                 */
                RoomJoinFailFullResponse.prototype.roomOwner = "";

                /**
                 * Creates a new RoomJoinFailFullResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.RoomJoinFailFullResponse
                 * @static
                 * @param {miti99.caro.protocol.IRoomJoinFailFullResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.RoomJoinFailFullResponse} RoomJoinFailFullResponse instance
                 */
                RoomJoinFailFullResponse.create = function create(properties) {
                    return new RoomJoinFailFullResponse(properties);
                };

                /**
                 * Encodes the specified RoomJoinFailFullResponse message. Does not implicitly {@link miti99.caro.protocol.RoomJoinFailFullResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.RoomJoinFailFullResponse
                 * @static
                 * @param {miti99.caro.protocol.IRoomJoinFailFullResponse} message RoomJoinFailFullResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RoomJoinFailFullResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roomId);
                    if (message.roomOwner != null && Object.hasOwnProperty.call(message, "roomOwner"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.roomOwner);
                    return writer;
                };

                /**
                 * Encodes the specified RoomJoinFailFullResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.RoomJoinFailFullResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.RoomJoinFailFullResponse
                 * @static
                 * @param {miti99.caro.protocol.IRoomJoinFailFullResponse} message RoomJoinFailFullResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RoomJoinFailFullResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a RoomJoinFailFullResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.RoomJoinFailFullResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.RoomJoinFailFullResponse} RoomJoinFailFullResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RoomJoinFailFullResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.RoomJoinFailFullResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.roomId = reader.int32();
                                break;
                            }
                        case 2: {
                                message.roomOwner = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a RoomJoinFailFullResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.RoomJoinFailFullResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.RoomJoinFailFullResponse} RoomJoinFailFullResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RoomJoinFailFullResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RoomJoinFailFullResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.RoomJoinFailFullResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RoomJoinFailFullResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        if (!$util.isInteger(message.roomId))
                            return "roomId: integer expected";
                    if (message.roomOwner != null && message.hasOwnProperty("roomOwner"))
                        if (!$util.isString(message.roomOwner))
                            return "roomOwner: string expected";
                    return null;
                };

                /**
                 * Creates a RoomJoinFailFullResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.RoomJoinFailFullResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.RoomJoinFailFullResponse} RoomJoinFailFullResponse
                 */
                RoomJoinFailFullResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.RoomJoinFailFullResponse)
                        return object;
                    let message = new $root.miti99.caro.protocol.RoomJoinFailFullResponse();
                    if (object.roomId != null)
                        message.roomId = object.roomId | 0;
                    if (object.roomOwner != null)
                        message.roomOwner = String(object.roomOwner);
                    return message;
                };

                /**
                 * Creates a plain object from a RoomJoinFailFullResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.RoomJoinFailFullResponse
                 * @static
                 * @param {miti99.caro.protocol.RoomJoinFailFullResponse} message RoomJoinFailFullResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RoomJoinFailFullResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.roomId = 0;
                        object.roomOwner = "";
                    }
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        object.roomId = message.roomId;
                    if (message.roomOwner != null && message.hasOwnProperty("roomOwner"))
                        object.roomOwner = message.roomOwner;
                    return object;
                };

                /**
                 * Converts this RoomJoinFailFullResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.RoomJoinFailFullResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RoomJoinFailFullResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RoomJoinFailFullResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.RoomJoinFailFullResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RoomJoinFailFullResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.RoomJoinFailFullResponse";
                };

                return RoomJoinFailFullResponse;
            })();

            protocol.RoomJoinFailNotFoundResponse = (function() {

                /**
                 * Properties of a RoomJoinFailNotFoundResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IRoomJoinFailNotFoundResponse
                 * @property {number|null} [roomId] RoomJoinFailNotFoundResponse roomId
                 */

                /**
                 * Constructs a new RoomJoinFailNotFoundResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a RoomJoinFailNotFoundResponse.
                 * @implements IRoomJoinFailNotFoundResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IRoomJoinFailNotFoundResponse=} [properties] Properties to set
                 */
                function RoomJoinFailNotFoundResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RoomJoinFailNotFoundResponse roomId.
                 * @member {number} roomId
                 * @memberof miti99.caro.protocol.RoomJoinFailNotFoundResponse
                 * @instance
                 */
                RoomJoinFailNotFoundResponse.prototype.roomId = 0;

                /**
                 * Creates a new RoomJoinFailNotFoundResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.RoomJoinFailNotFoundResponse
                 * @static
                 * @param {miti99.caro.protocol.IRoomJoinFailNotFoundResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.RoomJoinFailNotFoundResponse} RoomJoinFailNotFoundResponse instance
                 */
                RoomJoinFailNotFoundResponse.create = function create(properties) {
                    return new RoomJoinFailNotFoundResponse(properties);
                };

                /**
                 * Encodes the specified RoomJoinFailNotFoundResponse message. Does not implicitly {@link miti99.caro.protocol.RoomJoinFailNotFoundResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.RoomJoinFailNotFoundResponse
                 * @static
                 * @param {miti99.caro.protocol.IRoomJoinFailNotFoundResponse} message RoomJoinFailNotFoundResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RoomJoinFailNotFoundResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roomId);
                    return writer;
                };

                /**
                 * Encodes the specified RoomJoinFailNotFoundResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.RoomJoinFailNotFoundResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.RoomJoinFailNotFoundResponse
                 * @static
                 * @param {miti99.caro.protocol.IRoomJoinFailNotFoundResponse} message RoomJoinFailNotFoundResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RoomJoinFailNotFoundResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a RoomJoinFailNotFoundResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.RoomJoinFailNotFoundResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.RoomJoinFailNotFoundResponse} RoomJoinFailNotFoundResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RoomJoinFailNotFoundResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.RoomJoinFailNotFoundResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.roomId = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a RoomJoinFailNotFoundResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.RoomJoinFailNotFoundResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.RoomJoinFailNotFoundResponse} RoomJoinFailNotFoundResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RoomJoinFailNotFoundResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RoomJoinFailNotFoundResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.RoomJoinFailNotFoundResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RoomJoinFailNotFoundResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        if (!$util.isInteger(message.roomId))
                            return "roomId: integer expected";
                    return null;
                };

                /**
                 * Creates a RoomJoinFailNotFoundResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.RoomJoinFailNotFoundResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.RoomJoinFailNotFoundResponse} RoomJoinFailNotFoundResponse
                 */
                RoomJoinFailNotFoundResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.RoomJoinFailNotFoundResponse)
                        return object;
                    let message = new $root.miti99.caro.protocol.RoomJoinFailNotFoundResponse();
                    if (object.roomId != null)
                        message.roomId = object.roomId | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a RoomJoinFailNotFoundResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.RoomJoinFailNotFoundResponse
                 * @static
                 * @param {miti99.caro.protocol.RoomJoinFailNotFoundResponse} message RoomJoinFailNotFoundResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RoomJoinFailNotFoundResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.roomId = 0;
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        object.roomId = message.roomId;
                    return object;
                };

                /**
                 * Converts this RoomJoinFailNotFoundResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.RoomJoinFailNotFoundResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RoomJoinFailNotFoundResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RoomJoinFailNotFoundResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.RoomJoinFailNotFoundResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RoomJoinFailNotFoundResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.RoomJoinFailNotFoundResponse";
                };

                return RoomJoinFailNotFoundResponse;
            })();

            protocol.RoomPlayFailNotFoundResponse = (function() {

                /**
                 * Properties of a RoomPlayFailNotFoundResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IRoomPlayFailNotFoundResponse
                 */

                /**
                 * Constructs a new RoomPlayFailNotFoundResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a RoomPlayFailNotFoundResponse.
                 * @implements IRoomPlayFailNotFoundResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IRoomPlayFailNotFoundResponse=} [properties] Properties to set
                 */
                function RoomPlayFailNotFoundResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new RoomPlayFailNotFoundResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.RoomPlayFailNotFoundResponse
                 * @static
                 * @param {miti99.caro.protocol.IRoomPlayFailNotFoundResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.RoomPlayFailNotFoundResponse} RoomPlayFailNotFoundResponse instance
                 */
                RoomPlayFailNotFoundResponse.create = function create(properties) {
                    return new RoomPlayFailNotFoundResponse(properties);
                };

                /**
                 * Encodes the specified RoomPlayFailNotFoundResponse message. Does not implicitly {@link miti99.caro.protocol.RoomPlayFailNotFoundResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.RoomPlayFailNotFoundResponse
                 * @static
                 * @param {miti99.caro.protocol.IRoomPlayFailNotFoundResponse} message RoomPlayFailNotFoundResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RoomPlayFailNotFoundResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified RoomPlayFailNotFoundResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.RoomPlayFailNotFoundResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.RoomPlayFailNotFoundResponse
                 * @static
                 * @param {miti99.caro.protocol.IRoomPlayFailNotFoundResponse} message RoomPlayFailNotFoundResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RoomPlayFailNotFoundResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a RoomPlayFailNotFoundResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.RoomPlayFailNotFoundResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.RoomPlayFailNotFoundResponse} RoomPlayFailNotFoundResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RoomPlayFailNotFoundResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.RoomPlayFailNotFoundResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a RoomPlayFailNotFoundResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.RoomPlayFailNotFoundResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.RoomPlayFailNotFoundResponse} RoomPlayFailNotFoundResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RoomPlayFailNotFoundResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RoomPlayFailNotFoundResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.RoomPlayFailNotFoundResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RoomPlayFailNotFoundResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a RoomPlayFailNotFoundResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.RoomPlayFailNotFoundResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.RoomPlayFailNotFoundResponse} RoomPlayFailNotFoundResponse
                 */
                RoomPlayFailNotFoundResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.RoomPlayFailNotFoundResponse)
                        return object;
                    return new $root.miti99.caro.protocol.RoomPlayFailNotFoundResponse();
                };

                /**
                 * Creates a plain object from a RoomPlayFailNotFoundResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.RoomPlayFailNotFoundResponse
                 * @static
                 * @param {miti99.caro.protocol.RoomPlayFailNotFoundResponse} message RoomPlayFailNotFoundResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RoomPlayFailNotFoundResponse.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this RoomPlayFailNotFoundResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.RoomPlayFailNotFoundResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RoomPlayFailNotFoundResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RoomPlayFailNotFoundResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.RoomPlayFailNotFoundResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RoomPlayFailNotFoundResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.RoomPlayFailNotFoundResponse";
                };

                return RoomPlayFailNotFoundResponse;
            })();

            protocol.GameStartingResponse = (function() {

                /**
                 * Properties of a GameStartingResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IGameStartingResponse
                 * @property {number|null} [roomId] GameStartingResponse roomId
                 * @property {number|null} [blackPlayerId] GameStartingResponse blackPlayerId
                 * @property {string|null} [blackPlayerNickname] GameStartingResponse blackPlayerNickname
                 * @property {number|null} [whitePlayerId] GameStartingResponse whitePlayerId
                 * @property {string|null} [whitePlayerNickname] GameStartingResponse whitePlayerNickname
                 * @property {number|null} [boardSize] GameStartingResponse boardSize
                 */

                /**
                 * Constructs a new GameStartingResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a GameStartingResponse.
                 * @implements IGameStartingResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IGameStartingResponse=} [properties] Properties to set
                 */
                function GameStartingResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GameStartingResponse roomId.
                 * @member {number} roomId
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @instance
                 */
                GameStartingResponse.prototype.roomId = 0;

                /**
                 * GameStartingResponse blackPlayerId.
                 * @member {number} blackPlayerId
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @instance
                 */
                GameStartingResponse.prototype.blackPlayerId = 0;

                /**
                 * GameStartingResponse blackPlayerNickname.
                 * @member {string} blackPlayerNickname
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @instance
                 */
                GameStartingResponse.prototype.blackPlayerNickname = "";

                /**
                 * GameStartingResponse whitePlayerId.
                 * @member {number} whitePlayerId
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @instance
                 */
                GameStartingResponse.prototype.whitePlayerId = 0;

                /**
                 * GameStartingResponse whitePlayerNickname.
                 * @member {string} whitePlayerNickname
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @instance
                 */
                GameStartingResponse.prototype.whitePlayerNickname = "";

                /**
                 * GameStartingResponse boardSize.
                 * @member {number} boardSize
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @instance
                 */
                GameStartingResponse.prototype.boardSize = 0;

                /**
                 * Creates a new GameStartingResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameStartingResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.GameStartingResponse} GameStartingResponse instance
                 */
                GameStartingResponse.create = function create(properties) {
                    return new GameStartingResponse(properties);
                };

                /**
                 * Encodes the specified GameStartingResponse message. Does not implicitly {@link miti99.caro.protocol.GameStartingResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameStartingResponse} message GameStartingResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameStartingResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roomId);
                    if (message.blackPlayerId != null && Object.hasOwnProperty.call(message, "blackPlayerId"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.blackPlayerId);
                    if (message.blackPlayerNickname != null && Object.hasOwnProperty.call(message, "blackPlayerNickname"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.blackPlayerNickname);
                    if (message.whitePlayerId != null && Object.hasOwnProperty.call(message, "whitePlayerId"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.whitePlayerId);
                    if (message.whitePlayerNickname != null && Object.hasOwnProperty.call(message, "whitePlayerNickname"))
                        writer.uint32(/* id 5, wireType 2 =*/42).string(message.whitePlayerNickname);
                    if (message.boardSize != null && Object.hasOwnProperty.call(message, "boardSize"))
                        writer.uint32(/* id 6, wireType 0 =*/48).int32(message.boardSize);
                    return writer;
                };

                /**
                 * Encodes the specified GameStartingResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameStartingResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameStartingResponse} message GameStartingResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameStartingResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GameStartingResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.GameStartingResponse} GameStartingResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameStartingResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.GameStartingResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.roomId = reader.int32();
                                break;
                            }
                        case 2: {
                                message.blackPlayerId = reader.int32();
                                break;
                            }
                        case 3: {
                                message.blackPlayerNickname = reader.string();
                                break;
                            }
                        case 4: {
                                message.whitePlayerId = reader.int32();
                                break;
                            }
                        case 5: {
                                message.whitePlayerNickname = reader.string();
                                break;
                            }
                        case 6: {
                                message.boardSize = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GameStartingResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.GameStartingResponse} GameStartingResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameStartingResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GameStartingResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GameStartingResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        if (!$util.isInteger(message.roomId))
                            return "roomId: integer expected";
                    if (message.blackPlayerId != null && message.hasOwnProperty("blackPlayerId"))
                        if (!$util.isInteger(message.blackPlayerId))
                            return "blackPlayerId: integer expected";
                    if (message.blackPlayerNickname != null && message.hasOwnProperty("blackPlayerNickname"))
                        if (!$util.isString(message.blackPlayerNickname))
                            return "blackPlayerNickname: string expected";
                    if (message.whitePlayerId != null && message.hasOwnProperty("whitePlayerId"))
                        if (!$util.isInteger(message.whitePlayerId))
                            return "whitePlayerId: integer expected";
                    if (message.whitePlayerNickname != null && message.hasOwnProperty("whitePlayerNickname"))
                        if (!$util.isString(message.whitePlayerNickname))
                            return "whitePlayerNickname: string expected";
                    if (message.boardSize != null && message.hasOwnProperty("boardSize"))
                        if (!$util.isInteger(message.boardSize))
                            return "boardSize: integer expected";
                    return null;
                };

                /**
                 * Creates a GameStartingResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.GameStartingResponse} GameStartingResponse
                 */
                GameStartingResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.GameStartingResponse)
                        return object;
                    let message = new $root.miti99.caro.protocol.GameStartingResponse();
                    if (object.roomId != null)
                        message.roomId = object.roomId | 0;
                    if (object.blackPlayerId != null)
                        message.blackPlayerId = object.blackPlayerId | 0;
                    if (object.blackPlayerNickname != null)
                        message.blackPlayerNickname = String(object.blackPlayerNickname);
                    if (object.whitePlayerId != null)
                        message.whitePlayerId = object.whitePlayerId | 0;
                    if (object.whitePlayerNickname != null)
                        message.whitePlayerNickname = String(object.whitePlayerNickname);
                    if (object.boardSize != null)
                        message.boardSize = object.boardSize | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a GameStartingResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @static
                 * @param {miti99.caro.protocol.GameStartingResponse} message GameStartingResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GameStartingResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.roomId = 0;
                        object.blackPlayerId = 0;
                        object.blackPlayerNickname = "";
                        object.whitePlayerId = 0;
                        object.whitePlayerNickname = "";
                        object.boardSize = 0;
                    }
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        object.roomId = message.roomId;
                    if (message.blackPlayerId != null && message.hasOwnProperty("blackPlayerId"))
                        object.blackPlayerId = message.blackPlayerId;
                    if (message.blackPlayerNickname != null && message.hasOwnProperty("blackPlayerNickname"))
                        object.blackPlayerNickname = message.blackPlayerNickname;
                    if (message.whitePlayerId != null && message.hasOwnProperty("whitePlayerId"))
                        object.whitePlayerId = message.whitePlayerId;
                    if (message.whitePlayerNickname != null && message.hasOwnProperty("whitePlayerNickname"))
                        object.whitePlayerNickname = message.whitePlayerNickname;
                    if (message.boardSize != null && message.hasOwnProperty("boardSize"))
                        object.boardSize = message.boardSize;
                    return object;
                };

                /**
                 * Converts this GameStartingResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GameStartingResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GameStartingResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.GameStartingResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GameStartingResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.GameStartingResponse";
                };

                return GameStartingResponse;
            })();

            protocol.GameReadyResponse = (function() {

                /**
                 * Properties of a GameReadyResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IGameReadyResponse
                 * @property {string|null} [clientNickname] GameReadyResponse clientNickname
                 * @property {string|null} [status] GameReadyResponse status
                 * @property {number|null} [clientId] GameReadyResponse clientId
                 */

                /**
                 * Constructs a new GameReadyResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a GameReadyResponse.
                 * @implements IGameReadyResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IGameReadyResponse=} [properties] Properties to set
                 */
                function GameReadyResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GameReadyResponse clientNickname.
                 * @member {string} clientNickname
                 * @memberof miti99.caro.protocol.GameReadyResponse
                 * @instance
                 */
                GameReadyResponse.prototype.clientNickname = "";

                /**
                 * GameReadyResponse status.
                 * @member {string} status
                 * @memberof miti99.caro.protocol.GameReadyResponse
                 * @instance
                 */
                GameReadyResponse.prototype.status = "";

                /**
                 * GameReadyResponse clientId.
                 * @member {number} clientId
                 * @memberof miti99.caro.protocol.GameReadyResponse
                 * @instance
                 */
                GameReadyResponse.prototype.clientId = 0;

                /**
                 * Creates a new GameReadyResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.GameReadyResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameReadyResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.GameReadyResponse} GameReadyResponse instance
                 */
                GameReadyResponse.create = function create(properties) {
                    return new GameReadyResponse(properties);
                };

                /**
                 * Encodes the specified GameReadyResponse message. Does not implicitly {@link miti99.caro.protocol.GameReadyResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.GameReadyResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameReadyResponse} message GameReadyResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameReadyResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.clientNickname != null && Object.hasOwnProperty.call(message, "clientNickname"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.clientNickname);
                    if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.status);
                    if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.clientId);
                    return writer;
                };

                /**
                 * Encodes the specified GameReadyResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameReadyResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.GameReadyResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameReadyResponse} message GameReadyResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameReadyResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GameReadyResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.GameReadyResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.GameReadyResponse} GameReadyResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameReadyResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.GameReadyResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.clientNickname = reader.string();
                                break;
                            }
                        case 2: {
                                message.status = reader.string();
                                break;
                            }
                        case 3: {
                                message.clientId = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GameReadyResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.GameReadyResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.GameReadyResponse} GameReadyResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameReadyResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GameReadyResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.GameReadyResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GameReadyResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.clientNickname != null && message.hasOwnProperty("clientNickname"))
                        if (!$util.isString(message.clientNickname))
                            return "clientNickname: string expected";
                    if (message.status != null && message.hasOwnProperty("status"))
                        if (!$util.isString(message.status))
                            return "status: string expected";
                    if (message.clientId != null && message.hasOwnProperty("clientId"))
                        if (!$util.isInteger(message.clientId))
                            return "clientId: integer expected";
                    return null;
                };

                /**
                 * Creates a GameReadyResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.GameReadyResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.GameReadyResponse} GameReadyResponse
                 */
                GameReadyResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.GameReadyResponse)
                        return object;
                    let message = new $root.miti99.caro.protocol.GameReadyResponse();
                    if (object.clientNickname != null)
                        message.clientNickname = String(object.clientNickname);
                    if (object.status != null)
                        message.status = String(object.status);
                    if (object.clientId != null)
                        message.clientId = object.clientId | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a GameReadyResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.GameReadyResponse
                 * @static
                 * @param {miti99.caro.protocol.GameReadyResponse} message GameReadyResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GameReadyResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.clientNickname = "";
                        object.status = "";
                        object.clientId = 0;
                    }
                    if (message.clientNickname != null && message.hasOwnProperty("clientNickname"))
                        object.clientNickname = message.clientNickname;
                    if (message.status != null && message.hasOwnProperty("status"))
                        object.status = message.status;
                    if (message.clientId != null && message.hasOwnProperty("clientId"))
                        object.clientId = message.clientId;
                    return object;
                };

                /**
                 * Converts this GameReadyResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.GameReadyResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GameReadyResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GameReadyResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.GameReadyResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GameReadyResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.GameReadyResponse";
                };

                return GameReadyResponse;
            })();

            protocol.GameMoveSuccessResponse = (function() {

                /**
                 * Properties of a GameMoveSuccessResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IGameMoveSuccessResponse
                 * @property {number|null} [row] GameMoveSuccessResponse row
                 * @property {number|null} [col] GameMoveSuccessResponse col
                 * @property {string|null} [piece] GameMoveSuccessResponse piece
                 * @property {string|null} [playerNickname] GameMoveSuccessResponse playerNickname
                 * @property {number|null} [playerId] GameMoveSuccessResponse playerId
                 */

                /**
                 * Constructs a new GameMoveSuccessResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a GameMoveSuccessResponse.
                 * @implements IGameMoveSuccessResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IGameMoveSuccessResponse=} [properties] Properties to set
                 */
                function GameMoveSuccessResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GameMoveSuccessResponse row.
                 * @member {number} row
                 * @memberof miti99.caro.protocol.GameMoveSuccessResponse
                 * @instance
                 */
                GameMoveSuccessResponse.prototype.row = 0;

                /**
                 * GameMoveSuccessResponse col.
                 * @member {number} col
                 * @memberof miti99.caro.protocol.GameMoveSuccessResponse
                 * @instance
                 */
                GameMoveSuccessResponse.prototype.col = 0;

                /**
                 * GameMoveSuccessResponse piece.
                 * @member {string} piece
                 * @memberof miti99.caro.protocol.GameMoveSuccessResponse
                 * @instance
                 */
                GameMoveSuccessResponse.prototype.piece = "";

                /**
                 * GameMoveSuccessResponse playerNickname.
                 * @member {string} playerNickname
                 * @memberof miti99.caro.protocol.GameMoveSuccessResponse
                 * @instance
                 */
                GameMoveSuccessResponse.prototype.playerNickname = "";

                /**
                 * GameMoveSuccessResponse playerId.
                 * @member {number} playerId
                 * @memberof miti99.caro.protocol.GameMoveSuccessResponse
                 * @instance
                 */
                GameMoveSuccessResponse.prototype.playerId = 0;

                /**
                 * Creates a new GameMoveSuccessResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.GameMoveSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveSuccessResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.GameMoveSuccessResponse} GameMoveSuccessResponse instance
                 */
                GameMoveSuccessResponse.create = function create(properties) {
                    return new GameMoveSuccessResponse(properties);
                };

                /**
                 * Encodes the specified GameMoveSuccessResponse message. Does not implicitly {@link miti99.caro.protocol.GameMoveSuccessResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.GameMoveSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveSuccessResponse} message GameMoveSuccessResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameMoveSuccessResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.row != null && Object.hasOwnProperty.call(message, "row"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.row);
                    if (message.col != null && Object.hasOwnProperty.call(message, "col"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.col);
                    if (message.piece != null && Object.hasOwnProperty.call(message, "piece"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.piece);
                    if (message.playerNickname != null && Object.hasOwnProperty.call(message, "playerNickname"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.playerNickname);
                    if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                        writer.uint32(/* id 5, wireType 0 =*/40).int32(message.playerId);
                    return writer;
                };

                /**
                 * Encodes the specified GameMoveSuccessResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameMoveSuccessResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.GameMoveSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveSuccessResponse} message GameMoveSuccessResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameMoveSuccessResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GameMoveSuccessResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.GameMoveSuccessResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.GameMoveSuccessResponse} GameMoveSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameMoveSuccessResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.GameMoveSuccessResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.row = reader.int32();
                                break;
                            }
                        case 2: {
                                message.col = reader.int32();
                                break;
                            }
                        case 3: {
                                message.piece = reader.string();
                                break;
                            }
                        case 4: {
                                message.playerNickname = reader.string();
                                break;
                            }
                        case 5: {
                                message.playerId = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GameMoveSuccessResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.GameMoveSuccessResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.GameMoveSuccessResponse} GameMoveSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameMoveSuccessResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GameMoveSuccessResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.GameMoveSuccessResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GameMoveSuccessResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.row != null && message.hasOwnProperty("row"))
                        if (!$util.isInteger(message.row))
                            return "row: integer expected";
                    if (message.col != null && message.hasOwnProperty("col"))
                        if (!$util.isInteger(message.col))
                            return "col: integer expected";
                    if (message.piece != null && message.hasOwnProperty("piece"))
                        if (!$util.isString(message.piece))
                            return "piece: string expected";
                    if (message.playerNickname != null && message.hasOwnProperty("playerNickname"))
                        if (!$util.isString(message.playerNickname))
                            return "playerNickname: string expected";
                    if (message.playerId != null && message.hasOwnProperty("playerId"))
                        if (!$util.isInteger(message.playerId))
                            return "playerId: integer expected";
                    return null;
                };

                /**
                 * Creates a GameMoveSuccessResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.GameMoveSuccessResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.GameMoveSuccessResponse} GameMoveSuccessResponse
                 */
                GameMoveSuccessResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.GameMoveSuccessResponse)
                        return object;
                    let message = new $root.miti99.caro.protocol.GameMoveSuccessResponse();
                    if (object.row != null)
                        message.row = object.row | 0;
                    if (object.col != null)
                        message.col = object.col | 0;
                    if (object.piece != null)
                        message.piece = String(object.piece);
                    if (object.playerNickname != null)
                        message.playerNickname = String(object.playerNickname);
                    if (object.playerId != null)
                        message.playerId = object.playerId | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a GameMoveSuccessResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.GameMoveSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.GameMoveSuccessResponse} message GameMoveSuccessResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GameMoveSuccessResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.row = 0;
                        object.col = 0;
                        object.piece = "";
                        object.playerNickname = "";
                        object.playerId = 0;
                    }
                    if (message.row != null && message.hasOwnProperty("row"))
                        object.row = message.row;
                    if (message.col != null && message.hasOwnProperty("col"))
                        object.col = message.col;
                    if (message.piece != null && message.hasOwnProperty("piece"))
                        object.piece = message.piece;
                    if (message.playerNickname != null && message.hasOwnProperty("playerNickname"))
                        object.playerNickname = message.playerNickname;
                    if (message.playerId != null && message.hasOwnProperty("playerId"))
                        object.playerId = message.playerId;
                    return object;
                };

                /**
                 * Converts this GameMoveSuccessResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.GameMoveSuccessResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GameMoveSuccessResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GameMoveSuccessResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.GameMoveSuccessResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GameMoveSuccessResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.GameMoveSuccessResponse";
                };

                return GameMoveSuccessResponse;
            })();

            protocol.GameMoveInvalidResponse = (function() {

                /**
                 * Properties of a GameMoveInvalidResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IGameMoveInvalidResponse
                 */

                /**
                 * Constructs a new GameMoveInvalidResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a GameMoveInvalidResponse.
                 * @implements IGameMoveInvalidResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IGameMoveInvalidResponse=} [properties] Properties to set
                 */
                function GameMoveInvalidResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new GameMoveInvalidResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.GameMoveInvalidResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveInvalidResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.GameMoveInvalidResponse} GameMoveInvalidResponse instance
                 */
                GameMoveInvalidResponse.create = function create(properties) {
                    return new GameMoveInvalidResponse(properties);
                };

                /**
                 * Encodes the specified GameMoveInvalidResponse message. Does not implicitly {@link miti99.caro.protocol.GameMoveInvalidResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.GameMoveInvalidResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveInvalidResponse} message GameMoveInvalidResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameMoveInvalidResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified GameMoveInvalidResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameMoveInvalidResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.GameMoveInvalidResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveInvalidResponse} message GameMoveInvalidResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameMoveInvalidResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GameMoveInvalidResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.GameMoveInvalidResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.GameMoveInvalidResponse} GameMoveInvalidResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameMoveInvalidResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.GameMoveInvalidResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GameMoveInvalidResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.GameMoveInvalidResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.GameMoveInvalidResponse} GameMoveInvalidResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameMoveInvalidResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GameMoveInvalidResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.GameMoveInvalidResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GameMoveInvalidResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a GameMoveInvalidResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.GameMoveInvalidResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.GameMoveInvalidResponse} GameMoveInvalidResponse
                 */
                GameMoveInvalidResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.GameMoveInvalidResponse)
                        return object;
                    return new $root.miti99.caro.protocol.GameMoveInvalidResponse();
                };

                /**
                 * Creates a plain object from a GameMoveInvalidResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.GameMoveInvalidResponse
                 * @static
                 * @param {miti99.caro.protocol.GameMoveInvalidResponse} message GameMoveInvalidResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GameMoveInvalidResponse.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this GameMoveInvalidResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.GameMoveInvalidResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GameMoveInvalidResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GameMoveInvalidResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.GameMoveInvalidResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GameMoveInvalidResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.GameMoveInvalidResponse";
                };

                return GameMoveInvalidResponse;
            })();

            protocol.GameMoveOccupiedResponse = (function() {

                /**
                 * Properties of a GameMoveOccupiedResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IGameMoveOccupiedResponse
                 */

                /**
                 * Constructs a new GameMoveOccupiedResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a GameMoveOccupiedResponse.
                 * @implements IGameMoveOccupiedResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IGameMoveOccupiedResponse=} [properties] Properties to set
                 */
                function GameMoveOccupiedResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new GameMoveOccupiedResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.GameMoveOccupiedResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveOccupiedResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.GameMoveOccupiedResponse} GameMoveOccupiedResponse instance
                 */
                GameMoveOccupiedResponse.create = function create(properties) {
                    return new GameMoveOccupiedResponse(properties);
                };

                /**
                 * Encodes the specified GameMoveOccupiedResponse message. Does not implicitly {@link miti99.caro.protocol.GameMoveOccupiedResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.GameMoveOccupiedResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveOccupiedResponse} message GameMoveOccupiedResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameMoveOccupiedResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified GameMoveOccupiedResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameMoveOccupiedResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.GameMoveOccupiedResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveOccupiedResponse} message GameMoveOccupiedResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameMoveOccupiedResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GameMoveOccupiedResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.GameMoveOccupiedResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.GameMoveOccupiedResponse} GameMoveOccupiedResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameMoveOccupiedResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.GameMoveOccupiedResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GameMoveOccupiedResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.GameMoveOccupiedResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.GameMoveOccupiedResponse} GameMoveOccupiedResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameMoveOccupiedResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GameMoveOccupiedResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.GameMoveOccupiedResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GameMoveOccupiedResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a GameMoveOccupiedResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.GameMoveOccupiedResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.GameMoveOccupiedResponse} GameMoveOccupiedResponse
                 */
                GameMoveOccupiedResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.GameMoveOccupiedResponse)
                        return object;
                    return new $root.miti99.caro.protocol.GameMoveOccupiedResponse();
                };

                /**
                 * Creates a plain object from a GameMoveOccupiedResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.GameMoveOccupiedResponse
                 * @static
                 * @param {miti99.caro.protocol.GameMoveOccupiedResponse} message GameMoveOccupiedResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GameMoveOccupiedResponse.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this GameMoveOccupiedResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.GameMoveOccupiedResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GameMoveOccupiedResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GameMoveOccupiedResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.GameMoveOccupiedResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GameMoveOccupiedResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.GameMoveOccupiedResponse";
                };

                return GameMoveOccupiedResponse;
            })();

            protocol.GameMoveOutOfBoundsResponse = (function() {

                /**
                 * Properties of a GameMoveOutOfBoundsResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IGameMoveOutOfBoundsResponse
                 */

                /**
                 * Constructs a new GameMoveOutOfBoundsResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a GameMoveOutOfBoundsResponse.
                 * @implements IGameMoveOutOfBoundsResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IGameMoveOutOfBoundsResponse=} [properties] Properties to set
                 */
                function GameMoveOutOfBoundsResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new GameMoveOutOfBoundsResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.GameMoveOutOfBoundsResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveOutOfBoundsResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.GameMoveOutOfBoundsResponse} GameMoveOutOfBoundsResponse instance
                 */
                GameMoveOutOfBoundsResponse.create = function create(properties) {
                    return new GameMoveOutOfBoundsResponse(properties);
                };

                /**
                 * Encodes the specified GameMoveOutOfBoundsResponse message. Does not implicitly {@link miti99.caro.protocol.GameMoveOutOfBoundsResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.GameMoveOutOfBoundsResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveOutOfBoundsResponse} message GameMoveOutOfBoundsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameMoveOutOfBoundsResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified GameMoveOutOfBoundsResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameMoveOutOfBoundsResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.GameMoveOutOfBoundsResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveOutOfBoundsResponse} message GameMoveOutOfBoundsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameMoveOutOfBoundsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GameMoveOutOfBoundsResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.GameMoveOutOfBoundsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.GameMoveOutOfBoundsResponse} GameMoveOutOfBoundsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameMoveOutOfBoundsResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.GameMoveOutOfBoundsResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GameMoveOutOfBoundsResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.GameMoveOutOfBoundsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.GameMoveOutOfBoundsResponse} GameMoveOutOfBoundsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameMoveOutOfBoundsResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GameMoveOutOfBoundsResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.GameMoveOutOfBoundsResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GameMoveOutOfBoundsResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a GameMoveOutOfBoundsResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.GameMoveOutOfBoundsResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.GameMoveOutOfBoundsResponse} GameMoveOutOfBoundsResponse
                 */
                GameMoveOutOfBoundsResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.GameMoveOutOfBoundsResponse)
                        return object;
                    return new $root.miti99.caro.protocol.GameMoveOutOfBoundsResponse();
                };

                /**
                 * Creates a plain object from a GameMoveOutOfBoundsResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.GameMoveOutOfBoundsResponse
                 * @static
                 * @param {miti99.caro.protocol.GameMoveOutOfBoundsResponse} message GameMoveOutOfBoundsResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GameMoveOutOfBoundsResponse.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this GameMoveOutOfBoundsResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.GameMoveOutOfBoundsResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GameMoveOutOfBoundsResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GameMoveOutOfBoundsResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.GameMoveOutOfBoundsResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GameMoveOutOfBoundsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.GameMoveOutOfBoundsResponse";
                };

                return GameMoveOutOfBoundsResponse;
            })();

            protocol.GameMoveNotYourTurnResponse = (function() {

                /**
                 * Properties of a GameMoveNotYourTurnResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IGameMoveNotYourTurnResponse
                 */

                /**
                 * Constructs a new GameMoveNotYourTurnResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a GameMoveNotYourTurnResponse.
                 * @implements IGameMoveNotYourTurnResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IGameMoveNotYourTurnResponse=} [properties] Properties to set
                 */
                function GameMoveNotYourTurnResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new GameMoveNotYourTurnResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.GameMoveNotYourTurnResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveNotYourTurnResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.GameMoveNotYourTurnResponse} GameMoveNotYourTurnResponse instance
                 */
                GameMoveNotYourTurnResponse.create = function create(properties) {
                    return new GameMoveNotYourTurnResponse(properties);
                };

                /**
                 * Encodes the specified GameMoveNotYourTurnResponse message. Does not implicitly {@link miti99.caro.protocol.GameMoveNotYourTurnResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.GameMoveNotYourTurnResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveNotYourTurnResponse} message GameMoveNotYourTurnResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameMoveNotYourTurnResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified GameMoveNotYourTurnResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameMoveNotYourTurnResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.GameMoveNotYourTurnResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameMoveNotYourTurnResponse} message GameMoveNotYourTurnResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameMoveNotYourTurnResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GameMoveNotYourTurnResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.GameMoveNotYourTurnResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.GameMoveNotYourTurnResponse} GameMoveNotYourTurnResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameMoveNotYourTurnResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.GameMoveNotYourTurnResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GameMoveNotYourTurnResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.GameMoveNotYourTurnResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.GameMoveNotYourTurnResponse} GameMoveNotYourTurnResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameMoveNotYourTurnResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GameMoveNotYourTurnResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.GameMoveNotYourTurnResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GameMoveNotYourTurnResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a GameMoveNotYourTurnResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.GameMoveNotYourTurnResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.GameMoveNotYourTurnResponse} GameMoveNotYourTurnResponse
                 */
                GameMoveNotYourTurnResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.GameMoveNotYourTurnResponse)
                        return object;
                    return new $root.miti99.caro.protocol.GameMoveNotYourTurnResponse();
                };

                /**
                 * Creates a plain object from a GameMoveNotYourTurnResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.GameMoveNotYourTurnResponse
                 * @static
                 * @param {miti99.caro.protocol.GameMoveNotYourTurnResponse} message GameMoveNotYourTurnResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GameMoveNotYourTurnResponse.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this GameMoveNotYourTurnResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.GameMoveNotYourTurnResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GameMoveNotYourTurnResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GameMoveNotYourTurnResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.GameMoveNotYourTurnResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GameMoveNotYourTurnResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.GameMoveNotYourTurnResponse";
                };

                return GameMoveNotYourTurnResponse;
            })();

            protocol.GameOverResponse = (function() {

                /**
                 * Properties of a GameOverResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IGameOverResponse
                 * @property {string|null} [result] GameOverResponse result
                 * @property {string|null} [winnerNickname] GameOverResponse winnerNickname
                 */

                /**
                 * Constructs a new GameOverResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a GameOverResponse.
                 * @implements IGameOverResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IGameOverResponse=} [properties] Properties to set
                 */
                function GameOverResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GameOverResponse result.
                 * @member {string} result
                 * @memberof miti99.caro.protocol.GameOverResponse
                 * @instance
                 */
                GameOverResponse.prototype.result = "";

                /**
                 * GameOverResponse winnerNickname.
                 * @member {string} winnerNickname
                 * @memberof miti99.caro.protocol.GameOverResponse
                 * @instance
                 */
                GameOverResponse.prototype.winnerNickname = "";

                /**
                 * Creates a new GameOverResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.GameOverResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameOverResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.GameOverResponse} GameOverResponse instance
                 */
                GameOverResponse.create = function create(properties) {
                    return new GameOverResponse(properties);
                };

                /**
                 * Encodes the specified GameOverResponse message. Does not implicitly {@link miti99.caro.protocol.GameOverResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.GameOverResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameOverResponse} message GameOverResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameOverResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.result);
                    if (message.winnerNickname != null && Object.hasOwnProperty.call(message, "winnerNickname"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.winnerNickname);
                    return writer;
                };

                /**
                 * Encodes the specified GameOverResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameOverResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.GameOverResponse
                 * @static
                 * @param {miti99.caro.protocol.IGameOverResponse} message GameOverResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GameOverResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GameOverResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.GameOverResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.GameOverResponse} GameOverResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameOverResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.GameOverResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.result = reader.string();
                                break;
                            }
                        case 2: {
                                message.winnerNickname = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GameOverResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.GameOverResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.GameOverResponse} GameOverResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GameOverResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GameOverResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.GameOverResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GameOverResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.result != null && message.hasOwnProperty("result"))
                        if (!$util.isString(message.result))
                            return "result: string expected";
                    if (message.winnerNickname != null && message.hasOwnProperty("winnerNickname"))
                        if (!$util.isString(message.winnerNickname))
                            return "winnerNickname: string expected";
                    return null;
                };

                /**
                 * Creates a GameOverResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.GameOverResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.GameOverResponse} GameOverResponse
                 */
                GameOverResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.GameOverResponse)
                        return object;
                    let message = new $root.miti99.caro.protocol.GameOverResponse();
                    if (object.result != null)
                        message.result = String(object.result);
                    if (object.winnerNickname != null)
                        message.winnerNickname = String(object.winnerNickname);
                    return message;
                };

                /**
                 * Creates a plain object from a GameOverResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.GameOverResponse
                 * @static
                 * @param {miti99.caro.protocol.GameOverResponse} message GameOverResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GameOverResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.result = "";
                        object.winnerNickname = "";
                    }
                    if (message.result != null && message.hasOwnProperty("result"))
                        object.result = message.result;
                    if (message.winnerNickname != null && message.hasOwnProperty("winnerNickname"))
                        object.winnerNickname = message.winnerNickname;
                    return object;
                };

                /**
                 * Converts this GameOverResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.GameOverResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GameOverResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GameOverResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.GameOverResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GameOverResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.GameOverResponse";
                };

                return GameOverResponse;
            })();

            protocol.PveDifficultyNotSupportResponse = (function() {

                /**
                 * Properties of a PveDifficultyNotSupportResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IPveDifficultyNotSupportResponse
                 */

                /**
                 * Constructs a new PveDifficultyNotSupportResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a PveDifficultyNotSupportResponse.
                 * @implements IPveDifficultyNotSupportResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IPveDifficultyNotSupportResponse=} [properties] Properties to set
                 */
                function PveDifficultyNotSupportResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new PveDifficultyNotSupportResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.PveDifficultyNotSupportResponse
                 * @static
                 * @param {miti99.caro.protocol.IPveDifficultyNotSupportResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.PveDifficultyNotSupportResponse} PveDifficultyNotSupportResponse instance
                 */
                PveDifficultyNotSupportResponse.create = function create(properties) {
                    return new PveDifficultyNotSupportResponse(properties);
                };

                /**
                 * Encodes the specified PveDifficultyNotSupportResponse message. Does not implicitly {@link miti99.caro.protocol.PveDifficultyNotSupportResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.PveDifficultyNotSupportResponse
                 * @static
                 * @param {miti99.caro.protocol.IPveDifficultyNotSupportResponse} message PveDifficultyNotSupportResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PveDifficultyNotSupportResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified PveDifficultyNotSupportResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.PveDifficultyNotSupportResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.PveDifficultyNotSupportResponse
                 * @static
                 * @param {miti99.caro.protocol.IPveDifficultyNotSupportResponse} message PveDifficultyNotSupportResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PveDifficultyNotSupportResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a PveDifficultyNotSupportResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.PveDifficultyNotSupportResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.PveDifficultyNotSupportResponse} PveDifficultyNotSupportResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PveDifficultyNotSupportResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.PveDifficultyNotSupportResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a PveDifficultyNotSupportResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.PveDifficultyNotSupportResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.PveDifficultyNotSupportResponse} PveDifficultyNotSupportResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PveDifficultyNotSupportResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a PveDifficultyNotSupportResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.PveDifficultyNotSupportResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PveDifficultyNotSupportResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a PveDifficultyNotSupportResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.PveDifficultyNotSupportResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.PveDifficultyNotSupportResponse} PveDifficultyNotSupportResponse
                 */
                PveDifficultyNotSupportResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.PveDifficultyNotSupportResponse)
                        return object;
                    return new $root.miti99.caro.protocol.PveDifficultyNotSupportResponse();
                };

                /**
                 * Creates a plain object from a PveDifficultyNotSupportResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.PveDifficultyNotSupportResponse
                 * @static
                 * @param {miti99.caro.protocol.PveDifficultyNotSupportResponse} message PveDifficultyNotSupportResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PveDifficultyNotSupportResponse.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this PveDifficultyNotSupportResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.PveDifficultyNotSupportResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PveDifficultyNotSupportResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for PveDifficultyNotSupportResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.PveDifficultyNotSupportResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                PveDifficultyNotSupportResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.PveDifficultyNotSupportResponse";
                };

                return PveDifficultyNotSupportResponse;
            })();

            protocol.WatchGameSuccessResponse = (function() {

                /**
                 * Properties of a WatchGameSuccessResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IWatchGameSuccessResponse
                 * @property {string|null} [owner] WatchGameSuccessResponse owner
                 * @property {string|null} [status] WatchGameSuccessResponse status
                 */

                /**
                 * Constructs a new WatchGameSuccessResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a WatchGameSuccessResponse.
                 * @implements IWatchGameSuccessResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IWatchGameSuccessResponse=} [properties] Properties to set
                 */
                function WatchGameSuccessResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * WatchGameSuccessResponse owner.
                 * @member {string} owner
                 * @memberof miti99.caro.protocol.WatchGameSuccessResponse
                 * @instance
                 */
                WatchGameSuccessResponse.prototype.owner = "";

                /**
                 * WatchGameSuccessResponse status.
                 * @member {string} status
                 * @memberof miti99.caro.protocol.WatchGameSuccessResponse
                 * @instance
                 */
                WatchGameSuccessResponse.prototype.status = "";

                /**
                 * Creates a new WatchGameSuccessResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.WatchGameSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.IWatchGameSuccessResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.WatchGameSuccessResponse} WatchGameSuccessResponse instance
                 */
                WatchGameSuccessResponse.create = function create(properties) {
                    return new WatchGameSuccessResponse(properties);
                };

                /**
                 * Encodes the specified WatchGameSuccessResponse message. Does not implicitly {@link miti99.caro.protocol.WatchGameSuccessResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.WatchGameSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.IWatchGameSuccessResponse} message WatchGameSuccessResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                WatchGameSuccessResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.owner != null && Object.hasOwnProperty.call(message, "owner"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.owner);
                    if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.status);
                    return writer;
                };

                /**
                 * Encodes the specified WatchGameSuccessResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.WatchGameSuccessResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.WatchGameSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.IWatchGameSuccessResponse} message WatchGameSuccessResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                WatchGameSuccessResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a WatchGameSuccessResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.WatchGameSuccessResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.WatchGameSuccessResponse} WatchGameSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                WatchGameSuccessResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.WatchGameSuccessResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.owner = reader.string();
                                break;
                            }
                        case 2: {
                                message.status = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a WatchGameSuccessResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.WatchGameSuccessResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.WatchGameSuccessResponse} WatchGameSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                WatchGameSuccessResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a WatchGameSuccessResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.WatchGameSuccessResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                WatchGameSuccessResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.owner != null && message.hasOwnProperty("owner"))
                        if (!$util.isString(message.owner))
                            return "owner: string expected";
                    if (message.status != null && message.hasOwnProperty("status"))
                        if (!$util.isString(message.status))
                            return "status: string expected";
                    return null;
                };

                /**
                 * Creates a WatchGameSuccessResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.WatchGameSuccessResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.WatchGameSuccessResponse} WatchGameSuccessResponse
                 */
                WatchGameSuccessResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.WatchGameSuccessResponse)
                        return object;
                    let message = new $root.miti99.caro.protocol.WatchGameSuccessResponse();
                    if (object.owner != null)
                        message.owner = String(object.owner);
                    if (object.status != null)
                        message.status = String(object.status);
                    return message;
                };

                /**
                 * Creates a plain object from a WatchGameSuccessResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.WatchGameSuccessResponse
                 * @static
                 * @param {miti99.caro.protocol.WatchGameSuccessResponse} message WatchGameSuccessResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                WatchGameSuccessResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.owner = "";
                        object.status = "";
                    }
                    if (message.owner != null && message.hasOwnProperty("owner"))
                        object.owner = message.owner;
                    if (message.status != null && message.hasOwnProperty("status"))
                        object.status = message.status;
                    return object;
                };

                /**
                 * Converts this WatchGameSuccessResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.WatchGameSuccessResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                WatchGameSuccessResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for WatchGameSuccessResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.WatchGameSuccessResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                WatchGameSuccessResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.WatchGameSuccessResponse";
                };

                return WatchGameSuccessResponse;
            })();

            protocol.ClientExitResponse = (function() {

                /**
                 * Properties of a ClientExitResponse.
                 * @memberof miti99.caro.protocol
                 * @interface IClientExitResponse
                 * @property {number|null} [roomId] ClientExitResponse roomId
                 * @property {number|null} [exitClientId] ClientExitResponse exitClientId
                 * @property {string|null} [exitClientNickname] ClientExitResponse exitClientNickname
                 */

                /**
                 * Constructs a new ClientExitResponse.
                 * @memberof miti99.caro.protocol
                 * @classdesc Represents a ClientExitResponse.
                 * @implements IClientExitResponse
                 * @constructor
                 * @param {miti99.caro.protocol.IClientExitResponse=} [properties] Properties to set
                 */
                function ClientExitResponse(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ClientExitResponse roomId.
                 * @member {number} roomId
                 * @memberof miti99.caro.protocol.ClientExitResponse
                 * @instance
                 */
                ClientExitResponse.prototype.roomId = 0;

                /**
                 * ClientExitResponse exitClientId.
                 * @member {number} exitClientId
                 * @memberof miti99.caro.protocol.ClientExitResponse
                 * @instance
                 */
                ClientExitResponse.prototype.exitClientId = 0;

                /**
                 * ClientExitResponse exitClientNickname.
                 * @member {string} exitClientNickname
                 * @memberof miti99.caro.protocol.ClientExitResponse
                 * @instance
                 */
                ClientExitResponse.prototype.exitClientNickname = "";

                /**
                 * Creates a new ClientExitResponse instance using the specified properties.
                 * @function create
                 * @memberof miti99.caro.protocol.ClientExitResponse
                 * @static
                 * @param {miti99.caro.protocol.IClientExitResponse=} [properties] Properties to set
                 * @returns {miti99.caro.protocol.ClientExitResponse} ClientExitResponse instance
                 */
                ClientExitResponse.create = function create(properties) {
                    return new ClientExitResponse(properties);
                };

                /**
                 * Encodes the specified ClientExitResponse message. Does not implicitly {@link miti99.caro.protocol.ClientExitResponse.verify|verify} messages.
                 * @function encode
                 * @memberof miti99.caro.protocol.ClientExitResponse
                 * @static
                 * @param {miti99.caro.protocol.IClientExitResponse} message ClientExitResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ClientExitResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roomId);
                    if (message.exitClientId != null && Object.hasOwnProperty.call(message, "exitClientId"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.exitClientId);
                    if (message.exitClientNickname != null && Object.hasOwnProperty.call(message, "exitClientNickname"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.exitClientNickname);
                    return writer;
                };

                /**
                 * Encodes the specified ClientExitResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.ClientExitResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof miti99.caro.protocol.ClientExitResponse
                 * @static
                 * @param {miti99.caro.protocol.IClientExitResponse} message ClientExitResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ClientExitResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ClientExitResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof miti99.caro.protocol.ClientExitResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {miti99.caro.protocol.ClientExitResponse} ClientExitResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ClientExitResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.miti99.caro.protocol.ClientExitResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.roomId = reader.int32();
                                break;
                            }
                        case 2: {
                                message.exitClientId = reader.int32();
                                break;
                            }
                        case 3: {
                                message.exitClientNickname = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ClientExitResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof miti99.caro.protocol.ClientExitResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {miti99.caro.protocol.ClientExitResponse} ClientExitResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ClientExitResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ClientExitResponse message.
                 * @function verify
                 * @memberof miti99.caro.protocol.ClientExitResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ClientExitResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        if (!$util.isInteger(message.roomId))
                            return "roomId: integer expected";
                    if (message.exitClientId != null && message.hasOwnProperty("exitClientId"))
                        if (!$util.isInteger(message.exitClientId))
                            return "exitClientId: integer expected";
                    if (message.exitClientNickname != null && message.hasOwnProperty("exitClientNickname"))
                        if (!$util.isString(message.exitClientNickname))
                            return "exitClientNickname: string expected";
                    return null;
                };

                /**
                 * Creates a ClientExitResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof miti99.caro.protocol.ClientExitResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {miti99.caro.protocol.ClientExitResponse} ClientExitResponse
                 */
                ClientExitResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.miti99.caro.protocol.ClientExitResponse)
                        return object;
                    let message = new $root.miti99.caro.protocol.ClientExitResponse();
                    if (object.roomId != null)
                        message.roomId = object.roomId | 0;
                    if (object.exitClientId != null)
                        message.exitClientId = object.exitClientId | 0;
                    if (object.exitClientNickname != null)
                        message.exitClientNickname = String(object.exitClientNickname);
                    return message;
                };

                /**
                 * Creates a plain object from a ClientExitResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof miti99.caro.protocol.ClientExitResponse
                 * @static
                 * @param {miti99.caro.protocol.ClientExitResponse} message ClientExitResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ClientExitResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.roomId = 0;
                        object.exitClientId = 0;
                        object.exitClientNickname = "";
                    }
                    if (message.roomId != null && message.hasOwnProperty("roomId"))
                        object.roomId = message.roomId;
                    if (message.exitClientId != null && message.hasOwnProperty("exitClientId"))
                        object.exitClientId = message.exitClientId;
                    if (message.exitClientNickname != null && message.hasOwnProperty("exitClientNickname"))
                        object.exitClientNickname = message.exitClientNickname;
                    return object;
                };

                /**
                 * Converts this ClientExitResponse to JSON.
                 * @function toJSON
                 * @memberof miti99.caro.protocol.ClientExitResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ClientExitResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ClientExitResponse
                 * @function getTypeUrl
                 * @memberof miti99.caro.protocol.ClientExitResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ClientExitResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/miti99.caro.protocol.ClientExitResponse";
                };

                return ClientExitResponse;
            })();

            return protocol;
        })();

        return caro;
    })();

    return miti99;
})();

export { $root as default };
