package org.nico.ratel.landlords.enums;

import java.io.Serializable;

public enum ClientEventCode implements Serializable {

	CODE_CLIENT_NICKNAME_SET("Set nickname"),

	CODE_CLIENT_EXIT("Client exit"),

	CODE_CLIENT_KICK("Client kicked"),

	CODE_CLIENT_CONNECT("Client joined successfully"),

	CODE_SHOW_OPTIONS("Global options list"),

	CODE_SHOW_OPTIONS_SETTING("Settings options"),

	CODE_SHOW_OPTIONS_PVP("Player vs player options"),

	CODE_SHOW_OPTIONS_PVE("Player vs AI options"),

	CODE_SHOW_ROOMS("Show room list"),

	CODE_SHOW_BOARD("Show game board"),

	CODE_ROOM_CREATE_SUCCESS("Room created successfully"),

	CODE_ROOM_JOIN_SUCCESS("Joined room successfully"),

	CODE_ROOM_JOIN_FAIL_BY_FULL("Room is full"),

	CODE_ROOM_JOIN_FAIL_BY_INEXIST("Join - room does not exist"),

	CODE_ROOM_PLAY_FAIL_BY_INEXIST("Make move - room does not exist"),

	CODE_GAME_STARTING("Start game"),

	CODE_GAME_MOVE_SUCCESS("Move successful"),

	CODE_GAME_MOVE_INVALID("Invalid move"),

	CODE_GAME_MOVE_OCCUPIED("Position occupied"),

	CODE_GAME_MOVE_OUT_OF_BOUNDS("Move out of bounds"),

	CODE_GAME_MOVE_NOT_YOUR_TURN("Not your turn"),

	CODE_GAME_OVER("Game over"),

	CODE_GAME_WIN("You win"),

	CODE_GAME_LOSE("You lose"),

	CODE_GAME_DRAW("Draw"),

	CODE_PVE_DIFFICULTY_NOT_SUPPORT("AI difficulty not supported"),

	CODE_GAME_READY("Ready to start game"),

	CODE_GAME_WATCH("Spectate"),

	CODE_GAME_WATCH_SUCCESSFUL("Spectate successful");

	private String msg;

	private ClientEventCode(String msg) {
		this.msg = msg;
	}

	public final String getMsg() {
		return msg;
	}

	public final void setMsg(String msg) {
		this.msg = msg;
	}

}
