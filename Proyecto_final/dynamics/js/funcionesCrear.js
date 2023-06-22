//ESTE JAVASCRIPT CONTIENE LAS FUNCIONES PARA CREAR LOS CAMPOS NECESARIOS QUE NECESITAN LOS FORMS
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