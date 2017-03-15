package com.cn.intw.quartz;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cn.intw.sync.service.ISyncService;

public class JobBean {
	
	@Autowired
	private ISyncService syncService;
	
	/**
	 * AircraftInfo
	 */
    public void syncAircraftInfo() {
    	syncService.syncAircraftInfo();
    	System.out.println("syncAircraftInfo end");
    }
    
    /**
	 * CityPairTime
	 */
    public void syncCityPairTime() {
    	System.out.println("CityPairTime");
    }
    
    
    /**
	 * Airport
	 */
    public void syncAirport() {
    	System.out.println("Airport");
    }
    
    /**
	 * AirlineInfo
	 */
    public void syncAirlineInfo() {
    	System.out.println("AirlineInfo");
    }


}