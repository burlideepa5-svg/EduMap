-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 10, 2026 at 04:00 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edumap`
--

-- --------------------------------------------------------

--
-- Table structure for table `careers`
--

DROP TABLE IF EXISTS `careers`;
CREATE TABLE IF NOT EXISTS `careers` (
  `career_id` int NOT NULL AUTO_INCREMENT,
  `cluster_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `stream` varchar(50) DEFAULT NULL,
  `focus_type` varchar(50) DEFAULT NULL,
  `description` text,
  `degree` varchar(100) DEFAULT NULL,
  `exams` text,
  `salary` varchar(50) DEFAULT NULL,
  `growth` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`career_id`),
  KEY `cluster_id` (`cluster_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `careers`
--

INSERT INTO `careers` (`career_id`, `cluster_id`, `name`, `stream`, `focus_type`, `description`, `degree`, `exams`, `salary`, `growth`, `created_at`, `updated_at`) VALUES
(1, 1, 'Software Developer', 'Science', 'Technical', 'Develops software applications for web, mobile, or desktop platforms. Works in IT companies or startups.', 'B.Tech / BCA / MCA', 'None', '4–10 LPA', 'High demand with strong career growth', '2026-04-23 11:20:48', NULL),
(2, 1, 'Data Scientist', 'Science', 'Analytical', 'Analyzes data to extract insights and support business decisions using statistical models.', 'B.Tech / B.Sc Data Science', 'None', '6–15 LPA', 'Very high demand in data-driven industries', '2026-04-23 11:20:48', NULL),
(3, 1, 'AI/ML Engineer', 'Science', 'Technical', 'Builds AI systems and machine learning models for automation and prediction tasks.', 'B.Tech / MCA', 'None', '8–20 LPA', 'Rapidly growing field with high demand', '2026-04-23 11:20:48', NULL),
(4, 1, 'Cybersecurity Analyst', 'Science', 'Technical', 'Protects systems and networks from cyber threats and ensures data security.', 'B.Tech / BCA', 'CEH (optional)', '5–12 LPA', 'High demand due to rising cyber threats', '2026-04-23 11:20:48', NULL),
(5, 1, 'Cloud Engineer', 'Science', 'Technical', 'Manages cloud infrastructure and deploys applications using platforms like AWS or Azure.', 'B.Tech / BCA', 'AWS Certification (optional)', '6–15 LPA', 'Strong demand with increasing cloud adoption', '2026-04-23 11:20:48', NULL),
(6, 1, 'DevOps Engineer', 'Science', 'Technical', 'Automates software development and deployment processes to improve efficiency.', 'B.Tech / BCA', 'None', '6–18 LPA', 'High demand in modern software companies', '2026-04-23 11:20:48', NULL),
(7, 2, 'UI/UX Designer', 'Any', 'Creative', 'Designs user-friendly interfaces and improves user experience for websites and mobile apps.', 'B.Des / Any + Portfolio', 'None', '4–12 LPA', 'High demand in product-based companies', '2026-04-23 11:25:22', NULL),
(8, 2, 'Product Designer', 'Any', 'Creative', 'Designs complete product experiences including usability, functionality, and aesthetics.', 'B.Des / M.Des', 'UCEED / CEED', '6–18 LPA', 'Strong growth in startups and tech companies', '2026-04-23 11:25:22', NULL),
(9, 2, 'Graphic Designer', 'Any', 'Creative', 'Creates visual content for branding, advertisements, and digital media.', 'Any + Design Skills', 'None', '3–8 LPA', 'Steady demand in media and marketing', '2026-04-23 11:25:22', NULL),
(10, 2, 'Animator', 'Any', 'Creative', 'Creates animated content for films, games, and digital platforms.', 'Animation / Multimedia', 'None', '4–10 LPA', 'Growing demand in entertainment industry', '2026-04-23 11:25:22', NULL),
(11, 2, 'Motion Designer', 'Any', 'Creative', 'Produces animated graphics and visual effects for videos and advertisements.', 'Design / Multimedia', 'None', '5–12 LPA', 'Increasing demand in digital marketing', '2026-04-23 11:25:22', NULL),
(12, 2, 'Game Designer', 'Any', 'Creative', 'Designs gameplay mechanics, storylines, and user experience for video games.', 'Game Design / Animation / Any + Skills', 'None', '4–12 LPA', 'Growing demand in gaming industry', '2026-04-23 11:27:10', NULL),
(13, 3, 'Doctor', 'Science', 'Technical', 'Diagnoses and treats patients in hospitals and clinics across various medical conditions.', 'MBBS', 'NEET', '6–20 LPA', 'Stable and highly respected career', '2026-04-23 11:28:44', NULL),
(14, 3, 'Dentist', 'Science', 'Technical', 'Treats dental issues and maintains oral health of patients in clinics or hospitals.', 'BDS', 'NEET', '5–15 LPA', 'Good demand in healthcare sector', '2026-04-23 11:28:44', NULL),
(15, 3, 'Pharmacist', 'Science', 'Analytical', 'Prepares and dispenses medicines and provides guidance on drug usage.', 'B.Pharm', 'None', '3–8 LPA', 'Stable demand in pharmaceutical industry', '2026-04-23 11:28:44', NULL),
(16, 3, 'Physiotherapist', 'Science', 'Social', 'Helps patients recover from injuries and improve mobility through physical therapy.', 'BPT', 'None', '3–10 LPA', 'Growing demand due to lifestyle-related issues', '2026-04-23 11:28:44', NULL),
(17, 3, 'Nurse', 'Science', 'Social', 'Provides patient care and assists doctors in medical procedures in hospitals.', 'B.Sc Nursing', 'None', '3–8 LPA', 'High demand in hospitals and healthcare services', '2026-04-23 11:28:44', NULL),
(18, 3, 'Nutritionist', 'Science', 'Social', 'Advises individuals on diet and nutrition for better health and lifestyle.', 'B.Sc Nutrition', 'None', '3–10 LPA', 'Growing awareness increases demand', '2026-04-23 11:29:13', NULL),
(19, 4, 'Chartered Accountant', 'Commerce', 'Analytical', 'Handles auditing, taxation, and financial reporting for individuals and companies.', 'B.Com + CA', 'CA Foundation / Inter / Final', '7–20 LPA', 'Strong career with stable demand', '2026-04-23 11:30:44', NULL),
(20, 4, 'Financial Analyst', 'Commerce', 'Analytical', 'Analyzes financial data to help companies make investment and business decisions.', 'B.Com / MBA Finance', 'CFA (optional)', '5–15 LPA', 'High demand in finance sector', '2026-04-23 11:30:44', NULL),
(21, 4, 'Business Analyst', 'Any', 'Analytical', 'Identifies business problems and provides data-driven solutions for organizations.', 'BBA / MBA', 'None', '6–16 LPA', 'Strong demand in corporate sector', '2026-04-23 11:30:44', NULL),
(22, 4, 'Digital Marketing Specialist', 'Any', 'Creative', 'Promotes brands using SEO, social media, and online advertising strategies.', 'Any + Certification', 'None', '4–12 LPA', 'Rapidly growing digital field', '2026-04-23 11:30:44', NULL),
(23, 4, 'Entrepreneur', 'Any', 'Creative', 'Starts and manages a business or startup venture.', 'Any', 'None', 'Variable', 'High risk but high potential', '2026-04-23 11:30:44', NULL),
(24, 4, 'Investment Banker', 'Commerce', 'Analytical', 'Helps companies raise capital and advises on mergers and acquisitions.', 'B.Com / MBA Finance', 'CAT / CFA (optional)', '10–30 LPA', 'High growth with competitive entry', '2026-04-23 11:30:44', NULL),
(25, 5, 'Psychologist', 'Arts', 'Social', 'Studies human behavior and helps individuals manage mental health issues through counseling and therapy.', 'BA/MA Psychology', 'None', '4–12 LPA', 'Increasing demand due to mental health awareness', '2026-04-23 11:31:39', NULL),
(26, 5, 'Counselor', 'Arts', 'Social', 'Provides guidance and emotional support to individuals dealing with personal or academic challenges.', 'BA/MA Psychology', 'None', '3–10 LPA', 'Growing demand in schools and organizations', '2026-04-23 11:31:39', NULL),
(27, 5, 'Economist', 'Arts', 'Analytical', 'Studies economic trends and advises on financial and policy decisions.', 'BA/MA Economics', 'None', '6–18 LPA', 'Strong demand in finance and policy sectors', '2026-04-23 11:31:39', NULL),
(28, 5, 'Social Worker', 'Arts', 'Social', 'Works with communities to improve social conditions and provide support services.', 'BSW / MSW', 'None', '3–8 LPA', 'Moderate growth with meaningful impact', '2026-04-23 11:31:39', NULL),
(29, 5, 'Journalist', 'Arts', 'Creative', 'Researches and reports news for newspapers, television, and digital media platforms.', 'BJMC / Mass Communication', 'None', '3–10 LPA', 'Competitive but evolving with digital media', '2026-04-23 11:31:39', NULL),
(30, 5, 'UX Researcher', 'Any', 'Research', 'Studies user behavior and needs to improve product design and user experience.', 'BA/MA Psychology / Any + Portfolio', 'None', '6–15 LPA', 'High demand in product companies', '2026-04-23 11:31:39', NULL),
(31, 6, 'IAS Officer', 'Any', 'Social', 'Handles administration and policy implementation at district and national levels.', 'Any Degree', 'UPSC CSE', '8–15 LPA + perks', 'Stable and prestigious career', '2026-04-23 11:36:22', NULL),
(32, 6, 'IPS Officer', 'Any', 'Social', 'Maintains law and order and manages police administration.', 'Any Degree', 'UPSC CSE', '8–15 LPA + perks', 'Stable and respected career', '2026-04-23 11:36:22', NULL),
(33, 6, 'Lawyer', 'Arts / Commerce', 'Analytical', 'Provides legal advice and represents clients in courts or legal matters.', 'LLB', 'CLAT', '5–20 LPA', 'Competitive but rewarding career', '2026-04-23 11:36:22', NULL),
(34, 6, 'Defence Officer', 'Any', 'Social', 'Serves in armed forces ensuring national security and defense operations.', 'Any Degree', 'NDA / CDS', '10–18 LPA + perks', 'Stable career with high respect', '2026-04-23 11:36:22', NULL),
(35, 6, 'RBI Grade B Officer', 'Commerce', 'Analytical', 'Works in central banking, managing monetary policies and financial regulations.', 'B.Com / BBA', 'RBI Grade B Exam', '12–20 LPA', 'High growth and prestigious role', '2026-04-23 11:36:22', NULL),
(36, 6, 'Income Tax Officer', 'Any', 'Analytical', 'Handles tax collection, audits, and enforcement of income tax laws.', 'Any Degree', 'UPSC / SSC CGL', '7–12 LPA', 'Stable government career with growth', '2026-04-23 11:36:22', NULL),
(37, 7, 'Research Scientist', 'Science', 'Research', 'Conducts experiments and research in fields like physics, chemistry, or biology.', 'M.Sc / PhD', 'CSIR-NET', '6–18 LPA', 'Steady growth in research sector', '2026-04-23 11:39:34', NULL),
(38, 7, 'Biotechnologist', 'Science', 'Research', 'Applies biological processes to develop medicines, vaccines, and technologies.', 'B.Tech / M.Sc Biotechnology', 'GATE', '5–12 LPA', 'Growing demand in pharma and biotech', '2026-04-23 11:39:34', NULL),
(39, 7, 'Environmental Scientist', 'Science', 'Research', 'Studies environmental issues and develops solutions for sustainability and conservation.', 'B.Sc / M.Sc Environmental Science', 'None', '4–10 LPA', 'Increasing demand due to climate concerns', '2026-04-23 11:39:34', NULL),
(40, 7, 'Material Scientist', 'Science', 'Research', 'Develops new materials for applications in industries like electronics, energy, and aerospace.', 'M.Sc / PhD', 'GATE', '6–15 LPA', 'Growing demand in advanced industries', '2026-04-23 11:39:34', NULL),
(41, 7, 'Scientist (ISRO/DRDO)', 'Science', 'Technical', 'Develops space and defense technologies for national and scientific advancement.', 'B.Tech / M.Sc', 'GATE', '9–16 LPA', 'Stable and impactful career', '2026-04-23 11:39:34', NULL),
(42, 7, 'Astrophysicist', 'Science', 'Research', 'Studies celestial objects and the universe using physics and advanced mathematics.', 'M.Sc / PhD Physics', 'JEST / GATE', '8–18 LPA', 'Niche but highly specialized field', '2026-04-23 11:39:34', NULL),
(43, 8, 'AI Prompt Engineer', 'Any', 'Technical', 'Designs effective prompts to optimize responses from AI models and tools.', 'Any + AI Skills', 'None', '8–20 LPA', 'Very high demand in AI-driven industries', '2026-04-23 11:40:55', NULL),
(44, 8, 'AR/VR Developer', 'Science', 'Technical', 'Builds immersive augmented and virtual reality applications for gaming, training, and simulations.', 'B.Tech / BCA', 'None', '6–15 LPA', 'Growing demand in gaming and training sectors', '2026-04-23 11:40:55', NULL),
(45, 8, 'FinTech Specialist', 'Commerce', 'Technical', 'Combines finance and technology to develop digital payment and banking solutions.', 'B.Com / B.Tech', 'None', '7–18 LPA', 'High demand in digital finance sector', '2026-04-23 11:40:55', NULL),
(46, 8, 'Sustainability Specialist', 'Science', 'Research', 'Works on reducing environmental impact and promoting sustainable business practices.', 'B.Tech / Environmental Science', 'None', '6–15 LPA', 'Rapid growth due to climate awareness', '2026-04-23 11:40:55', NULL),
(47, 8, 'Digital Forensics Expert', 'Science', 'Technical', 'Investigates cyber crimes and analyzes digital evidence for legal purposes.', 'B.Sc / B.Tech Cyber Security', 'None', '6–15 LPA', 'High demand with rising cybercrime', '2026-04-23 11:40:55', NULL),
(48, 8, 'Bioinformatician', 'Science', 'Research', 'Uses computational tools to analyze biological and genetic data.', 'B.Sc Bioinformatics / M.Sc', 'None', '6–16 LPA', 'Growing demand in biotech and healthcare', '2026-04-23 11:40:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `career_clusters`
--

DROP TABLE IF EXISTS `career_clusters`;
CREATE TABLE IF NOT EXISTS `career_clusters` (
  `cluster_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cluster_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `career_clusters`
--

INSERT INTO `career_clusters` (`cluster_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Technology & IT', 'Careers related to software, data, and digital technologies', '2026-04-23 11:19:23', NULL),
(2, 'Design & Creative', 'Careers focused on design, creativity, and user experience', '2026-04-23 11:19:23', NULL),
(3, 'Medical & Healthcare', 'Careers related to health, medicine, and patient care', '2026-04-23 11:19:23', NULL),
(4, 'Commerce & Business', 'Careers in finance, business, and management', '2026-04-23 11:19:23', NULL),
(5, 'Arts & Humanities', 'Careers focused on human behavior, society, and psychology', '2026-04-23 11:19:23', NULL),
(6, 'Government & Public Services', 'Careers in administration, law, and public service', '2026-04-23 11:19:23', NULL),
(7, 'Science & Research', 'Careers focused on scientific research and innovation', '2026-04-23 11:19:23', NULL),
(8, 'Emerging Careers', 'New and rapidly growing interdisciplinary careers', '2026-04-23 11:19:23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_responses`
--

DROP TABLE IF EXISTS `quiz_responses`;
CREATE TABLE IF NOT EXISTS `quiz_responses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quiz_type` varchar(20) NOT NULL,
  `user_level` varchar(20) NOT NULL,
  `responses` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `quiz_responses`
--

INSERT INTO `quiz_responses` (`id`, `quiz_type`, `user_level`, `responses`, `created_at`, `updated_at`) VALUES
(1, 'quizA', 'class11-12', '{\"answers\":[3,1,0,1,3,2,1,0,3,3,3,1,2,3,0,1,2,3,0,3],\"user_level\":\"class11-12\",\"timestamp\":1773675076402}', '2026-03-16 15:31:16', NULL),
(2, 'quizA', 'class9-10', '{\"answers\":[1,0,3,2,1,0,3,2,1,0,3,2,1,0,0,2,0,3,2,1],\"user_level\":\"class9-10\",\"timestamp\":1773769190161}', '2026-03-17 17:39:50', NULL),
(3, 'quizA', 'class9-10', '{\"answers\":[1,0,3,2,1,0,3,2,1,0,3,2,1,0,0,2,0,3,2,2],\"user_level\":\"class9-10\",\"timestamp\":1773769234033}', '2026-03-17 17:40:34', NULL),
(4, 'quizA', 'class9-10', '{\"answers\":[1,0,3,2,1,0,3,2,1,0,3,2,1,0,0,2,0,3,2,3],\"user_level\":\"class9-10\",\"timestamp\":1773769246702}', '2026-03-17 17:40:46', NULL),
(5, 'quizA', 'class11-12', '{\"answers\":[0,3,1,0,2,1,0,3,1,0,3,1,0,2,0,3,1,0,3,2],\"user_level\":\"class11-12\",\"timestamp\":1773769344710}', '2026-03-17 17:42:24', NULL),
(6, 'quizA', 'class11-12', '{\"answers\":[0,1,2,3,0,0,2,3,3,1,3,2,0,0,2,3,2,3,2,1],\"user_level\":\"class11-12\",\"timestamp\":1773772137753}', '2026-03-17 18:28:57', NULL),
(7, 'quizA', 'class11-12', '{\"answers\":[2,0,1,3,1,3,0,2,3,1,0,3,0,2,2,0,2,0,1,3],\"user_level\":\"class11-12\",\"timestamp\":1774199924854}', '2026-03-22 17:18:44', NULL),
(8, 'quizA', 'class11-12', '{\"answers\":[0,1,2,0,2,0,3,0,1,0,2,3,0,2,3,1,0,2,3,1],\"user_level\":\"class11-12\",\"timestamp\":1774237814615}', '2026-03-23 03:50:14', NULL),
(9, 'quizA', 'class9-10', '{\"answers\":[1,3,2,0,1,2,3,0,3,2,0,1,3,1,2,3,2,1,0,3],\"user_level\":\"class9-10\",\"timestamp\":1775491892978}', '2026-04-06 16:11:33', NULL),
(10, 'quizA', 'class9-10', '{\"answers\":[1,3,2,0,1,2,3,0,3,2,0,1,0,1,0,1,0,1,2,1],\"user_level\":\"class9-10\",\"timestamp\":1775491962845}', '2026-04-06 16:12:42', NULL),
(11, 'quizB', 'ug', '{\"phase1\":{\"q1_program\":\"Commerce \\/ Business \\/ Management\",\"q2_year\":\"2nd year\",\"q3_interest\":3,\"q4_switch\":5},\"phase2\":{\"q5_clarity\":2,\"q6_improvement\":2,\"q7_logic\":4,\"q8_creativity\":2,\"q9_people\":2,\"q10_research\":1,\"q11_adaptability\":2,\"q12_initiative\":2,\"q13_analysis\":2,\"q14_impact\":1,\"q15_exploration\":2},\"phase3\":{\"q16_higher_studies\":3,\"q17_job\":3,\"q18_certifications\":2,\"q19_govt\":2,\"q20_switch_domain\":4},\"timestamp\":1776364970400}', '2026-04-16 18:42:50', NULL),
(12, 'quizB', 'ug', '{\"phase1\":{\"q1_program\":\"Design \\/ Architecture \\/ Fine Arts \\/ Media\",\"q2_year\":\"3rd year\",\"q3_interest\":2,\"q4_switch\":2},\"phase2\":{\"q5_clarity\":3,\"q6_improvement\":2,\"q7_logic\":2,\"q8_creativity\":2,\"q9_people\":2,\"q10_research\":2,\"q11_adaptability\":3,\"q12_initiative\":4,\"q13_analysis\":3,\"q14_impact\":2,\"q15_exploration\":3},\"phase3\":{\"q16_higher_studies\":2,\"q17_job\":3,\"q18_certifications\":3,\"q19_govt\":4,\"q20_switch_domain\":3},\"timestamp\":1776370468760}', '2026-04-16 20:14:28', NULL),
(13, 'quizB', 'ug', '{\"phase1\":{\"q1_program\":\"Engineering \\/ Technology \\/ Computer Applications\",\"q2_year\":\"3rd year\",\"q3_interest\":3,\"q4_switch\":3},\"phase2\":{\"q5_clarity\":3,\"q6_improvement\":2,\"q7_logic\":3,\"q8_creativity\":1,\"q9_people\":2,\"q10_research\":3,\"q11_adaptability\":2,\"q12_initiative\":4,\"q13_analysis\":4,\"q14_impact\":2,\"q15_exploration\":2},\"phase3\":{\"q16_higher_studies\":2,\"q17_job\":2,\"q18_certifications\":3,\"q19_govt\":4,\"q20_switch_domain\":2},\"timestamp\":1776409950028}', '2026-04-17 07:12:30', NULL),
(14, 'quizB', 'ug', '{\"phase1\":{\"q1_program\":\"Engineering \\/ Technology \\/ Computer Applications\",\"q2_year\":\"3rd year\",\"q3_interest\":3,\"q4_switch\":3},\"phase2\":{\"q5_clarity\":3,\"q6_improvement\":2,\"q7_logic\":3,\"q8_creativity\":1,\"q9_people\":2,\"q10_research\":3,\"q11_adaptability\":2,\"q12_initiative\":4,\"q13_analysis\":4,\"q14_impact\":2,\"q15_exploration\":2},\"phase3\":{\"q16_higher_studies\":4,\"q17_job\":2,\"q18_certifications\":3,\"q19_govt\":4,\"q20_switch_domain\":2},\"timestamp\":1776410055788}', '2026-04-17 07:14:15', NULL),
(15, 'quizA', 'class11-12', '{\"answers\":[2,0,2,1,3,1,0,2,0,2,0,1,0,1,3,1,0,2,0,2],\"user_level\":\"class11-12\",\"timestamp\":1776410816560}', '2026-04-17 07:26:56', NULL),
(16, 'quizB', 'ug', '{\"phase1\":{\"q1_program\":\"Commerce \\/ Business \\/ Management\",\"q2_year\":\"2nd year\",\"q3_interest\":2,\"q4_switch\":3},\"phase2\":{\"q5_clarity\":5,\"q6_improvement\":1,\"q7_logic\":5,\"q8_creativity\":3,\"q9_people\":5,\"q10_research\":5,\"q11_adaptability\":5,\"q12_initiative\":5,\"q13_analysis\":3,\"q14_impact\":1,\"q15_exploration\":2},\"phase3\":{\"q16_higher_studies\":4,\"q17_job\":3,\"q18_certifications\":2,\"q19_govt\":3,\"q20_switch_domain\":4},\"timestamp\":1776707237048}', '2026-04-20 17:47:17', NULL),
(17, 'quizA', 'class9-10', '{\"answers\":[2,2,0,2,1,3,1,0,1,3,1,0,0,3,2,1,0,3,1,2],\"user_level\":\"class9-10\",\"timestamp\":1776863132947}', '2026-04-22 13:05:33', NULL),
(18, 'quizB', 'ug', '{\"phase1\":{\"q1_program\":\"Design \\/ Architecture \\/ Fine Arts \\/ Media\",\"q2_year\":\"3rd year\",\"q3_interest\":2,\"q4_switch\":3},\"phase2\":{\"q5_clarity\":3,\"q6_improvement\":1,\"q7_logic\":3,\"q8_creativity\":2,\"q9_people\":2,\"q10_research\":2,\"q11_adaptability\":2,\"q12_initiative\":4,\"q13_analysis\":3,\"q14_impact\":2,\"q15_exploration\":3},\"phase3\":{\"q16_higher_studies\":3,\"q17_job\":3,\"q18_certifications\":2,\"q19_govt\":4,\"q20_switch_domain\":3},\"timestamp\":1776863544190}', '2026-04-22 13:12:24', NULL),
(19, 'quizA', 'class11-12', '{\"answers\":[0,1,1,0,2,3,0,3,1,2,1,3,0,3,2,1,1,0,3,2],\"user_level\":\"class11-12\",\"timestamp\":1776866483638}', '2026-04-22 14:01:23', NULL),
(20, 'quizA', 'class11-12', '{\"answers\":[0,1,1,0,2,3,0,3,1,2,1,3,0,3,2,1,1,0,3,2],\"user_level\":\"class11-12\",\"timestamp\":1776866995629}', '2026-04-22 14:09:55', NULL),
(21, 'quizA', 'class11-12', '{\"answers\":[0,2,0,3,2,3,0,1,3,1,0,2,3,1,0,3,1,0,2,0],\"user_level\":\"class11-12\",\"stream\":\"science\",\"subject\":\"PCB\",\"timestamp\":1776867043126}', '2026-04-22 14:10:43', NULL),
(22, 'quizA', 'class11-12', '{\"answers\":[0,1,0,2,0,3,1,2,1,0,1,1,0,3,1,3,0,1,1,0],\"user_level\":\"class11-12\",\"stream\":\"science\",\"subject\":\"PCB\",\"timestamp\":1776867600440}', '2026-04-22 14:20:00', NULL),
(23, 'quizA', 'class11-12', '{\"answers\":[1,0,1,0,1,0,1,1,0,0,2,0,0,1,1,0,1,1,0,1],\"user_level\":\"class11-12\",\"stream\":\"science\",\"subject\":\"PCMB\",\"timestamp\":1776867692395}', '2026-04-22 14:21:32', NULL),
(24, 'quizA', 'class11-12', '{\"answers\":[0,1,0,0,1,0,0,2,3,0,1,2,1,0,1,0,0,3,2,1],\"user_level\":\"class11-12\",\"stream\":\"science\",\"subject\":\"PCMB\",\"timestamp\":1776868655703}', '2026-04-22 14:37:35', NULL),
(25, 'quizA', 'class11-12', '{\"answers\":[2,0,1,3,1,3,2,1,1,3,1,0,0,2,1,0,3,2,1,0],\"user_level\":\"class11-12\",\"stream\":\"commerce\",\"subject\":\"Maths\",\"timestamp\":1776871717599}', '2026-04-22 15:28:37', NULL),
(26, 'quizA', 'class11-12', '{\"answers\":[1,3,1,0,2,3,1,1,2,2,3,1,2,2,2,1,1,2,0,0],\"user_level\":\"class11-12\",\"stream\":\"arts\",\"subject\":null,\"timestamp\":1776872478189}', '2026-04-22 15:41:18', NULL),
(27, 'quizA', 'class9-10', '{\"answers\":[1,0,2,3,0,2,0,1,3,2,0,3,2,0,0,0,1,0,2,0],\"user_level\":\"class9-10\",\"stream\":null,\"subject\":null,\"timestamp\":1776872866164}', '2026-04-22 15:47:46', NULL),
(28, 'quizA', 'class11-12', '{\"answers\":[0,1,0,1,3,2,1,2,1,0,2,1,3,1,0,1,0,2,1,3],\"user_level\":\"class11-12\",\"stream\":\"commerce\",\"subject\":\"Non-Maths\",\"timestamp\":1777740237518}', '2026-05-02 16:43:57', NULL),
(29, 'quizB', 'ug', '{\"phase1\":{\"q1_program\":\"Science \\/ Mathematics \\/ Pure Sciences\",\"q2_year\":\"3rd year\",\"q3_interest\":2,\"q4_switch\":2},\"phase2\":{\"q5_clarity\":3,\"q6_improvement\":2,\"q7_logic\":2,\"q8_creativity\":4,\"q9_people\":3,\"q10_research\":1,\"q11_adaptability\":1,\"q12_initiative\":3,\"q13_analysis\":4,\"q14_impact\":2,\"q15_exploration\":2},\"phase3\":{\"q16_higher_studies\":4,\"q17_job\":2,\"q18_certifications\":1,\"q19_govt\":3,\"q20_switch_domain\":3},\"timestamp\":1778244236827}', '2026-05-08 12:43:56', NULL),
(30, 'quizB', 'ug', '{\"phase1\":{\"q1_program\":\"Science \\/ Mathematics \\/ Pure Sciences\",\"q2_year\":\"3rd year\",\"q3_interest\":2,\"q4_switch\":2},\"phase2\":{\"q5_clarity\":3,\"q6_improvement\":2,\"q7_logic\":2,\"q8_creativity\":4,\"q9_people\":3,\"q10_research\":1,\"q11_adaptability\":1,\"q12_initiative\":3,\"q13_analysis\":4,\"q14_impact\":4,\"q15_exploration\":2},\"phase3\":{\"q16_higher_studies\":4,\"q17_job\":2,\"q18_certifications\":2,\"q19_govt\":4,\"q20_switch_domain\":4},\"timestamp\":1778244292916}', '2026-05-08 12:44:52', NULL),
(31, 'quizB', 'ug', '{\"phase1\":{\"q1_program\":\"Arts \\/ Humanities \\/ Social Sciences \\/ Law\",\"q2_year\":\"2nd year\",\"q3_interest\":2,\"q4_switch\":3},\"phase2\":{\"q5_clarity\":2,\"q6_improvement\":3,\"q7_logic\":2,\"q8_creativity\":4,\"q9_people\":3,\"q10_research\":2,\"q11_adaptability\":4,\"q12_initiative\":4,\"q13_analysis\":4,\"q14_impact\":2,\"q15_exploration\":1},\"phase3\":{\"q16_higher_studies\":5,\"q17_job\":2,\"q18_certifications\":2,\"q19_govt\":2,\"q20_switch_domain\":2},\"timestamp\":1778245454982}', '2026-05-08 13:04:15', NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `careers`
--
ALTER TABLE `careers`
  ADD CONSTRAINT `careers_ibfk_1` FOREIGN KEY (`cluster_id`) REFERENCES `career_clusters` (`cluster_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
