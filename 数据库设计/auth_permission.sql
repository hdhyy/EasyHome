/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : easyhome

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-03-17 14:26:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for auth_permission
-- ----------------------------
DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_permission
-- ----------------------------
INSERT INTO `auth_permission` VALUES ('1', 'Can add log entry', '1', 'add_logentry');
INSERT INTO `auth_permission` VALUES ('2', 'Can change log entry', '1', 'change_logentry');
INSERT INTO `auth_permission` VALUES ('3', 'Can delete log entry', '1', 'delete_logentry');
INSERT INTO `auth_permission` VALUES ('4', 'Can add permission', '2', 'add_permission');
INSERT INTO `auth_permission` VALUES ('5', 'Can change permission', '2', 'change_permission');
INSERT INTO `auth_permission` VALUES ('6', 'Can delete permission', '2', 'delete_permission');
INSERT INTO `auth_permission` VALUES ('7', 'Can add group', '3', 'add_group');
INSERT INTO `auth_permission` VALUES ('8', 'Can change group', '3', 'change_group');
INSERT INTO `auth_permission` VALUES ('9', 'Can delete group', '3', 'delete_group');
INSERT INTO `auth_permission` VALUES ('10', 'Can add content type', '4', 'add_contenttype');
INSERT INTO `auth_permission` VALUES ('11', 'Can change content type', '4', 'change_contenttype');
INSERT INTO `auth_permission` VALUES ('12', 'Can delete content type', '4', 'delete_contenttype');
INSERT INTO `auth_permission` VALUES ('13', 'Can add session', '5', 'add_session');
INSERT INTO `auth_permission` VALUES ('14', 'Can change session', '5', 'change_session');
INSERT INTO `auth_permission` VALUES ('15', 'Can delete session', '5', 'delete_session');
INSERT INTO `auth_permission` VALUES ('16', 'Can add choice', '6', 'add_choice');
INSERT INTO `auth_permission` VALUES ('17', 'Can change choice', '6', 'change_choice');
INSERT INTO `auth_permission` VALUES ('18', 'Can delete choice', '6', 'delete_choice');
INSERT INTO `auth_permission` VALUES ('19', 'Can add question', '7', 'add_question');
INSERT INTO `auth_permission` VALUES ('20', 'Can change question', '7', 'change_question');
INSERT INTO `auth_permission` VALUES ('21', 'Can delete question', '7', 'delete_question');
INSERT INTO `auth_permission` VALUES ('22', 'Can add account info', '8', 'add_accountinfo');
INSERT INTO `auth_permission` VALUES ('23', 'Can change account info', '8', 'change_accountinfo');
INSERT INTO `auth_permission` VALUES ('24', 'Can delete account info', '8', 'delete_accountinfo');
INSERT INTO `auth_permission` VALUES ('25', 'Can add user', '9', 'add_user');
INSERT INTO `auth_permission` VALUES ('26', 'Can change user', '9', 'change_user');
INSERT INTO `auth_permission` VALUES ('27', 'Can delete user', '9', 'delete_user');
INSERT INTO `auth_permission` VALUES ('28', 'Can add personal info', '10', 'add_personalinfo');
INSERT INTO `auth_permission` VALUES ('29', 'Can change personal info', '10', 'change_personalinfo');
INSERT INTO `auth_permission` VALUES ('30', 'Can delete personal info', '10', 'delete_personalinfo');
INSERT INTO `auth_permission` VALUES ('31', 'Can add tag', '11', 'add_tag');
INSERT INTO `auth_permission` VALUES ('32', 'Can change tag', '11', 'change_tag');
INSERT INTO `auth_permission` VALUES ('33', 'Can delete tag', '11', 'delete_tag');
INSERT INTO `auth_permission` VALUES ('34', 'Can add post', '12', 'add_post');
INSERT INTO `auth_permission` VALUES ('35', 'Can change post', '12', 'change_post');
INSERT INTO `auth_permission` VALUES ('36', 'Can delete post', '12', 'delete_post');
INSERT INTO `auth_permission` VALUES ('37', 'Can add category', '13', 'add_category');
INSERT INTO `auth_permission` VALUES ('38', 'Can change category', '13', 'change_category');
INSERT INTO `auth_permission` VALUES ('39', 'Can delete category', '13', 'delete_category');
