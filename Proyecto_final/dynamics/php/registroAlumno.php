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

        <form action="./desplegarGrupos.php" method="post" target="_self">

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

            <p class="texto-m">Grado:</p>
            <label for="grado"></label>
            <select id="grado" name="grado">
                <option class="input-datos" value="cuarto">Cuarto</option>
                <option class="input-datos" value="quinto">Quinto</option>
                <option class="input-datos" value="sexto">Sexto</option>
            </select>

            <p class="texto-m">Grupo:</p>
            
            


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

    <footer class="Registros">

        <article class="Avisolegal">
            <h1>CONDICIONES DE USO</h1>
            <p>El acceso y uso de este sitio web está sujeto a las siguientes condiciones de uso:</p>
            <ul>
              <li>El usuario debe ser miembro activo de la Escuela Nacional Preparatoria Plantel 6 "Antonio Caso".</li>
              <li>Los usuarios deben comprometerse a interactuar de manera respetuosa y considerada con todos los demás miembros de la comunidad.</li>
              <li>El acoso, el lenguaje ofensivo, el contenido inapropiado y la violación de la privacidad de otros usuarios no será tolerado y puede resultar en la terminación de la cuenta del usuario.</li>
              <li>El uso de la información y los recursos proporcionados en este sitio web es solo para uso personal y no comercial.</li>
            </ul>
        </article>
        <article class="Avisolegal">
            <h1>AVISO LEGAL</h1>
            <p>Este sitio web y su contenido son propiedad de los creadores de la página y están protegidos por las leyes de derechos de autor:</p>
            <ul>
              <li>Todo el contenido y las imágenes en este sitio son propiedad de los creadores de la página y no pueden ser utilizados, copiados, reproducidos, distribuidos, transmitidos, difundidos, mostrados, vendidos, licenciados o explotados de ninguna manera sin el previo consentimiento por escrito.</li>
              <li>El uso no autorizado de este sitio puede dar lugar a reclamaciones de daños y/o a una acción penal.</li>
              <li>Los creadores del sitio no aceptan ninguna responsabilidad por el contenido de los enlaces externos. Los operadores de las páginas enlazadas son los únicos responsables de su contenido.</li>
              <li>Si tienes alguna pregunta o preocupación, por favor ponte en contacto con nosotros a través del formulario de contacto en el sitio.</li>
            </ul>
        </article>

    </footer>
    
    </body>
    </html>';
}
?>