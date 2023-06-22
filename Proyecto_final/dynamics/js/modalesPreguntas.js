function crearPregunta() {
    let { modal, modalContent } = crearModal();

    let form = document.createElement('form');
    form.setAttribute('method', 'post');

    let textoPregunta = document.createElement('textarea');
    textoPregunta.setAttribute('name', 'textoPregunta');
    textoPregunta.setAttribute('placeholder', 'Escribe tu pregunta');
    form.appendChild(textoPregunta);

    let submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerHTML = "Crear Pregunta";
    form.appendChild(submitButton);

    form.addEventListener('submit', function(e){
        e.preventDefault();
        let datosFormulario = new FormData(form);
        fetch('LIGA A PHP', {
            method: 'POST',
            body: datosFormulario
        })
            .then(response => response.text())
            .then(resultado => {
                if(resultado === '1') {
                    // Operación exitosa
                    console.log("La pregunta se ha creado con éxito.");
                } else {
                    // Operación fallida
                    alert("No se pudo crear la pregunta. Inténtalo más tarde.");
                }
                document.body.removeChild(modal);
            })
            .catch(error => console.error('Error:', error));
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function editarPregunta() {
    let { modal, modalContent } = crearModal();

    let form = document.createElement('form');
    form.setAttribute('method', 'post');

    let textoPregunta = document.createElement('textarea');
    textoPregunta.setAttribute('name', 'textoPregunta');
    textoPregunta.setAttribute('placeholder', 'Nueva versión de tu pregunta');
    form.appendChild(textoPregunta);

    let submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerHTML = "Guardar Cambios";
    form.appendChild(submitButton);

    form.addEventListener('submit', function(e){
        e.preventDefault();
        let datosFormulario = new FormData(form);
        fetch('LIGA A PHP', {
            method: 'POST',
            body: datosFormulario
        })
            .then(response => response.text())
            .then(resultado => {
                if(resultado === '1') {
                    // Operación exitosa
                    console.log("La pregunta se ha editado con éxito.");
                } else {
                    // Operación fallida
                    alert("No se pudo editar la pregunta. Inténtalo más tarde.");
                }
                document.body.removeChild(modal);
            })
            .catch(error => console.error('Error:', error));
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function eliminarPregunta() {
    let { modal, modalContent } = crearModal();

    let mensajeEliminacion = document.createElement('p');
    mensajeEliminacion.innerHTML = "¿Estás seguro de que quieres eliminar esta pregunta?";
    modalContent.appendChild(mensajeEliminacion);

    let confirmarEliminacionButton = document.createElement('button');
    confirmarEliminacionButton.innerHTML = "Confirmar";
    confirmarEliminacionButton.onclick = function() {
        fetch('LIGA A PHP', {
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
    }
    modalContent.appendChild(confirmarEliminacionButton);

    let cancelarButton = document.createElement('button');
    cancelarButton.innerHTML = "Cancelar";
    cancelarButton.onclick = function() {
        document.body.removeChild(modal);
    }
    modalContent.appendChild(cancelarButton);

    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}
