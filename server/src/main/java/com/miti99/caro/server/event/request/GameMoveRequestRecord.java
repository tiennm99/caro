package com.miti99.caro.server.event.request;

public record GameMoveRequestRecord(int row, int col) implements ClientRequest {
}
