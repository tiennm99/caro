package org.nico.ratel.landlords.client.event;

import io.netty.channel.Channel;
import org.nico.ratel.landlords.print.SimplePrinter;

public class ClientEventListener_CODE_GAME_MOVE_NOT_YOUR_TURN extends ClientEventListener {

	@Override
	public void call(Channel channel, String data) {
		SimplePrinter.printNotice("It's not your turn. Please wait.");
	}
}
