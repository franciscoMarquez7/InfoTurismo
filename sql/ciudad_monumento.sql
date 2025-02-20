-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 05-02-2025 a las 19:32:26
-- Versión del servidor: 8.0.39
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ciudad_monumento`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `pais` varchar(100) NOT NULL,
  `poblacion` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`id`, `nombre`, `pais`, `poblacion`) VALUES
(1, 'Madrid', 'España', 3200000),
(2, 'Barcelona', 'España', 1600000),
(3, 'Paris', 'Francia', 2100000),
(4, 'Londres', 'Reino Unido', 8900000),
(5, 'Roma', 'Italia', 2800000),
(6, 'Berlín', 'Alemania', 3600000),
(7, 'Lisboa', 'Portugal', 510000),
(8, 'Ámsterdam', 'Países Bajos', 850000),
(9, 'Bruselas', 'Bélgica', 1200000),
(10, 'Praga', 'República Checa', 1300000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monumentos`
--

CREATE TABLE `monumentos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `ciudad_id` INT NOT NULL,
  `añoConstruccion` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`ciudad_id`) REFERENCES `ciudades`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `monumentos`
--

INSERT INTO `monumentos` (`id`, `nombre`, `ciudad_id`, `añoConstruccion`) VALUES
(1, 'La Sagrada Familia', 2, 1882),
(2, 'Torre Eiffel', 3, 1889),
(3, 'Big Ben', 4, 1859),
(4, 'Coliseo Romano', 5, 70),
(5, 'Puerta de Brandenburgo', 6, 1791),
(6, 'Torre de Belém', 7, 1515),
(7, 'Museo Van Gogh', 8, 1973),
(8, 'Atomium', 9, 1958),
(9, 'Castillo de Praga', 10, 870),
(10, 'Torre de Pisa', 5, 1173);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `monumentos`
--
ALTER TABLE `monumentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ciudad_id` (`ciudad_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `monumentos`
--
ALTER TABLE `monumentos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `monumentos`
--
ALTER TABLE `monumentos`
  ADD CONSTRAINT `monumentos_ibfk_1` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudades` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
