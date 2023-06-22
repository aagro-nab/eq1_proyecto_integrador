function crearVenta() {
    let { modal, modalContent } = crearModal();

    let form = document.createElement('form');
    form.setAttribute('method', 'post');

    let tituloVenta = document.createElement('input');
    tituloVenta.setAttribute('type', 'text');
    tituloVenta.setAttribute('name', 'tituloVenta');
    tituloVenta.setAttribute('placeholder', 'Título de la venta');
    form.appendChild(tituloVenta);

    let descripcionVenta = document.createElement('textarea');
    descripcionVenta.setAttribute('name', 'descripcionVenta');
    descripcionVenta.setAttribute('placeholder', 'Descripción de la venta');
    form.appendChild(descripcionVenta);

    let precioVenta = document.createElement('input');
    precioVenta.setAttribute('type', 'number');
    precioVenta.setAttribute('name', 'precioVenta');
    precioVenta.setAttribute('placeholder', 'Precio de la venta');
    form.appendChild(precioVenta);

    let imagenVenta = document.createElement('input');
    imagenVenta.setAttribute('type', 'file');
    imagenVenta.setAttribute('name', 'imagenVenta');
    form.appendChild(imagenVenta);

    let submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerHTML = "Crear Venta";
    form.appendChild(submitButton);

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function editarVenta() {
    let { modal, modalContent } = crearModal();

    let form = document.createElement('form');
    form.setAttribute('method', 'post');

    let tituloVentaInput = document.createElement('input');
    tituloVentaInput.className = 'input-datos';
    tituloVentaInput.setAttribute('type', 'text');
    tituloVentaInput.setAttribute('name', 'tituloVenta');
    tituloVentaInput.setAttribute('placeholder', 'Nuevo Título de la Venta');
    form.appendChild(tituloVentaInput);

    let descripcionVentaInput = document.createElement('textarea');
    descripcionVentaInput.className = 'input-datos';
    descripcionVentaInput.setAttribute('name', 'descripcionVenta');
    descripcionVentaInput.setAttribute('placeholder', 'Nueva Descripción de la Venta');
    form.appendChild(descripcionVentaInput);

    let precioVentaInput = document.createElement('input');
    precioVentaInput.className = 'input-datos';
    precioVentaInput.setAttribute('type', 'number');
    precioVentaInput.setAttribute('name', 'precioVenta');
    precioVentaInput.setAttribute('placeholder', 'Nuevo Precio de la Venta');
    form.appendChild(precioVentaInput);

    let imagenVentaInput = document.createElement('input');
    imagenVentaInput.className = 'input-datos';
    imagenVentaInput.setAttribute('type', 'file');
    imagenVentaInput.setAttribute('name', 'imagenVenta');
    form.appendChild(imagenVentaInput);

    let submitButton = document.createElement('button');
    submitButton.className = 'boton-submit';
    submitButton.setAttribute('type', 'submit');
    submitButton.innerHTML = 'Actualizar Detalles de Venta';
    form.appendChild(submitButton);

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function eliminarVenta() {
    let { modal, modalContent } = crearModal();

    let mensajeEliminacion = document.createElement('p');
    mensajeEliminacion.innerHTML = '¿Estás seguro que deseas eliminar esta venta?';
    modalContent.appendChild(mensajeEliminacion);

    let confirmarButton = document.createElement('button');
    confirmarButton.className = 'boton-submit';
    confirmarButton.innerHTML = 'Confirmar';
    modalContent.appendChild(confirmarButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}