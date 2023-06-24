function crearPregunta() {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Escribe tu pregunta:', 'textoPregunta'),
        crearTextArea('textoPregunta', 'Escribe tu pregunta'),
        crearButton('submit', 'Crear Pregunta')
    ];

    let form = crearFormulario(contenidoFormulario);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let formData = new FormData(form);
        formData.append('accion', 'crearPregunta');
        fetch('Proyecto_final/dynamics/php/modalesPreguntas.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                if (data === 'creacionExitosa') {
                    alert('Pregunta creada correctamente.');
                } else {
                    console.error(data);
                    alert('Error al crear la pregunta.');
                }
            })
            .catch(error => console.error('Error:', error));
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function editarPregunta(idPregunta) {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Nueva versión de tu pregunta:', 'textoPregunta'),
        crearTextArea('textoPregunta', ''),
        crearButton('submit', 'Guardar Cambios')
    ];

    let form = crearFormulario(contenidoFormulario);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let formData = new FormData(form);
        formData.append('accion', 'editarPregunta');
        formData.append('idPregunta', idPregunta);
        fetch('Proyecto_final/dynamics/php/modalesPreguntas.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                if (data === 'edicionExitosa') {
                    alert('Pregunta editada correctamente.');
                } else {
                    console.error(data);
                    alert('Error al editar la pregunta.');
                }
            })
            .catch(error => console.error('Error:', error));
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}


function eliminarPregunta(idPregunta) {
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
        fetch('Proyecto_final/dynamics/php/modalesPreguntas.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({accion: 'eliminarPregunta', idPregunta: idPregunta})
        })
            .then(response => response.text())
            .then(resultado => {
                if(resultado === '1') {
                    alert("La pregunta se ha eliminado con éxito.");
                } else {
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

