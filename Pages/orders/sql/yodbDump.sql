-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: yodb
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
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inventory`
--

LOCK TABLES `Inventory` WRITE;
/*!40000 ALTER TABLE `Inventory` DISABLE KEYS */;
INSERT INTO `Inventory` VALUES (1,'yo1001','Chambord_1.5L_case',9.99,25,1,'0'),(2,'yo1002','Chambord_1.5L',9.99,20,1,'0'),(3,'yo1003','Chambord_1L_case',9.99,16,1,'0'),(4,'yo1004','Chambord_1L',9.99,2,1,'0'),(5,'yo1005','Chambord_750ml_case',9.99,3,1,'0'),(6,'yo1006','Chambord_750ml',9.99,15,1,'0'),(7,'yo1007','Cinzano_Dry_Vermouth_1.5L_case',9.99,15,1,'0'),(8,'yo1008','Cinzano_Dry_Vermouth_1.5L',9.99,27,1,'0'),(9,'yo1009','Cinzano_Dry_Vermouth_1L_case',9.99,6,1,'0'),(10,'yo1010','Cinzano_Dry_Vermouth_1L',9.99,20,1,'0'),(11,'yo1011','Cinzano_Dry_Vermouth_750ml_case',9.99,24,1,'0'),(12,'yo1012','Cinzano_Dry_Vermouth_750ml',9.99,18,1,'0'),(13,'yo1013','Cinzano_Sweet_Vermouth_1.5L_case',9.99,29,1,'0'),(14,'yo1014','Cinzano_Sweet_Vermouth_1.5L',9.99,21,1,'0'),(15,'yo1015','Cinzano_Sweet_Vermouth_1L_case',9.99,25,1,'0'),(16,'yo1016','Cinzano_Sweet_Vermouth_1L',9.99,25,1,'0'),(17,'yo1017','Cinzano_Sweet_Vermouth_750ml_case',9.99,11,1,'0'),(18,'yo1018','Cinzano_Sweet_Vermouth_750ml',9.99,8,1,'0'),(19,'yo1019','Cointreau_Orange_Liqueur_1.5L_case',9.99,2,1,'0'),(20,'yo1020','Cointreau_Orange_Liqueur_1.5L',9.99,20,1,'0'),(21,'yo1021','Cointreau_Orange_Liqueur_1L_case',9.99,5,1,'0'),(22,'yo1022','Cointreau_Orange_Liqueur_1L',9.99,28,1,'0'),(23,'yo1023','Cointreau_Orange_Liqueur_750ml_case',9.99,1,1,'0'),(24,'yo1024','Cointreau_Orange_Liqueur_750ml',9.99,27,1,'0'),(25,'yo1025','Drambuie_1.5L_case',9.99,6,1,'0'),(26,'yo1026','Drambuie_1.5L',9.99,19,1,'0'),(27,'yo1027','Drambuie_1L_case',9.99,18,1,'0'),(28,'yo1028','Drambuie_1L',9.99,4,1,'0'),(29,'yo1029','Drambuie_750ml_case',9.99,4,1,'0'),(30,'yo1030','Drambuie_750ml',9.99,18,1,'0'),(31,'yo1031','El_Himador_Tequila_1.5L_case',9.99,25,1,'0'),(32,'yo1032','El_Himador_Tequila_1.5L',9.99,20,1,'0'),(33,'yo1033','El_Himador_Tequila_1L_case',9.99,11,1,'0'),(34,'yo1034','El_Himador_Tequila_1L',9.99,23,1,'0'),(35,'yo1035','El_Himador_Tequila_750ml_case',9.99,11,1,'0'),(36,'yo1036','El_Himador_Tequila_750ml',9.99,26,1,'0'),(37,'yo1037','Fireball_Whiskey_1.5L_case',9.99,4,1,'0'),(38,'yo1038','Fireball_Whiskey_1.5L',9.99,25,1,'0'),(39,'yo1039','Fireball_Whiskey_1L_case',9.99,12,1,'0'),(40,'yo1040','Fireball_Whiskey_1L',9.99,7,1,'0'),(41,'yo1041','Fireball_Whiskey_750ml_case',9.99,10,1,'0'),(42,'yo1042','Fireball_Whiskey_750ml',9.99,19,1,'0'),(43,'yo1043','Frangelico_1.5L_case',9.99,21,1,'0'),(44,'yo1044','Frangelico_1.5L',9.99,2,1,'0'),(45,'yo1045','Frangelico_1L_case',9.99,13,1,'0'),(46,'yo1046','Frangelico_1L',9.99,3,1,'0'),(47,'yo1047','Frangelico_750ml_case',9.99,4,1,'0'),(48,'yo1048','Frangelico_750ml',9.99,29,1,'0'),(49,'yo1049','Hendricks_Gin_1.5L_case',9.99,14,1,'0'),(50,'yo1050','Hendricks_Gin_1.5L',9.99,10,1,'0'),(51,'yo1051','Hendricks_Gin_1L_case',9.99,5,1,'0'),(52,'yo1052','Hendricks_Gin_1L',9.99,9,1,'0'),(53,'yo1053','Hendricks_Gin_750ml_case',9.99,17,1,'0'),(54,'yo1054','Hendricks_Gin_750ml',9.99,20,1,'0'),(55,'yo1055','Herradura_Tequila_1.5L_case',9.99,11,1,'0'),(56,'yo1056','Herradura_Tequila_1.5L',9.99,21,1,'0'),(57,'yo1057','Herradura_Tequila_1L_case',9.99,11,1,'0'),(58,'yo1058','Herradura_Tequila_1L',9.99,16,1,'0'),(59,'yo1059','Herradura_Tequila_750ml_case',9.99,25,1,'0'),(60,'yo1060','Herradura_Tequila_750ml',9.99,22,1,'0'),(61,'yo1061','Jack_Daniels_Bourbon_1.5L_case',9.99,4,1,'0'),(62,'yo1062','Jack_Daniels_Bourbon_1.5L',9.99,23,1,'0'),(63,'yo1063','Jack_Daniels_Bourbon_1L_case',9.99,13,1,'0'),(64,'yo1064','Jack_Daniels_Bourbon_1L',9.99,8,1,'0'),(65,'yo1065','Jack_Daniels_Bourbon_750ml_case',9.99,12,1,'0'),(66,'yo1066','Jack_Daniels_Bourbon_750ml',9.99,24,1,'0'),(67,'yo1067','Jack_Honey_1.5L_case',9.99,3,1,'0'),(68,'yo1068','Jack_Honey_1.5L',9.99,0,1,'0'),(69,'yo1069','Jack_Honey_1L_case',9.99,22,1,'0'),(70,'yo1070','Jack_Honey_1L',9.99,28,1,'0'),(71,'yo1071','Jack_Honey_750ml_case',9.99,13,1,'0'),(72,'yo1072','Jack_Honey_750ml',9.99,15,1,'0'),(73,'yo1073','Korbel_Brandy_1.5L_case',9.99,14,1,'0'),(74,'yo1074','Korbel_Brandy_1.5L',9.99,21,1,'0'),(75,'yo1075','Korbel_Brandy_1L_case',9.99,15,1,'0'),(76,'yo1076','Korbel_Brandy_1L',9.99,7,1,'0'),(77,'yo1077','Korbel_Brandy_750ml_case',9.99,8,1,'0'),(78,'yo1078','Korbel_Brandy_750ml',9.99,26,1,'0'),(79,'yo1079','Macallan_Scotch_1.5L_case',9.99,28,1,'0'),(80,'yo1080','Macallan_Scotch_1.5L',9.99,22,1,'0'),(81,'yo1081','Macallan_Scotch_1L_case',9.99,21,1,'0'),(82,'yo1082','Macallan_Scotch_1L',9.99,14,1,'0'),(83,'yo1083','Macallan_Scotch_750ml_case',9.99,1,1,'0'),(84,'yo1084','Macallan_Scotch_750ml',9.99,10,1,'0'),(85,'yo1085','MacGregor_Scotch_1.5L_case',9.99,18,1,'0'),(86,'yo1086','MacGregor_Scotch_1.5L',9.99,28,1,'0'),(87,'yo1087','MacGregor_Scotch_1L_case',9.99,17,1,'0'),(88,'yo1088','MacGregor_Scotch_1L',9.99,16,1,'0'),(89,'yo1089','MacGregor_Scotch_750ml_case',9.99,23,1,'0'),(90,'yo1090','MacGregor_Scotch_750ml',9.99,11,1,'0'),(91,'yo1091','Myers_Dark_Rum_1.5L_case',9.99,2,1,'0'),(92,'yo1092','Myers_Dark_Rum_1.5L',9.99,7,1,'0'),(93,'yo1093','Myers_Dark_Rum_1L_case',9.99,24,1,'0'),(94,'yo1094','Myers_Dark_Rum_1L',9.99,18,1,'0'),(95,'yo1095','Myers_Dark_Rum_750ml_case',9.99,15,1,'0'),(96,'yo1096','Myers_Dark_Rum_750ml',9.99,4,1,'0'),(97,'yo1097','Royal_Gentleman_Whiskey_1.5L_case',9.99,2,1,'0'),(98,'yo1098','Royal_Gentleman_Whiskey_1.5L',9.99,13,1,'0'),(99,'yo1099','Royal_Gentleman_Whiskey_1L_case',9.99,11,1,'0'),(100,'yo1100','Royal_Gentleman_Whiskey_1L',9.99,25,1,'0'),(101,'yo1101','Royal_Gentleman_Whiskey_750ml_case',9.99,14,1,'0'),(102,'yo1102','Royal_Gentleman_Whiskey_750ml',9.99,20,1,'0'),(103,'yo1103','Sailor_Jerrys_Rum_1.5L_case',9.99,12,1,'0'),(104,'yo1104','Sailor_Jerrys_Rum_1.5L',9.99,18,1,'0'),(105,'yo1105','Sailor_Jerrys_Rum_1L_case',9.99,3,1,'0'),(106,'yo1106','Sailor_Jerrys_Rum_1L',9.99,12,1,'0'),(107,'yo1107','Sailor_Jerrys_Rum_750ml_case',9.99,3,1,'0'),(108,'yo1108','Sailor_Jerrys_Rum_750ml',9.99,21,1,'0'),(109,'yo1109','Sambuca_Romana_1.5L_case',9.99,10,1,'0'),(110,'yo1110','Sambuca_Romana_1.5L',9.99,18,1,'0'),(111,'yo1111','Sambuca_Romana_1L_case',9.99,3,1,'0'),(112,'yo1112','Sambuca_Romana_1L',9.99,0,1,'0'),(113,'yo1113','Sambuca_Romana_750ml_case',9.99,13,1,'0'),(114,'yo1114','Sambuca_Romana_750ml',9.99,23,1,'0'),(115,'yo1115','Southern_Comfort_1.5L_case',9.99,12,1,'0'),(116,'yo1116','Southern_Comfort_1.5L',9.99,1,1,'0'),(117,'yo1117','Southern_Comfort_1L_case',9.99,19,1,'0'),(118,'yo1118','Southern_Comfort_1L',9.99,17,1,'0'),(119,'yo1119','Southern_Comfort_750ml_case',9.99,5,1,'0'),(120,'yo1120','Southern_Comfort_750ml',9.99,14,1,'0'),(121,'yo1121','Titos_Vodka_1.5L_case',9.99,11,1,'0'),(122,'yo1122','Titos_Vodka_1.5L',9.99,1,1,'0'),(123,'yo1123','Titos_Vodka_1L_case',9.99,24,1,'0'),(124,'yo1124','Titos_Vodka_1L',9.99,8,1,'0'),(125,'yo1125','Titos_Vodka_750ml_case',9.99,23,1,'0'),(126,'yo1126','Titos_Vodka_750ml',9.99,16,1,'0'),(127,'yo1127','Woodford_Reserve_Whiskey_1.5L_case',9.99,9,1,'0'),(128,'yo1128','Woodford_Reserve_Whiskey_1.5L',9.99,28,1,'0'),(129,'yo1129','Woodford_Reserve_Whiskey_1L_case',9.99,21,1,'0'),(130,'yo1130','Woodford_Reserve_Whiskey_1L',9.99,0,1,'0'),(131,'yo1131','Woodford_Reserve_Whiskey_750ml_case',9.99,26,1,'0'),(132,'yo1132','Woodford_Reserve_Whiskey_750ml',9.99,7,1,'0'),(133,'yo1133','Yukon_Jack_1.5L_case',9.99,15,1,'0'),(134,'yo1134','Yukon_Jack_1.5L',9.99,16,1,'0'),(135,'yo1135','Yukon_Jack_1L_case',9.99,23,1,'0'),(136,'yo1136','Yukon_Jack_1L',9.99,11,1,'0'),(137,'yo1137','Yukon_Jack_750ml_case',9.99,23,1,'0'),(138,'yo1138','Yukon_Jack_750ml',9.99,13,1,'0');
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

-- Dump completed on 2023-07-24 10:16:31
