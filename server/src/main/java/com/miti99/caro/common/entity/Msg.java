package com.miti99.caro.common.entity;

/**
 * Wire-format message envelope for WebSocket transport.
 * Serialized to JSON by {@link com.miti99.caro.common.utils.JsonUtils}.
 */
public record Msg(String code, String data, String info) {
}
