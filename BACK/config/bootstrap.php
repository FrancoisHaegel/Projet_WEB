<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('Europe/Paris');
require_once "../vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/yaml"), $isDevMode);
$conn = array(
'url' => 'mysql://projet_web_b_1610:zEy7VGdSbhw-nGnHriTn@cd4a2220-da2c-4230-8968-4d8c43c687a5.projet-web-b-1610.mysql.dbs.scalingo.com:33571/projet_web_b_1610?useSSL=true&verifyServerCertificate=false',
);
$entityManager = EntityManager::create($conn, $config);
