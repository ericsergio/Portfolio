-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: crdb
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inventory`
--

LOCK TABLES `Inventory` WRITE;
/*!40000 ALTER TABLE `Inventory` DISABLE KEYS */;
INSERT INTO `Inventory` VALUES (1,'cr1001','B_B_Liqueur_1.5L_case',9.99,23,1,'0'),(2,'cr1002','B_B_Liqueur_1.5L',9.99,28,1,'0'),(3,'cr1003','B_B_Liqueur_1L_case',9.99,22,1,'0'),(4,'cr1004','B_B_Liqueur_1L',9.99,13,1,'0'),(5,'cr1005','B_B_Liqueur_750ml_case',9.99,3,1,'0'),(6,'cr1006','B_B_Liqueur_750ml',9.99,6,1,'0'),(7,'cr1007','Budweiser',9.99,11,3,'0'),(8,'cr1008','Elysian_Dragonstooth',9.99,0,3,'0'),(9,'cr1009','Elysian_Dragonstooth_Stout',9.99,12,3,'0'),(10,'cr1010','Mich_Ultra',9.99,10,3,'0'),(11,'cr1011','ODouls',9.99,21,3,'0'),(12,'cr1012','Redbridge',9.99,26,3,'0'),(13,'cr1013','Stella_Artois',9.99,29,3,'0'),(14,'cr1014','Bloomin_Blonde',9.99,25,4,'0'),(15,'cr1015','Bud_Light',9.99,4,4,'0'),(16,'cr1016','Immortal_IPA',9.99,11,4,'0');
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

-- Dump completed on 2023-07-24 10:16:11
