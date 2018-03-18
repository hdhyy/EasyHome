/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : easyhome

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-03-17 13:58:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for django_migrations
-- ----------------------------
DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of django_migrations
-- ----------------------------
INSERT INTO `django_migrations` VALUES ('1', 'contenttypes', '0001_initial', '2018-03-10 11:26:46.704787');
INSERT INTO `django_migrations` VALUES ('2', 'auth', '0001_initial', '2018-03-10 11:26:49.144150');
INSERT INTO `django_migrations` VALUES ('3', 'admin', '0001_initial', '2018-03-10 11:26:49.688500');
INSERT INTO `django_migrations` VALUES ('4', 'admin', '0002_logentry_remove_auto_add', '2018-03-10 11:26:49.709498');
INSERT INTO `django_migrations` VALUES ('5', 'contenttypes', '0002_remove_content_type_name', '2018-03-10 11:26:50.058773');
INSERT INTO `django_migrations` VALUES ('6', 'auth', '0002_alter_permission_name_max_length', '2018-03-10 11:26:50.250807');
INSERT INTO `django_migrations` VALUES ('7', 'auth', '0003_alter_user_email_max_length', '2018-03-10 11:26:50.492327');
INSERT INTO `django_migrations` VALUES ('8', 'auth', '0004_alter_user_username_opts', '2018-03-10 11:26:50.522326');
INSERT INTO `django_migrations` VALUES ('9', 'auth', '0005_alter_user_last_login_null', '2018-03-10 11:26:50.683623');
INSERT INTO `django_migrations` VALUES ('10', 'auth', '0006_require_contenttypes_0002', '2018-03-10 11:26:50.693672');
INSERT INTO `django_migrations` VALUES ('11', 'auth', '0007_alter_validators_add_error_messages', '2018-03-10 11:26:50.713689');
INSERT INTO `django_migrations` VALUES ('12', 'auth', '0008_alter_user_username_max_length', '2018-03-10 11:26:51.160108');
INSERT INTO `django_migrations` VALUES ('13', 'auth', '0009_alter_user_last_name_max_length', '2018-03-10 11:26:51.350375');
INSERT INTO `django_migrations` VALUES ('14', 'sessions', '0001_initial', '2018-03-10 11:26:51.501942');
INSERT INTO `django_migrations` VALUES ('15', 'polls', '0001_initial', '2018-03-10 16:36:20.236208');
