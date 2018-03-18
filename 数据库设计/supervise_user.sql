/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : easyhomeback

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-03-17 14:40:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for supervise_user
-- ----------------------------
DROP TABLE IF EXISTS `supervise_user`;
CREATE TABLE `supervise_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of supervise_user
-- ----------------------------
INSERT INTO `supervise_user` VALUES ('2', 'pbkdf2_sha256$100000$YaWl5cW1L5bd$1wJBckNi6WeOGlroILhwPZ3iKlgdUf8aZ7DSQ+G7nZg=', '2018-03-17 06:18:58.265386', '1', 'admin', '', '', 'fuyunhuayu@foxmail.com', '1', '1', '2018-03-16 13:55:32.258571', '');
INSERT INTO `supervise_user` VALUES ('3', 'pbkdf2_sha256$100000$EeZvjmVVIJSN$2jSCc5zXQEvCNqq68z2H7cbBPrcQ8Ua3ni++ThjWThk=', null, '0', 'fuyunhuayu', '', '', '908795484@qq.com', '0', '1', '2018-03-17 01:55:57.371341', '');
