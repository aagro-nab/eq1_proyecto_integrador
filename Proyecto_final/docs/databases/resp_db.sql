-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: proyecto_db
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detalles_foro`
--

DROP TABLE IF EXISTS `detalles_foro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalles_foro` (
  `ID_DETALLESFORO` int(11) NOT NULL AUTO_INCREMENT,
  `privacidad` tinyint(1) NOT NULL,
  `ID_FORO` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_DETALLESFORO`),
  KEY `ID_FORO` (`ID_FORO`),
  CONSTRAINT `detalles_foro_ibfk_1` FOREIGN KEY (`ID_FORO`) REFERENCES `foro` (`ID_FORO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_foro`
--

LOCK TABLES `detalles_foro` WRITE;
/*!40000 ALTER TABLE `detalles_foro` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalles_foro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foro`
--

DROP TABLE IF EXISTS `foro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `foro` (
  `ID_FORO` int(11) NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_FORO`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  CONSTRAINT `foro_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foro`
--

LOCK TABLES `foro` WRITE;
/*!40000 ALTER TABLE `foro` DISABLE KEYS */;
/*!40000 ALTER TABLE `foro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horario`
--

DROP TABLE IF EXISTS `horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `horario` (
  `ID_HORARIO` int(11) NOT NULL AUTO_INCREMENT,
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `objeto_perdido` (
  `ID_OBJETOPERDIDO` int(11) NOT NULL AUTO_INCREMENT,
  `descripcionObjeto` text NOT NULL,
  `fechaObjetoPerdido` timestamp NOT NULL DEFAULT current_timestamp(),
  `fotoObjeto` mediumblob DEFAULT NULL,
  `ID_USUARIO` int(11) DEFAULT NULL,
  `ID_FORO` int(11) DEFAULT NULL,
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido` (
  `ID_PEDIDO` int(11) NOT NULL AUTO_INCREMENT,
  `cantidadPedido` int(11) NOT NULL,
  `mensajePedido` text DEFAULT NULL,
  `fechaPedido` timestamp NOT NULL DEFAULT current_timestamp(),
  `ID_USUARIO` int(11) DEFAULT NULL,
  `ID_PRODUCTO` int(11) DEFAULT NULL,
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto` (
  `ID_PRODUCTO` int(11) NOT NULL AUTO_INCREMENT,
  `nombreProducto` varchar(25) NOT NULL,
  `descripcionProducto` text NOT NULL,
  `existencia` tinyint(1) DEFAULT NULL,
  `ID_USUARIO` int(11) DEFAULT NULL,
  `ID_UBICACION` int(11) DEFAULT NULL,
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publicacion` (
  `ID_PUBLICACION` int(11) NOT NULL AUTO_INCREMENT,
  `contenidoPublicacion` text NOT NULL,
  `fechaPublicacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `ID_USUARIO` int(11) DEFAULT NULL,
  `ID_RESPUESTA` int(11) DEFAULT NULL,
  `ID_FORO` int(11) DEFAULT NULL,
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
-- Table structure for table `respuesta`
--

DROP TABLE IF EXISTS `respuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `respuesta` (
  `ID_RESPUESTA` int(11) NOT NULL AUTO_INCREMENT,
  `contenidoRespuesta` text NOT NULL,
  `fechaPublicacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `ID_USUARIO` int(11) DEFAULT NULL,
  `ID_PUBLICACION` int(11) DEFAULT NULL,
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
-- Table structure for table `ubicacion`
--

DROP TABLE IF EXISTS `ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ubicacion` (
  `ID_UBICACION` int(11) NOT NULL AUTO_INCREMENT,
  `nombreUbicacion` varchar(25) NOT NULL,
  `descrpicionUbicacion` text NOT NULL,
  `ubicacionFoto` mediumblob DEFAULT NULL,
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `ID_USUARIO` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) NOT NULL,
  `nombreUsuario` varchar(10) NOT NULL,
  `numeroCuenta` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `contrasena` varchar(50) NOT NULL,
  `grupo` varchar(20) NOT NULL,
  `rol` enum('estudiante','moderador','administrador') NOT NULL,
  `fotoPerfil` mediumblob DEFAULT NULL,
  `etiquetas` text DEFAULT NULL,
  `ID_HORARIO` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_USUARIO`),
  UNIQUE KEY `nombre` (`nombre`),
  UNIQUE KEY `nombreUsuario` (`nombreUsuario`),
  UNIQUE KEY `numeroCuenta` (`numeroCuenta`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `contrasena` (`contrasena`),
  UNIQUE KEY `grupo` (`grupo`),
  UNIQUE KEY `numeroCuenta_2` (`numeroCuenta`),
  KEY `ID_HORARIO` (`ID_HORARIO`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`ID_HORARIO`) REFERENCES `horario` (`ID_HORARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `venta` (
  `ID_VENTA` int(11) NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int(11) DEFAULT NULL,
  `ID_PRODUCTO` int(11) DEFAULT NULL,
  `ID_FORO` int(11) DEFAULT NULL,
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

-- Dump completed on 2023-06-15 18:15:30
