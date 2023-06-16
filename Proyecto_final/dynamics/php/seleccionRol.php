<?php
    echo '<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Seleeción del rol</title>
        <link rel="stylesheet" href="../../statics/styles/seleccionRol.css">
    </head>
    <body>
    <main class="Registros">
        <article class="Recordatorio registro-article">
            <p class="titulo-xs registro-titulo">Bienvenid@ al sistema multiproposito de la Prepa 6</p>
            <hr>
            <p id="registro-desc">Por favor selecciona tu rol para ser dirigido al registro correspondiente</p>
        </article>
        <article class="Formulario registro-article">
            <form id="seleccionRol" method="post" target="_self">
                <select class="seleccion registro-input" id="role" name="role">
                    <option value="Rol">Selecciona un rol</option>
                    <option value="Estudiante">Estudiante</option>
                    <option value="Moderador">Moderador</option>
                    <option value="Admin">Administrador</option>
                </select>
                <button class="boton-submit registro-btn" type="submit">Listo</button>
            </form>
        </article>
    </main>
    <footer class="Registros">
        <article class="Avisolegal">
            <h1>CONDICIONES DE USO</h1>
            <p>Pertenecer y ser alumno y/o autoridad activa de la Escuela Nacional Preparatoria Plantel 6 "Antonio Caso"</p>
        </article>
        <article class="Avisolegal">
            <h1>AVISO LEGAL</h1>
            <p>Hecho en México, todos los derechos reservados 2014-2023. Esta página puede ser reproducida con fines no lucrativos, siempre y cuando no se mutile, se cite la fuente completa y su dirección electrónica, de otra forma requiere permiso por escrito de la Institución.</p>
        </article>
    </footer>';
    echo "<script>
        document.getElementById('role').addEventListener('change', function() {
            var form = document.getElementById('seleccionRol');
            if (this.value === 'Estudiante') form.action = './registroAlumno.php';
            else if (this.value === 'Moderador') form.action = './registroModerador.php';
            else if (this.value === 'Admin') form.action = './registroAdmin.php';
        });
    </script>
    </body>
    </html>";
?>