function crearPregunta() {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Escribe tu pregunta:', 'textoPregunta'),
        crearTextArea('textoPregunta', 'Escribe tu pregunta'),
        crearButton('submit', 'Crear Pregunta')
    ];

    let form = crearFormulario(contenidoFormulario);

    realizarPeticionFetch(form, 'LIGA A PHP');

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function editarPregunta() {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Nueva versión de tu pregunta:', 'textoPregunta'),
        crearTextArea('textoPregunta', 'Nueva versión de tu pregunta'),
        crearButton('submit', 'Guardar Cambios')
    ];

    let form = crearFormulario(contenidoFormulario);

    realizarPeticionFetch(form, 'LIGA A PHP PARA EDITAR');

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function eliminarPregunta() {
    let { modal, modalContent } = crearModal();

    let mensajeEliminacion = document.createElement('p');
    mensajeEliminacion.innerHTML = "¿Estás seguro de que quieres eliminar esta pregunta?";
    modalContent.appendChild(mensajeEliminacion);

    let confirmarEliminacionButton = crearButton('button', 'Confirmar');
    let cancelarButton = crearButton('button', 'Cancelar');
    cancelarButton.onclick = function() {
        document.body.removeChild(modal);
    }

    confirmarEliminacionButton.addEventListener('click', function(){
        fetch('LIGA A PHP PARA ELIMINAR', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({accion: 'eliminar'})
        })
            .then(response => response.text())
            .then(resultado => {
                if(resultado === '1') {
                    // Operación exitosa
                    console.log("La pregunta se ha eliminado con éxito.");
                } else {
                    // Operación fallida
                    alert("No se pudo eliminar la pregunta. Inténtalo más tarde.");
                }
                document.body.removeChild(modal);
            })
            .catch(error => console.error('Error:', error));
    });

    modalContent.appendChild(confirmarEliminacionButton);
    modalContent.appendChild(cancelarButton);

    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}
