function crearInput(tipo, nombre, placeholder) {
    let input = document.createElement('input');
    input.setAttribute('type', tipo);
    input.setAttribute('name', nombre);
    input.setAttribute('placeholder', placeholder);
    return input;
}

function crearButton(tipo, texto) {
    let button = document.createElement('button');
    button.setAttribute('type', tipo);
    button.innerHTML = texto;
    return button;
}

function crearFormulario(contenido) {
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    for(let i=0; i < contenido.length; i++){
        form.appendChild(contenido[i]);
    }
    return form;
}

function crearTextArea(nombre, placeholder) {
    let textarea = document.createElement('textarea');
    textarea.setAttribute('name', nombre);
    textarea.setAttribute('placeholder', placeholder);
    return textarea;
}

function realizarPeticionFetch(form, url) {
    form.addEventListener('submit', function(e){
        e.preventDefault();
        let datosFormulario = new FormData(form);
        fetch(url, {
            method: 'POST',
            body: datosFormulario
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
}

function reportarExtravio() {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearInput('text', 'tituloExtravio', 'Título del extravío'),
        document.createElement('textarea'),
        crearInput('file', 'imagenExtravio', ''),
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
        crearInput('text', 'nuevoTituloPublicacion', 'Nuevo título de la publicación'),
        crearTextArea('nuevoTextoPublicacion', 'Nuevo texto de la publicación'),
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

