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
        // Aquí la lógica para eliminar la pregunta
        document.body.removeChild(modal);
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
