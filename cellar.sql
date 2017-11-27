CREATE TABLE IF NOT EXISTS `wine`;

CREATE TABLE `wine` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT ,
  `name` varchar(45) DEFAULT NULL,
  `year` varchar(45) DEFAULT NULL,
  `grapes` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `description` blob,
  `picture` varchar(256) DEFAULT NULL
);