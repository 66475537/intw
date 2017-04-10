package com.cn.dcs.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Model class of 地区-国家-省-市.
 * 
 * @author generated by ERMaster
 * @version $Id$
 */
public class RegionData implements Serializable {

	/** serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** REGION_ID. */
	private String regionId;

	/** PARENT_REGION_ID. */
	private String parentRegionId;

	/** 层级. */
	private Integer level;

	/** 中文名称. */
	private String cName;

	/** 英文名称. */
	private String eName;

	/** LAT. */
	private String lat;

	/** LON. */
	private String lon;

	/** CREATE_TIME. */
	private String createTime;

	/**
	 * Constructor.
	 */
	public RegionData() {
	}

	public RegionData(String regionId,Node node, int leval) {
		this.regionId = regionId;
		this.cName = node.getName();
		this.level = leval;
	}
	

	/**
	 * Set the REGION_ID.
	 * 
	 * @param regionId
	 *            REGION_ID
	 */
	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}

	/**
	 * Get the REGION_ID.
	 * 
	 * @return REGION_ID
	 */
	public String getRegionId() {
		return this.regionId;
	}

	/**
	 * Set the PARENT_REGION_ID.
	 * 
	 * @param parentRegionId
	 *            PARENT_REGION_ID
	 */
	public void setParentRegionId(String parentRegionId) {
		this.parentRegionId = parentRegionId;
	}

	/**
	 * Get the PARENT_REGION_ID.
	 * 
	 * @return PARENT_REGION_ID
	 */
	public String getParentRegionId() {
		return this.parentRegionId;
	}

	/**
	 * Set the 层级.
	 * 
	 * @param level
	 *            层级
	 */
	public void setLevel(Integer level) {
		this.level = level;
	}

	/**
	 * Get the 层级.
	 * 
	 * @return 层级
	 */
	public Integer getLevel() {
		return this.level;
	}

	/**
	 * Set the 中文名称.
	 * 
	 * @param cName
	 *            中文名称
	 */
	public void setCName(String cName) {
		this.cName = cName;
	}

	/**
	 * Get the 中文名称.
	 * 
	 * @return 中文名称
	 */
	public String getCName() {
		return this.cName;
	}

	/**
	 * Set the 英文名称.
	 * 
	 * @param eName
	 *            英文名称
	 */
	public void setEName(String eName) {
		this.eName = eName;
	}

	/**
	 * Get the 英文名称.
	 * 
	 * @return 英文名称
	 */
	public String getEName() {
		return this.eName;
	}

	/**
	 * Set the LAT.
	 * 
	 * @param lat
	 *            LAT
	 */
	public void setLat(String lat) {
		this.lat = lat;
	}

	/**
	 * Get the LAT.
	 * 
	 * @return LAT
	 */
	public String getLat() {
		return this.lat;
	}

	/**
	 * Set the LON.
	 * 
	 * @param lon
	 *            LON
	 */
	public void setLon(String lon) {
		this.lon = lon;
	}

	/**
	 * Get the LON.
	 * 
	 * @return LON
	 */
	public String getLon() {
		return this.lon;
	}

	/**
	 * Set the CREATE_TIME.
	 * 
	 * @param createTime
	 *            CREATE_TIME
	 */
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	/**
	 * Get the CREATE_TIME.
	 * 
	 * @return CREATE_TIME
	 */
	public String getCreateTime() {
		return this.createTime;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((regionId == null) ? 0 : regionId.hashCode());
		return result;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		RegionData other = (RegionData) obj;
		if (regionId == null) {
			if (other.regionId != null) {
				return false;
			}
		} else if (!regionId.equals(other.regionId)) {
			return false;
		}
		return true;
	}

}
