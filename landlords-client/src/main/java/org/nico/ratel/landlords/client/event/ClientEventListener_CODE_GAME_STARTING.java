package org.nico.ratel.landlords.client.event;

import io.netty.channel.Channel;
import org.nico.ratel.landlords.client.SimpleClient;
import org.nico.ratel.landlords.client.entity.User;
import org.nico.ratel.landlords.enums.ServerEventCode;
import org.nico.ratel.landlords.helper.MapHelper;
import org.nico.ratel.landlords.print.SimplePrinter;
import org.nico.ratel.landlords.print.SimpleWriter;

import java.util.Map;

public class ClientEventListener_CODE_GAME_STARTING extends ClientEventListener {

	@Override
	public void call(Channel channel, String data) {
		Map<String, Object> map = MapHelper.parser(data);

		int blackPlayerId = (int) map.get("blackPlayerId");
		String blackPlayerNickname = map.get("blackPlayerNickname").toString();
		String whitePlayerNickname = map.get("whitePlayerNickname").toString();

		boolean isBlack = (SimpleClient.id == blackPlayerId);
		String myPiece = isBlack ? "BLACK (B)" : "WHITE (W)";
		String opponentNickname = isBlack ? whitePlayerNickname : blackPlayerNickname;

		SimplePrinter.printNotice("");
		SimplePrinter.printNotice("=== Game Starting! ===");
		SimplePrinter.printNotice("You are " + myPiece + " | Opponent: " + opponentNickname);
		SimplePrinter.printNotice("Black moves first. Enter moves as: row,col (e.g. 7,7)");
		SimplePrinter.printNotice("Commands: [exit|e] to quit");
		SimplePrinter.printNotice("");

		// If player is BLACK, prompt for first move
		if (isBlack) {
			promptForMove(channel);
		} else {
			SimplePrinter.printNotice("Waiting for opponent's move...");
		}
	}

	static void promptForMove(Channel channel) {
		String input = SimpleWriter.write(User.INSTANCE.getNickname(), "move");

		if ("exit".equalsIgnoreCase(input) || "e".equalsIgnoreCase(input)) {
			pushToServerStatic(channel, ServerEventCode.CODE_CLIENT_EXIT, null);
			return;
		}

		// Parse row,col
		try {
			String[] parts = input.split(",");
			if (parts.length == 2) {
				int row = Integer.parseInt(parts[0].trim());
				int col = Integer.parseInt(parts[1].trim());
				String moveData = MapHelper.newInstance()
						.put("row", row)
						.put("col", col)
						.json();
				pushToServerStatic(channel, ServerEventCode.CODE_GAME_MOVE, moveData);
				return;
			}
		} catch (NumberFormatException ignored) {
		}

		SimplePrinter.printNotice("Invalid input. Use format: row,col (e.g. 7,7)");
		promptForMove(channel);
	}

	private static void pushToServerStatic(Channel channel, ServerEventCode code, String data) {
		org.nico.ratel.landlords.channel.ChannelUtils.pushToServer(channel, code, data);
	}
}
