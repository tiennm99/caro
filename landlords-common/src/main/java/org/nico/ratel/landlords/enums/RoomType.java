package org.nico.ratel.landlords.enums;

public enum RoomType {

	PVP("Player vs Player"),

	PVE("Player vs AI"),

	;
	private String msg;

	RoomType(String msg) {
		this.msg = msg;
	}

	public final String getMsg() {
		return msg;
	}

	public final void setMsg(String msg) {
		this.msg = msg;
	}

}
