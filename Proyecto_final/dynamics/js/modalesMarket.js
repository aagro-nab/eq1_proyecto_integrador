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

