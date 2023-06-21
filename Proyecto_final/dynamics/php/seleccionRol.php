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
        <form action="./registroAdmin.php" method="post">
            <input type="hidden" name="role" value="Administrador">
            <button type="submit" class="boton-submit registro-btn">Administrador</button>
        </form>
    </article>
  </main>
</body>
</html>';
?>
