package com.cn.intw.sync.dao;

import java.util.List;

import com.cn.intw.sync.domain.AircraftInfo;

public interface ISyncMapping {

	public void addAircraftInfoBatch(List<AircraftInfo> aircraftInfoList);

}
