package org.nico.ratel.landlords.transfer;

import org.nico.ratel.landlords.exception.LandlordException;
import org.nico.ratel.landlords.utils.JsonUtils;

/**
 * Protocol transport related tools
 *
 * @author nico
 * @time 2018-11-01 20:43
 */
public class TransferProtocolUtils {


	/**
	 * A protocol header that represents the beginning of an available stream of data
	 */
	public static final byte PROTOCOL_HAED = "#".getBytes()[0];

	/**
	 * The end of the protocol used to represent the end of an available stream of data
	 */
	public static final byte PROTOCOL_TAIL = "$".getBytes()[0];

	/**
	 * Serialize the object to transportable bytes
	 *
	 * @param obj Object to serialize
	 * @return Transportable byte array
	 */
	public static byte[] serialize(Object obj) {
		ByteLink bl = new ByteLink();
		bl.append(PROTOCOL_HAED);
		bl.append(JsonUtils.toJson(obj).getBytes());
		bl.append(PROTOCOL_TAIL);
		return bl.toArray();
	}

	/**
	 * Deserialize the byte stream as an object
	 *
	 * @param bytes Byte array
	 * @return Genericity
	 */
	public static <T> T unserialize(byte[] bytes, Class<T> clazz) {
		ByteKit bk = new ByteKit(bytes);
		int start = -1;
		int end = -1;

		int index = bk.indexOf(PROTOCOL_HAED, 0);
		if (index != -1) start = index + 1;

		index = bk.indexOf(PROTOCOL_TAIL, 0);
		if (index != -1) end = index;

		if (start != -1 && end != -1 && start > end) {
			throw new LandlordException("Message format error, head and tail error.");
		} else {
			byte[] content = new byte[end - start];
			System.arraycopy(bytes, start, content, 0, content.length);
			return JsonUtils.fromJson(new String(content), clazz);
		}
	}

}
