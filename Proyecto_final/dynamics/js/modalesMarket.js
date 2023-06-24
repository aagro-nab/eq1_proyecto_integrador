async function crearVenta() {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Título de la venta:', 'tituloVenta'),
        crearInput('text', 'tituloVenta', 'Título de la venta'),
        crearLabel('Descripción de la venta:', 'descripcionVenta'),
        crearTextArea('descripcionVenta', 'Descripción de la venta'),
        crearLabel('Precio de la venta:', 'precioVenta'),
        crearInput('number', 'precioVenta', 'Precio de la venta'),
        crearLabel('Imagen de la venta:', 'imagenVenta'),
        crearInput('file', 'imagenVenta'),
        crearButton('submit', 'Crear Venta')
    ];

    let form = crearFormulario(contenidoFormulario);

    realizarPeticionFetch(form, '../php/foro.php');

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

async function editarVenta(ventaId, rol) {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Nuevo Título de la Venta:', 'tituloVenta'),
        crearInput('text', 'tituloVenta', 'Nuevo Título de la Venta'),
        crearLabel('Nueva Descripción de la Venta:', 'descripcionVenta'),
        crearTextArea('descripcionVenta', 'Nueva Descripción de la Venta'),
        crearLabel('Nuevo Precio de la Venta:', 'precioVenta'),
        crearInput('number', 'precioVenta', 'Nuevo Precio de la Venta'),
        crearLabel('Nueva Imagen de la Venta:', 'imagenVenta'),
        crearInput('file', 'imagenVenta'),
        crearButton('submit', 'Actualizar Detalles de Venta')
    ];

    let form = crearFormulario(contenidoFormulario);
    form.appendChild(crearInput('hidden', 'ventaId', '', ventaId));
    form.appendChild(crearInput('hidden', 'accion', '', 'editar'));
    form.appendChild(crearInput('hidden', 'rol', '', rol));

    realizarPeticionFetch(form, '../php/market.php');


    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

async function eliminarVenta(ventaId, rol) {
    let { modal, modalContent } = crearModal();

    let mensajeEliminacion = document.createElement('p');
    mensajeEliminacion.innerHTML = "¿Estás seguro de que quieres eliminar esta venta?";
    modalContent.appendChild(mensajeEliminacion);

    let confirmarEliminacionButton = crearButton('button', 'Confirmar');
    let cancelarButton = crearButton('button', 'Cancelar');
    cancelarButton.onclick = function() {
        document.body.removeChild(modal);
    }

    confirmarEliminacionButton.addEventListener('click', async function(){
        let datosFormulario = new FormData();
        datosFormulario.append('ventaId', ventaId);
        datosFormulario.append('accion', 'eliminar');
        datosFormulario.append('rol', rol);

        let response = await fetch('../php/foro.php', {
            method: 'POST',
            body: datosFormulario
        });

        let resultado = await response.text();

        if(resultado === '1') {
            // Operación exitosa
            console.log("La venta se ha eliminado con éxito.");
        } else {
            // Operación fallida
            alert("No se pudo eliminar la venta. Inténtalo más tarde.");
        }
        document.body.removeChild(modal);
    });

    modalContent.appendChild(confirmarEliminacionButton);
    modalContent.appendChild(cancelarButton);

    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}
