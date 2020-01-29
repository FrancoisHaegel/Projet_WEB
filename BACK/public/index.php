<?php
use \Firebase\JWT\JWT;

require '../vendor/autoload.php';
require '../config/bootstrap.php';

$app = new \Slim\App;

const JWT_SECRET = "OIHLJDSHLSHLKDSLKHDLS";

$jwt = new Slim\Middleware\JwtAuthentication([
  "secure" => false,
  "path" => "/api",
  "ignore" => ['/users/login', '/users/register'],
  "secret" => JWT_SECRET,
  "attribute" => "decoded_token_data",
  "algorithm" => ["HS256"],
  "error" => function($response, $arguments){
    $data = array(
      'ERROR' => 'Could not authenticate user.'
    );
    return $response->withHeader("Content-Type", "application/json; charset=utf-8")
        ->getBody()
        ->write(json_encode($data));
  }
]);

$app->add($jwt);

//Enable lazy CORS
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            // ->withHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->post('/users/login', 'login');
$app->post('/users/register', 'register');

$app->get('/api/articles', 'getAllArticles');
$app->get('/api/articles/{id}', 'getOneArticles');

$app->get('/api/users', 'getAllUsers');
$app->get('/api/users/{id}', 'getOneUsers');

function getAllUsers($request, $response, $args) {
    global $entityManager;
    $userRepository = $entityManager->getRepository('Users');

    return $response->write(json_encode($userRepository->findAll(), JSON_UNESCAPED_SLASHES));
}

function getOneUsers($request, $response, $args){
  global $entityManager;
  $userRepository = $entityManager->getRepository('Users');

  if(isset($args['id'])){
      return $response->write(json_encode($userRepository->findBy(array('id'=> $args['id'])), JSON_UNESCAPED_SLASHES));
  }
  return $response->withStatus(404);
}

function login($request, $response, $args){
    global $entityManager;
    $userRepository = $entityManager->getRepository('Users');

    $body = $request->getParsedBody();
    if(isset($body['email']) && isset($body['password'])){
      $user = $userRepository->findOneBy(array('email' => $body['email']));
      if($user !== null && sha1($body['password']) === $user->getPassword()){
        $issueAt = time();
        $expirationTime = $issueAt + 3600 * 24 * 1;
        $payload = array(
          'userid' => $user->id,
          'iat' => $issueAt,
          'exp' => $expirationTime
        );
        $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
        $data = array('token' => $token_jwt, 'id' => $user->id);
        $response = $response->withStatus(200);
        return $response->write(json_encode($data, JSON_UNESCAPED_SLASHES));
      }
    }
    return $response ->withStatus(401);
}

function register($request, $response, $args){
    $body = $request->getParsedBody();
    $validated = true;

    if (!isset($body['email']))
    {
      $validated = false;
      $response->write(json_encode("body.email is required"));
    }
    if (!isset($body['password']))
    {
      $validated = false;
      $response->write(json_encode("body.password is required"));
    }
    if (!isset($body['passwordVerification']))
    {
      $validated = false;
      $response->write(json_encode("body.passwordVerification is required"));
    }
    if (!isset($body['firstName']))
    {
      $validated = false;
      $response->write(json_encode("body.firstName is required"));
    }
    if (!isset($body['lastName']))
    {
      $validated = false;
      $response->write(json_encode("body.lastName is required"));
    }
    if (!isset($body['country']))
    {
      $validated = false;
      $response->write(json_encode("body.country is required"));
    }
    if (!isset($body['address']))
    {
      $validated = false;
      $response->write(json_encode("body.address is required"));
    }
    if (!isset($body['postalCode']))
    {
      $validated = false;
      $response->write(json_encode("body.postalCode is required"));
    }
    if (!isset($body['city']))
    {
      $validated = false;
      $response->write(json_encode("body.city is required"));
    }
    if (!isset($body['phoneNumber']))
    {
      $validated = false;
      $response->write(json_encode("body.phoneNumber is required"));
    }
    global $entityManager;
    $userRepository = $entityManager->getRepository('Users');
    $user = $userRepository->findOneBy(array('email' => $body['email']));

    if($user !== null){
      $validated = false;
      $response->write(json_encode("This email is already used"));
    }

    if($validated){
      $newUser = new Users();
      $newUser
         ->setPassword(sha1($body['password']))
         ->setFirstName($body['firstName'])
         ->setLastName($body['lastName'])
         ->setCountry($body['country'])
         ->setAddress($body['address'])
         ->setPostalCode($body['postalCode'])
         ->setCity($body['city'])
         ->setEmail($body['email'])
         ->setPhoneNumber($body['phoneNumber']);
      $entityManager->persist($newUser);
      $entityManager->flush();
      $response = $response->withStatus(201);
      return $response->write(json_encode($newUser, JSON_UNESCAPED_SLASHES));
    }
    return $response->withStatus(412);
}

function getAllArticles($request, $response, $args) {
  global $entityManager;
  $articleRepository = $entityManager->getRepository('Articles');

  return $response->write(json_encode($articleRepository->findAll(), JSON_UNESCAPED_SLASHES));
}

function getOneArticles($request, $response, $args){
  global $entityManager;
  $articleRepository = $entityManager->getRepository('Articles');

  if(isset($args['id'])){
      return $response->write(json_encode($articleRepository->findBy(array('id'=> $args['id'])), JSON_UNESCAPED_SLASHES));
  }
  return $response->withStatus(404);
}

$app->run();
?>
