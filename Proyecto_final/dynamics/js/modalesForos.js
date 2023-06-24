async function crearForo() {
    let { modal, modalContent } = crearModal();

    let nombreForo = crearInput('text', 'nombreForo', 'Nombre del Foro');
    let descripcionForo = crearTextArea('descripcionForo', 'Descripción del Foro');
    let imagenForo = crearInput('file', 'imagenForo');
    let esPublico = crearInput('checkbox', 'esPublico');
    let etiquetaPublico = crearLabel("Publico", 'esPublico');
    let enviarButton = crearButton('submit', "Crear Foro");

    let form = crearFormulario([nombreForo, descripcionForo, imagenForo, esPublico, etiquetaPublico, enviarButton]);

    enviarButton.addEventListener('click', async (event) => {
        event.preventDefault();

        let formData = new FormData(form);
        formData.append('accion', 'crear');

        let response = await fetch('/ProyectoFinal/Proyecto_final/dynamics/php/modalesForos.php', {
            method: 'POST',
            body: formData
        });
        
        if(response.ok) {
            let resultado = await response.text();
            if(resultado === '1') {
                alert("La operación se realizó con éxito.");
            } else {
                alert("No se pudo realizar la operación.");
            }
        } else {
            alert("Error en la petición Fetch.");
        }
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

async function entrarForo() {
    let datosFormulario = new FormData();
    datosFormulario.append('accion', 'recuperar');

    let response = await fetch('/ProyectoFinal/Proyecto_final/dynamics/php/modalesForos.php', {
        method: 'POST',
        body: datosFormulario
    });

    if (response.ok) {
        let foros = await response.json();

        let { modal, modalContent } = crearModal();

        foros.forEach(foro => {
            let foroDiv = document.createElement('div');
            foroDiv.innerHTML = foro.nombre;

            let unirseBoton = crearButton('button', 'Unirse');
            unirseBoton.addEventListener('click', async function() {
                let datosFormularioUnirse = new FormData();
                datosFormularioUnirse.append('accion', 'unirse');
                datosFormularioUnirse.append('foroId', foro.ID_FORO);

                let responseUnirse = await fetch('/ProyectoFinal/Proyecto_final/dynamics/php/modalesForos.php', {
                    method: 'POST',
                    body: datosFormularioUnirse
                });

                if (responseUnirse.ok) {
                    let resultado = await responseUnirse.text();
                    if (resultado === '1') {
                        alert("Te has unido al foro con éxito.");
                    } else if (resultado === '2') {
                        alert("Ya eres miembro de este foro.");
                    } else {
                        alert("No se pudo unir al foro. Inténtalo más tarde.");
                    }
                    document.body.removeChild(modal);
                } else {
                    alert("Error en la petición Fetch.");
                }
            });
            foroDiv.appendChild(unirseBoton);
            modalContent.appendChild(foroDiv);
        });

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    } else {
        alert("Error en la petición Fetch.");
    }
}

async function editarForo() {
    let datosFormulario = new FormData();
    datosFormulario.append('accion', 'recuperar');

    let response = await fetch('/ProyectoFinal/Proyecto_final/dynamics/php/modalesForos.php', {
        method: 'POST',
        body: datosFormulario
    });

    let foros = await response.json();
    let { modal, modalContent } = crearModal();

    let selectForo = document.createElement('select');
    selectForo.id = "selectForo";

    foros.forEach(foro => {
        let option = document.createElement('option');
        option.value = foro.ID_FORO;
        option.text = foro.nombre;
        selectForo.appendChild(option);
    });

    modalContent.appendChild(selectForo);

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

    let enviarButton = crearButton('submit', 'Editar Foro');
    form.appendChild(enviarButton);

    form.onsubmit = async (e) => {
        e.preventDefault();
        let datosFormulario = new FormData(form);
        datosFormulario.append('accion', 'editar');
        datosFormulario.append('idForo', selectForo.value);

        let response = await fetch('/ProyectoFinal/Proyecto_final/dynamics/php/modalesForos.php', {
            method: 'POST',
            body: datosFormulario
        });

        if(response.ok) {
            let respuesta = await response.text();
            if(respuesta === '1') {
                alert("Foro editado con éxito.");
                
            } else {
                alert("Error al editar el foro. Por favor, inténtalo de nuevo.");
            }
        } else {
            alert("Error en la petición. Por favor, inténtalo de nuevo.");
        }
    };

    selectForo.onchange = function() {
        let foroSeleccionado = foros.find(foro => foro.ID_FORO == selectForo.value);

        nombreForo.value = foroSeleccionado.nombre;
        descripcionForo.value = foroSeleccionado.descripcion;
        imagenForo.value = '';
        esPublico.checked = foroSeleccionado.privacidad == 1;
    };

    selectForo.dispatchEvent(new Event('change'));

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

async function salirForo(nombreUsuario) {
    let datosFormulario = new FormData();
    datosFormulario.append('accion', 'recuperarSalida');

    let response = await fetch('/ProyectoFinal/Proyecto_final/dynamics/php/modalesForos.php', {
        method: 'POST',
        body: datosFormulario
    });

    if (response.ok) {
        let foros = await response.json();

        let {modal, modalContent} = crearModal();

        foros.forEach(foro => {
            let foroDiv = document.createElement('div');
            foroDiv.innerHTML = foro.nombre;

            let salirBoton = crearButton('button', 'Salir')
            salirBoton.addEventListener('click', async function (){
                let confirmarSalida = confirm("¿Estás seguro de que quieres salir de este foro?");
                if (confirmarSalida) {
                    let datosFormularioSalida = new FormData();
                    datosFormularioSalida.append('accion', 'salir');
                    datosFormularioSalida.append('foroId', foro.ID_FORO);

                    let responseSalida = await fetch('/ProyectoFinal/Proyecto_final/dynamics/php/modalesForos.php', {
                        method: 'POST',
                        body: datosFormularioSalida
                    });

                    let resultado = await responseSalida.text();

                    if (resultado === '1') {
                        alert("Has salido del foro con éxito.");
                    } else {
                        alert("No se pudo salir del foro. Inténtalo más tarde.");
                    }
                    document.body.removeChild(modal);
                }
            });
            foroDiv.appendChild(salirBoton);
            modalContent.appendChild(foroDiv);
        });

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }
}

async function eliminarForo() {
    alert("Esta función no está disponible actualmente, vuelve a intentarlo más tarde.");
    let status = 0;
    if (status == 1) {
        let datosFormulario = new FormData();
        datosFormulario.append('accion', 'recuperar');

        let response = await fetch('/ProyectoFinal/Proyecto_final/dynamics/php/modalesForos.php', {
            method: 'POST',
            body: datosFormulario
        });

        let foros = await response.json();
        let { modal, modalContent } = crearModal();

        foros.forEach(foro => {
            let foroDiv = document.createElement('div');
            foroDiv.innerHTML = foro.nombre;

            let eliminarBoton = crearButton('button', 'Eliminar');
            eliminarBoton.addEventListener('click', async () => {
                let confirmarEliminacion = confirm("¿Estás seguro de que quieres eliminar este foro?");
                if(confirmarEliminacion) {
                    let datosFormulario = new FormData();
                    datosFormulario.append('accion', 'eliminar');
                    datosFormulario.append('idForo', foro.ID_FORO);

                    let response = await fetch('/ProyectoFinal/Proyecto_final/dynamics/php/modalesForos.php', {
                        method: 'POST',
                        body: datosFormulario
                    });

                    if(response.ok) {
                        let respuesta = await response.text();
                        if(respuesta === '1') {
                            alert("El foro ha sido eliminado con éxito.");

                        } else {
                            alert("No se pudo eliminar el foro. Por favor, inténtalo de nuevo.");
                        }
                    } else {
                        alert("Error en la petición. Por favor, inténtalo de nuevo.");
                    }
                }
            });
            foroDiv.appendChild(eliminarBoton);
            modalContent.appendChild(foroDiv);
        });
    }

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

async function reportarForo() {
    let datosFormulario = new FormData();
    datosFormulario.append('accion', 'recuperar');

    let response = await fetch('/ProyectoFinal/Proyecto_final/dynamics/php/modalesForos.php', {
        method: 'POST',
        body: datosFormulario
    });

    let foros = await response.json();
    let { modal, modalContent } = crearModal();

    foros.forEach(foro => {
        let foroDiv = document.createElement('div');
        foroDiv.innerHTML = foro.nombre;

        let reportarBoton = crearButton('button', 'Reportar');
        reportarBoton.addEventListener('click', async () => {
            let comentario = prompt("Por favor, introduce tu comentario para el reporte:");
            if(comentario != null && comentario != '') {
                let datosFormulario = new FormData();
                datosFormulario.append('accion', 'reportar');
                datosFormulario.append('foroId', foro.ID_FORO);
                datosFormulario.append('comentario', comentario);

                let response = await fetch('/ProyectoFinal/Proyecto_final/dynamics/php/modalesForos.php', {
                    method: 'POST',
                    body: datosFormulario
                });

                if(response.ok) {
                    let respuesta = String(await response.json());
                    if(respuesta === '1') {
                        alert("El foro ha sido reportado con éxito.");
                    } else {
                        alert("No se pudo reportar el foro. Inténtalo más tarde.");
                    }
                } else {
                    alert("Error en la petición. Por favor, inténtalo de nuevo.");
                }
                document.body.removeChild(modal);
            }
        });
        foroDiv.appendChild(reportarBoton);
        modalContent.appendChild(foroDiv);
    });

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}
