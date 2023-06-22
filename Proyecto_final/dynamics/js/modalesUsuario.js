function modificarDatos() {
    //Lógica para la modificación de datos.
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

    realizarPeticionFetch(form, 'LIGA A PHP PARA CREAR COMENTARIO');

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
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Nombre del Usuario:', 'nombreUsuario'),
        crearInput('text', 'nombreUsuario', 'Nombre del Usuario'),
        crearButton('submit', 'Asignar como Moderador')
    ];

    let form = crearFormulario(contenidoFormulario);

    realizarPeticionFetch(form, 'LIGA A PHP PARA ASIGNAR MODERADOR');

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}