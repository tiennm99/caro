package org.nico.ratel.landlords.client.event;

import io.netty.channel.Channel;
import org.nico.ratel.landlords.print.SimplePrinter;

public class ClientEventListener_CODE_GAME_MOVE_OUT_OF_BOUNDS extends ClientEventListener {

	@Override
	public void call(Channel channel, String data) {
		SimplePrinter.printNotice("Move out of bounds. Board is 15x15 (0-14).");
		ClientEventListener_CODE_GAME_STARTING.promptForMove(channel);
	}
}
