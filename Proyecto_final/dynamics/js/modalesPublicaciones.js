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

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let formData = new FormData(form);
        formData.append('accion', 'crearPublicacion'); // Aquí añadimos la acción
        fetch('Proyecto_final/dynamics/php/modalesPublicaciones.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                if (data === 'creacionExitosa') {
                    alert('Publicación creada correctamente.');
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


async function editarPublicacion(publicacionId) {
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
    form.appendChild(crearInput('hidden', 'accion', '', 'editarPublicacion'));

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let formData = new FormData(form);
        fetch('Proyecto_final/dynamics/php/modalesPublicaciones.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                if (data === 'edicionExitosa') {
                    alert('Publicación editada correctamente.');
                } else {
                    console.error(data);
                    alert('Error al editar la publicación.');
                }
            })
            .catch(error => console.error('Error:', error));
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

async function eliminarPublicacion() {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Selecciona la publicación a eliminar:', 'publicacionId'),
        await crearSelectPublicaciones('publicacionId'),
        crearButton('submit', 'Eliminar Publicación')
    ];

    let form = crearFormulario(contenidoFormulario);
    form.appendChild(crearInput('hidden', 'accion', '', 'eliminarPublicacion'));

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let formData = new FormData(form);
        fetch('Proyecto_final/dynamics/php/modalesPublicaciones.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                if (data === 'eliminacionExitosa') {
                    alert('Publicación eliminada correctamente.');
                } else {
                    console.error(data);
                    alert('Error al eliminar la publicación.');
                }
            })
            .catch(error => console.error('Error:', error));
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

async function crearSelectPublicaciones(id) {
    let select = crearSelect(id, []);
    let response = await fetch('Proyecto_final/dynamics/php/modalesPublicaciones.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'accion=obtenerPublicaciones',
    });

    let data = await response.json();
    for (let publicacion of data) {
        let option = document.createElement('option');
        option.value = publicacion.ID_PUBLICACION;
        option.textContent = publicacion.tituloPublicacion;
        select.appendChild(option);
    }

    return select;
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

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let formData = new FormData(form);
        formData.append('accion', 'crearComentario');
        fetch('Proyecto_final/dynamics/php/modalesPublicaciones.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                if (data === 'creacionExitosa') {
                    alert('Comentario creado correctamente.');
                } else {
                    console.error(data);
                    alert('Error al crear el comentario.');
                }
            })
            .catch(error => console.error('Error:', error));
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function editarComentario(idRespuesta, contenidoActual) {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Editar tu comentario:', 'contenidoComentario'),
        crearTextArea('contenidoComentario', contenidoActual),
        crearButton('submit', 'Guardar Cambios')
    ];

    let form = crearFormulario(contenidoFormulario);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let formData = new FormData(form);
        formData.append('accion', 'editarComentario');
        formData.append('idRespuesta', idRespuesta);
        fetch('Proyecto_final/dynamics/php/modalesPublicaciones.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                if (data === 'edicionExitosa') {
                    alert('Comentario editado correctamente.');
                } else {
                    console.error(data);
                    alert('Error al editar el comentario.');
                }
            })
            .catch(error => console.error('Error:', error));
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}


function eliminarComentario(idComentario) {
    let confirmation = window.confirm("¿Estás seguro que quieres eliminar este comentario? Esta acción no se puede deshacer.");
    if (!confirmation) {
        return;
    }

    let formData = new FormData();
    formData.append('accion', 'eliminarComentario');
    formData.append('comentarioId', idComentario);

    fetch('Proyecto_final/dynamics/php/modalesPublicaciones.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.text())
        .then(data => {
            if (data === 'eliminacionExitosa') {
                alert('Comentario eliminado correctamente.');
                //Implementar lófica para reobtener publicaciones
            } else {
                console.error(data);
                alert('Error al eliminar el comentario.');
            }
        })
        .catch(error => console.error('Error:', error));
}
