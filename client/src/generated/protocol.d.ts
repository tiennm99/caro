import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace miti99. */
export namespace miti99 {

    /** Namespace caro. */
    namespace caro {

        /** Namespace protocol. */
        namespace protocol {

            /** Properties of a Request. */
            interface IRequest {

                /** Request heartbeat */
                heartbeat?: (miti99.caro.protocol.IHeartbeatRequest|null);

                /** Request setNickname */
                setNickname?: (miti99.caro.protocol.ISetNicknameRequest|null);

                /** Request setClientInfo */
                setClientInfo?: (miti99.caro.protocol.ISetClientInfoRequest|null);

                /** Request createRoom */
                createRoom?: (miti99.caro.protocol.ICreateRoomRequest|null);

                /** Request createPveRoom */
                createPveRoom?: (miti99.caro.protocol.ICreatePveRoomRequest|null);

                /** Request getRooms */
                getRooms?: (miti99.caro.protocol.IGetRoomsRequest|null);

                /** Request joinRoom */
                joinRoom?: (miti99.caro.protocol.IJoinRoomRequest|null);

                /** Request gameStarting */
                gameStarting?: (miti99.caro.protocol.IGameStartingRequest|null);

                /** Request gameReady */
                gameReady?: (miti99.caro.protocol.IGameReadyRequest|null);

                /** Request gameMove */
                gameMove?: (miti99.caro.protocol.IGameMoveRequest|null);

                /** Request gameReset */
                gameReset?: (miti99.caro.protocol.IGameResetRequest|null);

                /** Request watchGame */
                watchGame?: (miti99.caro.protocol.IWatchGameRequest|null);

                /** Request watchGameExit */
                watchGameExit?: (miti99.caro.protocol.IWatchGameExitRequest|null);

                /** Request clientExit */
                clientExit?: (miti99.caro.protocol.IClientExitRequest|null);
            }

            /** Represents a Request. */
            class Request implements IRequest {

                /**
                 * Constructs a new Request.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IRequest);

                /** Request heartbeat. */
                public heartbeat?: (miti99.caro.protocol.IHeartbeatRequest|null);

                /** Request setNickname. */
                public setNickname?: (miti99.caro.protocol.ISetNicknameRequest|null);

                /** Request setClientInfo. */
                public setClientInfo?: (miti99.caro.protocol.ISetClientInfoRequest|null);

                /** Request createRoom. */
                public createRoom?: (miti99.caro.protocol.ICreateRoomRequest|null);

                /** Request createPveRoom. */
                public createPveRoom?: (miti99.caro.protocol.ICreatePveRoomRequest|null);

                /** Request getRooms. */
                public getRooms?: (miti99.caro.protocol.IGetRoomsRequest|null);

                /** Request joinRoom. */
                public joinRoom?: (miti99.caro.protocol.IJoinRoomRequest|null);

                /** Request gameStarting. */
                public gameStarting?: (miti99.caro.protocol.IGameStartingRequest|null);

                /** Request gameReady. */
                public gameReady?: (miti99.caro.protocol.IGameReadyRequest|null);

                /** Request gameMove. */
                public gameMove?: (miti99.caro.protocol.IGameMoveRequest|null);

                /** Request gameReset. */
                public gameReset?: (miti99.caro.protocol.IGameResetRequest|null);

                /** Request watchGame. */
                public watchGame?: (miti99.caro.protocol.IWatchGameRequest|null);

                /** Request watchGameExit. */
                public watchGameExit?: (miti99.caro.protocol.IWatchGameExitRequest|null);

                /** Request clientExit. */
                public clientExit?: (miti99.caro.protocol.IClientExitRequest|null);

                /** Request payload. */
                public payload?: ("heartbeat"|"setNickname"|"setClientInfo"|"createRoom"|"createPveRoom"|"getRooms"|"joinRoom"|"gameStarting"|"gameReady"|"gameMove"|"gameReset"|"watchGame"|"watchGameExit"|"clientExit");

                /**
                 * Creates a new Request instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Request instance
                 */
                public static create(properties?: miti99.caro.protocol.IRequest): miti99.caro.protocol.Request;

                /**
                 * Encodes the specified Request message. Does not implicitly {@link miti99.caro.protocol.Request.verify|verify} messages.
                 * @param message Request message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Request message, length delimited. Does not implicitly {@link miti99.caro.protocol.Request.verify|verify} messages.
                 * @param message Request message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Request message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Request
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.Request;

                /**
                 * Decodes a Request message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Request
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.Request;

                /**
                 * Verifies a Request message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Request message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Request
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.Request;

                /**
                 * Creates a plain object from a Request message. Also converts values to other types if specified.
                 * @param message Request
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Request to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Request
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a HeartbeatRequest. */
            interface IHeartbeatRequest {
            }

            /** Represents a HeartbeatRequest. */
            class HeartbeatRequest implements IHeartbeatRequest {

                /**
                 * Constructs a new HeartbeatRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IHeartbeatRequest);

                /**
                 * Creates a new HeartbeatRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns HeartbeatRequest instance
                 */
                public static create(properties?: miti99.caro.protocol.IHeartbeatRequest): miti99.caro.protocol.HeartbeatRequest;

                /**
                 * Encodes the specified HeartbeatRequest message. Does not implicitly {@link miti99.caro.protocol.HeartbeatRequest.verify|verify} messages.
                 * @param message HeartbeatRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IHeartbeatRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified HeartbeatRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.HeartbeatRequest.verify|verify} messages.
                 * @param message HeartbeatRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IHeartbeatRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a HeartbeatRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns HeartbeatRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.HeartbeatRequest;

                /**
                 * Decodes a HeartbeatRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns HeartbeatRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.HeartbeatRequest;

                /**
                 * Verifies a HeartbeatRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a HeartbeatRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns HeartbeatRequest
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.HeartbeatRequest;

                /**
                 * Creates a plain object from a HeartbeatRequest message. Also converts values to other types if specified.
                 * @param message HeartbeatRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.HeartbeatRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this HeartbeatRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for HeartbeatRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a SetNicknameRequest. */
            interface ISetNicknameRequest {

                /** SetNicknameRequest nickname */
                nickname?: (string|null);
            }

            /** Represents a SetNicknameRequest. */
            class SetNicknameRequest implements ISetNicknameRequest {

                /**
                 * Constructs a new SetNicknameRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.ISetNicknameRequest);

                /** SetNicknameRequest nickname. */
                public nickname: string;

                /**
                 * Creates a new SetNicknameRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SetNicknameRequest instance
                 */
                public static create(properties?: miti99.caro.protocol.ISetNicknameRequest): miti99.caro.protocol.SetNicknameRequest;

                /**
                 * Encodes the specified SetNicknameRequest message. Does not implicitly {@link miti99.caro.protocol.SetNicknameRequest.verify|verify} messages.
                 * @param message SetNicknameRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.ISetNicknameRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SetNicknameRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.SetNicknameRequest.verify|verify} messages.
                 * @param message SetNicknameRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.ISetNicknameRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SetNicknameRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SetNicknameRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.SetNicknameRequest;

                /**
                 * Decodes a SetNicknameRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SetNicknameRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.SetNicknameRequest;

                /**
                 * Verifies a SetNicknameRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SetNicknameRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SetNicknameRequest
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.SetNicknameRequest;

                /**
                 * Creates a plain object from a SetNicknameRequest message. Also converts values to other types if specified.
                 * @param message SetNicknameRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.SetNicknameRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SetNicknameRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for SetNicknameRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a SetClientInfoRequest. */
            interface ISetClientInfoRequest {

                /** SetClientInfoRequest version */
                version?: (string|null);
            }

            /** Represents a SetClientInfoRequest. */
            class SetClientInfoRequest implements ISetClientInfoRequest {

                /**
                 * Constructs a new SetClientInfoRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.ISetClientInfoRequest);

                /** SetClientInfoRequest version. */
                public version: string;

                /**
                 * Creates a new SetClientInfoRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SetClientInfoRequest instance
                 */
                public static create(properties?: miti99.caro.protocol.ISetClientInfoRequest): miti99.caro.protocol.SetClientInfoRequest;

                /**
                 * Encodes the specified SetClientInfoRequest message. Does not implicitly {@link miti99.caro.protocol.SetClientInfoRequest.verify|verify} messages.
                 * @param message SetClientInfoRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.ISetClientInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SetClientInfoRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.SetClientInfoRequest.verify|verify} messages.
                 * @param message SetClientInfoRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.ISetClientInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SetClientInfoRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SetClientInfoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.SetClientInfoRequest;

                /**
                 * Decodes a SetClientInfoRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SetClientInfoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.SetClientInfoRequest;

                /**
                 * Verifies a SetClientInfoRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SetClientInfoRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SetClientInfoRequest
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.SetClientInfoRequest;

                /**
                 * Creates a plain object from a SetClientInfoRequest message. Also converts values to other types if specified.
                 * @param message SetClientInfoRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.SetClientInfoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SetClientInfoRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for SetClientInfoRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a CreateRoomRequest. */
            interface ICreateRoomRequest {
            }

            /** Represents a CreateRoomRequest. */
            class CreateRoomRequest implements ICreateRoomRequest {

                /**
                 * Constructs a new CreateRoomRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.ICreateRoomRequest);

                /**
                 * Creates a new CreateRoomRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CreateRoomRequest instance
                 */
                public static create(properties?: miti99.caro.protocol.ICreateRoomRequest): miti99.caro.protocol.CreateRoomRequest;

                /**
                 * Encodes the specified CreateRoomRequest message. Does not implicitly {@link miti99.caro.protocol.CreateRoomRequest.verify|verify} messages.
                 * @param message CreateRoomRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.ICreateRoomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CreateRoomRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.CreateRoomRequest.verify|verify} messages.
                 * @param message CreateRoomRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.ICreateRoomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CreateRoomRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CreateRoomRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.CreateRoomRequest;

                /**
                 * Decodes a CreateRoomRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CreateRoomRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.CreateRoomRequest;

                /**
                 * Verifies a CreateRoomRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CreateRoomRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CreateRoomRequest
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.CreateRoomRequest;

                /**
                 * Creates a plain object from a CreateRoomRequest message. Also converts values to other types if specified.
                 * @param message CreateRoomRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.CreateRoomRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CreateRoomRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for CreateRoomRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a CreatePveRoomRequest. */
            interface ICreatePveRoomRequest {

                /** CreatePveRoomRequest difficulty */
                difficulty?: (number|null);
            }

            /** Represents a CreatePveRoomRequest. */
            class CreatePveRoomRequest implements ICreatePveRoomRequest {

                /**
                 * Constructs a new CreatePveRoomRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.ICreatePveRoomRequest);

                /** CreatePveRoomRequest difficulty. */
                public difficulty: number;

                /**
                 * Creates a new CreatePveRoomRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CreatePveRoomRequest instance
                 */
                public static create(properties?: miti99.caro.protocol.ICreatePveRoomRequest): miti99.caro.protocol.CreatePveRoomRequest;

                /**
                 * Encodes the specified CreatePveRoomRequest message. Does not implicitly {@link miti99.caro.protocol.CreatePveRoomRequest.verify|verify} messages.
                 * @param message CreatePveRoomRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.ICreatePveRoomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CreatePveRoomRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.CreatePveRoomRequest.verify|verify} messages.
                 * @param message CreatePveRoomRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.ICreatePveRoomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CreatePveRoomRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CreatePveRoomRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.CreatePveRoomRequest;

                /**
                 * Decodes a CreatePveRoomRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CreatePveRoomRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.CreatePveRoomRequest;

                /**
                 * Verifies a CreatePveRoomRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CreatePveRoomRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CreatePveRoomRequest
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.CreatePveRoomRequest;

                /**
                 * Creates a plain object from a CreatePveRoomRequest message. Also converts values to other types if specified.
                 * @param message CreatePveRoomRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.CreatePveRoomRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CreatePveRoomRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for CreatePveRoomRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GetRoomsRequest. */
            interface IGetRoomsRequest {
            }

            /** Represents a GetRoomsRequest. */
            class GetRoomsRequest implements IGetRoomsRequest {

                /**
                 * Constructs a new GetRoomsRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IGetRoomsRequest);

                /**
                 * Creates a new GetRoomsRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetRoomsRequest instance
                 */
                public static create(properties?: miti99.caro.protocol.IGetRoomsRequest): miti99.caro.protocol.GetRoomsRequest;

                /**
                 * Encodes the specified GetRoomsRequest message. Does not implicitly {@link miti99.caro.protocol.GetRoomsRequest.verify|verify} messages.
                 * @param message GetRoomsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IGetRoomsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetRoomsRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.GetRoomsRequest.verify|verify} messages.
                 * @param message GetRoomsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IGetRoomsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetRoomsRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetRoomsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.GetRoomsRequest;

                /**
                 * Decodes a GetRoomsRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetRoomsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.GetRoomsRequest;

                /**
                 * Verifies a GetRoomsRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetRoomsRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetRoomsRequest
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.GetRoomsRequest;

                /**
                 * Creates a plain object from a GetRoomsRequest message. Also converts values to other types if specified.
                 * @param message GetRoomsRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.GetRoomsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetRoomsRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetRoomsRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a JoinRoomRequest. */
            interface IJoinRoomRequest {

                /** JoinRoomRequest roomId */
                roomId?: (number|null);
            }

            /** Represents a JoinRoomRequest. */
            class JoinRoomRequest implements IJoinRoomRequest {

                /**
                 * Constructs a new JoinRoomRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IJoinRoomRequest);

                /** JoinRoomRequest roomId. */
                public roomId: number;

                /**
                 * Creates a new JoinRoomRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns JoinRoomRequest instance
                 */
                public static create(properties?: miti99.caro.protocol.IJoinRoomRequest): miti99.caro.protocol.JoinRoomRequest;

                /**
                 * Encodes the specified JoinRoomRequest message. Does not implicitly {@link miti99.caro.protocol.JoinRoomRequest.verify|verify} messages.
                 * @param message JoinRoomRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IJoinRoomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified JoinRoomRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.JoinRoomRequest.verify|verify} messages.
                 * @param message JoinRoomRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IJoinRoomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a JoinRoomRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns JoinRoomRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.JoinRoomRequest;

                /**
                 * Decodes a JoinRoomRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns JoinRoomRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.JoinRoomRequest;

                /**
                 * Verifies a JoinRoomRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a JoinRoomRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns JoinRoomRequest
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.JoinRoomRequest;

                /**
                 * Creates a plain object from a JoinRoomRequest message. Also converts values to other types if specified.
                 * @param message JoinRoomRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.JoinRoomRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this JoinRoomRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for JoinRoomRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GameStartingRequest. */
            interface IGameStartingRequest {
            }

            /** Represents a GameStartingRequest. */
            class GameStartingRequest implements IGameStartingRequest {

                /**
                 * Constructs a new GameStartingRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IGameStartingRequest);

                /**
                 * Creates a new GameStartingRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GameStartingRequest instance
                 */
                public static create(properties?: miti99.caro.protocol.IGameStartingRequest): miti99.caro.protocol.GameStartingRequest;

                /**
                 * Encodes the specified GameStartingRequest message. Does not implicitly {@link miti99.caro.protocol.GameStartingRequest.verify|verify} messages.
                 * @param message GameStartingRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IGameStartingRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GameStartingRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameStartingRequest.verify|verify} messages.
                 * @param message GameStartingRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IGameStartingRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GameStartingRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GameStartingRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.GameStartingRequest;

                /**
                 * Decodes a GameStartingRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GameStartingRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.GameStartingRequest;

                /**
                 * Verifies a GameStartingRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GameStartingRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GameStartingRequest
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.GameStartingRequest;

                /**
                 * Creates a plain object from a GameStartingRequest message. Also converts values to other types if specified.
                 * @param message GameStartingRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.GameStartingRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GameStartingRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GameStartingRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GameReadyRequest. */
            interface IGameReadyRequest {
            }

            /** Represents a GameReadyRequest. */
            class GameReadyRequest implements IGameReadyRequest {

                /**
                 * Constructs a new GameReadyRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IGameReadyRequest);

                /**
                 * Creates a new GameReadyRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GameReadyRequest instance
                 */
                public static create(properties?: miti99.caro.protocol.IGameReadyRequest): miti99.caro.protocol.GameReadyRequest;

                /**
                 * Encodes the specified GameReadyRequest message. Does not implicitly {@link miti99.caro.protocol.GameReadyRequest.verify|verify} messages.
                 * @param message GameReadyRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IGameReadyRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GameReadyRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameReadyRequest.verify|verify} messages.
                 * @param message GameReadyRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IGameReadyRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GameReadyRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GameReadyRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.GameReadyRequest;

                /**
                 * Decodes a GameReadyRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GameReadyRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.GameReadyRequest;

                /**
                 * Verifies a GameReadyRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GameReadyRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GameReadyRequest
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.GameReadyRequest;

                /**
                 * Creates a plain object from a GameReadyRequest message. Also converts values to other types if specified.
                 * @param message GameReadyRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.GameReadyRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GameReadyRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GameReadyRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GameMoveRequest. */
            interface IGameMoveRequest {

                /** GameMoveRequest row */
                row?: (number|null);

                /** GameMoveRequest col */
                col?: (number|null);
            }

            /** Represents a GameMoveRequest. */
            class GameMoveRequest implements IGameMoveRequest {

                /**
                 * Constructs a new GameMoveRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IGameMoveRequest);

                /** GameMoveRequest row. */
                public row: number;

                /** GameMoveRequest col. */
                public col: number;

                /**
                 * Creates a new GameMoveRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GameMoveRequest instance
                 */
                public static create(properties?: miti99.caro.protocol.IGameMoveRequest): miti99.caro.protocol.GameMoveRequest;

                /**
                 * Encodes the specified GameMoveRequest message. Does not implicitly {@link miti99.caro.protocol.GameMoveRequest.verify|verify} messages.
                 * @param message GameMoveRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IGameMoveRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GameMoveRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameMoveRequest.verify|verify} messages.
                 * @param message GameMoveRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IGameMoveRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GameMoveRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GameMoveRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.GameMoveRequest;

                /**
                 * Decodes a GameMoveRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GameMoveRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.GameMoveRequest;

                /**
                 * Verifies a GameMoveRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GameMoveRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GameMoveRequest
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.GameMoveRequest;

                /**
                 * Creates a plain object from a GameMoveRequest message. Also converts values to other types if specified.
                 * @param message GameMoveRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.GameMoveRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GameMoveRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GameMoveRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GameResetRequest. */
            interface IGameResetRequest {
            }

            /** Represents a GameResetRequest. */
            class GameResetRequest implements IGameResetRequest {

                /**
                 * Constructs a new GameResetRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IGameResetRequest);

                /**
                 * Creates a new GameResetRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GameResetRequest instance
                 */
                public static create(properties?: miti99.caro.protocol.IGameResetRequest): miti99.caro.protocol.GameResetRequest;

                /**
                 * Encodes the specified GameResetRequest message. Does not implicitly {@link miti99.caro.protocol.GameResetRequest.verify|verify} messages.
                 * @param message GameResetRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IGameResetRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GameResetRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameResetRequest.verify|verify} messages.
                 * @param message GameResetRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IGameResetRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GameResetRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GameResetRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.GameResetRequest;

                /**
                 * Decodes a GameResetRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GameResetRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.GameResetRequest;

                /**
                 * Verifies a GameResetRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GameResetRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GameResetRequest
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.GameResetRequest;

                /**
                 * Creates a plain object from a GameResetRequest message. Also converts values to other types if specified.
                 * @param message GameResetRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.GameResetRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GameResetRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GameResetRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a WatchGameRequest. */
            interface IWatchGameRequest {

                /** WatchGameRequest roomId */
                roomId?: (number|null);
            }

            /** Represents a WatchGameRequest. */
            class WatchGameRequest implements IWatchGameRequest {

                /**
                 * Constructs a new WatchGameRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IWatchGameRequest);

                /** WatchGameRequest roomId. */
                public roomId: number;

                /**
                 * Creates a new WatchGameRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns WatchGameRequest instance
                 */
                public static create(properties?: miti99.caro.protocol.IWatchGameRequest): miti99.caro.protocol.WatchGameRequest;

                /**
                 * Encodes the specified WatchGameRequest message. Does not implicitly {@link miti99.caro.protocol.WatchGameRequest.verify|verify} messages.
                 * @param message WatchGameRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IWatchGameRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified WatchGameRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.WatchGameRequest.verify|verify} messages.
                 * @param message WatchGameRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IWatchGameRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a WatchGameRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns WatchGameRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.WatchGameRequest;

                /**
                 * Decodes a WatchGameRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns WatchGameRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.WatchGameRequest;

                /**
                 * Verifies a WatchGameRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a WatchGameRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns WatchGameRequest
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.WatchGameRequest;

                /**
                 * Creates a plain object from a WatchGameRequest message. Also converts values to other types if specified.
                 * @param message WatchGameRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.WatchGameRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this WatchGameRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for WatchGameRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a WatchGameExitRequest. */
            interface IWatchGameExitRequest {
            }

            /** Represents a WatchGameExitRequest. */
            class WatchGameExitRequest implements IWatchGameExitRequest {

                /**
                 * Constructs a new WatchGameExitRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IWatchGameExitRequest);

                /**
                 * Creates a new WatchGameExitRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns WatchGameExitRequest instance
                 */
                public static create(properties?: miti99.caro.protocol.IWatchGameExitRequest): miti99.caro.protocol.WatchGameExitRequest;

                /**
                 * Encodes the specified WatchGameExitRequest message. Does not implicitly {@link miti99.caro.protocol.WatchGameExitRequest.verify|verify} messages.
                 * @param message WatchGameExitRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IWatchGameExitRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified WatchGameExitRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.WatchGameExitRequest.verify|verify} messages.
                 * @param message WatchGameExitRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IWatchGameExitRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a WatchGameExitRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns WatchGameExitRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.WatchGameExitRequest;

                /**
                 * Decodes a WatchGameExitRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns WatchGameExitRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.WatchGameExitRequest;

                /**
                 * Verifies a WatchGameExitRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a WatchGameExitRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns WatchGameExitRequest
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.WatchGameExitRequest;

                /**
                 * Creates a plain object from a WatchGameExitRequest message. Also converts values to other types if specified.
                 * @param message WatchGameExitRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.WatchGameExitRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this WatchGameExitRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for WatchGameExitRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ClientExitRequest. */
            interface IClientExitRequest {
            }

            /** Represents a ClientExitRequest. */
            class ClientExitRequest implements IClientExitRequest {

                /**
                 * Constructs a new ClientExitRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IClientExitRequest);

                /**
                 * Creates a new ClientExitRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ClientExitRequest instance
                 */
                public static create(properties?: miti99.caro.protocol.IClientExitRequest): miti99.caro.protocol.ClientExitRequest;

                /**
                 * Encodes the specified ClientExitRequest message. Does not implicitly {@link miti99.caro.protocol.ClientExitRequest.verify|verify} messages.
                 * @param message ClientExitRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IClientExitRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ClientExitRequest message, length delimited. Does not implicitly {@link miti99.caro.protocol.ClientExitRequest.verify|verify} messages.
                 * @param message ClientExitRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IClientExitRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ClientExitRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ClientExitRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.ClientExitRequest;

                /**
                 * Decodes a ClientExitRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ClientExitRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.ClientExitRequest;

                /**
                 * Verifies a ClientExitRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ClientExitRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ClientExitRequest
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.ClientExitRequest;

                /**
                 * Creates a plain object from a ClientExitRequest message. Also converts values to other types if specified.
                 * @param message ClientExitRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.ClientExitRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ClientExitRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ClientExitRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a Response. */
            interface IResponse {

                /** Response clientConnect */
                clientConnect?: (miti99.caro.protocol.IClientConnectResponse|null);

                /** Response nicknameSet */
                nicknameSet?: (miti99.caro.protocol.INicknameSetResponse|null);

                /** Response showOptions */
                showOptions?: (miti99.caro.protocol.IShowOptionsResponse|null);

                /** Response showRooms */
                showRooms?: (miti99.caro.protocol.IShowRoomsResponse|null);

                /** Response roomCreateSuccess */
                roomCreateSuccess?: (miti99.caro.protocol.IRoomCreateSuccessResponse|null);

                /** Response roomJoinSuccess */
                roomJoinSuccess?: (miti99.caro.protocol.IRoomJoinSuccessResponse|null);

                /** Response roomJoinFailFull */
                roomJoinFailFull?: (miti99.caro.protocol.IRoomJoinFailFullResponse|null);

                /** Response roomJoinFailNotFound */
                roomJoinFailNotFound?: (miti99.caro.protocol.IRoomJoinFailNotFoundResponse|null);

                /** Response roomPlayFailNotFound */
                roomPlayFailNotFound?: (miti99.caro.protocol.IRoomPlayFailNotFoundResponse|null);

                /** Response gameStarting */
                gameStarting?: (miti99.caro.protocol.IGameStartingResponse|null);

                /** Response gameReady */
                gameReady?: (miti99.caro.protocol.IGameReadyResponse|null);

                /** Response gameMoveSuccess */
                gameMoveSuccess?: (miti99.caro.protocol.IGameMoveSuccessResponse|null);

                /** Response gameMoveInvalid */
                gameMoveInvalid?: (miti99.caro.protocol.IGameMoveInvalidResponse|null);

                /** Response gameMoveOccupied */
                gameMoveOccupied?: (miti99.caro.protocol.IGameMoveOccupiedResponse|null);

                /** Response gameMoveOutOfBounds */
                gameMoveOutOfBounds?: (miti99.caro.protocol.IGameMoveOutOfBoundsResponse|null);

                /** Response gameMoveNotYourTurn */
                gameMoveNotYourTurn?: (miti99.caro.protocol.IGameMoveNotYourTurnResponse|null);

                /** Response gameOver */
                gameOver?: (miti99.caro.protocol.IGameOverResponse|null);

                /** Response pveDifficultyNotSupport */
                pveDifficultyNotSupport?: (miti99.caro.protocol.IPveDifficultyNotSupportResponse|null);

                /** Response watchGameSuccess */
                watchGameSuccess?: (miti99.caro.protocol.IWatchGameSuccessResponse|null);

                /** Response clientExit */
                clientExit?: (miti99.caro.protocol.IClientExitResponse|null);
            }

            /** Represents a Response. */
            class Response implements IResponse {

                /**
                 * Constructs a new Response.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IResponse);

                /** Response clientConnect. */
                public clientConnect?: (miti99.caro.protocol.IClientConnectResponse|null);

                /** Response nicknameSet. */
                public nicknameSet?: (miti99.caro.protocol.INicknameSetResponse|null);

                /** Response showOptions. */
                public showOptions?: (miti99.caro.protocol.IShowOptionsResponse|null);

                /** Response showRooms. */
                public showRooms?: (miti99.caro.protocol.IShowRoomsResponse|null);

                /** Response roomCreateSuccess. */
                public roomCreateSuccess?: (miti99.caro.protocol.IRoomCreateSuccessResponse|null);

                /** Response roomJoinSuccess. */
                public roomJoinSuccess?: (miti99.caro.protocol.IRoomJoinSuccessResponse|null);

                /** Response roomJoinFailFull. */
                public roomJoinFailFull?: (miti99.caro.protocol.IRoomJoinFailFullResponse|null);

                /** Response roomJoinFailNotFound. */
                public roomJoinFailNotFound?: (miti99.caro.protocol.IRoomJoinFailNotFoundResponse|null);

                /** Response roomPlayFailNotFound. */
                public roomPlayFailNotFound?: (miti99.caro.protocol.IRoomPlayFailNotFoundResponse|null);

                /** Response gameStarting. */
                public gameStarting?: (miti99.caro.protocol.IGameStartingResponse|null);

                /** Response gameReady. */
                public gameReady?: (miti99.caro.protocol.IGameReadyResponse|null);

                /** Response gameMoveSuccess. */
                public gameMoveSuccess?: (miti99.caro.protocol.IGameMoveSuccessResponse|null);

                /** Response gameMoveInvalid. */
                public gameMoveInvalid?: (miti99.caro.protocol.IGameMoveInvalidResponse|null);

                /** Response gameMoveOccupied. */
                public gameMoveOccupied?: (miti99.caro.protocol.IGameMoveOccupiedResponse|null);

                /** Response gameMoveOutOfBounds. */
                public gameMoveOutOfBounds?: (miti99.caro.protocol.IGameMoveOutOfBoundsResponse|null);

                /** Response gameMoveNotYourTurn. */
                public gameMoveNotYourTurn?: (miti99.caro.protocol.IGameMoveNotYourTurnResponse|null);

                /** Response gameOver. */
                public gameOver?: (miti99.caro.protocol.IGameOverResponse|null);

                /** Response pveDifficultyNotSupport. */
                public pveDifficultyNotSupport?: (miti99.caro.protocol.IPveDifficultyNotSupportResponse|null);

                /** Response watchGameSuccess. */
                public watchGameSuccess?: (miti99.caro.protocol.IWatchGameSuccessResponse|null);

                /** Response clientExit. */
                public clientExit?: (miti99.caro.protocol.IClientExitResponse|null);

                /** Response payload. */
                public payload?: ("clientConnect"|"nicknameSet"|"showOptions"|"showRooms"|"roomCreateSuccess"|"roomJoinSuccess"|"roomJoinFailFull"|"roomJoinFailNotFound"|"roomPlayFailNotFound"|"gameStarting"|"gameReady"|"gameMoveSuccess"|"gameMoveInvalid"|"gameMoveOccupied"|"gameMoveOutOfBounds"|"gameMoveNotYourTurn"|"gameOver"|"pveDifficultyNotSupport"|"watchGameSuccess"|"clientExit");

                /**
                 * Creates a new Response instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Response instance
                 */
                public static create(properties?: miti99.caro.protocol.IResponse): miti99.caro.protocol.Response;

                /**
                 * Encodes the specified Response message. Does not implicitly {@link miti99.caro.protocol.Response.verify|verify} messages.
                 * @param message Response message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Response message, length delimited. Does not implicitly {@link miti99.caro.protocol.Response.verify|verify} messages.
                 * @param message Response message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Response message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Response
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.Response;

                /**
                 * Decodes a Response message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Response
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.Response;

                /**
                 * Verifies a Response message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Response message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Response
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.Response;

                /**
                 * Creates a plain object from a Response message. Also converts values to other types if specified.
                 * @param message Response
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Response to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Response
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ClientConnectResponse. */
            interface IClientConnectResponse {

                /** ClientConnectResponse clientId */
                clientId?: (number|null);
            }

            /** Represents a ClientConnectResponse. */
            class ClientConnectResponse implements IClientConnectResponse {

                /**
                 * Constructs a new ClientConnectResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IClientConnectResponse);

                /** ClientConnectResponse clientId. */
                public clientId: number;

                /**
                 * Creates a new ClientConnectResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ClientConnectResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IClientConnectResponse): miti99.caro.protocol.ClientConnectResponse;

                /**
                 * Encodes the specified ClientConnectResponse message. Does not implicitly {@link miti99.caro.protocol.ClientConnectResponse.verify|verify} messages.
                 * @param message ClientConnectResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IClientConnectResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ClientConnectResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.ClientConnectResponse.verify|verify} messages.
                 * @param message ClientConnectResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IClientConnectResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ClientConnectResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ClientConnectResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.ClientConnectResponse;

                /**
                 * Decodes a ClientConnectResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ClientConnectResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.ClientConnectResponse;

                /**
                 * Verifies a ClientConnectResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ClientConnectResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ClientConnectResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.ClientConnectResponse;

                /**
                 * Creates a plain object from a ClientConnectResponse message. Also converts values to other types if specified.
                 * @param message ClientConnectResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.ClientConnectResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ClientConnectResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ClientConnectResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a NicknameSetResponse. */
            interface INicknameSetResponse {

                /** NicknameSetResponse invalidLength */
                invalidLength?: (number|null);
            }

            /** Represents a NicknameSetResponse. */
            class NicknameSetResponse implements INicknameSetResponse {

                /**
                 * Constructs a new NicknameSetResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.INicknameSetResponse);

                /** NicknameSetResponse invalidLength. */
                public invalidLength: number;

                /**
                 * Creates a new NicknameSetResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns NicknameSetResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.INicknameSetResponse): miti99.caro.protocol.NicknameSetResponse;

                /**
                 * Encodes the specified NicknameSetResponse message. Does not implicitly {@link miti99.caro.protocol.NicknameSetResponse.verify|verify} messages.
                 * @param message NicknameSetResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.INicknameSetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified NicknameSetResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.NicknameSetResponse.verify|verify} messages.
                 * @param message NicknameSetResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.INicknameSetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a NicknameSetResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns NicknameSetResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.NicknameSetResponse;

                /**
                 * Decodes a NicknameSetResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns NicknameSetResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.NicknameSetResponse;

                /**
                 * Verifies a NicknameSetResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a NicknameSetResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns NicknameSetResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.NicknameSetResponse;

                /**
                 * Creates a plain object from a NicknameSetResponse message. Also converts values to other types if specified.
                 * @param message NicknameSetResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.NicknameSetResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this NicknameSetResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for NicknameSetResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ShowOptionsResponse. */
            interface IShowOptionsResponse {
            }

            /** Represents a ShowOptionsResponse. */
            class ShowOptionsResponse implements IShowOptionsResponse {

                /**
                 * Constructs a new ShowOptionsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IShowOptionsResponse);

                /**
                 * Creates a new ShowOptionsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ShowOptionsResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IShowOptionsResponse): miti99.caro.protocol.ShowOptionsResponse;

                /**
                 * Encodes the specified ShowOptionsResponse message. Does not implicitly {@link miti99.caro.protocol.ShowOptionsResponse.verify|verify} messages.
                 * @param message ShowOptionsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IShowOptionsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ShowOptionsResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.ShowOptionsResponse.verify|verify} messages.
                 * @param message ShowOptionsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IShowOptionsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ShowOptionsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ShowOptionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.ShowOptionsResponse;

                /**
                 * Decodes a ShowOptionsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ShowOptionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.ShowOptionsResponse;

                /**
                 * Verifies a ShowOptionsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ShowOptionsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ShowOptionsResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.ShowOptionsResponse;

                /**
                 * Creates a plain object from a ShowOptionsResponse message. Also converts values to other types if specified.
                 * @param message ShowOptionsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.ShowOptionsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ShowOptionsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ShowOptionsResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a RoomSummary. */
            interface IRoomSummary {

                /** RoomSummary roomId */
                roomId?: (number|null);

                /** RoomSummary roomOwner */
                roomOwner?: (string|null);

                /** RoomSummary roomClientCount */
                roomClientCount?: (number|null);

                /** RoomSummary roomType */
                roomType?: (string|null);
            }

            /** Represents a RoomSummary. */
            class RoomSummary implements IRoomSummary {

                /**
                 * Constructs a new RoomSummary.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IRoomSummary);

                /** RoomSummary roomId. */
                public roomId: number;

                /** RoomSummary roomOwner. */
                public roomOwner: string;

                /** RoomSummary roomClientCount. */
                public roomClientCount: number;

                /** RoomSummary roomType. */
                public roomType: string;

                /**
                 * Creates a new RoomSummary instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RoomSummary instance
                 */
                public static create(properties?: miti99.caro.protocol.IRoomSummary): miti99.caro.protocol.RoomSummary;

                /**
                 * Encodes the specified RoomSummary message. Does not implicitly {@link miti99.caro.protocol.RoomSummary.verify|verify} messages.
                 * @param message RoomSummary message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IRoomSummary, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RoomSummary message, length delimited. Does not implicitly {@link miti99.caro.protocol.RoomSummary.verify|verify} messages.
                 * @param message RoomSummary message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IRoomSummary, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RoomSummary message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RoomSummary
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.RoomSummary;

                /**
                 * Decodes a RoomSummary message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RoomSummary
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.RoomSummary;

                /**
                 * Verifies a RoomSummary message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RoomSummary message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RoomSummary
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.RoomSummary;

                /**
                 * Creates a plain object from a RoomSummary message. Also converts values to other types if specified.
                 * @param message RoomSummary
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.RoomSummary, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RoomSummary to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for RoomSummary
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ShowRoomsResponse. */
            interface IShowRoomsResponse {

                /** ShowRoomsResponse rooms */
                rooms?: (miti99.caro.protocol.IRoomSummary[]|null);
            }

            /** Represents a ShowRoomsResponse. */
            class ShowRoomsResponse implements IShowRoomsResponse {

                /**
                 * Constructs a new ShowRoomsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IShowRoomsResponse);

                /** ShowRoomsResponse rooms. */
                public rooms: miti99.caro.protocol.IRoomSummary[];

                /**
                 * Creates a new ShowRoomsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ShowRoomsResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IShowRoomsResponse): miti99.caro.protocol.ShowRoomsResponse;

                /**
                 * Encodes the specified ShowRoomsResponse message. Does not implicitly {@link miti99.caro.protocol.ShowRoomsResponse.verify|verify} messages.
                 * @param message ShowRoomsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IShowRoomsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ShowRoomsResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.ShowRoomsResponse.verify|verify} messages.
                 * @param message ShowRoomsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IShowRoomsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ShowRoomsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ShowRoomsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.ShowRoomsResponse;

                /**
                 * Decodes a ShowRoomsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ShowRoomsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.ShowRoomsResponse;

                /**
                 * Verifies a ShowRoomsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ShowRoomsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ShowRoomsResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.ShowRoomsResponse;

                /**
                 * Creates a plain object from a ShowRoomsResponse message. Also converts values to other types if specified.
                 * @param message ShowRoomsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.ShowRoomsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ShowRoomsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ShowRoomsResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a RoomCreateSuccessResponse. */
            interface IRoomCreateSuccessResponse {

                /** RoomCreateSuccessResponse id */
                id?: (number|null);

                /** RoomCreateSuccessResponse roomOwner */
                roomOwner?: (string|null);

                /** RoomCreateSuccessResponse roomType */
                roomType?: (string|null);
            }

            /** Represents a RoomCreateSuccessResponse. */
            class RoomCreateSuccessResponse implements IRoomCreateSuccessResponse {

                /**
                 * Constructs a new RoomCreateSuccessResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IRoomCreateSuccessResponse);

                /** RoomCreateSuccessResponse id. */
                public id: number;

                /** RoomCreateSuccessResponse roomOwner. */
                public roomOwner: string;

                /** RoomCreateSuccessResponse roomType. */
                public roomType: string;

                /**
                 * Creates a new RoomCreateSuccessResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RoomCreateSuccessResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IRoomCreateSuccessResponse): miti99.caro.protocol.RoomCreateSuccessResponse;

                /**
                 * Encodes the specified RoomCreateSuccessResponse message. Does not implicitly {@link miti99.caro.protocol.RoomCreateSuccessResponse.verify|verify} messages.
                 * @param message RoomCreateSuccessResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IRoomCreateSuccessResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RoomCreateSuccessResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.RoomCreateSuccessResponse.verify|verify} messages.
                 * @param message RoomCreateSuccessResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IRoomCreateSuccessResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RoomCreateSuccessResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RoomCreateSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.RoomCreateSuccessResponse;

                /**
                 * Decodes a RoomCreateSuccessResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RoomCreateSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.RoomCreateSuccessResponse;

                /**
                 * Verifies a RoomCreateSuccessResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RoomCreateSuccessResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RoomCreateSuccessResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.RoomCreateSuccessResponse;

                /**
                 * Creates a plain object from a RoomCreateSuccessResponse message. Also converts values to other types if specified.
                 * @param message RoomCreateSuccessResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.RoomCreateSuccessResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RoomCreateSuccessResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for RoomCreateSuccessResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a RoomJoinSuccessResponse. */
            interface IRoomJoinSuccessResponse {

                /** RoomJoinSuccessResponse clientId */
                clientId?: (number|null);

                /** RoomJoinSuccessResponse clientNickname */
                clientNickname?: (string|null);

                /** RoomJoinSuccessResponse roomId */
                roomId?: (number|null);

                /** RoomJoinSuccessResponse roomOwner */
                roomOwner?: (string|null);

                /** RoomJoinSuccessResponse roomClientCount */
                roomClientCount?: (number|null);
            }

            /** Represents a RoomJoinSuccessResponse. */
            class RoomJoinSuccessResponse implements IRoomJoinSuccessResponse {

                /**
                 * Constructs a new RoomJoinSuccessResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IRoomJoinSuccessResponse);

                /** RoomJoinSuccessResponse clientId. */
                public clientId: number;

                /** RoomJoinSuccessResponse clientNickname. */
                public clientNickname: string;

                /** RoomJoinSuccessResponse roomId. */
                public roomId: number;

                /** RoomJoinSuccessResponse roomOwner. */
                public roomOwner: string;

                /** RoomJoinSuccessResponse roomClientCount. */
                public roomClientCount: number;

                /**
                 * Creates a new RoomJoinSuccessResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RoomJoinSuccessResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IRoomJoinSuccessResponse): miti99.caro.protocol.RoomJoinSuccessResponse;

                /**
                 * Encodes the specified RoomJoinSuccessResponse message. Does not implicitly {@link miti99.caro.protocol.RoomJoinSuccessResponse.verify|verify} messages.
                 * @param message RoomJoinSuccessResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IRoomJoinSuccessResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RoomJoinSuccessResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.RoomJoinSuccessResponse.verify|verify} messages.
                 * @param message RoomJoinSuccessResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IRoomJoinSuccessResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RoomJoinSuccessResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RoomJoinSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.RoomJoinSuccessResponse;

                /**
                 * Decodes a RoomJoinSuccessResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RoomJoinSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.RoomJoinSuccessResponse;

                /**
                 * Verifies a RoomJoinSuccessResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RoomJoinSuccessResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RoomJoinSuccessResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.RoomJoinSuccessResponse;

                /**
                 * Creates a plain object from a RoomJoinSuccessResponse message. Also converts values to other types if specified.
                 * @param message RoomJoinSuccessResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.RoomJoinSuccessResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RoomJoinSuccessResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for RoomJoinSuccessResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a RoomJoinFailFullResponse. */
            interface IRoomJoinFailFullResponse {

                /** RoomJoinFailFullResponse roomId */
                roomId?: (number|null);

                /** RoomJoinFailFullResponse roomOwner */
                roomOwner?: (string|null);
            }

            /** Represents a RoomJoinFailFullResponse. */
            class RoomJoinFailFullResponse implements IRoomJoinFailFullResponse {

                /**
                 * Constructs a new RoomJoinFailFullResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IRoomJoinFailFullResponse);

                /** RoomJoinFailFullResponse roomId. */
                public roomId: number;

                /** RoomJoinFailFullResponse roomOwner. */
                public roomOwner: string;

                /**
                 * Creates a new RoomJoinFailFullResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RoomJoinFailFullResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IRoomJoinFailFullResponse): miti99.caro.protocol.RoomJoinFailFullResponse;

                /**
                 * Encodes the specified RoomJoinFailFullResponse message. Does not implicitly {@link miti99.caro.protocol.RoomJoinFailFullResponse.verify|verify} messages.
                 * @param message RoomJoinFailFullResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IRoomJoinFailFullResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RoomJoinFailFullResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.RoomJoinFailFullResponse.verify|verify} messages.
                 * @param message RoomJoinFailFullResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IRoomJoinFailFullResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RoomJoinFailFullResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RoomJoinFailFullResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.RoomJoinFailFullResponse;

                /**
                 * Decodes a RoomJoinFailFullResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RoomJoinFailFullResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.RoomJoinFailFullResponse;

                /**
                 * Verifies a RoomJoinFailFullResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RoomJoinFailFullResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RoomJoinFailFullResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.RoomJoinFailFullResponse;

                /**
                 * Creates a plain object from a RoomJoinFailFullResponse message. Also converts values to other types if specified.
                 * @param message RoomJoinFailFullResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.RoomJoinFailFullResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RoomJoinFailFullResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for RoomJoinFailFullResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a RoomJoinFailNotFoundResponse. */
            interface IRoomJoinFailNotFoundResponse {

                /** RoomJoinFailNotFoundResponse roomId */
                roomId?: (number|null);
            }

            /** Represents a RoomJoinFailNotFoundResponse. */
            class RoomJoinFailNotFoundResponse implements IRoomJoinFailNotFoundResponse {

                /**
                 * Constructs a new RoomJoinFailNotFoundResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IRoomJoinFailNotFoundResponse);

                /** RoomJoinFailNotFoundResponse roomId. */
                public roomId: number;

                /**
                 * Creates a new RoomJoinFailNotFoundResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RoomJoinFailNotFoundResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IRoomJoinFailNotFoundResponse): miti99.caro.protocol.RoomJoinFailNotFoundResponse;

                /**
                 * Encodes the specified RoomJoinFailNotFoundResponse message. Does not implicitly {@link miti99.caro.protocol.RoomJoinFailNotFoundResponse.verify|verify} messages.
                 * @param message RoomJoinFailNotFoundResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IRoomJoinFailNotFoundResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RoomJoinFailNotFoundResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.RoomJoinFailNotFoundResponse.verify|verify} messages.
                 * @param message RoomJoinFailNotFoundResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IRoomJoinFailNotFoundResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RoomJoinFailNotFoundResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RoomJoinFailNotFoundResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.RoomJoinFailNotFoundResponse;

                /**
                 * Decodes a RoomJoinFailNotFoundResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RoomJoinFailNotFoundResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.RoomJoinFailNotFoundResponse;

                /**
                 * Verifies a RoomJoinFailNotFoundResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RoomJoinFailNotFoundResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RoomJoinFailNotFoundResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.RoomJoinFailNotFoundResponse;

                /**
                 * Creates a plain object from a RoomJoinFailNotFoundResponse message. Also converts values to other types if specified.
                 * @param message RoomJoinFailNotFoundResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.RoomJoinFailNotFoundResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RoomJoinFailNotFoundResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for RoomJoinFailNotFoundResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a RoomPlayFailNotFoundResponse. */
            interface IRoomPlayFailNotFoundResponse {
            }

            /** Represents a RoomPlayFailNotFoundResponse. */
            class RoomPlayFailNotFoundResponse implements IRoomPlayFailNotFoundResponse {

                /**
                 * Constructs a new RoomPlayFailNotFoundResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IRoomPlayFailNotFoundResponse);

                /**
                 * Creates a new RoomPlayFailNotFoundResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RoomPlayFailNotFoundResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IRoomPlayFailNotFoundResponse): miti99.caro.protocol.RoomPlayFailNotFoundResponse;

                /**
                 * Encodes the specified RoomPlayFailNotFoundResponse message. Does not implicitly {@link miti99.caro.protocol.RoomPlayFailNotFoundResponse.verify|verify} messages.
                 * @param message RoomPlayFailNotFoundResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IRoomPlayFailNotFoundResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RoomPlayFailNotFoundResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.RoomPlayFailNotFoundResponse.verify|verify} messages.
                 * @param message RoomPlayFailNotFoundResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IRoomPlayFailNotFoundResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RoomPlayFailNotFoundResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RoomPlayFailNotFoundResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.RoomPlayFailNotFoundResponse;

                /**
                 * Decodes a RoomPlayFailNotFoundResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RoomPlayFailNotFoundResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.RoomPlayFailNotFoundResponse;

                /**
                 * Verifies a RoomPlayFailNotFoundResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RoomPlayFailNotFoundResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RoomPlayFailNotFoundResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.RoomPlayFailNotFoundResponse;

                /**
                 * Creates a plain object from a RoomPlayFailNotFoundResponse message. Also converts values to other types if specified.
                 * @param message RoomPlayFailNotFoundResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.RoomPlayFailNotFoundResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RoomPlayFailNotFoundResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for RoomPlayFailNotFoundResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GameStartingResponse. */
            interface IGameStartingResponse {

                /** GameStartingResponse roomId */
                roomId?: (number|null);

                /** GameStartingResponse blackPlayerId */
                blackPlayerId?: (number|null);

                /** GameStartingResponse blackPlayerNickname */
                blackPlayerNickname?: (string|null);

                /** GameStartingResponse whitePlayerId */
                whitePlayerId?: (number|null);

                /** GameStartingResponse whitePlayerNickname */
                whitePlayerNickname?: (string|null);

                /** GameStartingResponse boardSize */
                boardSize?: (number|null);
            }

            /** Represents a GameStartingResponse. */
            class GameStartingResponse implements IGameStartingResponse {

                /**
                 * Constructs a new GameStartingResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IGameStartingResponse);

                /** GameStartingResponse roomId. */
                public roomId: number;

                /** GameStartingResponse blackPlayerId. */
                public blackPlayerId: number;

                /** GameStartingResponse blackPlayerNickname. */
                public blackPlayerNickname: string;

                /** GameStartingResponse whitePlayerId. */
                public whitePlayerId: number;

                /** GameStartingResponse whitePlayerNickname. */
                public whitePlayerNickname: string;

                /** GameStartingResponse boardSize. */
                public boardSize: number;

                /**
                 * Creates a new GameStartingResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GameStartingResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IGameStartingResponse): miti99.caro.protocol.GameStartingResponse;

                /**
                 * Encodes the specified GameStartingResponse message. Does not implicitly {@link miti99.caro.protocol.GameStartingResponse.verify|verify} messages.
                 * @param message GameStartingResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IGameStartingResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GameStartingResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameStartingResponse.verify|verify} messages.
                 * @param message GameStartingResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IGameStartingResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GameStartingResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GameStartingResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.GameStartingResponse;

                /**
                 * Decodes a GameStartingResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GameStartingResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.GameStartingResponse;

                /**
                 * Verifies a GameStartingResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GameStartingResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GameStartingResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.GameStartingResponse;

                /**
                 * Creates a plain object from a GameStartingResponse message. Also converts values to other types if specified.
                 * @param message GameStartingResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.GameStartingResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GameStartingResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GameStartingResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GameReadyResponse. */
            interface IGameReadyResponse {

                /** GameReadyResponse clientNickname */
                clientNickname?: (string|null);

                /** GameReadyResponse status */
                status?: (string|null);

                /** GameReadyResponse clientId */
                clientId?: (number|null);
            }

            /** Represents a GameReadyResponse. */
            class GameReadyResponse implements IGameReadyResponse {

                /**
                 * Constructs a new GameReadyResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IGameReadyResponse);

                /** GameReadyResponse clientNickname. */
                public clientNickname: string;

                /** GameReadyResponse status. */
                public status: string;

                /** GameReadyResponse clientId. */
                public clientId: number;

                /**
                 * Creates a new GameReadyResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GameReadyResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IGameReadyResponse): miti99.caro.protocol.GameReadyResponse;

                /**
                 * Encodes the specified GameReadyResponse message. Does not implicitly {@link miti99.caro.protocol.GameReadyResponse.verify|verify} messages.
                 * @param message GameReadyResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IGameReadyResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GameReadyResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameReadyResponse.verify|verify} messages.
                 * @param message GameReadyResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IGameReadyResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GameReadyResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GameReadyResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.GameReadyResponse;

                /**
                 * Decodes a GameReadyResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GameReadyResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.GameReadyResponse;

                /**
                 * Verifies a GameReadyResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GameReadyResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GameReadyResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.GameReadyResponse;

                /**
                 * Creates a plain object from a GameReadyResponse message. Also converts values to other types if specified.
                 * @param message GameReadyResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.GameReadyResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GameReadyResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GameReadyResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GameMoveSuccessResponse. */
            interface IGameMoveSuccessResponse {

                /** GameMoveSuccessResponse row */
                row?: (number|null);

                /** GameMoveSuccessResponse col */
                col?: (number|null);

                /** GameMoveSuccessResponse piece */
                piece?: (string|null);

                /** GameMoveSuccessResponse playerNickname */
                playerNickname?: (string|null);

                /** GameMoveSuccessResponse playerId */
                playerId?: (number|null);
            }

            /** Represents a GameMoveSuccessResponse. */
            class GameMoveSuccessResponse implements IGameMoveSuccessResponse {

                /**
                 * Constructs a new GameMoveSuccessResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IGameMoveSuccessResponse);

                /** GameMoveSuccessResponse row. */
                public row: number;

                /** GameMoveSuccessResponse col. */
                public col: number;

                /** GameMoveSuccessResponse piece. */
                public piece: string;

                /** GameMoveSuccessResponse playerNickname. */
                public playerNickname: string;

                /** GameMoveSuccessResponse playerId. */
                public playerId: number;

                /**
                 * Creates a new GameMoveSuccessResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GameMoveSuccessResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IGameMoveSuccessResponse): miti99.caro.protocol.GameMoveSuccessResponse;

                /**
                 * Encodes the specified GameMoveSuccessResponse message. Does not implicitly {@link miti99.caro.protocol.GameMoveSuccessResponse.verify|verify} messages.
                 * @param message GameMoveSuccessResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IGameMoveSuccessResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GameMoveSuccessResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameMoveSuccessResponse.verify|verify} messages.
                 * @param message GameMoveSuccessResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IGameMoveSuccessResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GameMoveSuccessResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GameMoveSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.GameMoveSuccessResponse;

                /**
                 * Decodes a GameMoveSuccessResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GameMoveSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.GameMoveSuccessResponse;

                /**
                 * Verifies a GameMoveSuccessResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GameMoveSuccessResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GameMoveSuccessResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.GameMoveSuccessResponse;

                /**
                 * Creates a plain object from a GameMoveSuccessResponse message. Also converts values to other types if specified.
                 * @param message GameMoveSuccessResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.GameMoveSuccessResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GameMoveSuccessResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GameMoveSuccessResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GameMoveInvalidResponse. */
            interface IGameMoveInvalidResponse {
            }

            /** Represents a GameMoveInvalidResponse. */
            class GameMoveInvalidResponse implements IGameMoveInvalidResponse {

                /**
                 * Constructs a new GameMoveInvalidResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IGameMoveInvalidResponse);

                /**
                 * Creates a new GameMoveInvalidResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GameMoveInvalidResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IGameMoveInvalidResponse): miti99.caro.protocol.GameMoveInvalidResponse;

                /**
                 * Encodes the specified GameMoveInvalidResponse message. Does not implicitly {@link miti99.caro.protocol.GameMoveInvalidResponse.verify|verify} messages.
                 * @param message GameMoveInvalidResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IGameMoveInvalidResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GameMoveInvalidResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameMoveInvalidResponse.verify|verify} messages.
                 * @param message GameMoveInvalidResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IGameMoveInvalidResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GameMoveInvalidResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GameMoveInvalidResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.GameMoveInvalidResponse;

                /**
                 * Decodes a GameMoveInvalidResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GameMoveInvalidResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.GameMoveInvalidResponse;

                /**
                 * Verifies a GameMoveInvalidResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GameMoveInvalidResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GameMoveInvalidResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.GameMoveInvalidResponse;

                /**
                 * Creates a plain object from a GameMoveInvalidResponse message. Also converts values to other types if specified.
                 * @param message GameMoveInvalidResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.GameMoveInvalidResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GameMoveInvalidResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GameMoveInvalidResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GameMoveOccupiedResponse. */
            interface IGameMoveOccupiedResponse {
            }

            /** Represents a GameMoveOccupiedResponse. */
            class GameMoveOccupiedResponse implements IGameMoveOccupiedResponse {

                /**
                 * Constructs a new GameMoveOccupiedResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IGameMoveOccupiedResponse);

                /**
                 * Creates a new GameMoveOccupiedResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GameMoveOccupiedResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IGameMoveOccupiedResponse): miti99.caro.protocol.GameMoveOccupiedResponse;

                /**
                 * Encodes the specified GameMoveOccupiedResponse message. Does not implicitly {@link miti99.caro.protocol.GameMoveOccupiedResponse.verify|verify} messages.
                 * @param message GameMoveOccupiedResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IGameMoveOccupiedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GameMoveOccupiedResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameMoveOccupiedResponse.verify|verify} messages.
                 * @param message GameMoveOccupiedResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IGameMoveOccupiedResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GameMoveOccupiedResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GameMoveOccupiedResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.GameMoveOccupiedResponse;

                /**
                 * Decodes a GameMoveOccupiedResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GameMoveOccupiedResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.GameMoveOccupiedResponse;

                /**
                 * Verifies a GameMoveOccupiedResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GameMoveOccupiedResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GameMoveOccupiedResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.GameMoveOccupiedResponse;

                /**
                 * Creates a plain object from a GameMoveOccupiedResponse message. Also converts values to other types if specified.
                 * @param message GameMoveOccupiedResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.GameMoveOccupiedResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GameMoveOccupiedResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GameMoveOccupiedResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GameMoveOutOfBoundsResponse. */
            interface IGameMoveOutOfBoundsResponse {
            }

            /** Represents a GameMoveOutOfBoundsResponse. */
            class GameMoveOutOfBoundsResponse implements IGameMoveOutOfBoundsResponse {

                /**
                 * Constructs a new GameMoveOutOfBoundsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IGameMoveOutOfBoundsResponse);

                /**
                 * Creates a new GameMoveOutOfBoundsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GameMoveOutOfBoundsResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IGameMoveOutOfBoundsResponse): miti99.caro.protocol.GameMoveOutOfBoundsResponse;

                /**
                 * Encodes the specified GameMoveOutOfBoundsResponse message. Does not implicitly {@link miti99.caro.protocol.GameMoveOutOfBoundsResponse.verify|verify} messages.
                 * @param message GameMoveOutOfBoundsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IGameMoveOutOfBoundsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GameMoveOutOfBoundsResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameMoveOutOfBoundsResponse.verify|verify} messages.
                 * @param message GameMoveOutOfBoundsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IGameMoveOutOfBoundsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GameMoveOutOfBoundsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GameMoveOutOfBoundsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.GameMoveOutOfBoundsResponse;

                /**
                 * Decodes a GameMoveOutOfBoundsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GameMoveOutOfBoundsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.GameMoveOutOfBoundsResponse;

                /**
                 * Verifies a GameMoveOutOfBoundsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GameMoveOutOfBoundsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GameMoveOutOfBoundsResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.GameMoveOutOfBoundsResponse;

                /**
                 * Creates a plain object from a GameMoveOutOfBoundsResponse message. Also converts values to other types if specified.
                 * @param message GameMoveOutOfBoundsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.GameMoveOutOfBoundsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GameMoveOutOfBoundsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GameMoveOutOfBoundsResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GameMoveNotYourTurnResponse. */
            interface IGameMoveNotYourTurnResponse {
            }

            /** Represents a GameMoveNotYourTurnResponse. */
            class GameMoveNotYourTurnResponse implements IGameMoveNotYourTurnResponse {

                /**
                 * Constructs a new GameMoveNotYourTurnResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IGameMoveNotYourTurnResponse);

                /**
                 * Creates a new GameMoveNotYourTurnResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GameMoveNotYourTurnResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IGameMoveNotYourTurnResponse): miti99.caro.protocol.GameMoveNotYourTurnResponse;

                /**
                 * Encodes the specified GameMoveNotYourTurnResponse message. Does not implicitly {@link miti99.caro.protocol.GameMoveNotYourTurnResponse.verify|verify} messages.
                 * @param message GameMoveNotYourTurnResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IGameMoveNotYourTurnResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GameMoveNotYourTurnResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameMoveNotYourTurnResponse.verify|verify} messages.
                 * @param message GameMoveNotYourTurnResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IGameMoveNotYourTurnResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GameMoveNotYourTurnResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GameMoveNotYourTurnResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.GameMoveNotYourTurnResponse;

                /**
                 * Decodes a GameMoveNotYourTurnResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GameMoveNotYourTurnResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.GameMoveNotYourTurnResponse;

                /**
                 * Verifies a GameMoveNotYourTurnResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GameMoveNotYourTurnResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GameMoveNotYourTurnResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.GameMoveNotYourTurnResponse;

                /**
                 * Creates a plain object from a GameMoveNotYourTurnResponse message. Also converts values to other types if specified.
                 * @param message GameMoveNotYourTurnResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.GameMoveNotYourTurnResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GameMoveNotYourTurnResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GameMoveNotYourTurnResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GameOverResponse. */
            interface IGameOverResponse {

                /** GameOverResponse result */
                result?: (string|null);

                /** GameOverResponse winnerNickname */
                winnerNickname?: (string|null);
            }

            /** Represents a GameOverResponse. */
            class GameOverResponse implements IGameOverResponse {

                /**
                 * Constructs a new GameOverResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IGameOverResponse);

                /** GameOverResponse result. */
                public result: string;

                /** GameOverResponse winnerNickname. */
                public winnerNickname: string;

                /**
                 * Creates a new GameOverResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GameOverResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IGameOverResponse): miti99.caro.protocol.GameOverResponse;

                /**
                 * Encodes the specified GameOverResponse message. Does not implicitly {@link miti99.caro.protocol.GameOverResponse.verify|verify} messages.
                 * @param message GameOverResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IGameOverResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GameOverResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.GameOverResponse.verify|verify} messages.
                 * @param message GameOverResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IGameOverResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GameOverResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GameOverResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.GameOverResponse;

                /**
                 * Decodes a GameOverResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GameOverResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.GameOverResponse;

                /**
                 * Verifies a GameOverResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GameOverResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GameOverResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.GameOverResponse;

                /**
                 * Creates a plain object from a GameOverResponse message. Also converts values to other types if specified.
                 * @param message GameOverResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.GameOverResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GameOverResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GameOverResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a PveDifficultyNotSupportResponse. */
            interface IPveDifficultyNotSupportResponse {
            }

            /** Represents a PveDifficultyNotSupportResponse. */
            class PveDifficultyNotSupportResponse implements IPveDifficultyNotSupportResponse {

                /**
                 * Constructs a new PveDifficultyNotSupportResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IPveDifficultyNotSupportResponse);

                /**
                 * Creates a new PveDifficultyNotSupportResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PveDifficultyNotSupportResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IPveDifficultyNotSupportResponse): miti99.caro.protocol.PveDifficultyNotSupportResponse;

                /**
                 * Encodes the specified PveDifficultyNotSupportResponse message. Does not implicitly {@link miti99.caro.protocol.PveDifficultyNotSupportResponse.verify|verify} messages.
                 * @param message PveDifficultyNotSupportResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IPveDifficultyNotSupportResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PveDifficultyNotSupportResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.PveDifficultyNotSupportResponse.verify|verify} messages.
                 * @param message PveDifficultyNotSupportResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IPveDifficultyNotSupportResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PveDifficultyNotSupportResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PveDifficultyNotSupportResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.PveDifficultyNotSupportResponse;

                /**
                 * Decodes a PveDifficultyNotSupportResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PveDifficultyNotSupportResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.PveDifficultyNotSupportResponse;

                /**
                 * Verifies a PveDifficultyNotSupportResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PveDifficultyNotSupportResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PveDifficultyNotSupportResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.PveDifficultyNotSupportResponse;

                /**
                 * Creates a plain object from a PveDifficultyNotSupportResponse message. Also converts values to other types if specified.
                 * @param message PveDifficultyNotSupportResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.PveDifficultyNotSupportResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PveDifficultyNotSupportResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for PveDifficultyNotSupportResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a WatchGameSuccessResponse. */
            interface IWatchGameSuccessResponse {

                /** WatchGameSuccessResponse owner */
                owner?: (string|null);

                /** WatchGameSuccessResponse status */
                status?: (string|null);
            }

            /** Represents a WatchGameSuccessResponse. */
            class WatchGameSuccessResponse implements IWatchGameSuccessResponse {

                /**
                 * Constructs a new WatchGameSuccessResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IWatchGameSuccessResponse);

                /** WatchGameSuccessResponse owner. */
                public owner: string;

                /** WatchGameSuccessResponse status. */
                public status: string;

                /**
                 * Creates a new WatchGameSuccessResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns WatchGameSuccessResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IWatchGameSuccessResponse): miti99.caro.protocol.WatchGameSuccessResponse;

                /**
                 * Encodes the specified WatchGameSuccessResponse message. Does not implicitly {@link miti99.caro.protocol.WatchGameSuccessResponse.verify|verify} messages.
                 * @param message WatchGameSuccessResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IWatchGameSuccessResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified WatchGameSuccessResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.WatchGameSuccessResponse.verify|verify} messages.
                 * @param message WatchGameSuccessResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IWatchGameSuccessResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a WatchGameSuccessResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns WatchGameSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.WatchGameSuccessResponse;

                /**
                 * Decodes a WatchGameSuccessResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns WatchGameSuccessResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.WatchGameSuccessResponse;

                /**
                 * Verifies a WatchGameSuccessResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a WatchGameSuccessResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns WatchGameSuccessResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.WatchGameSuccessResponse;

                /**
                 * Creates a plain object from a WatchGameSuccessResponse message. Also converts values to other types if specified.
                 * @param message WatchGameSuccessResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.WatchGameSuccessResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this WatchGameSuccessResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for WatchGameSuccessResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ClientExitResponse. */
            interface IClientExitResponse {

                /** ClientExitResponse roomId */
                roomId?: (number|null);

                /** ClientExitResponse exitClientId */
                exitClientId?: (number|null);

                /** ClientExitResponse exitClientNickname */
                exitClientNickname?: (string|null);
            }

            /** Represents a ClientExitResponse. */
            class ClientExitResponse implements IClientExitResponse {

                /**
                 * Constructs a new ClientExitResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: miti99.caro.protocol.IClientExitResponse);

                /** ClientExitResponse roomId. */
                public roomId: number;

                /** ClientExitResponse exitClientId. */
                public exitClientId: number;

                /** ClientExitResponse exitClientNickname. */
                public exitClientNickname: string;

                /**
                 * Creates a new ClientExitResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ClientExitResponse instance
                 */
                public static create(properties?: miti99.caro.protocol.IClientExitResponse): miti99.caro.protocol.ClientExitResponse;

                /**
                 * Encodes the specified ClientExitResponse message. Does not implicitly {@link miti99.caro.protocol.ClientExitResponse.verify|verify} messages.
                 * @param message ClientExitResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: miti99.caro.protocol.IClientExitResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ClientExitResponse message, length delimited. Does not implicitly {@link miti99.caro.protocol.ClientExitResponse.verify|verify} messages.
                 * @param message ClientExitResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: miti99.caro.protocol.IClientExitResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ClientExitResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ClientExitResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): miti99.caro.protocol.ClientExitResponse;

                /**
                 * Decodes a ClientExitResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ClientExitResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): miti99.caro.protocol.ClientExitResponse;

                /**
                 * Verifies a ClientExitResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ClientExitResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ClientExitResponse
                 */
                public static fromObject(object: { [k: string]: any }): miti99.caro.protocol.ClientExitResponse;

                /**
                 * Creates a plain object from a ClientExitResponse message. Also converts values to other types if specified.
                 * @param message ClientExitResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: miti99.caro.protocol.ClientExitResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ClientExitResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ClientExitResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }
    }
}
