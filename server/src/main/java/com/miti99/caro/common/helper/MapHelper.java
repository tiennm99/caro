package com.miti99.caro.common.helper;

import java.util.LinkedHashMap;
import java.util.Map;

import com.miti99.caro.common.utils.JsonUtils;

public class MapHelper {

	private final Map<String, Object> data;

	private MapHelper() {
		this.data = new LinkedHashMap<>();
	}

	public static MapHelper newInstance() {
		return new MapHelper();
	}

	@SuppressWarnings("unchecked")
	public static Map<String, Object> parser(String json) {
		return JsonUtils.fromJson(json, Map.class);
	}

	public MapHelper put(String name, Object Object) {
		this.data.put(name, Object);
		return this;
	}

	public String json() {
		return JsonUtils.toJson(data);
	}

	public Map<String, Object> map() {
		return data;
	}

}
