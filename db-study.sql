-- mysql -u root -p

CREATE DATABASE digiclover;

SHOW DATABASES

USE digiclover


CREATE TABLE `contractors` (
  `contractor-id` int(11) NOT NULL AUTO-INCREMENT,
  `contractor-name` varchar(20) NOT NULL,
  `contractor-company` varchar(20) NOT NULL,
  `contractor-email` varchar(20) NOT NULL,
  `contractor-phone` varchar(20) NOT NULL,
  `contractor-signature` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `contractors` VALUES (1,'kimyoo','leli', 'kimyoo04eco@naver.com', '010-0000-0000');
INSERT INTO `contractors` VALUES (2,'yookim','leli', 'kimkim@naver.com', '010-0000-0000');


CREATE TABLE `documents` (
  `docu-id` int(11) NOT NULL AUTO-INCREMENT,
  `docu-date` datetime DEFAULT NULL,
  `docu-signed` boolean DEFAULT NULL,
  `docu-minting` boolean DEFAULT NULL,
  `docu-hash` varchar(100) DEFAULT NULL,
  `docukind-id` varchar(20) NOT NULL,
  PRIMARY KEY (`docu-id`)
);

INSERT INTO `documents` VALUES (1, now(), , , , 1);


CREATE TABLE `document-kinds` (
  `docukind-id` int(4) NOT NULL AUTO-INCREMENT,
  `docukind-name` varchar(20) NOT NULL,
  PRIMARY KEY (`docukind-id`)
);

INSERT INTO `document-kinds` VALUES (1,'MOU');


CREATE TABLE `contracts-2` (
  `docu-id` int(11) NOT NULL AUTO-INCREMENT,
  `contractor-id1` int(11) NOT NULL,
  `contractor-id2` int(11) NOT NULL,
  PRIMARY KEY (`docu-id`)
);

INSERT INTO `contracts-2` VALUES ('1', '1', '2');






