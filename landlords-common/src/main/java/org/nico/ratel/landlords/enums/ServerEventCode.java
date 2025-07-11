package org.nico.ratel.landlords.enums;

import java.io.Serializable;

public enum ServerEventCode implements Serializable {

	CODE_CLIENT_EXIT("Player exit"),

	CODE_CLIENT_OFFLINE("Player offline"),

	CODE_CLIENT_INFO_SET("Set client info"),

	CODE_CLIENT_NICKNAME_SET("Set nickname"),

	CODE_CLIENT_HEAD_BEAT("Heartbeat"),

	CODE_ROOM_CREATE("Create PVP room"),

	CODE_ROOM_CREATE_PVE("Create PVE room"),

	CODE_GET_ROOMS("Get room list"),

	CODE_ROOM_JOIN("Join room"),

	CODE_GAME_STARTING("Game starting"),

	CODE_GAME_READY("Player ready"),

	CODE_GAME_MOVE("Make move"),

	CODE_GAME_RESET("Reset game"),

	CODE_GAME_WATCH("Spectate"),

	CODE_GAME_WATCH_EXIT("Exit spectating");


	private String msg;

	ServerEventCode(String msg) {
		this.msg = msg;
	}

	public final String getMsg() {
		return msg;
	}

	public final void setMsg(String msg) {
		this.msg = msg;
	}

}
