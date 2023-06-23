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

    realizarPeticionFetch(form, '../foro.php');

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

    realizarPeticionFetch(form, '../foro.php');

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function obtenerPublicaciones(view) {
    fetch('../foro.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vista: view }),
    })
        .then(respuesta => respuesta.json())
        .then(publicaciones => {
            let divPublicaciones = document.getElementById('divPublicaciones');
            publicaciones.forEach(publicacion => {
                let publicacionDiv = document.createElement('div');

                let titulo = document.createElement('h2');
                titulo.innerText = publicacion.titulo;
                publicacionDiv.appendChild(titulo);

                let imagen = document.createElement('img');
                imagen.src = publicacion.imagen;
                publicacionDiv.appendChild(imagen);

                let texto = document.createElement('p');
                texto.innerText = publicacion.texto;
                publicacionDiv.appendChild(texto);

                let autor = document.createElement('p');
                autor.innerText = "Publicado por: " + publicacion.autor;
                publicacionDiv.appendChild(autor);

                let fotoPerfil = document.createElement('img');
                fotoPerfil.src = publicacion.fotoPerfil;
                publicacionDiv.appendChild(fotoPerfil);

                // Agregar comentarios
                let comentariosDiv = document.createElement('div');
                publicacion.comentarios.forEach(comentario => {
                    let comentarioP = document.createElement('p');
                    comentarioP.innerText = comentario.autor + ": " + comentario.texto;
                    comentariosDiv.appendChild(comentarioP);
                });
                publicacionDiv.appendChild(comentariosDiv);

                divPublicaciones.appendChild(publicacionDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}
