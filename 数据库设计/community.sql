/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : easyhomeback

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-03-17 14:35:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for community_category
-- ----------------------------
DROP TABLE IF EXISTS `community_category`;
CREATE TABLE `community_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of community_category
-- ----------------------------
INSERT INTO `community_category` VALUES ('1', 'category test');

-- ----------------------------
-- Table structure for community_post
-- ----------------------------
DROP TABLE IF EXISTS `community_post`;
CREATE TABLE `community_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(70) NOT NULL,
  `body` longtext NOT NULL,
  `created_time` datetime(6) NOT NULL,
  `modified_time` datetime(6) NOT NULL,
  `excerpt` varchar(200) NOT NULL,
  `author_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `community_post_author_id_a6c5f564_fk_supervise_user_id` (`author_id`),
  KEY `community_post_category_id_40d6514d_fk_community_category_id` (`category_id`),
  CONSTRAINT `community_post_author_id_a6c5f564_fk_supervise_user_id` FOREIGN KEY (`author_id`) REFERENCES `supervise_user` (`id`),
  CONSTRAINT `community_post_category_id_40d6514d_fk_community_category_id` FOREIGN KEY (`category_id`) REFERENCES `community_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of community_post
-- ----------------------------
INSERT INTO `community_post` VALUES ('1', 'title test', 'body test', '2018-03-17 06:16:09.390443', '2018-03-17 06:16:09.390443', '', '3', '1');

-- ----------------------------
-- Table structure for community_post_tags
-- ----------------------------
DROP TABLE IF EXISTS `community_post_tags`;
CREATE TABLE `community_post_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `community_post_tags_post_id_tag_id_9d55619b_uniq` (`post_id`,`tag_id`),
  KEY `community_post_tags_tag_id_4100f5ee_fk_community_tag_id` (`tag_id`),
  CONSTRAINT `community_post_tags_post_id_c27e80a2_fk_community_post_id` FOREIGN KEY (`post_id`) REFERENCES `community_post` (`id`),
  CONSTRAINT `community_post_tags_tag_id_4100f5ee_fk_community_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `community_tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of community_post_tags
-- ----------------------------

-- ----------------------------
-- Table structure for community_tag
-- ----------------------------
DROP TABLE IF EXISTS `community_tag`;
CREATE TABLE `community_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of community_tag
-- ----------------------------
INSERT INTO `community_tag` VALUES ('1', 'tag test');
