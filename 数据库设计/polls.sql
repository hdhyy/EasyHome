/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : easyhomeback

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-03-17 14:40:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for polls_choice
-- ----------------------------
DROP TABLE IF EXISTS `polls_choice`;
CREATE TABLE `polls_choice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `choice_text` varchar(200) NOT NULL,
  `votes` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `polls_choice_question_id_c5b4b260_fk_polls_question_id` (`question_id`),
  CONSTRAINT `polls_choice_question_id_c5b4b260_fk_polls_question_id` FOREIGN KEY (`question_id`) REFERENCES `polls_question` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of polls_choice
-- ----------------------------
INSERT INTO `polls_choice` VALUES ('1', 'Not much', '15', '1');
INSERT INTO `polls_choice` VALUES ('2', 'The sky', '6', '1');

-- ----------------------------
-- Table structure for polls_question
-- ----------------------------
DROP TABLE IF EXISTS `polls_question`;
CREATE TABLE `polls_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_text` varchar(200) NOT NULL,
  `pub_date` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of polls_question
-- ----------------------------
INSERT INTO `polls_question` VALUES ('1', 'What\'s up', '2018-03-10 05:56:44.000000');
