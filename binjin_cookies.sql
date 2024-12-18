-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2024 at 05:35 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `binjin_cookies`
--

-- --------------------------------------------------------

--
-- Table structure for table `cookies`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_date_of_purchase` datetime NOT NULL DEFAULT curtime(),
  `order_customer_name` varchar(100) NOT NULL,
  `order_contact_number` varchar(15) NOT NULL,
  `order_total_payment` decimal(10,2) DEFAULT NULL,
  `order_reference_number` varchar(50) DEFAULT NULL,
  `order_branch_location` varchar(100) DEFAULT NULL,
  `order_pickup_time` varchar(255) DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

CREATE TABLE `cookies` (
  `cookie_id` int(11) NOT NULL,
  `flavor_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `orders` (`order_id`, `order_date_of_purchase`, `order_customer_name`, `order_contact_number`, `order_total_payment`, `order_reference_number`, `order_branch_location`, `order_pickup_time`) VALUES
(1, '2024-11-26 01:11:50', 'Gabriel Garcia', '09294674510', 200.00, 'GC123456789', 'Tarlac', 'Tom 4-5pm');

INSERT INTO `cookies` (`cookie_id`, `flavor_id`, `order_id`) VALUES
(1, 1, 1),
(2, 2, NULL),
(3, 3, 1),
(4, 4, NULL),
(5, 5, 1),
(6, 6, NULL),
(7, 7, NULL),
(8, 8, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `flavors`
--

CREATE TABLE `flavors` (
  `flavor_id` int(11) NOT NULL,
  `flavor_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flavors`
--

INSERT INTO `flavors` (`flavor_id`, `flavor_name`) VALUES
(1, 'Classic'),
(2, 'Peanut'),
(3, 'Oatmeal'),
(4, 'Smores'),
(5, 'Pink Sugar'),
(6, 'Choco Straw'),
(7, 'Lemon'),
(8, 'Berries');

-- --------------------------------------------------------

--
-- Indexes for table `orders`
--
ALTER TABLE `cookies`
  ADD PRIMARY KEY (`cookie_id`),
  ADD KEY `flavor_id` (`flavor_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `flavors`
--
ALTER TABLE `flavors`
  ADD PRIMARY KEY (`flavor_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cookies`
--
ALTER TABLE `cookies`
  MODIFY `cookie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `flavors`
--
ALTER TABLE `flavors`
  MODIFY `flavor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cookies`
--
ALTER TABLE `cookies`
  ADD CONSTRAINT `cookies_ibfk_1` FOREIGN KEY (`flavor_id`) REFERENCES `flavors` (`flavor_id`),
  ADD CONSTRAINT `cookies_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);
COMMIT;

ALTER TABLE `orders` 
CHANGE `order_status` `order_status` BOOLEAN NULL DEFAULT 0;

UPDATE orders
SET order_status = CASE
  WHEN order_status = 'Pending' THEN 0
  WHEN order_status = 'Done' THEN 1
  ELSE NULL
END;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
