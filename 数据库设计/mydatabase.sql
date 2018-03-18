/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : easyhomeback

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-03-17 14:34:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for accountinfo
-- ----------------------------
DROP TABLE IF EXISTS `accountinfo`;
CREATE TABLE `accountinfo` (
  `id` int(11) NOT NULL,
  `registerTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `password` varchar(20) NOT NULL,
  `salt` varchar(10) DEFAULT NULL,
  `cancelation` tinyint(4) DEFAULT NULL,
  `lastLoginIP` varchar(15) DEFAULT NULL,
  `lastLoginTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of accountinfo
-- ----------------------------

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `content` varchar(100) NOT NULL,
  `issueTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `path` varchar(100) NOT NULL,
  `upLoadTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `exName` varchar(10) NOT NULL,
  `valid` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of file
-- ----------------------------

-- ----------------------------
-- Table structure for indoortype
-- ----------------------------
DROP TABLE IF EXISTS `indoortype`;
CREATE TABLE `indoortype` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `room` int(11) NOT NULL,
  `office` int(11) NOT NULL,
  `kitchen` int(11) NOT NULL,
  `bathroom` int(11) NOT NULL,
  `fileId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of indoortype
-- ----------------------------

-- ----------------------------
-- Table structure for model
-- ----------------------------
DROP TABLE IF EXISTS `model`;
CREATE TABLE `model` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `fileId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of model
-- ----------------------------

-- ----------------------------
-- Table structure for operation
-- ----------------------------
DROP TABLE IF EXISTS `operation`;
CREATE TABLE `operation` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `discription` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of operation
-- ----------------------------

-- ----------------------------
-- Table structure for personalinfo
-- ----------------------------
DROP TABLE IF EXISTS `personalinfo`;
CREATE TABLE `personalinfo` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `career` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of personalinfo
-- ----------------------------

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `topic` varchar(20) DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  `content` varchar(200) NOT NULL,
  `issueTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `praiseNumber` int(11) NOT NULL,
  `commentNumber` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `fileId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of post
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '管理员');
INSERT INTO `role` VALUES ('2', '用户');
INSERT INTO `role` VALUES ('3', '游客');

-- ----------------------------
-- Table structure for rolepermission
-- ----------------------------
DROP TABLE IF EXISTS `rolepermission`;
CREATE TABLE `rolepermission` (
  `roleId` int(11) NOT NULL,
  `operationId` int(11) NOT NULL,
  `valid` tinyint(4) NOT NULL,
  PRIMARY KEY (`roleId`,`operationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rolepermission
-- ----------------------------

-- ----------------------------
-- Table structure for texture
-- ----------------------------
DROP TABLE IF EXISTS `texture`;
CREATE TABLE `texture` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `userId` int(11) NOT NULL,
  `fileId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of texture
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `valid` tinyint(4) NOT NULL,
  `roleId` int(11) NOT NULL,
  `accountId` int(11) DEFAULT NULL,
  `infoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_accountId` (`accountId`),
  KEY `user_infoId` (`infoId`),
  KEY `user_roleId` (`roleId`),
  CONSTRAINT `user_accountId` FOREIGN KEY (`accountId`) REFERENCES `accountinfo` (`id`),
  CONSTRAINT `user_infoId` FOREIGN KEY (`infoId`) REFERENCES `personalinfo` (`id`),
  CONSTRAINT `user_roleId` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------

-- ----------------------------
-- Table structure for work
-- ----------------------------
DROP TABLE IF EXISTS `work`;
CREATE TABLE `work` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `generateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `browseNumber` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `fileId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of work
-- ----------------------------
