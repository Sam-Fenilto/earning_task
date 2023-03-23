-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: earning_task_1
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `et_category_tbl`
--

DROP TABLE IF EXISTS `et_category_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `et_category_tbl` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `et_category_tbl`
--

LOCK TABLES `et_category_tbl` WRITE;
/*!40000 ALTER TABLE `et_category_tbl` DISABLE KEYS */;
INSERT INTO `et_category_tbl` VALUES (1,'people'),(2,'tech'),(3,'entertainment');
/*!40000 ALTER TABLE `et_category_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `et_form_tbl`
--

DROP TABLE IF EXISTS `et_form_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `et_form_tbl` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `image_title` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `image_description` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `original_file_name` text COLLATE utf8mb4_general_ci NOT NULL,
  `image_extension` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category_id` int NOT NULL,
  `is_price_available` enum('Y','N') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N',
  `price` int DEFAULT NULL,
  `is_terms_accepted` enum('Y','N') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  KEY `fk_category_idx` (`category_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `et_category_tbl` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `et_form_tbl`
--

LOCK TABLES `et_form_tbl` WRITE;
/*!40000 ALTER TABLE `et_form_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `et_form_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `et_user_tbl`
--

DROP TABLE IF EXISTS `et_user_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `et_user_tbl` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `is_verified` enum('N','Y') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N',
  `otp` mediumint NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `et_user_tbl`
--

LOCK TABLES `et_user_tbl` WRITE;
/*!40000 ALTER TABLE `et_user_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `et_user_tbl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-23  7:48:40
