SET SESSION FOREIGN_KEY_CHECKS=0;

/* Drop Tables */

DROP TABLE IF EXISTS aircraftinfo;
DROP TABLE IF EXISTS airlineinfo;
DROP TABLE IF EXISTS airport;
DROP TABLE IF EXISTS citypairtime;




/* Create Tables */

CREATE TABLE aircraftinfo
(
	ID varchar(32) NOT NULL,
	THREECODE varchar(45),
	LONGNAME varchar(45),
	ACLEVEL varchar(45),
	SEATS varchar(45),
	SPEED varchar(45),
	ACTYPE varchar(45),
	APTIME varchar(45),
	CITYPAIRACTYPE varchar(45),
	PICKOUTTIME varchar(45),
	OTHERTIME varchar(45),
	PRIMARY KEY (ID)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


CREATE TABLE airlineinfo
(
	ID varchar(16) NOT NULL,
	TWO_CODE varchar(45),
	THREE_CODE varchar(45),
	CH_NAME varchar(45),
	EN_NAME varchar(45),
	CH_NAME_SHORT varchar(45),
	BASECODE varchar(45),
	ISEDITLOGINNAME varchar(45),
	PRIMARY KEY (ID)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


CREATE TABLE airport
(
	UUID char(32) NOT NULL,
	ID varchar(16),
	THREE_CODE varchar(4),
	FOUR_CODE varchar(4),
	ISSC char,
	SHORT_NAME varchar(32),
	EN_NAME varchar(128),
	CN_NAME varchar(128),
	DISTRICT varchar(8),
	PRIMARY KEY (UUID)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


CREATE TABLE citypairtime
(
	TERMINALTIMELIBRARYID varchar(32) NOT NULL,
	TERMINALONE varchar(8),
	TERMINALTWO varchar(8),
	SUMMER_8OUT varchar(8),
	SUMMER_8IN varchar(8),
	WINTER_8OUT varchar(8),
	WINTER_8IN varchar(8),
	SUMMER_7OUT varchar(8),
	SUMMER_7IN varchar(8),
	WINTER_7OUT varchar(8),
	WINTER_7IN varchar(8),
	SUMMER_6OUT varchar(8),
	SUMMER_6IN varchar(8),
	WINTER_6OUT varchar(8),
	WINTER_6IN varchar(8),
	SUMMER_5OUT varchar(8),
	SUMMER_5IN varchar(8),
	WINTER_5OUT varchar(8),
	WINTER_5IN varchar(8),
	SUMMER_4OUT varchar(8),
	SUMMER_4IN varchar(8),
	WINTER_4OUT varchar(8),
	WINTER_4IN varchar(8),
	PRIMARY KEY (TERMINALTIMELIBRARYID)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;



