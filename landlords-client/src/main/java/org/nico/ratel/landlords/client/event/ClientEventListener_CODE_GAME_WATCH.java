package org.nico.ratel.landlords.client.event;

import io.netty.channel.Channel;
import org.nico.ratel.landlords.client.entity.User;
import org.nico.ratel.landlords.enums.ClientEventCode;
import org.nico.ratel.landlords.helper.MapHelper;
import org.nico.ratel.landlords.print.SimplePrinter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public class ClientEventListener_CODE_GAME_WATCH extends ClientEventListener {

    @Override
    public void call(Channel channel, String wrapData) {
        if (!User.INSTANCE.isWatching()) {
            return;
        }

        Map<String, Object> wrapMap = MapHelper.parser(wrapData);
        ClientEventCode rawCode = ClientEventCode.valueOf(wrapMap.get("code").toString());
        Object rawData = wrapMap.get("data");

        switch (rawCode) {
            case CODE_ROOM_JOIN_SUCCESS:
                printNoticeWithTime("Player [" + rawData + "] joined the room");
                break;

            case CODE_GAME_STARTING:
                printGameStartInfo(rawData);
                break;

            case CODE_GAME_MOVE_SUCCESS:
                printMoveInfo(rawData);
                break;

            case CODE_CLIENT_EXIT:
                printNoticeWithTime("Player [" + rawData + "] left the room");
                quitWatch(channel);
                break;

            case CODE_CLIENT_KICK:
                printNoticeWithTime("Player [" + rawData + "] has been kicked for being idle.");
                break;

            case CODE_GAME_OVER:
                printGameResult(rawData, channel);
                break;

            default:
                break;
        }
    }

    private void printGameStartInfo(Object rawData) {
        Map<String, Object> map = MapHelper.parser(rawData.toString());
        printNoticeWithTime("Game starting!");
        printNoticeWithTime("Black: " + map.get("blackPlayerNickname") + " | White: " + map.get("whitePlayerNickname"));
    }

    private void printMoveInfo(Object rawData) {
        Map<String, Object> map = MapHelper.parser(rawData.toString());
        printNoticeWithTime(map.get("playerNickname") + " placed " + map.get("piece") + " at (" + map.get("row") + "," + map.get("col") + ")");
    }

    private void quitWatch(Channel channel) {
        printNoticeWithTime("This room will be closed!");
        printNoticeWithTime("Spectating ended. Bye.");
        SimplePrinter.printNotice("");

        User.INSTANCE.setWatching(false);
        get(ClientEventCode.CODE_SHOW_OPTIONS).call(channel, "");
    }

    private void printGameResult(Object rawData, Channel channel) {
        Map<String, Object> map = MapHelper.parser(rawData.toString());
        String result = map.get("result").toString();
        String winnerNickname = map.get("winnerNickname").toString();

        switch (result) {
            case "BLACK_WIN":
                printNoticeWithTime("Black wins! Winner: " + winnerNickname);
                break;
            case "WHITE_WIN":
                printNoticeWithTime("White wins! Winner: " + winnerNickname);
                break;
            case "DRAW":
                printNoticeWithTime("Game ended in a draw!");
                break;
        }
    }

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private void printNoticeWithTime(String notice) {
        SimplePrinter.printNotice(FORMATTER.format(LocalDateTime.now()) + "  " + notice);
    }
}
