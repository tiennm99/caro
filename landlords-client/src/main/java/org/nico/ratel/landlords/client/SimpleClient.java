package org.nico.ratel.landlords.client;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Locale;
import java.util.Objects;

import org.nico.noson.util.string.StringUtils;
import org.nico.ratel.landlords.client.entity.User;
import org.nico.ratel.landlords.client.proxy.ProtobufProxy;
import org.nico.ratel.landlords.client.proxy.WebsocketProxy;
import org.nico.ratel.landlords.features.Features;
import org.nico.ratel.landlords.helper.I18nHelper;
import org.nico.ratel.landlords.print.SimplePrinter;

public class SimpleClient {

	public static int id = -1;

	public final static String VERSION = Features.VERSION_1_3_0;

	public static String serverAddress;

	public static int port = 1024;

	public static String protocol = "pb";

	public static String language;

	public static void main(String[] args) throws InterruptedException, IOException, URISyntaxException {
		if (args != null && args.length > 0) {
			for (int index = 0; index < args.length; index = index + 2) {
				if (index + 1 < args.length) {
					if (args[index].equalsIgnoreCase("-p") || args[index].equalsIgnoreCase("-port")) {
						port = Integer.parseInt(args[index + 1]);
					}
					if (args[index].equalsIgnoreCase("-h") || args[index].equalsIgnoreCase("-host")) {
						serverAddress = args[index + 1];
					}
					if (args[index].equalsIgnoreCase("-ptl") || args[index].equalsIgnoreCase("-protocol")) {
						protocol = args[index + 1];
					}
					if (args[index].equalsIgnoreCase("-lang") || args[index].equalsIgnoreCase("-language")) {
						language = args[index + 1];
					}
				}
			}
		}

		if (StringUtils.isBlank(language)) {
			I18nHelper.enable();
		} else {
			Locale locale = getLocale(language);
			I18nHelper.enable(locale);
		}

		if (serverAddress == null) {
			SimplePrinter.printNotice("Please specify server address using: -h <host> -p <port>");
			SimplePrinter.printNotice("Example: java -jar client.jar -h 127.0.0.1 -p 1024");
			return;
		}

		if (Objects.equals(protocol, "pb")) {
			new ProtobufProxy().connect(serverAddress, port);
		} else if (Objects.equals(protocol, "ws")) {
			new WebsocketProxy().connect(serverAddress, port + 1);
		} else {
			throw new UnsupportedOperationException("Unsupported protocol " + protocol);
		}
	}

	private static Locale getLocale(String langCode) {
		switch (langCode) {
			case "en":
			case "en_US":
				return Locale.US;
			default:
				System.out.println("[warning] not supported language code: " + langCode + ", set to en_US");
				return Locale.US;
		}
	}
}
