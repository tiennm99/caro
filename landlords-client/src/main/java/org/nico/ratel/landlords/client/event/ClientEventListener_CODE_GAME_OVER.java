package org.nico.ratel.landlords.client.event;

import java.util.Map;

import org.nico.ratel.landlords.helper.MapHelper;
import org.nico.ratel.landlords.print.SimplePrinter;

import io.netty.channel.Channel;

public class ClientEventListener_CODE_GAME_OVER extends ClientEventListener {

	@Override
	public void call(Channel channel, String data) {
		Map<String, Object> map = MapHelper.parser(data);

		String result = map.get("result").toString();
		String winnerNickname = map.get("winnerNickname").toString();
		String board = map.get("board").toString();

		SimplePrinter.printNotice("");
		SimplePrinter.printNotice("=== Game Over! ===");
		SimplePrinter.printNotice(board);

		switch (result) {
			case "BLACK_WIN":
				SimplePrinter.printNotice("Black wins! Winner: " + winnerNickname);
				break;
			case "WHITE_WIN":
				SimplePrinter.printNotice("White wins! Winner: " + winnerNickname);
				break;
			case "DRAW":
				SimplePrinter.printNotice("Game ended in a draw!");
				break;
			default:
				SimplePrinter.printNotice("Game over.");
				break;
		}

		ClientEventListener_CODE_GAME_READY.gameReady(channel);
	}
}
