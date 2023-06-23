//ESTE JAVASCRIPT CONTIENE LAS FUNCIONES PARA CREAR LOS CAMPOS NECESARIOS QUE NECESITAN LOS FORMS
function crearModal() {
    let modal = document.createElement('div');
    modal.className = 'main-modal';

    // Crear el contenido del modal
    let modalContent = document.createElement('article');
    modalContent.className = 'iniciosesion modal-content';

    // Agregar un botón de cerrar
    let close = document.createElement('button');
    close.className = 'modal-close';
    close.innerHTML = "&times;";
    close.onclick = function () {
        document.body.removeChild(modal);
    }
    modalContent.appendChild(close);
    return { modal, modalContent };
}

function crearLabel(texto, inputId) {
    let label = document.createElement('label');
    label.setAttribute('for', inputId);
    label.innerHTML = texto;
    return label;
}

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

function crearSelect(id, opciones) {
    let select = document.createElement('select');
    select.setAttribute('id', id);

    opciones.forEach(opcion => {
        let option = document.createElement('option');
        option.value = opcion;
        option.text = opcion;
        select.appendChild(option);
    });

    return select;
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