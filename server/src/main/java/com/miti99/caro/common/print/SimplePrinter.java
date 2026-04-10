package com.miti99.caro.common.print;

import java.text.SimpleDateFormat;
import java.util.Date;

public class SimplePrinter {

	private final static SimpleDateFormat FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public static void printNotice(String msg) {
		System.out.println(msg);
	}

	public static void serverLog(String msg) {
		System.out.println(FORMAT.format(new Date()) + "-> " + msg);
	}
}
