package org.nico.ratel.landlords.client.event;

import org.nico.ratel.landlords.client.entity.User;
import org.nico.ratel.landlords.enums.ClientEventCode;
import org.nico.ratel.landlords.print.SimplePrinter;
import org.nico.ratel.landlords.print.SimpleWriter;

import io.netty.channel.Channel;

public class ClientEventListener_CODE_SHOW_OPTIONS_SETTING extends ClientEventListener {

	@Override
	public void call(Channel channel, String data) {
		SimplePrinter.printNotice("Settings:");
		SimplePrinter.printNotice("(No settings available yet)");
		SimplePrinter.printNotice("Enter [back|b] to return to options list");

		String line = SimpleWriter.write(User.INSTANCE.getNickname(), "setting");
		if (line.equalsIgnoreCase("back") || line.equalsIgnoreCase("b")) {
			get(ClientEventCode.CODE_SHOW_OPTIONS).call(channel, data);
		} else {
			call(channel, data);
		}
	}
}
