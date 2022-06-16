CREATE DATABASE digiclover;

use digiclover
--
-- Table structure for table `author`
--
 
 
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
 
--
-- Dumping data for table `author`
--
 
INSERT INTO `user` VALUES (1,'kimyoo','developer');