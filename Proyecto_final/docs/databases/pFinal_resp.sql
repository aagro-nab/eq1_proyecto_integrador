-- MySQL dump 10.13  Distrib 8.0.33, for macos13.3 (x86_64)
--
-- Host: localhost    Database: proyectoFinal
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `foro`
--

DROP TABLE IF EXISTS `foro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foro` (
  `ID_FORO` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `descripcion` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `privacidad` tinyint(1) NOT NULL,
  `foto` mediumblob,
  `ID_USUARIO` int DEFAULT NULL,
  PRIMARY KEY (`ID_FORO`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  CONSTRAINT `foro_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foro`
--

LOCK TABLES `foro` WRITE;
/*!40000 ALTER TABLE `foro` DISABLE KEYS */;
INSERT INTO `foro` VALUES (3,'wdeq','fsdf',1,_binary 'default.jpg',NULL);
/*!40000 ALTER TABLE `foro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grado`
--

DROP TABLE IF EXISTS `grado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grado` (
  `ID_GRADO` int NOT NULL AUTO_INCREMENT,
  `grado` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID_GRADO`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grado`
--

LOCK TABLES `grado` WRITE;
/*!40000 ALTER TABLE `grado` DISABLE KEYS */;
INSERT INTO `grado` VALUES (1,'cuarto'),(2,'quinto'),(3,'sexto');
/*!40000 ALTER TABLE `grado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupo`
--

DROP TABLE IF EXISTS `grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupo` (
  `ID_GRUPO` int NOT NULL AUTO_INCREMENT,
  `grupo` int NOT NULL,
  `ID_GRADO` int DEFAULT NULL,
  `ID_TURNO` int DEFAULT NULL,
  PRIMARY KEY (`ID_GRUPO`),
  KEY `ID_GRADO` (`ID_GRADO`),
  KEY `ID_TURNO` (`ID_TURNO`),
  CONSTRAINT `grupo_ibfk_1` FOREIGN KEY (`ID_GRADO`) REFERENCES `grado` (`ID_GRADO`),
  CONSTRAINT `grupo_ibfk_2` FOREIGN KEY (`ID_TURNO`) REFERENCES `turno` (`ID_TURNO`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo`
--

LOCK TABLES `grupo` WRITE;
/*!40000 ALTER TABLE `grupo` DISABLE KEYS */;
INSERT INTO `grupo` VALUES (1,401,1,1),(2,402,1,1),(3,403,1,1),(4,404,1,1),(5,405,1,1),(6,406,1,1),(7,407,1,1),(8,408,1,1),(9,409,1,1),(10,410,1,1),(11,411,1,1),(12,412,1,1),(13,413,1,1),(14,414,1,1),(15,415,1,1),(16,416,1,1),(17,417,1,1),(18,451,1,2),(19,452,1,2),(20,453,1,2),(21,454,1,2),(22,455,1,2),(23,456,1,2),(24,457,1,2),(25,458,1,2),(26,459,1,2),(27,460,1,2),(28,461,1,2),(29,462,1,2),(30,463,1,2),(31,464,1,2),(32,465,1,2),(33,466,1,2),(34,501,2,1),(35,502,2,1),(36,503,2,1),(37,504,2,1),(38,505,2,1),(39,506,2,1),(40,507,2,1),(41,508,2,1),(42,509,2,1),(43,510,2,1),(44,511,2,1),(45,512,2,1),(46,513,2,1),(47,514,2,1),(48,515,2,1),(49,516,2,1),(50,517,2,1),(51,518,2,1),(52,551,2,2),(53,552,2,2),(54,553,2,2),(55,554,2,2),(56,555,2,2),(57,556,2,2),(58,557,2,2),(59,558,2,2),(60,559,2,2),(61,560,2,2),(62,561,2,2),(63,562,2,2),(64,563,2,2),(65,564,2,2),(85,601,3,1),(86,602,3,1),(87,603,3,1),(88,604,3,1),(89,605,3,1),(90,606,3,1),(91,607,3,1),(92,608,3,1),(93,609,3,1),(94,610,3,1),(95,611,3,1),(96,612,3,1),(97,613,3,1),(98,614,3,1),(99,615,3,1),(100,616,3,1),(101,617,3,1),(102,618,3,1),(103,619,3,1),(104,651,3,2),(105,652,3,2),(106,653,3,2),(107,654,3,2),(108,655,3,2),(109,656,3,2),(110,657,3,2),(111,658,3,2),(112,659,3,2),(113,660,3,2),(114,661,3,2),(115,662,3,2),(116,663,3,2);
/*!40000 ALTER TABLE `grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horario`
--

DROP TABLE IF EXISTS `horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horario` (
  `ID_HORARIO` int NOT NULL AUTO_INCREMENT,
  `7_00` tinyint(1) DEFAULT NULL,
  `7_50` tinyint(1) DEFAULT NULL,
  `8_40` tinyint(1) DEFAULT NULL,
  `9_30` tinyint(1) DEFAULT NULL,
  `10_20` tinyint(1) DEFAULT NULL,
  `11_10` tinyint(1) DEFAULT NULL,
  `12_00` tinyint(1) DEFAULT NULL,
  `12_50` tinyint(1) DEFAULT NULL,
  `13_40` tinyint(1) DEFAULT NULL,
  `14_30` tinyint(1) DEFAULT NULL,
  `15_20` tinyint(1) DEFAULT NULL,
  `16_10` tinyint(1) DEFAULT NULL,
  `17_00` tinyint(1) DEFAULT NULL,
  `17_50` tinyint(1) DEFAULT NULL,
  `18_40` tinyint(1) DEFAULT NULL,
  `19_30` tinyint(1) DEFAULT NULL,
  `20_20` tinyint(1) DEFAULT NULL,
  `21_10` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID_HORARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario`
--

LOCK TABLES `horario` WRITE;
/*!40000 ALTER TABLE `horario` DISABLE KEYS */;
/*!40000 ALTER TABLE `horario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objeto_perdido`
--

DROP TABLE IF EXISTS `objeto_perdido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objeto_perdido` (
  `ID_OBJETOPERDIDO` int NOT NULL AUTO_INCREMENT,
  `descripcionObjeto` text COLLATE utf8mb4_general_ci NOT NULL,
  `fechaObjetoPerdido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fotoObjeto` mediumblob,
  `ID_USUARIO` int DEFAULT NULL,
  `ID_FORO` int DEFAULT NULL,
  PRIMARY KEY (`ID_OBJETOPERDIDO`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  KEY `ID_FORO` (`ID_FORO`),
  CONSTRAINT `objeto_perdido_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`),
  CONSTRAINT `objeto_perdido_ibfk_2` FOREIGN KEY (`ID_FORO`) REFERENCES `foro` (`ID_FORO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objeto_perdido`
--

LOCK TABLES `objeto_perdido` WRITE;
/*!40000 ALTER TABLE `objeto_perdido` DISABLE KEYS */;
/*!40000 ALTER TABLE `objeto_perdido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `ID_PEDIDO` int NOT NULL AUTO_INCREMENT,
  `cantidadPedido` int NOT NULL,
  `mensajePedido` text COLLATE utf8mb4_general_ci,
  `fechaPedido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ID_USUARIO` int DEFAULT NULL,
  `ID_PRODUCTO` int DEFAULT NULL,
  PRIMARY KEY (`ID_PEDIDO`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  KEY `ID_PRODUCTO` (`ID_PRODUCTO`),
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`),
  CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`ID_PRODUCTO`) REFERENCES `producto` (`ID_PRODUCTO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `ID_PRODUCTO` int NOT NULL AUTO_INCREMENT,
  `nombreProducto` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcionProducto` text COLLATE utf8mb4_general_ci NOT NULL,
  `existencia` tinyint(1) DEFAULT NULL,
  `ID_USUARIO` int DEFAULT NULL,
  `ID_UBICACION` int DEFAULT NULL,
  PRIMARY KEY (`ID_PRODUCTO`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  KEY `ID_UBICACION` (`ID_UBICACION`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`),
  CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`ID_UBICACION`) REFERENCES `ubicacion` (`ID_UBICACION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicacion`
--

DROP TABLE IF EXISTS `publicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicacion` (
  `ID_PUBLICACION` int NOT NULL AUTO_INCREMENT,
  `contenidoPublicacion` text COLLATE utf8mb4_general_ci NOT NULL,
  `fechaPublicacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ID_USUARIO` int DEFAULT NULL,
  `ID_RESPUESTA` int DEFAULT NULL,
  `ID_FORO` int DEFAULT NULL,
  PRIMARY KEY (`ID_PUBLICACION`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  KEY `ID_RESPUESTA` (`ID_RESPUESTA`),
  KEY `ID_FORO` (`ID_FORO`),
  CONSTRAINT `publicacion_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`),
  CONSTRAINT `publicacion_ibfk_2` FOREIGN KEY (`ID_RESPUESTA`) REFERENCES `respuesta` (`ID_RESPUESTA`),
  CONSTRAINT `publicacion_ibfk_3` FOREIGN KEY (`ID_FORO`) REFERENCES `foro` (`ID_FORO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicacion`
--

LOCK TABLES `publicacion` WRITE;
/*!40000 ALTER TABLE `publicacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `publicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportes_foro`
--

DROP TABLE IF EXISTS `reportes_foro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportes_foro` (
  `ID_REPORTE` int NOT NULL AUTO_INCREMENT,
  `ID_FORO` int DEFAULT NULL,
  `ID_USUARIO` int DEFAULT NULL,
  `COMENTARIO` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `FECHA_REPORTE` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_REPORTE`),
  KEY `ID_FORO` (`ID_FORO`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  CONSTRAINT `reportes_foro_ibfk_1` FOREIGN KEY (`ID_FORO`) REFERENCES `foro` (`ID_FORO`),
  CONSTRAINT `reportes_foro_ibfk_2` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportes_foro`
--

LOCK TABLES `reportes_foro` WRITE;
/*!40000 ALTER TABLE `reportes_foro` DISABLE KEYS */;
/*!40000 ALTER TABLE `reportes_foro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuesta`
--

DROP TABLE IF EXISTS `respuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuesta` (
  `ID_RESPUESTA` int NOT NULL AUTO_INCREMENT,
  `contenidoRespuesta` text COLLATE utf8mb4_general_ci NOT NULL,
  `fechaPublicacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ID_USUARIO` int DEFAULT NULL,
  `ID_PUBLICACION` int DEFAULT NULL,
  PRIMARY KEY (`ID_RESPUESTA`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  KEY `ID_PUBLICACION` (`ID_PUBLICACION`),
  CONSTRAINT `respuesta_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`),
  CONSTRAINT `respuesta_ibfk_2` FOREIGN KEY (`ID_PUBLICACION`) REFERENCES `publicacion` (`ID_PUBLICACION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuesta`
--

LOCK TABLES `respuesta` WRITE;
/*!40000 ALTER TABLE `respuesta` DISABLE KEYS */;
/*!40000 ALTER TABLE `respuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turno`
--

DROP TABLE IF EXISTS `turno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turno` (
  `ID_TURNO` int NOT NULL AUTO_INCREMENT,
  `turno` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID_TURNO`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turno`
--

LOCK TABLES `turno` WRITE;
/*!40000 ALTER TABLE `turno` DISABLE KEYS */;
INSERT INTO `turno` VALUES (1,'matutino'),(2,'vespertino');
/*!40000 ALTER TABLE `turno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicacion`
--

DROP TABLE IF EXISTS `ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ubicacion` (
  `ID_UBICACION` int NOT NULL AUTO_INCREMENT,
  `nombreUbicacion` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `descrpicionUbicacion` text COLLATE utf8mb4_general_ci NOT NULL,
  `ubicacionFoto` mediumblob,
  PRIMARY KEY (`ID_UBICACION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicacion`
--

LOCK TABLES `ubicacion` WRITE;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `ID_USUARIO` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nombreUsuario` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `numeroCuenta` varchar(9) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contrasena` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `grupo` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `rol` enum('estudiante','moderador','administrador') COLLATE utf8mb4_general_ci NOT NULL,
  `fotoPerfil` mediumblob,
  `etiquetas` text COLLATE utf8mb4_general_ci,
  `ID_HORARIO` int DEFAULT NULL,
  PRIMARY KEY (`ID_USUARIO`),
  UNIQUE KEY `nombreUsuario` (`nombreUsuario`),
  UNIQUE KEY `numeroCuenta` (`numeroCuenta`),
  UNIQUE KEY `numeroCuenta_2` (`numeroCuenta`),
  UNIQUE KEY `nombre` (`nombre`),
  UNIQUE KEY `email` (`email`),
  KEY `ID_HORARIO` (`ID_HORARIO`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`ID_HORARIO`) REFERENCES `horario` (`ID_HORARIO`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (20,'a','a','aaaaaaaaa','aaaaaaaa@a','aaaaaaaaaaaa','','administrador',NULL,NULL,NULL),(21,'','','','','','','administrador',NULL,NULL,NULL),(22,'11111111111111111','1111111111','111111111','111@111','11111111111111','','administrador',NULL,NULL,NULL),(23,'Daniel','danielrdz','321056900','hola@gmail.com','dzb7Wz538C','603','administrador',NULL,NULL,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_foro`
--

DROP TABLE IF EXISTS `usuario_foro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_foro` (
  `ID_USUARIOFORO` int NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int DEFAULT NULL,
  `ID_FORO` int DEFAULT NULL,
  PRIMARY KEY (`ID_USUARIOFORO`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  KEY `ID_FORO` (`ID_FORO`),
  CONSTRAINT `usuario_foro_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`),
  CONSTRAINT `usuario_foro_ibfk_2` FOREIGN KEY (`ID_FORO`) REFERENCES `foro` (`ID_FORO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_foro`
--

LOCK TABLES `usuario_foro` WRITE;
/*!40000 ALTER TABLE `usuario_foro` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_foro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `ID_VENTA` int NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int DEFAULT NULL,
  `ID_PRODUCTO` int DEFAULT NULL,
  `ID_FORO` int DEFAULT NULL,
  PRIMARY KEY (`ID_VENTA`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  KEY `ID_PRODUCTO` (`ID_PRODUCTO`),
  KEY `ID_FORO` (`ID_FORO`),
  CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`),
  CONSTRAINT `venta_ibfk_2` FOREIGN KEY (`ID_PRODUCTO`) REFERENCES `producto` (`ID_PRODUCTO`),
  CONSTRAINT `venta_ibfk_3` FOREIGN KEY (`ID_FORO`) REFERENCES `foro` (`ID_FORO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-23  9:53:43
