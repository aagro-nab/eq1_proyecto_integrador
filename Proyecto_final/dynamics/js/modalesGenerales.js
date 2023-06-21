function crearModal() {
    let modal = document.createElement('div');
    modal.className = 'main-modal';

    // Crear el contenido del modal
    let modalContent = document.createElement('article');
    modalContent.className = 'iniciosesion modal-content';

    // Agregar un botón de cerrar
    let close = document.createElement('button');
    close.className = 'modal-close';
    close.innerHTML = "&times;";
    close.onclick = function () {
        document.body.removeChild(modal);
    }
    modalContent.appendChild(close);
    return { modal, modalContent };
}



function crearPublicacion() {
    let { modal, modalContent } = crearModal();

    let form = document.createElement('form');
    form.setAttribute('method', 'post');

    let tituloPublicacion = document.createElement('input');
    tituloPublicacion.setAttribute('type', 'text');
    tituloPublicacion.setAttribute('name', 'tituloPublicacion');
    tituloPublicacion.setAttribute('placeholder', 'Título de la Publicación');
    form.appendChild(tituloPublicacion);

    let textoPublicacion = document.createElement('textarea');
    textoPublicacion.setAttribute('name', 'textoPublicacion');
    textoPublicacion.setAttribute('placeholder', 'Texto de la Publicación');
    form.appendChild(textoPublicacion);

    let imagenPublicacion = document.createElement('input');
    imagenPublicacion.setAttribute('type', 'file');
    imagenPublicacion.setAttribute('name', 'imagenPublicacion');
    form.appendChild(imagenPublicacion);

    let estiloTexto = document.createElement('select');
    estiloTexto.setAttribute('name', 'estiloTexto');
    let opciones = ['Normal', 'Negrita', 'Cursiva', 'Subrayado'];
    for(let i = 0; i < opciones.length; i++) {
        let opcion = document.createElement('option');
        opcion.value = opciones[i];
        opcion.text = opciones[i];
        estiloTexto.appendChild(opcion);
    }
    form.appendChild(estiloTexto);

    let submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerHTML = "Crear Publicación";
    form.appendChild(submitButton);

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function asignarModerador() {
    let { modal, modalContent } = crearModal();

    let form = document.createElement('form');
    form.setAttribute('method', 'post');

    let usuarioInput = document.createElement('input');
    usuarioInput.className = 'input-datos';
    usuarioInput.setAttribute('type', 'text');
    usuarioInput.setAttribute('name', 'nombreUsuario');
    usuarioInput.setAttribute('placeholder', 'Nombre del Usuario');
    form.appendChild(usuarioInput);

    let submitButton = document.createElement('button');
    submitButton.className = 'boton-submit';
    submitButton.setAttribute('type', 'submit');
    submitButton.innerHTML = 'Asignar como Moderador';
    form.appendChild(submitButton);

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function crearComentario() {
    let { modal, modalContent } = crearModal();

    let form = document.createElement('form');
    form.setAttribute('method', 'post');

    let comentarioInput = document.createElement('textarea');
    comentarioInput.className = 'input-datos';
    comentarioInput.setAttribute('name', 'contenidoComentario');
    comentarioInput.setAttribute('placeholder', 'Escribe tu comentario aquí...');
    form.appendChild(comentarioInput);

    let imagenComentarioInput = document.createElement('input');
    imagenComentarioInput.className = 'input-datos';
    imagenComentarioInput.setAttribute('type', 'file');
    imagenComentarioInput.setAttribute('name', 'imagenComentario');
    form.appendChild(imagenComentarioInput);

    let emojiComentarioInput = document.createElement('input');
    emojiComentarioInput.className = 'input-datos';
    emojiComentarioInput.setAttribute('type', 'text');
    emojiComentarioInput.setAttribute('name', 'emojiComentario');
    emojiComentarioInput.setAttribute('placeholder', 'Añade un emoji');
    form.appendChild(emojiComentarioInput);

    let submitButton = document.createElement('button');
    submitButton.className = 'boton-submit';
    submitButton.setAttribute('type', 'submit');
    submitButton.innerHTML = 'Publicar Comentario';
    form.appendChild(submitButton);

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}