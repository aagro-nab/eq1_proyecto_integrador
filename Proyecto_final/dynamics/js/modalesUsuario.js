function modificarUsuario(usuario) {
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
        fetch('Proyecto_final/dynamics/php/modalesUsuario.php', {
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


function crearComentario() {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Escribe tu comentario aquí:', 'contenidoComentario'),
        crearTextArea('contenidoComentario', 'Escribe tu comentario aquí...'),
        crearLabel('Añade una imagen:', 'imagenComentario'),
        crearInput('file', 'imagenComentario'),
        crearLabel('Añade un emoji:', 'emojiComentario'),
        crearInput('text', 'emojiComentario', 'Añade un emoji'),
        crearButton('submit', 'Publicar Comentario')
    ];

    let form = crearFormulario(contenidoFormulario);

    realizarPeticionFetch(form, '../php/foro.php');

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function editarComentario() {
    //Lógica para la edición de comentarios.
}

function eliminarComentario() {
    //Lógica para la eliminación de comentarios.
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
    form.setAttribute("action", "Proyecto_final/dynamics/php/modalesUsuario.js");

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
