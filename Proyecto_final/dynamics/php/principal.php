<!DOCTYPE html>
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
        <h3>Nombre de usuario</h3>
        <p>Nombre completo del usuario</p>
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
<script src="../js/principalAdmin.js"></script>
<script src="../js/modalesGenerales.js"></script>
<script src="../js/modalesForos.js"></script>
<script src="../js/modalesPreguntas.js"></script>
<script src="../js/modalesExtravios.js"></script>
<script src="../js/modalesMarket.js"></script>
<script src="../js/funcionesCrear.js"></script>
<script src="../js/modalesUsuario.js"></script>
</body>
</html>