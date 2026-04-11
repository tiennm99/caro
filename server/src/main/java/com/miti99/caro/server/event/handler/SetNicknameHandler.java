package com.miti99.caro.server.event.handler;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.protocol.NicknameSetResponse;
import com.miti99.caro.protocol.Response;
import com.miti99.caro.protocol.ShowOptionsResponse;
import com.miti99.caro.server.ServerContains;
import com.miti99.caro.server.event.request.SetNicknameRequestRecord;

public final class SetNicknameHandler {

    public static final int NICKNAME_MAX_LENGTH = 10;

    private SetNicknameHandler() {
    }

    public static void handle(ClientSide client, SetNicknameRequestRecord req) {
        String nickname = req.nickname() == null ? "" : req.nickname().trim();
        if (nickname.isEmpty() || nickname.length() > NICKNAME_MAX_LENGTH) {
            ChannelUtils.push(client.getChannel(), Response.newBuilder()
                    .setNicknameSet(NicknameSetResponse.newBuilder().setInvalidLength(nickname.length()))
                    .build());
            return;
        }
        ServerContains.CLIENT_SIDE_MAP.get(client.getId()).setNickname(nickname);
        ChannelUtils.push(client.getChannel(), Response.newBuilder()
                .setShowOptions(ShowOptionsResponse.getDefaultInstance())
                .build());
    }
}
