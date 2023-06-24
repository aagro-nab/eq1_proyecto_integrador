function modificarDatos() {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Nombre:', 'nombre'),
        crearInput('text', 'nombre', 'Nombre'),
        crearLabel('Nombre de Usuario:', 'nombreUsuario'),
        crearInput('text', 'nombreUsuario', 'Nombre de Usuario'),
        crearLabel('Número de Cuenta:', 'numeroCuenta'),
        crearInput('text', 'numeroCuenta', 'Número de Cuenta'),
        crearLabel('Correo Electrónico:', 'email'),
        crearInput('text', 'email', 'Correo Electrónico'),
        crearLabel('Contraseña:', 'contrasena'),
        crearInput('password', 'contrasena', 'Contraseña'),
        crearLabel('Grupo:', 'grupo'),
        crearInput('text', 'grupo', 'Grupo'),
        crearLabel('Foto de Perfil:', 'fotoPerfil'),
        crearInput('file', 'fotoPerfil', 'Foto de Perfil'),
        crearButton('submit', 'Modificar Usuario')
    ];

    let form = crearFormulario(contenidoFormulario);
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let formData = new FormData(form);
        // Incluir el ID_USUARIO en los datos enviados al servidor
        formData.append('ID_USUARIO', usuario);
        fetch('/Proyecto_final/dynamics/php/modalesUsuario.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                if (data === 'usuarioExistente') {
                    alert('Una cuenta con ese nombre de usuario ya existe.');
                } else if (data === 'correoExistente') {
                    alert('Una cuenta con ese correo electrónico ya existe.');
                } else if (data === 'actualizacionExitosa') {
                    alert('Información de usuario actualizada correctamente.');
                } else {
                    console.error(data);
                }
            })
            .catch(error => console.error('Error:', error));
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function asignarModerador() {
    let modal = document.createElement("div");
    modal.setAttribute("id", "modal");
    modal.classList.add("modal");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    let close = document.createElement("span");
    close.classList.add("close");
    close.innerHTML = "&times;";
    close.onclick = function() {
        modal.style.display = "none";
    }

    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "/Proyecto_final/dynamics/php/modalesUsuario.js");

    let label = document.createElement("label");
    label.setAttribute("for", "nombreUsuario");
    label.innerHTML = "Nombre del Usuario:";

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "nombreUsuario");
    input.setAttribute("name", "nombreUsuario");
    input.setAttribute("placeholder", "Nombre del Usuario");

    let button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.innerText = "Asignar como Moderador";

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);

    modalContent.appendChild(close);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.style.display = "block";

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

async function notiReportes() {
    let datosFormulario = new FormData();
    datosFormulario.append('accion', 'recuperarReportes');

    let response = await fetch('/ProyectoFinal/Proyecto_final/dynamics/php/modalesForos.php', {
        method: 'POST',
        body: datosFormulario
    });

    if (response.ok) {
        let reportes = await response.json();

        let { modal, modalContent } = crearModal();

        reportes.forEach(reporte => {
            let reporteDiv = document.createElement('div');
            reporteDiv.innerHTML = `
                <strong>Foro:</strong> ${reporte.nombreForo} <br>
                <strong>Reportado por:</strong> ${reporte.nombreUsuario} <br>
                <strong>Comentario:</strong> ${reporte.COMENTARIO}<br><br>
            `;

            modalContent.appendChild(reporteDiv);
        });

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    } else {
        alert("Error en la petición. Por favor, inténtalo de nuevo.");
    }
}

function mostrarMensajes (){
    alert("La función no está disponible en este momento. Inténtalo más tarde.");
}

function mostrarMapas (){
    alert("La función no está disponible en este momento. Inténtalo más tarde.");
}
function mostrarCalendario (){
    alert("La función no está disponible en este momento. Inténtalo más tarde.");
    
}



