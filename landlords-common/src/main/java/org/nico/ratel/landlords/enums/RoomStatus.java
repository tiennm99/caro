package org.nico.ratel.landlords.enums;

public enum RoomStatus {

	BLANK("Idle"),

	WAIT("Waiting"),

	STARTING("Starting"),


	;

	private String msg;

	RoomStatus(String msg) {
		this.msg = msg;
	}

	public final String getMsg() {
		return msg;
	}

	public final void setMsg(String msg) {
		this.msg = msg;
	}

}
