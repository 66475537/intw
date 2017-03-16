package com.cn.intw.sync.dao;

import java.util.List;

import com.cn.intw.sync.domain.AircraftInfo;
import com.cn.intw.sync.domain.AirlineInfo;
import com.cn.intw.sync.domain.Airport;
import com.cn.intw.sync.domain.CityPairTime;

public interface ISyncMapping {

	public void addAircraftInfoBatch(List<AircraftInfo> aircraftInfoList);

	public void deleteAircraftInfo();

	public void deleteAirlineInfo();

	public void addAirlineInfoBatch(List<AirlineInfo> airLine);

	public void deleteAirPort();

	public void deleteCityPairTime();

	public void addAirPort(List<Airport> list);

	public void addCityPairTimeBatch(List<CityPairTime> list);

}
