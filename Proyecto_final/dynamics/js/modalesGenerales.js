function crearModal () {
    let modal = document.createElement('div');
    modal.style.display = 'block';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0,0,0,0.4)';

    // Crear el contenido del modal
    let modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#ff6c6c';
    modalContent.style.margin = '15% auto';
    modalContent.style.padding = '20px';
    modalContent.style.border = '1px solid #888';
    modalContent.style.width = '80%';

    // Agregar un botón de cerrar
    let close = document.createElement('span');
    close.style.color = '#aaa';
    close.style.float = 'right';
    close.style.fontSize = '28px';
    close.style.fontWeight = 'bold';
    close.innerHTML = "&times;";
    close.onclick = function () {
        document.body.removeChild(modal);
    }
    modalContent.appendChild(close);
    return { modal, modalContent };
}

function crearPublicacion() {
    let { modal, modalContent } = crearModal();

    let form = document.createElement('form');
    form.setAttribute('method', 'post');

    let tituloPublicacion = document.createElement('input');
    tituloPublicacion.setAttribute('type', 'text');
    tituloPublicacion.setAttribute('name', 'tituloPublicacion');
    tituloPublicacion.setAttribute('placeholder', 'Título de la Publicación');
    form.appendChild(tituloPublicacion);

    let textoPublicacion = document.createElement('textarea');
    textoPublicacion.setAttribute('name', 'textoPublicacion');
    textoPublicacion.setAttribute('placeholder', 'Texto de la Publicación');
    form.appendChild(textoPublicacion);

    let imagenPublicacion = document.createElement('input');
    imagenPublicacion.setAttribute('type', 'file');
    imagenPublicacion.setAttribute('name', 'imagenPublicacion');
    form.appendChild(imagenPublicacion);

    let estiloTexto = document.createElement('select');
    estiloTexto.setAttribute('name', 'estiloTexto');
    let opciones = ['Normal', 'Negrita', 'Cursiva', 'Subrayado'];
    for(let i = 0; i < opciones.length; i++) {
        let opcion = document.createElement('option');
        opcion.value = opciones[i];
        opcion.text = opciones[i];
        estiloTexto.appendChild(opcion);
    }
    form.appendChild(estiloTexto);

    let submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerHTML = "Crear Publicación";
    form.appendChild(submitButton);

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}