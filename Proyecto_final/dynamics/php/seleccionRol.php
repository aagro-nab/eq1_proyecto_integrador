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
            <p class="titulo-xs registro-titulo">Bienvenid@ al sistema multipropósito de la Prepa 6</p>
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