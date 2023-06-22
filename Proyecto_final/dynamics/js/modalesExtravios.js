function reportarExtravio() {
    let { modal, modalContent } = crearModal();

    let form = document.createElement('form');
    form.setAttribute('method', 'post');

    let tituloExtravio = document.createElement('input');
    tituloExtravio.setAttribute('type', 'text');
    tituloExtravio.setAttribute('name', 'tituloExtravio');
    tituloExtravio.setAttribute('placeholder', 'Título del extravío');
    form.appendChild(tituloExtravio);

    let descripcionExtravio = document.createElement('textarea');
    descripcionExtravio.setAttribute('name', 'descripcionExtravio');
    descripcionExtravio.setAttribute('placeholder', 'Descripción del extravío');
    form.appendChild(descripcionExtravio);

    let imagenExtravio = document.createElement('input');
    imagenExtravio.setAttribute('type', 'file');
    imagenExtravio.setAttribute('name', 'imagenExtravio');
    form.appendChild(imagenExtravio);

    let lugarExtravio = document.createElement('input');
    lugarExtravio.setAttribute('type', 'text');
    lugarExtravio.setAttribute('name', 'lugarExtravio');
    lugarExtravio.setAttribute('placeholder', 'Lugar del extravío');
    form.appendChild(lugarExtravio);

    let submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerHTML = "Reportar Extravío";
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
                    console.log("La operación se realizó con éxito.");
                } else {
                    // Operación fallida
                    alert("No se pudo realizar la operación.");
                }
                document.body.removeChild(modal);
            })
            .catch(error => console.error('Error:', error));
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function editarReporte() {
    let { modal, modalContent } = crearModal();

    let form = document.createElement('form');
    form.setAttribute('method', 'post');

    let nuevoTituloPublicacion = document.createElement('input');
    nuevoTituloPublicacion.setAttribute('type', 'text');
    nuevoTituloPublicacion.setAttribute('name', 'nuevoTituloPublicacion');
    nuevoTituloPublicacion.setAttribute('placeholder', 'Nuevo título de la publicación');
    form.appendChild(nuevoTituloPublicacion);

    let nuevoTextoPublicacion = document.createElement('textarea');
    nuevoTextoPublicacion.setAttribute('name', 'nuevoTextoPublicacion');
    nuevoTextoPublicacion.setAttribute('placeholder', 'Nuevo texto de la publicación');
    form.appendChild(nuevoTextoPublicacion);

    let nuevoImagenPublicacion = document.createElement('input');
    nuevoImagenPublicacion.setAttribute('type', 'file');
    nuevoImagenPublicacion.setAttribute('name', 'nuevoImagenPublicacion');
    form.appendChild(nuevoImagenPublicacion);

    let submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerHTML = "Guardar Cambios";
    form.appendChild(submitButton);

    //Fetch para PHP
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
                    console.log("La operación se realizó con éxito.");
                } else {
                    // Operación fallida
                    alert("No se pudo realizar la operación.");
                }
                document.body.removeChild(modal);
            })
            .catch(error => console.error('Error:', error));
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function eliminarReporte() {
    let { modal, modalContent } = crearModal();

    let mensajeEliminacion = document.createElement('p');
    mensajeEliminacion.innerHTML = "¿Estás seguro de que quieres eliminar esta publicación?";
    modalContent.appendChild(mensajeEliminacion);

    let confirmarEliminacionButton = document.createElement('button');
    confirmarEliminacionButton.innerHTML = "Confirmar";
    confirmarEliminacionButton.onclick = function() {
        // Aquí la lógica para eliminar la publicación
        document.body.removeChild(modal);
    }
    modalContent.appendChild(confirmarEliminacionButton);

    let cancelarButton = document.createElement('button');
    cancelarButton.innerHTML = "Cancelar";
    cancelarButton.onclick = function() {
        document.body.removeChild(modal);
    }

    confirmarEliminacionButton.addEventListener('click', function(){
        fetch('LIGA A PHP', {
            method: 'POST',
            body: JSON.stringify({accion: 'eliminar'})
        })
            .then(response => response.text())
            .then(resultado => {
                if(resultado === '1') {
                    // Operación exitosa
                    console.log("La operación se realizó con éxito.");
                } else {
                    // Operación fallida
                    alert("No se pudo realizar la operación.");
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