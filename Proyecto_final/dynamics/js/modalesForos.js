function entrarForo(rol) {
    fetch('LIGA A PHP', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({rol: rol})
    })
        .then(response => response.json())
        .then(foros => {
            let { modal, modalContent } = crearModal();

            foros.forEach(foro => {
                let foroDiv = document.createElement('div');
                foroDiv.innerHTML = foro.nombreForo;

                let unirseBoton = crearBoton('button', 'Unirse', function() {
                    fetch('LIGA A PHP', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({accion: 'unirse', foroId: foro.foroId})
                    })
                        .then(response => response.text())
                        .then(resultado => {
                            if(resultado === '1') {
                                // Operación exitosa
                                console.log("Te has unido al foro con éxito.");
                            } else {
                                // Operación fallida
                                alert("No se pudo unir al foro. Inténtalo más tarde.");
                            }
                            document.body.removeChild(modal);
                        })
                        .catch(error => console.error('Error:', error));
                });
                foroDiv.appendChild(unirseBoton);
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

function editarForo(rol) {
    fetch('LIGA A PHP', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({rol: rol})
    })
        .then(response => response.json())
        .then(foros => {
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
                etiquetaPublico.innerHTML = "Publico";
                form.appendChild(etiquetaPublico);

                let submitButton = crearBoton('submit', 'Guardar Cambios', function(e){
                    e.preventDefault();
                    let datosFormulario = new FormData(form);
                    fetch('LIGA A PHP', {
                        method: 'POST',
                        body: datosFormulario
                    })
                        .then(response => response.text())
                        .then(resultado => {
                            if(resultado === '1') {
                                // Operación exitosa
                                console.log("La operación se realizó con éxito.");
                            } else {
                                // Operación fallida
                                alert("No se pudo realizar la operación.");
                            }
                            document.body.removeChild(modal);
                        })
                        .catch(error => console.error('Error:', error));
                });
                form.appendChild(submitButton);

                modalContent.appendChild(form);
            });
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("No se pueden recuperar los foros en este momento, inténtalo más tarde.");
        });
}

function salirForo(nombreUsuario) {
    fetch('LIGA A PHP', {
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

                let salirBoton = crearBoton('button', 'Salir', function() {
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

function eliminarForo() {
    fetch('LIGA A PHP', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(foros => {
            let { modal, modalContent } = crearModal();

            foros.forEach(foro => {
                let foroDiv = document.createElement('div');
                foroDiv.innerHTML = foro.nombreForo;

                let eliminarBoton = crearBoton('button', 'Eliminar', function() {
                    let confirmarEliminacion = confirm("¿Estás seguro de que quieres eliminar este foro?");
                    if(confirmarEliminacion) {
                        fetch('LIGA A PHP', {
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

function reportarForo() {
    fetch('LIGA A PHP', {
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

                let reportarBoton = crearBoton('button', 'Reportar', function() {
                    fetch('LIGA A PHP', {
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