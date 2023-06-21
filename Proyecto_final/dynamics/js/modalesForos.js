function crearForo() {
    let { modal, modalContent } = crearModal();

    let form = document.createElement('form');
    form.setAttribute('method', 'post');

    let nombreForo = document.createElement('input');
    nombreForo.setAttribute('type', 'text');
    nombreForo.setAttribute('name', 'nombreForo');
    nombreForo.setAttribute('placeholder', 'Nombre del Foro');
    form.appendChild(nombreForo);

    let descripcionForo = document.createElement('textarea');
    descripcionForo.setAttribute('name', 'descripcionForo');
    descripcionForo.setAttribute('placeholder', 'Descripción del Foro');
    form.appendChild(descripcionForo);

    let imagenForo = document.createElement('input');
    imagenForo.setAttribute('type', 'file');
    imagenForo.setAttribute('name', 'imagenForo');
    form.appendChild(imagenForo);

    let esPublico = document.createElement('input');
    esPublico.setAttribute('type', 'checkbox');
    esPublico.setAttribute('name', 'esPublico');
    form.appendChild(esPublico);

    let etiquetaPublico = document.createElement('label');
    etiquetaPublico.innerHTML = "Publico";
    form.appendChild(etiquetaPublico);

    let submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerHTML = "Crear Foro";
    form.appendChild(submitButton);

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function editarForo() {
    let { modal, modalContent } = crearModal();

    let form = document.createElement('form');
    form.setAttribute('method', 'post');

    let nombreForo = document.createElement('input');
    nombreForo.setAttribute('type', 'text');
    nombreForo.setAttribute('name', 'nombreForo');
    nombreForo.setAttribute('placeholder', 'Nuevo Nombre del Foro');
    form.appendChild(nombreForo);

    let descripcionForo = document.createElement('textarea');
    descripcionForo.setAttribute('name', 'descripcionForo');
    descripcionForo.setAttribute('placeholder', 'Nueva Descripción del Foro');
    form.appendChild(descripcionForo);

    let imagenForo = document.createElement('input');
    imagenForo.setAttribute('type', 'file');
    imagenForo.setAttribute('name', 'imagenForo');
    form.appendChild(imagenForo);

    let esPublico = document.createElement('input');
    esPublico.setAttribute('type', 'checkbox');
    esPublico.setAttribute('name', 'esPublico');
    form.appendChild(esPublico);

    let etiquetaPublico = document.createElement('label');
    etiquetaPublico.innerHTML = "Publico";
    form.appendChild(etiquetaPublico);

    let submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerHTML = "Guardar Cambios";
    form.appendChild(submitButton);

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function salirForo() {
    let { modal, modalContent } = crearModal();

    let mensajeSalida = document.createElement('p');
    mensajeSalida.innerHTML = "¿Estás seguro de que quieres salir de este foro?";
    modalContent.appendChild(mensajeSalida);

    let confirmarSalidaButton = document.createElement('button');
    confirmarSalidaButton.innerHTML = "Confirmar";
    confirmarSalidaButton.onclick = function() {
        // Aquí la lógica para salir del foro
        document.body.removeChild(modal);
    }
    modalContent.appendChild(confirmarSalidaButton);

    let cancelarButton = document.createElement('button');
    cancelarButton.innerHTML = "Cancelar";
    cancelarButton.onclick = function() {
        document.body.removeChild(modal);
    }
    modalContent.appendChild(cancelarButton);

    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

