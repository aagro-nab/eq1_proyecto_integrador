<?php
echo '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Selección del rol</title>
  <link rel="stylesheet" href="../../statics/styles/seleccionRol.css">
</head>
<body>
<body>
  <main class="Registros">
    <article class="Recordatorio registro-article">
        <p class="titulo-xs registro-titulo">Bienvenid@ al sistema multipropósito de la Prepa 6</p>
        <hr>
        <p id="registro-desc">Por favor selecciona tu rol para ser dirigido al registro correspondiente</p>
    </article>
    <article class="Formulario registro-article">
        <form action="./registroAlumno.php" method="post">
            <input type="hidden" name="role" value="Estudiante">
            <button type="submit" class="boton-submit registro-btn">Estudiante</button>
        </form>
        <form action="./registroModerador.php" method="post">
            <input type="hidden" name="role" value="Moderador">
            <button type="submit" class="boton-submit registro-btn">Moderador</button>
        </form>
        <form action="./registroAdmin.php" method="post">
            <input type="hidden" name="role" value="Administrador">
            <button type="submit" class="boton-submit registro-btn">Administrador</button>
        </form>
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
      <li>Todo el contenido y las imágenes en este sitio son propiedad de los creadores de la página y no pueden ser usados, distribuidos, modificados, reproducidos, publicados o transmitidos sin el previo consentimiento por escrito de los creadores de la página.</li>
      <li>El acceso no autorizado, el uso o la alteración de este sitio web, su contenido o los sistemas de seguridad pueden resultar en enjuiciamiento civil y/o criminal.</li>
    </ul>
  </article>
  </footer>
</body>
</html>';
?>
