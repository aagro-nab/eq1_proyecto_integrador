<?php
include ("./config.php");
$con = connect();
session_start();


if(isset($_SESSION['rol']) && isset($_SESSION['id']) && isset($_SESSION['username'])){
    $r = $_SESSION['rol'];
    $id_usuario = $_SESSION['id'];
    $nombre_usuario = $_SESSION['username'];
    $buscarNombre = "SELECT nombre FROM usuario WHERE ID_USUARIO='$id_usuario'";
    $query = mysqli_query ($con, $buscarNombre);
    $arreglo = mysqli_fetch_assoc ($query);
    $nombre_completo = $arreglo['nombre'];
} else {
    header("Location: ./inicioSesion.php");
    exit;
}
switch($r){
    case "estudiante":
        $rol = "principalAlumno.js";
        break;
    case "moderador":
        $rol = "principalModerador.js";
        break;
    case "administrador":
        $rol = "principalAdmin.js";
        break;
}
echo '<!DOCTYPE html>
<html>
<head>
    <title>Página Principal</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="../../statics/styles/principal.css">
</head>
<body>
<header>
    <nav>
        <img src="../../statics/img/p6logoblanco.png" alt="Logo de Coyote6" width="80" height="80">
        <div>
            <button id="forosButton" data-text="Foros"><i class="fas fa-comments"></i><span class="button-text"> Foros</span></button>
            <button id="preguntasButton" data-text="Preguntas"><i class="fas fa-question-circle"></i><span class="button-text"> Preguntas</span></button>
            <button id="extraviosButton" data-text="Extravios"><i class="fas fa-search"></i><span class="button-text"> Extravíos</span></button>
            <button id="marketButton" data-text="Market"><i class="fas fa-shopping-cart"></i><span class="button-text"> Market</span></button>
        </div>
    </nav>
</header>
<main>
    <div class="sidebar">
        <img src="../../statics/img/Ellipse%202.png" alt="Foto de usuario">
        <h3>';
        echo $nombre_usuario;
        echo '</h3>
        <p>';
        echo $nombre_completo;
        echo '</p>
        <a href="#" class="btn2"><i class="fas fa-sign-out-alt"></i><span class="button-text"> Cerrar sesión</span></a>
        <hr>
        <a href="#" class="btn"><i class="fas fa-bell"></i><span class="button-text"> Notificaciones</span></a>
        <a href="#" class="btn"><i class="fas fa-calendar-alt"></i><span class="button-text"> Calendario</span></a>
        <a href="#" class="btn"><i class="fas fa-envelope"></i><span class="button-text"> Mensajes</span></a>
        <a href="#" class="btn"><i class="fas fa-map"></i><span class="button-text"> Mapa</span></a>
        <hr id="hrButton" style="display: none;">
        <a href="#" id="button1" class="btn2" style="display: none;"><i class=""></i><span class="button-text"></span></a>
        <a href="#" id="button2" class="btn2" style="display: none;"><i class=""></i><span class="button-text"></span></a>
        <a href="#" id="button3" class="btn2" style="display: none;"><i class=""></i><span class="button-text"></span></a>
        <a href="#" id="button4" class="btn2" style="display: none;"><i class=""></i><span class="button-text"></span></a>
        <a href="#" id="button5" class="btn2" style="display: none;"><i class=""></i><span class="button-text"></span></a>
        <a href="#" id="button6" class="btn2" style="display: none;"><i class=""></i><span class="button-text"></span></a>
        <a href="#" id="button7" class="btn2" style="display: none;"><i class=""></i><span class="button-text"></span></a>
        <a href="#" id="button8" class="btn2" style="display: none;"><i class=""></i><span class="button-text"></span></a>
        <a href="#" id="button9" class="btn2" style="display: none;"><i class=""></i><span class="button-text"></span></a>
        <a href="#" id="button10" class="btn2" style="display: none;"><i class=""></i><span class="button-text"></span></a>
    </div>

    <!-- contenedor para todas las publicaciones -->
    <div id="contenedorPublicaciones">
        <article class="publicacion" style="display: none;">
            <section class="contenido">
            </section>
            <div class="acciones">
                <button class="comentar">Comentar</button>
                <button class="editar">Editar</button>
                <button class="eliminar">Eliminar</button>
            </div>
        </article>

    </div>
</main>
<script src="../js/'.$rol.'"></script>
<script src="../js/modalesForos.js"></script>
<script src="../js/modalesPreguntas.js"></script>
<script src="../js/modalesExtravios.js"></script>
<script src="../js/modalesMarket.js"></script>
<script src="../js/funcionesCrear.js"></script>
<script src="../js/modalesUsuario.js"></script>
</body>
</html>';
?>