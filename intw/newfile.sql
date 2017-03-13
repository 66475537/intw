SET SESSION FOREIGN_KEY_CHECKS=0;

/* Drop Tables */

DROP TABLE IF EXISTS AIRPORT;




/* Create Tables */

-- http://www.pre-flight.cn/WebHome/AirportInfo
CREATE TABLE AIRPORT
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
) COMMENT = 'http://www.pre-flight.cn/WebHome/AirportInfo';



