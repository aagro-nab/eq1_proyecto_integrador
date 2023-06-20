<?php
  $include = include ("./config.php");
  $con = connect();
  session_start ();

  function asignar($input)
  {
    $input = (isset($_POST[$input]) && $_POST[$input] != "")? $_POST[$input] : NULL;
    return $input;
  }

  $rol = asignar("role");

  if (!isset ($rol))
  {
    header ("location:./seleccionRol.php");
  } else 
  {
    $_SESSION["Rol"] = $rol;
    // echo $_SESSION["Rol"];
    echo '<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Administrador</title>
        <link rel="stylesheet" href="../../statics/styles/registro.css">
        <script src="../js/registro.js"></script>
      </head>
      <body>
        <main class="Registros">
      
          <article class="Recordatorio">
      
            <p>Estimado Administrador@, por favor ingresa los datos correspondientes, recuerda que tu número de cuenta debe de estar vigente, por lo que si eres de generaciones pasadas, no podrás entrar.</p>
            <hr>
            <p>Recuerda que en contraseña debes poner la clave proporcionada por tu organización.</p>
      
          </article>
          <article class="Formulario">
      
            <form action="./paginaPrincipal.php" method="post" id="formRegistro">
      
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
              <select id="grupo" name="grupo"></select> <br><br>';
              // <input class="input-datos" type="text" id="grupo" name="grupo" minlength="3"  maxlength="3" required>
            echo '
              <!-- <div class="row">
                <input class="remember-me" type="checkbox" id="recordar" name="recordar">
                <p >Recordar usuario</p>
              </div> -->
      
              <div class="row-center">
                <button type="submit" class="boton-submit" value="Registrarse">Registrarse</button>
              </div>
      
              <!-- <a href="#">¿Olvidaste tu contraseña?</a><br> -->
              <a href="#">¿Tienes duda en alguno de los campos?</a><br><br>
      
            </form>
      
            <a href="./seleccionRol.html" class="Roles">Seleccionar Rol de Nuevo</a>
            
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