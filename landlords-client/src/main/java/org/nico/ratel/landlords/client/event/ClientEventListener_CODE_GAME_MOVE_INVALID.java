package org.nico.ratel.landlords.client.event;

import io.netty.channel.Channel;
import org.nico.ratel.landlords.print.SimplePrinter;

public class ClientEventListener_CODE_GAME_MOVE_INVALID extends ClientEventListener {

	@Override
	public void call(Channel channel, String data) {
		SimplePrinter.printNotice("Invalid move. Please try again.");
		ClientEventListener_CODE_GAME_STARTING.promptForMove(channel);
	}
}
