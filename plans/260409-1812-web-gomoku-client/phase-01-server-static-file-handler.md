# Phase 1: Server — Static File Handler

## Context Links
- [WebsocketProxy.java](../../landlords-server/src/main/java/org/nico/ratel/landlords/server/proxy/WebsocketProxy.java) — pipeline setup
- [WebsocketTransferHandler.java](../../landlords-server/src/main/java/org/nico/ratel/landlords/server/handler/WebsocketTransferHandler.java) — WS handler

## Overview
- **Priority:** P1 (blocks all client work for integration testing)
- **Status:** Pending
- **Effort:** 1.5h

Add an HTTP static file handler to the existing Netty WebSocket pipeline so `http://localhost:1025/` serves the web client. The WebSocket upgrade at `/ratel` must continue working untouched.

## Key Insight

The current pipeline is: `IdleStateHandler -> HttpServerCodec -> ChunkedWriteHandler -> HttpObjectAggregator -> WebSocketServerProtocolHandler("/ratel") -> WebsocketTransferHandler`.

`WebSocketServerProtocolHandler` only upgrades requests to `/ratel`. For any other URI, it passes through as a regular `FullHttpRequest`. We insert our `StaticFileHandler` **before** the WS protocol handler to intercept non-`/ratel` HTTP requests and serve files. Requests to `/ratel` get passed through to the WS handler as before.

**Alternative considered:** Adding handler after WS handler. Rejected because `WebSocketServerProtocolHandler` may consume or reject non-upgrade HTTP requests.

**Chosen approach:** Add handler before WS handler. Check URI: if `/ratel`, pass through via `ctx.fireChannelRead(msg)`. Otherwise, serve static file.

## Architecture

```
Pipeline order (updated):
  IdleStateHandler
  HttpServerCodec
  ChunkedWriteHandler
  HttpObjectAggregator(8192)
  StaticFileHandler        <-- NEW: serves files or passes /ratel through
  WebSocketServerProtocolHandler("/ratel")
  WebsocketTransferHandler
```

**Data flow:**
1. HTTP GET `/` arrives as `FullHttpRequest`
2. `StaticFileHandler.channelRead0()` checks URI
3. If URI is `/ratel` -> `ctx.fireChannelRead(msg.retain())` (pass to WS handler)
4. If URI is `/` -> rewrite to `/index.html`
5. Load resource from classpath `static/` prefix
6. Set Content-Type from MIME map
7. Write `DefaultFullHttpResponse` with file bytes
8. Close connection (HTTP/1.1 keep-alive optional, not required)

## Related Code Files

### Files to Create
- `landlords-server/src/main/java/org/nico/ratel/landlords/server/handler/StaticFileHandler.java`

### Files to Modify
- `landlords-server/src/main/java/org/nico/ratel/landlords/server/proxy/WebsocketProxy.java` — add handler to pipeline

## Implementation Steps

### Step 1: Create `StaticFileHandler.java`

Location: `landlords-server/src/main/java/org/nico/ratel/landlords/server/handler/StaticFileHandler.java`

```java
// Extends SimpleChannelInboundHandler<FullHttpRequest>
// MIME types map: .html->text/html, .css->text/css, .js->application/javascript,
//   .json->application/json, .mp3->audio/mpeg, .jpg->image/jpeg, .png->image/png, .svg->image/svg+xml
```

Logic:
1. Check `msg.uri()`. If starts with `/ratel`, call `ctx.fireChannelRead(msg.retain())` and return.
2. Sanitize URI: strip query string, decode `%20` etc, reject `..` path traversal.
3. Map `/` to `/index.html`.
4. Build classpath path: `"static" + sanitizedUri`.
5. Load via `getClass().getClassLoader().getResourceAsStream(path)`.
6. If null -> 404 response.
7. Read all bytes into `ByteBuf`.
8. Build `DefaultFullHttpResponse(OK)`, set `Content-Type` and `Content-Length` headers.
9. Write and flush, close if not keep-alive.

**Security:** Reject URIs containing `..` to prevent directory traversal. Only serve from `static/` classpath prefix.

**Keep file under 200 lines.** The handler is straightforward — MIME map + resource loading + response building.

### Step 2: Modify `WebsocketProxy.java`

Add one line to the pipeline, before the WS handler:

```java
.addLast(new StaticFileHandler())       // <-- NEW
.addLast("ws", new WebSocketServerProtocolHandler("/ratel"))
```

Import: `org.nico.ratel.landlords.server.handler.StaticFileHandler`

## Todo List

- [ ] Create `StaticFileHandler.java` with MIME map and classpath resource serving
- [ ] Handle `/ratel` passthrough (retain + fireChannelRead)
- [ ] Handle `/` -> `/index.html` redirect
- [ ] Handle 404 for missing resources
- [ ] Sanitize URI (reject `..`, strip query string)
- [ ] Add handler to `WebsocketProxy.java` pipeline
- [ ] Create placeholder `static/index.html` for testing
- [ ] Run `mvn clean compile` — must pass
- [ ] Run `mvn test` — must pass
- [ ] Manual test: start server, `curl http://localhost:1025/` returns HTML

## Success Criteria

- `http://localhost:1025/` returns `index.html` content with `Content-Type: text/html`
- `http://localhost:1025/css/style.css` returns CSS with correct MIME type
- `http://localhost:1025/js/game-board.js` returns JS with correct MIME type
- WebSocket at `ws://localhost:1025/ratel` still works (existing Java client connects)
- `mvn clean compile` and `mvn test` pass
- No path traversal vulnerability

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Handler breaks WS upgrade | Check URI first; `/ratel` requests passed through untouched |
| `FullHttpRequest` refcount leak | Call `msg.retain()` before fireChannelRead, use `ReferenceCountUtil` |
| Large files OOM | Game assets are tiny (<1MB total); read fully into memory is fine |
| Classpath resource not found in packaged JAR | Spring Boot Maven plugin repackages resources correctly; `getResourceAsStream` works in fat JARs |

## Backwards Compatibility

- Existing TCP Protobuf clients (port 1024) are unaffected — different port/pipeline
- Existing WebSocket clients connecting to `/ratel` are unaffected — passthrough logic
- No changes to game logic, event codes, or message format
