<?php
//ESTA VERSIÓN DEL CÓDIGO FORMA PARTE DE LA OPTIMIZACIÓN FINAL v2 DE LOS ENTREGABLES
// PARA UN MEJOR MANEJO DE ERRORES TANTO EN EL DESARROLLO FINAL DEL PROYECTO, COMO EN LA POSTERIDAD
//conectar con la base de datos
include("./config.php");
$con = connect();
session_start();

$cuki = (isset($_COOKIE['usuario']) && $_COOKIE['usuario'] != "")? $_COOKIE['usuario'] : FALSE;
$cuki_rol = (isset($_COOKIE['rol']) && $_COOKIE['rol'] != "")? $_COOKIE['rol'] : FALSE;

if($cuki && $cuki_rol){
    $_SESSION['rol'] = $_COOKIE['rol'];
    header("location:./principal.php");
    exit;
}

//Verificar si se ha enviado el formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //Recibiendo datos de inicioDeSesion
    $username = filter_var($_POST['login-username'] ?? '', FILTER_SANITIZE_STRING);
    $pswrd = filter_var($_POST['login-password'] ?? '', FILTER_SANITIZE_STRING);
    $remember = isset($_POST["remember-me"]);

    //Validación de entradas
    $user = "/([A-z]|[0-9]){5,15}/i";
    $pass = "/([A-z]|[0-9]){6,20}/i";

    if (!(preg_match($user, $username) ==1 && preg_match($pass, $pswrd) ==1)) {
        echo("Ingresaste un username o contraseña inválida");
    } else {
        //Consulta de datos
        if ($con) {
            $stmt = $con->prepare("SELECT * FROM usuario WHERE nombreUsuario=?");
            $stmt->bind_param("s", $username);

            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();

            if ($user) {
                if ($pswrd == $user['contrasena']) {
                    $_SESSION['username'] = $username;
                    $_SESSION['rol'] = $user['rol'];
                    $_SESSION['id'] = $user['ID_USUARIO'];

                    if ($remember) {
                        setcookie("rol", $_SESSION['rol'], time() + 60 * 60 * 24); //dura un día
                        setcookie("usuario", $_SESSION['username'], time() + 60 * 60 * 24); //dura un día
                    }

                    header("location:./principal.php");
                    exit;
                } else {
                    echo "Nombre de usuario o contraseña incorrectos.";
                }
            } else {
                echo "Nombre de usuario o contraseña incorrectos.";
            }
        } else {
            echo "No se pudo conectar con la base de datos.";
        }
    }
}
?>

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