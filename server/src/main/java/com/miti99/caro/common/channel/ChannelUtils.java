package com.miti99.caro.common.channel;

import com.miti99.caro.protocol.Response;

import io.netty.buffer.Unpooled;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.handler.codec.http.websocketx.BinaryWebSocketFrame;

/**
 * Serialises a typed {@link Response} proto to a {@link BinaryWebSocketFrame}
 * and writes it to the given channel. The single push point for all outbound
 * server-to-client traffic.
 */
public final class ChannelUtils {

    private ChannelUtils() {
    }

    public static ChannelFuture push(Channel channel, Response response) {
        if (channel == null) {
            return null;
        }
        byte[] bytes = response.toByteArray();
        return channel.writeAndFlush(new BinaryWebSocketFrame(Unpooled.wrappedBuffer(bytes)));
    }
}
