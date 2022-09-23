-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2022-09-20 22:00:58
-- 服务器版本： 8.0.24
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ZMusic`
--

-- --------------------------------------------------------

--
-- 表的结构 `zmusic_backstage_maindetail_dailylogin`
--

CREATE TABLE IF NOT EXISTS `zmusic_backstage_maindetail_dailylogin` (
  `id` int NOT NULL,
  `date` datetime NOT NULL,
  `uuid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 表的结构 `zmusic_backstage_maindetail_dailyregister`
--

CREATE TABLE IF NOT EXISTS `zmusic_backstage_maindetail_dailyregister` (
  `id` int NOT NULL,
  `date` datetime NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `zmusic_backstage_playrecord`
--

CREATE TABLE IF NOT EXISTS `zmusic_backstage_playrecord` (
  `id` int NOT NULL,
  `mid` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 表的结构 `zmusic_backstage_userinfo`
--

CREATE TABLE IF NOT EXISTS `zmusic_backstage_userinfo` (
  `id` int NOT NULL,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `root` varchar(45) DEFAULT '4',
  `status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 表的结构 `zmusic_favourite`
--

CREATE TABLE IF NOT EXISTS `zmusic_favourite` (
  `id` int NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `mid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 表的结构 `zmusic_findmusiccards`
--

CREATE TABLE IF NOT EXISTS `zmusic_findmusiccards` (
  `id` int NOT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 表的结构 `zmusic_findmusic_cardsinfo`
--

CREATE TABLE IF NOT EXISTS `zmusic_findmusic_cardsinfo` (
  `id` int NOT NULL,
  `placeId` varchar(45) NOT NULL,
  `mid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 表的结构 `zmusic_musicinfo`
--

CREATE TABLE IF NOT EXISTS `zmusic_musicinfo` (
  `id` int NOT NULL,
  `mid` varchar(255) NOT NULL,
  `musicName` varchar(255) DEFAULT NULL,
  `musicAuthor` varchar(255) NOT NULL DEFAULT 'UnknowAuthor',
  `musicUrl` varchar(255) NOT NULL,
  `musicLyricUrl` varchar(255) NOT NULL,
  `musicStatus` tinyint(1) NOT NULL DEFAULT '0' COMMENT '歌曲状态 0：正常  ； 1：异常。'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='音乐信息表 包含音乐mid 歌名 作者  歌曲路径 歌词路径 状态';

-- --------------------------------------------------------

--
-- 表的结构 `zmusic_userinfo`
--

CREATE TABLE IF NOT EXISTS `zmusic_userinfo` (
  `id` int NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photoUrl` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) NOT NULL,
  `root` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 表的结构 `zmusic_userplayinglist`
--

CREATE TABLE IF NOT EXISTS `zmusic_userplayinglist` (
  `id` int NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `mid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `zmusic_backstage_maindetail_dailylogin`
--
ALTER TABLE `zmusic_backstage_maindetail_dailylogin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zmusic_backstage_maindetail_dailyregister`
--
ALTER TABLE `zmusic_backstage_maindetail_dailyregister`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zmusic_backstage_playrecord`
--
ALTER TABLE `zmusic_backstage_playrecord`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `zmusic_backstage_userinfo`
--
ALTER TABLE `zmusic_backstage_userinfo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `account_UNIQUE` (`account`);

--
-- Indexes for table `zmusic_favourite`
--
ALTER TABLE `zmusic_favourite`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `zmusic_findmusiccards`
--
ALTER TABLE `zmusic_findmusiccards`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `zmusic_findmusic_cardsinfo`
--
ALTER TABLE `zmusic_findmusic_cardsinfo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `zmusic_musicinfo`
--
ALTER TABLE `zmusic_musicinfo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mid_UNIQUE` (`mid`);

--
-- Indexes for table `zmusic_userinfo`
--
ALTER TABLE `zmusic_userinfo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `account_UNIQUE` (`account`);

--
-- Indexes for table `zmusic_userplayinglist`
--
ALTER TABLE `zmusic_userplayinglist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `zmusic_backstage_maindetail_dailylogin`
--
ALTER TABLE `zmusic_backstage_maindetail_dailylogin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `zmusic_backstage_maindetail_dailyregister`
--
ALTER TABLE `zmusic_backstage_maindetail_dailyregister`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `zmusic_backstage_playrecord`
--
ALTER TABLE `zmusic_backstage_playrecord`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `zmusic_backstage_userinfo`
--
ALTER TABLE `zmusic_backstage_userinfo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `zmusic_favourite`
--
ALTER TABLE `zmusic_favourite`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `zmusic_findmusiccards`
--
ALTER TABLE `zmusic_findmusiccards`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `zmusic_findmusic_cardsinfo`
--
ALTER TABLE `zmusic_findmusic_cardsinfo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `zmusic_musicinfo`
--
ALTER TABLE `zmusic_musicinfo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `zmusic_userinfo`
--
ALTER TABLE `zmusic_userinfo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `zmusic_userplayinglist`
--
ALTER TABLE `zmusic_userplayinglist`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
