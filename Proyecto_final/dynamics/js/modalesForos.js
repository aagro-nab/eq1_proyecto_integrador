async function crearForo(rol) {
    let { modal, modalContent } = crearModal();

    let nombreForo = crearInput('text', 'nombreForo', 'Nombre del Foro');
    let descripcionForo = crearTextArea('descripcionForo', 'Descripción del Foro');
    let imagenForo = crearInput('file', 'imagenForo');
    let esPublico = crearInput('checkbox', 'esPublico');
    let etiquetaPublico = crearLabel("Publico", 'esPublico');
    let submitButton = crearButton('submit', "Crear Foro");

    let form = crearFormulario([nombreForo, descripcionForo, imagenForo, esPublico, etiquetaPublico, submitButton]);

    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();

        let formData = new FormData(form);
        formData.append('accion', 'crear');
        formData.append('rol', rol);

        let response = await fetch('ProyectoFinal/Proyecto_final/dynamics/php/foro.php', {
            method: 'POST',
            body: formData
        });
        
        console.log(response);
        
        if(response.ok) {
            let resultado = await response.text();
            console.log(resultado);
            if(resultado === '1') {
                console.log("La operación se realizó con éxito.");
                alert("La operación se realizó con éxito.");
            } else {
                alert("No se pudo realizar la operación.");
            }
        } else {
            console.log("Error en la petición Fetch: ", response.status, response.statusText);
            alert("Error en la petición Fetch.");
        }
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

async function entrarForo(rol) {
    let datosFormulario = new FormData();
    datosFormulario.append('accion', 'recuperar');
    datosFormulario.append('rol', rol);

    let response = await fetch('Proyecto_final/dynamics/php/foro.php', {
        method: 'POST',
        body: datosFormulario
    });

    if (response.ok) {
        let foros = await response.json();
        let { modal, modalContent } = crearModal();

        foros.forEach(foro => {
            let foroDiv = document.createElement('div');
            foroDiv.innerHTML = foro.nombreForo;

            let unirseBoton = crearButton('button', 'Unirse');
            unirseBoton.addEventListener('click', async function() {
                let datosFormularioUnirse = new FormData();
                datosFormularioUnirse.append('accion', 'unirse');
                datosFormularioUnirse.append('foroId', foro.foroId);

                let responseUnirse = await fetch('Proyecto_final/dynamics/php/foro.php', {
                    method: 'POST',
                    body: datosFormularioUnirse
                });

                if (responseUnirse.ok) {
                    let resultado = await responseUnirse.text();
                    if (resultado === '1') {
                        console.log("Te has unido al foro con éxito.");
                        alert("Te has unido al foro con éxito.");
                    } else {
                        console.log("No se pudo unir al foro. Inténtalo más tarde.");
                        alert("No se pudo unir al foro. Inténtalo más tarde.");
                    }
                    document.body.removeChild(modal);
                } else {
                    console.log("Error en la petición Fetch: ", responseUnirse.status, responseUnirse.statusText);
                    alert("Error en la petición Fetch.");
                }
            });
            foroDiv.appendChild(unirseBoton);
            modalContent.appendChild(foroDiv);
        });

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    } else {
        console.log("Error en la petición Fetch: ", response.status, response.statusText);
        alert("Error en la petición Fetch.");
    }
}

async function editarForo(rol) {
    let datosFormulario = new FormData();
    datosFormulario.append('accion', 'editar');
    datosFormulario.append('rol', rol);

    let response = await fetch('Proyecto_final/dynamics/php/foro.php', {
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

        form.onsubmit = async (e) => {
            e.preventDefault();
            let datosFormulario = new FormData(form);

            let response = await fetch('Proyecto_final/dynamics/php/foro.php', {
                method: 'POST',
                body: datosFormulario
            });

            if(response.ok) {
                let respuesta = await response.text();
                if(respuesta === '1') {
                    alert("Foro editado con éxito.");
                    location.reload();
                } else {
                    alert("Error al editar el foro. Por favor, inténtalo de nuevo.");
                }
            } else {
                alert("Error en la petición. Por favor, inténtalo de nuevo.");
            }
        };

        modalContent.appendChild(form);
    });
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

async function salirForo(nombreUsuario) {
    let datosFormulario = new FormData();
    datosFormulario.append('accion', 'recuperar');
    datosFormulario.append('usuario', nombreUsuario);

    let response = await fetch('Proyecto_final/dynamics/php/foro.php', {
        method: 'POST',
        body: datosFormulario
    });

    let foros = await response.json();
    let { modal, modalContent } = crearModal();

    foros.forEach(foro => {
        let foroDiv = document.createElement('div');
        foroDiv.innerHTML = foro.nombreForo;

        let salirBoton = crearButton('button', 'Salir', async function() {
            let confirmarSalida = confirm("¿Estás seguro de que quieres salir de este foro?");
            if(confirmarSalida) {
                let datosFormularioSalida = new FormData();
                datosFormularioSalida.append('accion', 'salir');
                datosFormularioSalida.append('foroId', foro.foroId);

                let responseSalida = await fetch('Proyecto_final/dynamics/php/foro.php', {
                    method: 'POST',
                    body: datosFormularioSalida
                });

                let resultado = await responseSalida.text();

                if(resultado === '1') {
                    console.log("Has salido del foro con éxito.");
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

async function eliminarForo(rol) {
    let datosFormulario = new FormData();
    datosFormulario.append('accion', 'recuperar');
    datosFormulario.append('rol', rol);

    let response = await fetch('Proyecto_final/dynamics/php/foro.php', {
        method: 'POST',
        body: datosFormulario
    });

    let foros = await response.json();
    let { modal, modalContent } = crearModal();

    foros.forEach(foro => {
        let foroDiv = document.createElement('div');
        foroDiv.innerHTML = foro.nombreForo;

        let eliminarBoton = crearButton('button', 'Eliminar');
        eliminarBoton.addEventListener('click', async () => {
            let confirmarEliminacion = confirm("¿Estás seguro de que quieres eliminar este foro?");
            if(confirmarEliminacion) {
                let datosFormulario = new FormData();
                datosFormulario.append('accion', 'eliminar');
                datosFormulario.append('idForo', foro.ID_FORO);

                let response = await fetch('Proyecto_final/dynamics/php/foro.php', {
                    method: 'POST',
                    body: datosFormulario
                });

                if(response.ok) {
                    let respuesta = await response.text();
                    if(respuesta === '1') {
                        alert("El foro ha sido eliminado con éxito.");
                        location.reload();
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
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}


async function reportarForo() {
    fetch('Proyecto_final/dynamics/php/foro.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(foros => {
            let { modal, modalContent } = crearModal();

            foros.forEach(foro => {
                let foroDiv = document.createElement('div');
                foroDiv.innerHTML = foro.nombreForo;

                let reportarBoton = crearButton('button', 'Reportar', function() {
                    let comentario = prompt("Por favor, introduce tu comentario para el reporte:");

                    fetch('Proyecto_final/dynamics/php/foro.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            accion: 'reportar',
                            foroId: foro.foroId,
                            usuarioId: 'usuario'/*Debe de añadirse la lógica para obtener el usuarioID*/,
                            comentario: comentario
                        })
                    })
                        .then(response => response.text())
                        .then(resultado => {
                            if(resultado === '1') {
                                // Reporte exitoso
                                console.log("El foro ha sido reportado con éxito.");
                            } else {
                                // Reporte fallido
                                alert("No se pudo reportar el foro. Inténtalo más tarde.");
                            }
                            document.body.removeChild(modal);
                        })
                        .catch(error => console.error('Error:', error));
                });
                foroDiv.appendChild(reportarBoton);
                modalContent.appendChild(foroDiv);
            });
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("No se pueden recuperar los foros en este momento, inténtalo más tarde.");
        });
}
