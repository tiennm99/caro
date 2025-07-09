package org.nico.ratel.landlords.enums;

public enum SellType {

	ILLEGAL("Illegal"),

	BOMB("Bomb"),

	KING_BOMB("King bomb"),

	SINGLE("Single card"),

	DOUBLE("Pair"),

	THREE("Three of a kind"),

	THREE_ZONES_SINGLE("Three with single"),

	THREE_ZONES_DOUBLE("Three with pair"),

	FOUR_ZONES_SINGLE("Four with single"),

	FOUR_ZONES_DOUBLE("Four with pair"),

	SINGLE_STRAIGHT("Single straight"),

	DOUBLE_STRAIGHT("Double straight"),

	THREE_STRAIGHT("Triple straight"),

	FOUR_STRAIGHT("Quadruple straight"),

	THREE_STRAIGHT_WITH_SINGLE("Airplane with single cards"),

	THREE_STRAIGHT_WITH_DOUBLE("Airplane with pairs"),

	FOUR_STRAIGHT_WITH_SINGLE("Quadruple straight with single"),

	FOUR_STRAIGHT_WITH_DOUBLE("Quadruple straight with pair"),
	;

	private String msg;

	SellType(String msg) {
		this.msg = msg;
	}

	public final String getMsg() {
		return msg;
	}

	public final void setMsg(String msg) {
		this.msg = msg;
	}

}
