package org.nico.ratel.landlords.client.event;

import io.netty.channel.Channel;
import org.nico.ratel.landlords.print.SimplePrinter;

public class ClientEventListener_CODE_GAME_MOVE_OCCUPIED extends ClientEventListener {

	@Override
	public void call(Channel channel, String data) {
		SimplePrinter.printNotice("Position already occupied. Please choose another.");
		ClientEventListener_CODE_GAME_STARTING.promptForMove(channel);
	}
}
