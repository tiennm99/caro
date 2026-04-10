package org.nico.ratel.landlords.server.handler;

import io.netty.buffer.Unpooled;
import io.netty.channel.*;
import io.netty.handler.codec.http.*;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Serves static files from classpath resources under the "static/" directory.
 * Passes /ratel requests downstream to the WebSocket handler.
 */
@ChannelHandler.Sharable
public class StaticFileHandler extends SimpleChannelInboundHandler<FullHttpRequest> {

    private static final Map<String, String> MIME_TYPES = new HashMap<>();

    static {
        MIME_TYPES.put(".html", "text/html; charset=UTF-8");
        MIME_TYPES.put(".css", "text/css; charset=UTF-8");
        MIME_TYPES.put(".js", "application/javascript; charset=UTF-8");
        MIME_TYPES.put(".json", "application/json; charset=UTF-8");
        MIME_TYPES.put(".mp3", "audio/mpeg");
        MIME_TYPES.put(".jpg", "image/jpeg");
        MIME_TYPES.put(".png", "image/png");
        MIME_TYPES.put(".svg", "image/svg+xml");
        MIME_TYPES.put(".ico", "image/x-icon");
    }

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, FullHttpRequest msg) throws Exception {
        String uri = msg.uri();

        // Pass WebSocket upgrade and /ratel requests to next handler
        if (uri.startsWith("/ratel")) {
            ctx.fireChannelRead(msg.retain());
            return;
        }

        // Sanitize: strip query string
        int queryIndex = uri.indexOf('?');
        if (queryIndex >= 0) {
            uri = uri.substring(0, queryIndex);
        }

        // Reject path traversal attempts
        if (uri.contains("..")) {
            sendError(ctx, HttpResponseStatus.FORBIDDEN, msg);
            return;
        }

        // Map root to index.html
        if ("/".equals(uri)) {
            uri = "/index.html";
        }

        String resourcePath = "static" + uri;
        InputStream in = getClass().getClassLoader().getResourceAsStream(resourcePath);

        if (in == null) {
            sendError(ctx, HttpResponseStatus.NOT_FOUND, msg);
            return;
        }

        byte[] bytes;
        try {
            bytes = readAllBytes(in);
        } finally {
            in.close();
        }

        String contentType = resolveContentType(uri);
        FullHttpResponse response = new DefaultFullHttpResponse(
                HttpVersion.HTTP_1_1,
                HttpResponseStatus.OK,
                Unpooled.wrappedBuffer(bytes)
        );
        response.headers()
                .set(HttpHeaderNames.CONTENT_TYPE, contentType)
                .set(HttpHeaderNames.CONTENT_LENGTH, bytes.length);

        boolean keepAlive = HttpUtil.isKeepAlive(msg);
        if (keepAlive) {
            response.headers().set(HttpHeaderNames.CONNECTION, HttpHeaderValues.KEEP_ALIVE);
            ctx.writeAndFlush(response);
        } else {
            response.headers().set(HttpHeaderNames.CONNECTION, HttpHeaderValues.CLOSE);
            ctx.writeAndFlush(response).addListener(ChannelFutureListener.CLOSE);
        }
    }

    private void sendError(ChannelHandlerContext ctx, HttpResponseStatus status, FullHttpRequest req) {
        FullHttpResponse response = new DefaultFullHttpResponse(
                HttpVersion.HTTP_1_1,
                status,
                Unpooled.wrappedBuffer((status.toString()).getBytes())
        );
        response.headers()
                .set(HttpHeaderNames.CONTENT_TYPE, "text/plain; charset=UTF-8")
                .set(HttpHeaderNames.CONTENT_LENGTH, response.content().readableBytes());
        ctx.writeAndFlush(response).addListener(ChannelFutureListener.CLOSE);
    }

    private String resolveContentType(String uri) {
        int dotIndex = uri.lastIndexOf('.');
        if (dotIndex >= 0) {
            String ext = uri.substring(dotIndex).toLowerCase();
            return MIME_TYPES.getOrDefault(ext, "application/octet-stream");
        }
        return "application/octet-stream";
    }

    private byte[] readAllBytes(InputStream in) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        byte[] chunk = new byte[4096];
        int read;
        while ((read = in.read(chunk)) != -1) {
            buffer.write(chunk, 0, read);
        }
        return buffer.toByteArray();
    }
}
