package com.cn.intw.sync.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.intw.sync.dao.ISyncMapping;
import com.cn.intw.sync.domain.AircraftInfo;
import com.cn.intw.sync.service.ISyncService;

@Service
public class SyncServiceImpl implements ISyncService{
	
	@Resource
	private ISyncMapping syncMapper;

	@Override
	public void syncAircraftInfo() {
		List<AircraftInfo> aircraftInfoList = AircraftInfo.getAllAircraftInfo();
		syncMapper.addAircraftInfoBatch(aircraftInfoList);
	}

	@Override
	public void syncAirlineInfo() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void syncAirport() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void syncCityPairTime() {
		// TODO Auto-generated method stub
		
	}

}
