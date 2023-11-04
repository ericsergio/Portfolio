-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: codb
-- ------------------------------------------------------
-- Server version       8.0.33-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Inventory`
--

DROP TABLE IF EXISTS `Inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Inventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sku` varchar(9) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  `discount` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inventory`
--

LOCK TABLES `Inventory` WRITE;
/*!40000 ALTER TABLE `Inventory` DISABLE KEYS */;
INSERT INTO `Inventory` VALUES (1,'co1001','MacNaughtons_Whiskey_1.5L_case',9.99,25,1,'0'),(2,'co1002','MacNaughtons_Whiskey_1.5L',9.99,15,1,'0'),(3,'co1003','MacNaughtons_Whiskey_1L_case',9.99,25,1,'0'),(4,'co1004','MacNaughtons_Whiskey_1L',9.99,29,1,'0'),(5,'co1005','MacNaughtons_Whiskey_750ml_case',9.99,11,1,'0'),(6,'co1006','MacNaughtons_Whiskey_750ml',9.99,24,1,'0'),(7,'co1007','Amstel_Light',9.99,13,3,'0'),(8,'co1008','Angry_Orchard',9.99,26,3,'0'),(9,'co1009','Corona',9.99,11,3,'0'),(10,'co1010','Corona_Light',9.99,8,3,'0'),(11,'co1011','Fosters_Oil',9.99,3,3,'0'),(12,'co1012','Guiness',9.99,0,3,'0'),(13,'co1013','Heinekin',9.99,17,3,'0'),(14,'co1014','MGD',9.99,29,3,'0'),(15,'co1015','Miller_Light',9.99,17,3,'0'),(16,'co1016','Newcastle',9.99,1,3,'0'),(17,'co1017','Sam_Adams_76_Cans',9.99,28,3,'0'),(18,'co1018','Blue_Moon',9.99,27,4,'0'),(19,'co1019','Coors_Light',9.99,23,4,'0'),(20,'co1020','Fosters',9.99,18,4,'0'),(21,'co1021','Pyramid_Amber',9.99,0,4,'0'),(22,'co1022','Sam_Adams',9.99,18,4,'0'),(23,'co1023','Sam_Adams_Seasonal',9.99,0,4,'0'),(24,'co1024','Red_Bull',9.99,16,5,'0');
/*!40000 ALTER TABLE `Inventory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-24 10:16:01
