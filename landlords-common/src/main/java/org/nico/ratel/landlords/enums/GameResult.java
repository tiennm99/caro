package org.nico.ratel.landlords.enums;

public enum GameResult {

	BLACK_WIN("Black wins"),

	WHITE_WIN("White wins"),

	DRAW("Draw"),

	IN_PROGRESS("Game in progress"),
	;

	private String msg;

	GameResult(String msg) {
		this.msg = msg;
	}

	public final String getMsg() {
		return msg;
	}

	public final void setMsg(String msg) {
		this.msg = msg;
	}

}