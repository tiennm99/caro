package com.miti99.caro.common.channel;

import com.miti99.caro.common.entity.ClientTransferData;
import com.miti99.caro.common.entity.Msg;
import com.miti99.caro.common.entity.ServerTransferData;
import com.miti99.caro.common.enums.ClientEventCode;
import com.miti99.caro.common.enums.ServerEventCode;
import com.miti99.caro.common.utils.JsonUtils;

import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;

public class ChannelUtils {

	public static void pushToClient(Channel channel, ClientEventCode code, String data) {
		pushToClient(channel, code, data, null);
	}

	public static void pushToClient(Channel channel, ClientEventCode code, String data, String info) {
		if (channel != null) {
			if (channel.pipeline().get("ws") != null) {
				var msg = new Msg(code.toString(), data, info);
				channel.writeAndFlush(new TextWebSocketFrame(JsonUtils.toJson(msg)));
			} else {
				var clientTransferData = ClientTransferData.ClientTransferDataProtoc.newBuilder();
				if (code != null) {
					clientTransferData.setCode(code.toString());
				}
				if (data != null) {
					clientTransferData.setData(data);
				}
				if (info != null) {
					clientTransferData.setInfo(info);
				}
				channel.writeAndFlush(clientTransferData);
			}
		}
	}

	public static ChannelFuture pushToServer(Channel channel, ServerEventCode code, String data) {
		if (channel.pipeline().get("ws") != null) {
			var msg = new Msg(code.toString(), data, null);
			return channel.writeAndFlush(new TextWebSocketFrame(JsonUtils.toJson(msg)));
		} else {
			var serverTransferData = ServerTransferData.ServerTransferDataProtoc.newBuilder();
			if (code != null) {
				serverTransferData.setCode(code.toString());
			}
			if (data != null) {
				serverTransferData.setData(data);
			}
			return channel.writeAndFlush(serverTransferData);
		}
	}

}
