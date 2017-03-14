package com.cn.intw.domain;

public class UrlConnection {
	/**
	 * 获取机场
	 *  page: 1, //当前页
		rows: 20, //每页显示多少
		pageSize: 0, //总条数
		AllPage: 0 //总共多少页	
	 */
	public static String airPortUrl = "http://www.pre-flight.cn/WebHome/GetAirport";
	
	
	public static String aircraftInfoUrl = "http://www.pre-flight.cn/WebHome/Get";
	
	
	public static String getAirline = "http://www.pre-flight.cn/WebHome/GetAirline";
	
	
	public static String getCityPairTime = "http://www.pre-flight.cn/WebHome/GetCityPairTime";
}
