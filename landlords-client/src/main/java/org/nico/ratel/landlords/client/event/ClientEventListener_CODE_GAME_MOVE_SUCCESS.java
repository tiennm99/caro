package org.nico.ratel.landlords.client.event;

import io.netty.channel.Channel;
import org.nico.ratel.landlords.client.SimpleClient;
import org.nico.ratel.landlords.helper.MapHelper;
import org.nico.ratel.landlords.print.SimplePrinter;

import java.util.Map;

public class ClientEventListener_CODE_GAME_MOVE_SUCCESS extends ClientEventListener {

	@Override
	public void call(Channel channel, String data) {
		Map<String, Object> map = MapHelper.parser(data);

		String playerNickname = map.get("playerNickname").toString();
		String piece = map.get("piece").toString();
		int row = (int) map.get("row");
		int col = (int) map.get("col");
		int playerId = (int) map.get("playerId");

		SimplePrinter.printNotice(playerNickname + " placed " + piece + " at (" + row + "," + col + ")");

		// If it's now my turn, prompt for move
		if (playerId != SimpleClient.id) {
			// Opponent just moved, so it's my turn now
			ClientEventListener_CODE_GAME_STARTING.promptForMove(channel);
		} else {
			// I just moved, waiting for opponent
			SimplePrinter.printNotice("Waiting for opponent's move...");
		}
	}
}
