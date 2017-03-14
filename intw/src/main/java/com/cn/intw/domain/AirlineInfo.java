package com.cn.intw.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.cn.intw.util.HttpClientUtil;

/**
 * 公司代码
 * http://www.pre-flight.cn/WebHome/GetAirline
 * @author chenlin
 * AIRLINEINFO
 * {
 * "ID":10043,
 * "TWO_CODE":"MX",
 * "THREE_CODE":"MXA",
 * "CH_NAME":"墨西哥航空公司",
 * "EN_NAME":"COMPANIA MEXICANADAAVIACION S.A.",
 * "CH_NAME_SHORT":"墨西",
 * "BASECODE":"",
 * "ISEDITLOGINNAME":0
 * }
 */
public class AirlineInfo {
	private String ID;
	private String TWO_CODE;
	private String THREE_CODE;
	private String CH_NAME;
	private String EN_NAME;
	private String CH_NAME_SHORT;
	private String BASECODE;
	private String IsEditLoginName;
	
public static List<AirlineInfo> getAllAircraftInfo(){
		
		List<AirlineInfo> protList = new ArrayList<AirlineInfo>();
		
		int i = 0;
		List<AirlineInfo> protList1 = new ArrayList<AirlineInfo>();
		
		while(i==0||protList1.size()>0){
			i++;
			/**
			 *  *  page: 1, //当前页
			rows: 20, //每页显示多少
			pageSize: 0, //总条数
			AllPage: 0 //总共多少页	
			10803,11105,11448,11857,12058
			 */
			String str = HttpClientUtil.httpPost(UrlConnection.getAirline, "page="+i+"&rows=500&pageSize=0&AllPage=0", false);
			protList1 = JSON.parseArray(str, AirlineInfo.class);
			protList.addAll(protList1);
		}
//		System.out.println(protList.size());
		return protList;
	}


public static void main(String[] args) {
	HashMap<String, String> map = new HashMap<String, String>();
	List<AirlineInfo> aplist = getAllAircraftInfo();
	for (int i = 0; i < aplist.size(); i++) {
		map.put(aplist.get(i).getCH_NAME(), aplist.get(i).getCH_NAME());
	}
	
	System.out.println(map.size());
}
	
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getTWO_CODE() {
		return TWO_CODE;
	}
	public void setTWO_CODE(String tWO_CODE) {
		TWO_CODE = tWO_CODE;
	}
	public String getTHREE_CODE() {
		return THREE_CODE;
	}
	public void setTHREE_CODE(String tHREE_CODE) {
		THREE_CODE = tHREE_CODE;
	}
	public String getCH_NAME() {
		return CH_NAME;
	}
	public void setCH_NAME(String cH_NAME) {
		CH_NAME = cH_NAME;
	}
	public String getEN_NAME() {
		return EN_NAME;
	}
	public void setEN_NAME(String eN_NAME) {
		EN_NAME = eN_NAME;
	}
	public String getCH_NAME_SHORT() {
		return CH_NAME_SHORT;
	}
	public void setCH_NAME_SHORT(String cH_NAME_SHORT) {
		CH_NAME_SHORT = cH_NAME_SHORT;
	}
	public String getBASECODE() {
		return BASECODE;
	}
	public void setBASECODE(String bASECODE) {
		BASECODE = bASECODE;
	}
	public String getIsEditLoginName() {
		return IsEditLoginName;
	}
	public void setIsEditLoginName(String isEditLoginName) {
		IsEditLoginName = isEditLoginName;
	}
	
	
	
}
