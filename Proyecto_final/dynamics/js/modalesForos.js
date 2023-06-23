async function crearForo() {
    let { modal, modalContent } = crearModal();

    let nombreForo = crearInput('text', 'nombreForo', 'Nombre del Foro');
    let descripcionForo = crearTextArea('descripcionForo', 'Descripción del Foro');
    let imagenForo = crearInput('file', 'imagenForo');
    let esPublico = crearInput('checkbox', 'esPublico');
    let etiquetaPublico = crearLabel("Publico", 'esPublico');
    let submitButton = crearButton('submit', "Crear Foro");

    let form = crearFormulario([nombreForo, descripcionForo, imagenForo, esPublico, etiquetaPublico, submitButton]);

    await realizarPeticionFetch(form, '../php/foro.php');

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

async function entrarForo(rol) {
    let datosFormulario = new FormData();
    datosFormulario.append('accion', 'entrar');
    datosFormulario.append('rol', rol);

    let response = await fetch('../php/foro.php', {
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

            let response = await fetch('../php/foro.php', {
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

    let response = await fetch('../php/foro.php', {
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

        realizarPeticionFetch(form, '../php/foro.php');

        modalContent.appendChild(form);
    });
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}
async function salirForo(nombreUsuario) {
    fetch('../php/foro.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({usuario: nombreUsuario})
    })
        .then(response => response.json())
        .then(foros => {
            let { modal, modalContent } = crearModal();

            foros.forEach(foro => {
                let foroDiv = document.createElement('div');
                foroDiv.innerHTML = foro.nombreForo;

                let salirBoton = crearButton('button', 'Salir', function() {
                    let confirmarSalida = confirm("¿Estás seguro de que quieres salir de este foro?");
                    if(confirmarSalida) {
                        fetch('LIGA A PHP', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({accion: 'salir', foroId: foro.foroId})
                        })
                            .then(response => response.text())
                            .then(resultado => {
                                if(resultado === '1') {
                                    // Operación exitosa
                                    console.log("Has salido del foro con éxito.");
                                } else {
                                    // Operación fallida
                                    alert("No se pudo salir del foro. Inténtalo más tarde.");
                                }
                                document.body.removeChild(modal);
                            })
                            .catch(error => console.error('Error:', error));
                    }
                });
                foroDiv.appendChild(salirBoton);
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

async function eliminarForo() {
    fetch('../php/foro.php', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(foros => {
            let { modal, modalContent } = crearModal();

            foros.forEach(foro => {
                let foroDiv = document.createElement('div');
                foroDiv.innerHTML = foro.nombreForo;

                let eliminarBoton = crearButton('button', 'Eliminar', function() {
                    let confirmarEliminacion = confirm("¿Estás seguro de que quieres eliminar este foro?");
                    if(confirmarEliminacion) {
                        fetch('../php/foro.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({accion: 'eliminar', foroId: foro.foroId})
                        })
                            .then(response => response.text())
                            .then(resultado => {
                                if(resultado === '1') {
                                    // Operación exitosa
                                    console.log("El foro ha sido eliminado con éxito.");
                                } else {
                                    // Operación fallida
                                    alert("No se pudo eliminar el foro. Inténtalo más tarde.");
                                }
                                document.body.removeChild(modal);
                            })
                            .catch(error => console.error('Error:', error));
                    }
                });
                foroDiv.appendChild(eliminarBoton);
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

async function reportarForo() {
    fetch('../php/foro.php', {
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
                    fetch('../php/foro.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({accion: 'reportar', foroId: foro.foroId})
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