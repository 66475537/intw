package com.cn.intw.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.cn.intw.util.HttpClientUtil;

/**
 * 
 * @author Administrator
 *
 */
public class Airport {
	
	private String UUID;
	private String ID;
	private String THREE_CODE;
	private String FOUR_CODE;
	private String ISSC;
	private String SHORT_NAME;
	private String EN_NAME;
	private String CN_NAME;
	private String DISTRICT;
	
	
	
	public static List<Airport> getAllAirPort(){
		
		List<Airport> protList = new ArrayList<Airport>();
		
		int i = 0;
		List<Airport> protList1 = new ArrayList<Airport>();
		
		while(i==0||protList1.size()>0){
			i++;
			/**
			 *  *  page: 1, //当前页
			rows: 20, //每页显示多少
			pageSize: 0, //总条数
			AllPage: 0 //总共多少页	
			10803,11105,11448,11857,12058
			 */
			String str = HttpClientUtil.httpPost(UrlConnection.airPortUrl, "page="+i+"&rows=500&pageSize=0&AllPage=0", false);
			protList1 = JSON.parseArray(str, Airport.class);
			protList.addAll(protList1);
		}
//		System.out.println(protList.size());
		return protList;
	}
	
	public static void main(String[] args) {
		HashMap<String, String> map = new HashMap<String, String>();
		List<Airport> aplist = getAllAirPort();
		for (int i = 0; i < aplist.size(); i++) {
			map.put(aplist.get(i).getFOUR_CODE(), aplist.get(i).getFOUR_CODE());
		}
		
		System.out.println(map.size());
	}
	
	
	public String getUUID() {
		return UUID;
	}
	public void setUUID(String uUID) {
		UUID = uUID;
	}
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getTHREE_CODE() {
		return THREE_CODE;
	}
	public void setTHREE_CODE(String tHREE_CODE) {
		THREE_CODE = tHREE_CODE;
	}
	public String getFOUR_CODE() {
		return FOUR_CODE;
	}
	public void setFOUR_CODE(String fOUR_CODE) {
		FOUR_CODE = fOUR_CODE;
	}
	public String getISSC() {
		return ISSC;
	}
	public void setISSC(String iSSC) {
		ISSC = iSSC;
	}
	public String getSHORT_NAME() {
		return SHORT_NAME;
	}
	public void setSHORT_NAME(String sHORT_NAME) {
		SHORT_NAME = sHORT_NAME;
	}
	public String getEN_NAME() {
		return EN_NAME;
	}
	public void setEN_NAME(String eN_NAME) {
		EN_NAME = eN_NAME;
	}
	public String getCN_NAME() {
		return CN_NAME;
	}
	public void setCN_NAME(String cN_NAME) {
		CN_NAME = cN_NAME;
	}
	public String getDISTRICT() {
		return DISTRICT;
	}
	public void setDISTRICT(String dISTRICT) {
		DISTRICT = dISTRICT;
	}
	
	
	
}
