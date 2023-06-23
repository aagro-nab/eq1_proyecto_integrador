async function crearPublicacion() {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Título de la Publicación:', 'tituloPublicacion'),
        crearInput('text', 'tituloPublicacion', 'Título de la Publicación'),
        crearLabel('Texto de la Publicación:', 'textoPublicacion'),
        crearTextArea('textoPublicacion', 'Texto de la Publicación'),
        crearLabel('Imagen de la Publicación:', 'imagenPublicacion'),
        crearInput('file', 'imagenPublicacion'),
        crearLabel('Estilo de Texto:', 'estiloTexto'),
        crearSelect('estiloTexto', ['Normal', 'Negrita', 'Cursiva', 'Subrayado']),
        crearButton('submit', 'Crear Publicación')
    ];

    let form = crearFormulario(contenidoFormulario);

    realizarPeticionFetch(form, '../php/foro.php');

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

async function editarPublicacion(publicacionId, rol) {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Título de la Publicación:', 'tituloPublicacion'),
        crearInput('text', 'tituloPublicacion', 'Título de la Publicación'),
        crearLabel('Texto de la Publicación:', 'textoPublicacion'),
        crearTextArea('textoPublicacion', 'Texto de la Publicación'),
        crearLabel('Imagen de la Publicación:', 'imagenPublicacion'),
        crearInput('file', 'imagenPublicacion'),
        crearLabel('Estilo de Texto:', 'estiloTexto'),
        crearSelect('estiloTexto', ['Normal', 'Negrita', 'Cursiva', 'Subrayado']),
        crearButton('submit', 'Guardar Cambios')
    ];

    let form = crearFormulario(contenidoFormulario);
    form.appendChild(crearInput('hidden', 'publicacionId', '', publicacionId));
    form.appendChild(crearInput('hidden', 'accion', '', 'editar'));

    realizarPeticionFetch(form, '../php/foro.php');

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}