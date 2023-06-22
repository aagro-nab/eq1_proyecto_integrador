//ESTE JAVASCRIPT CONTIENE LAS FUNCIONES PARA CREAR LOS MODALES DE EXTRAVIOS
function reportarExtravio() {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Título del extravío:', 'tituloExtravio'),
        crearInput('text', 'tituloExtravio', 'Título del extravío'),
        crearLabel('Descripción del extravío:', 'descripcionExtravio'),
        crearTextArea('descripcionExtravio', 'Descripción del extravío'),
        crearLabel('Imagen del Extravío:', 'imagenExtravio'),
        crearInput('file', 'imagenExtravio', ''),
        crearLabel('Lugar del extravío:', 'lugarExtravio'),
        crearInput('text', 'lugarExtravio', 'Lugar del extravío'),
        crearButton('submit', 'Reportar Extravío')
    ];

    let form = crearFormulario(contenidoFormulario);

    realizarPeticionFetch(form, 'LIGA A PHP');

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function editarReporte() {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Nuevo título de la publicación:', 'nuevoTituloPublicacion'),
        crearInput('text', 'nuevoTituloPublicacion', 'Nuevo título de la publicación'),
        crearLabel('Nuevo texto de la publicación:', 'nuevoTextoPublicacion'),
        crearTextArea('nuevoTextoPublicacion', 'Nuevo texto de la publicación'),
        crearLabel('Nueva Imagen:', 'nuevoImagenPublicacion'),
        crearInput('file', 'nuevoImagenPublicacion', ''),
        crearButton('submit', 'Guardar Cambios')
    ];

    let form = crearFormulario(contenidoFormulario);

    realizarPeticionFetch(form, 'LIGA A PHP PARA EDITAR');

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function eliminarReporte() {
    let { modal, modalContent } = crearModal();

    let mensajeEliminacion = document.createElement('p');
    mensajeEliminacion.innerHTML = "¿Estás seguro de que quieres eliminar esta publicación?";
    modalContent.appendChild(mensajeEliminacion);

    let confirmarEliminacionButton = crearButton('button', 'Confirmar');
    let cancelarButton = crearButton('button', 'Cancelar');
    cancelarButton.onclick = function() {
        document.body.removeChild(modal);
    }

    confirmarEliminacionButton.addEventListener('click', function(){
        fetch('LIGA A PHP PARA ELIMINAR', {
            method: 'POST',
            body: JSON.stringify({accion: 'eliminar'})
        })
            .then(response => response.text())
            .then(resultado => {
                if(resultado === '1') {
                    console.log("La operación se realizó con éxito.");
                    alert("La operación se realizó con éxito.");
                } else {
                    alert("No se pudo realizar la operación.");
                }
                document.body.removeChild(modal);
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Ha ocurrido un error: ", error);
            });
    });

    modalContent.appendChild(confirmarEliminacionButton);
    modalContent.appendChild(cancelarButton);

    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}
