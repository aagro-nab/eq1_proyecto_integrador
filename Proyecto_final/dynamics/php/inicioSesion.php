<?php
//conectar con la base de datos
$include = include("./config.php");
$con = connect();
session_start();
$cuki = (isset($_COOKIE['usuario']) && $_COOKIE['usuario'] != "")? $_COOKIE['usuario'] : FALSE;
$cuki_rol = (isset($_COOKIE['rol']) && $_COOKIE['rol'] != "")? $_COOKIE['rol'] : FALSE;
if($cuki && $cuki_rol){
    $_SESSION['rol'] = $_COOKIE['rol'];
    header("location:./principal.php");
}
else {
    header("location: ../../index.html");
}
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


echo '
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inicia sesión</title>
  <link rel="stylesheet" href="../../statics/styles/inicioSesion.css">
  <link rel="shortcut icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Escudo_enp_6.svg/927px-Escudo_enp_6.svg.png" type="image/x-icon">
</head>
<body>
<main class="Registros">
  <article class="iniciosesion">
    <form method="post" action="./inicioSesion.php" target="_self">
      <p class="titulo-s" id="titulo-iniciosesion" tabindex="1">Iniciar sesión</p>

      <p class="texto-m">Nombre de usuario / Email :</p>
      <input tabindex="2" type="text" class="input-datos" id="login-username" name="login-username">

      <p class="texto-m" for="login-password">Contraseña:</p>
      <input tabindex="3" type="password" class="input-datos" id="login-password" name="login-password">

      <div class="row">
        <input type="checkbox" id="remember-me" name="remember-me" tabindex="4">
        <label for="remember-me" class="texto-m">Recordar usuario</label>
      </div><br>

      <div class="row-center">
        <button type="submit" class="boton-submit" value="Iniciar sesión" tabindex="5">¡Vamos!</button>
      </div>

      <div class="row-center">
        <a href="seleccionRol.php" class="boton-submit register-link" tabindex="6">Regístrate</a>
      </div>

      <a href="#" tabindex="6">¿Olvidaste tu contraseña?</a>
    </form>
  </article>
</main>
</body>
</html>
';

//recibe los datos de inicioDeSesion
$username = (isset($_POST["login-username"]) && $_POST["login-username"] != "")? $_POST["login-username"] : NULL;
$pswrd = (isset($_POST["login-password"]) && $_POST["login-password"] != "")? $_POST["login-password"] : NULL;
$remember = (isset($_POST["remember-me"]) && $_POST["remember-me"] != "")? $_POST["remember-me"] : FALSE;

// para comprobar que solo sean cadenas las que nos llegen por las entradas de logIn
$user_sano = filter_var($username, FILTER_SANITIZE_STRING);
$username = $user_sano;
$pswrd_sano= filter_var($pswrd, FILTER_SANITIZE_STRING);
$pswrd = $pswrd_sano;
// validar el username con regex
$user = "/([A-z]|[0-9]){5,15}/i";
$pass = "/([A-z]|[0-9]){6,}/i";

if (preg_match($user, $username) ==1) {
    echo("ingresaste un username valido");
} else {
    echo("ingresaste un username invalido");
}
if (preg_match($pass, $pswrd) ==1) {
    echo("ingresaste una contraseña valida");
} else {
    echo("ingresaste una contraseña invalida");
}
// estaba pensando en un
// return $al inicio de sesion tipo que ya te deje continuar normal si todo ok
// aun asi, sin el return funciona bien

// necesita del espacio para la sal en Maria DB
// if (verificar_contra($pswrd, $correct_pass, $sal_origin)){
//     echo "Contraseña correcta";
// } else {
//     echo "Contraseña incorrecta";
// }



//consultar datos
if($include && $con){
    $sql = "SELECT * FROM usuario WHERE nombreUsuario='$username' AND contrasena='$pswrd'";
    $query = mysqli_query($con, $sql);//busca que el usuario exista y que la contraseña también
    
    $sql_rol = "SELECT rol FROM usuario WHERE nombreUsuario='$username'";    
    $query_rol = mysqli_query($con, $sql_rol);

    

    $datos = mysqli_fetch_assoc($query); //recibe los datos de $query para poder procesarlos
    $rol = mysqli_fetch_array($query_rol);

    if($datos){//si $datos es TRUE redireccionar a la página principal 
        $r = $rol[0];//
        $_SESSION['username'] = $username;// "$_SESSION es una variable que va a guardar el username para poder iniciar sesion en la página principal 
        $_SESSION['rol'] = $r;

        if($remember){
            setcookie("rol", $_SESSION['rol'], time() + 60 * 60 * 24);//dura un día
            setcookie("usuario", $_SESSION['username'], time() + 60 * 60 * 24);//dura un día
        }
        header("location:./principal.php");
    }
    // }else{
    //     //si es FALSE mandar un mensaje de error y redireccionar otra vez al inicio de sesion
    // }
}
?>