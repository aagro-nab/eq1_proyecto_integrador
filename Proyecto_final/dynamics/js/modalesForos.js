async function crearForo() {
    let { modal, modalContent } = crearModal();

    let nombreForo = crearInput('text', 'nombreForo', 'Nombre del Foro');
    let descripcionForo = crearTextArea('descripcionForo', 'Descripción del Foro');
    let imagenForo = crearInput('file', 'imagenForo');
    let esPublico = crearInput('checkbox', 'esPublico');
    let etiquetaPublico = crearLabel("Publico", 'esPublico');
    let submitButton = crearButton('submit', "Crear Foro");

    let form = crearFormulario([nombreForo, descripcionForo, imagenForo, esPublico, etiquetaPublico, submitButton]);

    realizarPeticionFetch(form, 'LIGA A PHP');

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

async function entrarForo(rol) {
    let datosFormulario = new FormData();
    datosFormulario.append('accion', 'entrar');
    datosFormulario.append('rol', rol);

    let response = await fetch('../', {
        method: 'POST',
        body: datosFormulario
    });

    let foros = await response.json();
    let { modal, modalContent } = crearModal();

    foros.forEach(foro => {
        let foroDiv = document.createElement('div');
        foroDiv.innerHTML = foro.nombreForo;

        let unirseBoton = crearButton('button', 'Unirse', async function() {
            let datosFormularioUnirse = new FormData();
            datosFormularioUnirse.append('accion', 'unirse');
            datosFormularioUnirse.append('foroId', foro.foroId);

            let response = await fetch('LIGA A PHP', {
                method: 'POST',
                body: datosFormularioUnirse
            });

            let resultado = await response.text();

            if(resultado === '1') {
                console.log("Te has unido al foro con éxito.");
            } else {
                alert("No se pudo unir al foro. Inténtalo más tarde.");
            }
            document.body.removeChild(modal);
        });
        foroDiv.appendChild(unirseBoton);
        modalContent.appendChild(foroDiv);
    });
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

async function editarForo(rol) {
    let datosFormulario = new FormData();
    datosFormulario.append('accion', 'editar');
    datosFormulario.append('rol', rol);

    let response = await fetch('LIGA A PHP', {
        method: 'POST',
        body: datosFormulario
    });

    let foros = await response.json();
    let { modal, modalContent } = crearModal();

    foros.forEach(foro => {
        let form = document.createElement('form');
        form.setAttribute('method', 'post');

        let nombreForo = crearInput('text', 'nombreForo', 'Nuevo Nombre del Foro');
        form.appendChild(nombreForo);

        let descripcionForo = crearTextArea('descripcionForo', 'Nueva Descripción del Foro');
        form.appendChild(descripcionForo);

        let imagenForo = crearInput('file', 'imagenForo');
        form.appendChild(imagenForo);

        let esPublico = crearInput('checkbox', 'esPublico');
        form.appendChild(esPublico);

        let etiquetaPublico = document.createElement('label');
        etiquetaPublico.setAttribute('for', 'esPublico');
        etiquetaPublico.innerHTML = "Público";
        form.appendChild(etiquetaPublico);

        let submitButton = crearButton('submit', 'Editar Foro');
        form.appendChild(submitButton);

        realizarPeticionFetch(form, 'LIGA A PHP');

        modalContent.appendChild(form);
    });
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}