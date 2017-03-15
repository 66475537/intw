package com.cn.intw.sync.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.cn.intw.util.HttpClientUtil;


/**
 * 机型代码
 * @author chenlin
 * 行号 	三字码 	机型全称 	等级 	座位数 	飞行速度 	机型等级 	航段时间机型 	北上广深等机场过站时间 	其他机场过站时间
 * http://www.pre-flight.cn/WebHome/Get
 * AIRCRAFTINFO
 *	{"ID":59,
 *"THREECODE":"30B",
 *"LONGNAME":"A300B4-100",
 *"ACLEVEL":"FCYK",
 *"SEATS":"251",
 *"SPEED":"8",
 *"ACTYPE":"C1",
 *"APTIME":"65",
 *"CITYPAIRACTYPE":"机型7",
 * "PICKOUTTIME":"75",
 * "OTHERTIME":"65"}
 */
public class AircraftInfo {
	private String ID;
	private String ThreeCode;
	private String Longname;
	private String Aclevel;
	private String Seats;//座位数量
	private String Speed;
	private String Actype;
	private String Aptime;
	private String citypairactype;
	private String PickOutTime;
	private String OtherTime;
	
	
public static List<AircraftInfo> getAllAircraftInfo(){
		
		List<AircraftInfo> protList = new ArrayList<AircraftInfo>();
		
		int i = 0;
		List<AircraftInfo> protList1 = new ArrayList<AircraftInfo>();
		
		while(i==0||protList1.size()>0){
			i++;
			/**
			 *  *  page: 1, //当前页
			rows: 20, //每页显示多少
			pageSize: 0, //总条数
			AllPage: 0 //总共多少页	
			10803,11105,11448,11857,12058
			 */
			String str = HttpClientUtil.httpPost(UrlConnection.aircraftInfoUrl, "page="+i+"&rows=500&pageSize=0&AllPage=0", false);
			protList1 = JSON.parseArray(str, AircraftInfo.class);
			protList.addAll(protList1);
		}
//		System.out.println(protList.size());
		return protList;
	}

	public static void main(String[] args) {
		HashMap<String, String> map = new HashMap<String, String>();
		List<AircraftInfo> aplist = getAllAircraftInfo();
		for (int i = 0; i < aplist.size(); i++) {
			map.put(aplist.get(i).getThreeCode(), aplist.get(i).getActype());
		}
		
		System.out.println(map.size());
	}
	
	
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getThreeCode() {
		return ThreeCode;
	}
	public void setThreeCode(String threeCode) {
		ThreeCode = threeCode;
	}
	public String getLongname() {
		return Longname;
	}
	public void setLongname(String longname) {
		Longname = longname;
	}
	public String getAclevel() {
		return Aclevel;
	}
	public void setAclevel(String aclevel) {
		Aclevel = aclevel;
	}
	public String getSeats() {
		return Seats;
	}
	public void setSeats(String seats) {
		Seats = seats;
	}
	public String getSpeed() {
		return Speed;
	}
	public void setSpeed(String speed) {
		Speed = speed;
	}
	public String getActype() {
		return Actype;
	}
	public void setActype(String actype) {
		Actype = actype;
	}
	public String getAptime() {
		return Aptime;
	}
	public void setAptime(String aptime) {
		Aptime = aptime;
	}
	public String getCitypairactype() {
		return citypairactype;
	}
	public void setCitypairactype(String citypairactype) {
		this.citypairactype = citypairactype;
	}
	public String getPickOutTime() {
		return PickOutTime;
	}
	public void setPickOutTime(String pickOutTime) {
		PickOutTime = pickOutTime;
	}
	public String getOtherTime() {
		return OtherTime;
	}
	public void setOtherTime(String otherTime) {
		OtherTime = otherTime;
	}
	
	
}
