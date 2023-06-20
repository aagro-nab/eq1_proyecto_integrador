<?php
//Conexion con la base de datos en este archivo no se usa pero ya se conecto correctamente
include ("./config.php");
$con = connect();
session_start();

// Funcion para verificar que si exista un valor dentro de el select que se recibio en el archivo seleccionRol.html 
//se supone que desde ahi se revisa que solo se introduzca alguno de los valores permitidos, pero por si las dudas 
//aqui tambien se verifica que no sea nulo
function asignar($input) {
    $input = (isset($_POST[$input]) && $_POST[$input] != "")? $_POST[$input] : NULL;
    return $input;
}

$rol = asignar("role");

//En caso de que no exista un valor en rol, te dirige siempre al html inicial, en caso de que si exista crea una sesion con el rol
if (!isset($rol)) {
    header("location:./seleccionRol.php");
} else {
    $_SESSION["Rol"] = $rol;
    echo'<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Alumno</title>
        <link rel="stylesheet" href="../../statics/styles/registro.css">
    </head>
    <body>
    <main class="Registros">
        <article class="Recordatorio">

        <p>Estimado alumn@, por favor ingresa los datos correspondientes, recuerda que tu número de cuenta debe de estar vigente, por lo que si eres de generaciones pasadas, no podrás entrar.</p>

        </article>

        <article class="Formulario">

        <form action="./paginaPrincipal.php" method="post" target="_self">

            <p class="texto-m">Nombre completo:</p>
            <input class="input-datos" type="text" id="nombre" name="nombre" required>

            <p class="texto-m">Nombre de usuario:</p>
            <input class="input-datos" type="text" id="username" name="username" required>

            <p class="texto-m">Número de cuenta:</p>
            <input class="input-datos" type="text" id="nCuenta" name="nCuenta" minlength="9" maxlength="9" required>

            <p class="texto-m">Email:</p>
            <input class="input-datos" type="email" id="email" name="email" required>

            <p class="texto-m">Contraseña:</p>
            <input class="input-datos" type="password" id="contraseña" name="contraseña" minlength="8"  maxlength="16" required>

            <p class="texto-m">Grupo:</p>
            <input class="input-datos" type="text" id="grupo" name="grupo"  minlength="3"  maxlength="3" required>

            <!-- <input class="Botexto" type="checkbox" id="recordar" name="recordar">
            <label for="recordar">Recordar usuario</label><br><br> -->

            <div class="row-center">
            <button type="submit" class="boton-submit" value="Registrarse">Registrarse</button>
            </div>

            <!-- <a href="#">¿Olvidaste tu contraseña?</a><br> -->
            <a href="#">¿Tienes duda en alguno de los campos?</a><br><br>

        </form>

        <a href="./seleccionRol.php" class="Roles">Seleccionar Rol de Nuevo</a>

        </article>
    </main>
    </body>
    </html>';
}
?>