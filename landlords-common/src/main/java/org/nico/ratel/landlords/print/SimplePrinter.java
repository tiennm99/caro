package org.nico.ratel.landlords.print;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.nico.ratel.landlords.helper.I18nHelper;

public class SimplePrinter {

	private final static SimpleDateFormat FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public static void printNotice(String msg) {
		System.out.println(msg);
	}

	public static void printTranslate(String key, Object... args) {
		System.out.println(I18nHelper.translate(key, args));
	}

	public static void serverLog(String msg) {
		System.out.println(FORMAT.format(new Date()) + "-> " + msg);
	}
}
