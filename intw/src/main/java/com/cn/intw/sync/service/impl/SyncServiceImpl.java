package com.cn.intw.sync.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.intw.sync.dao.ISyncMapping;
import com.cn.intw.sync.domain.AircraftInfo;
import com.cn.intw.sync.domain.AirlineInfo;
import com.cn.intw.sync.domain.Airport;
import com.cn.intw.sync.domain.CityPairTime;
import com.cn.intw.sync.service.ISyncService;

@Service
public class SyncServiceImpl implements ISyncService{
	
	@Resource
	private ISyncMapping syncMapper;

	@Override
	public void syncAircraftInfo() {
		
		List<AircraftInfo> aircraftInfoList = AircraftInfo.getAllAircraftInfo();
		syncMapper.deleteAircraftInfo();
		syncMapper.addAircraftInfoBatch(aircraftInfoList);
		System.out.println("......syncAircraftInfo end .........");
	}

	@Override
	public void syncAirlineInfo() {
		List<AirlineInfo> airLine = AirlineInfo.getAllAircraftInfo();
		syncMapper.deleteAirlineInfo();
		syncMapper.addAirlineInfoBatch(airLine);
		
		System.out.println("......syncAirlineInfo end .........");
	}

	@Override
	public void syncAirport() {
		List<Airport> list = Airport.getAllAirPort();
		syncMapper.deleteAirPort();
		
		syncMapper.addAirPort(list);
		
		System.out.println("......syncAirport end .........");
	}

	@Override
	public void syncCityPairTime() {
		List<CityPairTime> list = CityPairTime.getAllAircraftInfo();
		syncMapper.deleteCityPairTime();
		
		syncMapper.addCityPairTimeBatch(list);
		
		System.out.println("......syncAirlineInfo end .........");
	}

}
