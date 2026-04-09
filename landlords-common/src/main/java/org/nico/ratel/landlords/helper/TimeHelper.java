package org.nico.ratel.landlords.helper;

/**
 * @author nico
 */

public class TimeHelper {

	public static void sleep(long millis) {
		try {
			Thread.sleep(millis);
		} catch (InterruptedException ignored) {
		}
	}
}
