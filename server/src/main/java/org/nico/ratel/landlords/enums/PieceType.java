package org.nico.ratel.landlords.enums;

public enum PieceType {

	EMPTY("Empty"),

	BLACK("Black piece"),

	WHITE("White piece"),
	;

	private String msg;

	PieceType(String msg) {
		this.msg = msg;
	}

	public final String getMsg() {
		return msg;
	}

	public final void setMsg(String msg) {
		this.msg = msg;
	}

}
