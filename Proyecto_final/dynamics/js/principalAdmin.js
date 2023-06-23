window.addEventListener("resize", checkResolution);
// Selecciona los botones que se mostrarán u ocultarán
var hr = document.getElementById('hr');
var crearNuevoButton = document.getElementById('crearNuevoButton');
var crearNuevoButton2 = document.getElementById('crearNuevoButton2');
var crearNuevoButton3 = document.getElementById('crearNuevoButton3');
var crearNuevoButton4 = document.getElementById('crearNuevoButton4');
var crearNuevoButton5 = document.getElementById('crearNuevoButton5');
var crearNuevoButton6 = document.getElementById('crearNuevoButton6');
var crearNuevoButton7 = document.getElementById('crearNuevoButton7');
var crearNuevoButton8 = document.getElementById('crearNuevoButton8');
var crearNuevoButton9 = document.getElementById('crearNuevoButton9');
var crearNuevoButton10 = document.getElementById('crearNuevoButton10');

window.onload = function() {
    var activeButton = localStorage.getItem('activeButton');
    if (activeButton) {
        changeView(activeButton);
    } else {
        changeView('Foros');
    }
};
function obtenerPublicaciones(view) {
    fetch('../php/foro.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vista: view }),
    })
        .then(respuesta => respuesta.json())
        .then(publicaciones => {
            let divPublicaciones = document.getElementById('divPublicaciones');
            publicaciones.forEach(publicacion => {
                let publicacionDiv = document.createElement('div');

                let titulo = document.createElement('h2');
                titulo.innerText = publicacion.titulo;
                publicacionDiv.appendChild(titulo);

                let imagen = document.createElement('img');
                imagen.src = publicacion.imagen;
                publicacionDiv.appendChild(imagen);

                let texto = document.createElement('p');
                texto.innerText = publicacion.texto;
                publicacionDiv.appendChild(texto);

                let autor = document.createElement('p');
                autor.innerText = "Publicado por: " + publicacion.autor;
                publicacionDiv.appendChild(autor);

                let fotoPerfil = document.createElement('img');
                fotoPerfil.src = publicacion.fotoPerfil;
                publicacionDiv.appendChild(fotoPerfil);

                // Agregar comentarios
                let comentariosDiv = document.createElement('div');
                publicacion.comentarios.forEach(comentario => {
                    let comentarioP = document.createElement('p');
                    comentarioP.innerText = comentario.autor + ": " + comentario.texto;
                    comentariosDiv.appendChild(comentarioP);
                });
                publicacionDiv.appendChild(comentariosDiv);

                divPublicaciones.appendChild(publicacionDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Asigna la función de cambio de vista a cada botón
document.getElementById('forosButton').addEventListener('click', function() {
    localStorage.setItem('activeButton', this.dataset.text);
    changeView(this.dataset.text);
});

document.getElementById('preguntasButton').addEventListener('click', function() {
    localStorage.setItem('activeButton', this.dataset.text);
    changeView(this.dataset.text);
});
document.getElementById('extraviosButton').addEventListener('click', function() {
    localStorage.setItem('activeButton', this.dataset.text);
    changeView(this.dataset.text);
});
document.getElementById('marketButton').addEventListener('click', function() {
    localStorage.setItem('activeButton', this.dataset.text);
    changeView(this.dataset.text);
});

async function changeView(view) {
    let buttons = [crearNuevoButton, crearNuevoButton2, crearNuevoButton3, crearNuevoButton4, crearNuevoButton5, crearNuevoButton6, crearNuevoButton7, crearNuevoButton8, crearNuevoButton9, crearNuevoButton10];

    // Desasignar las funciones actuales de los botones
    for (let btn of buttons) {
        if (btn.currentHandler) {
            btn.removeEventListener('click', btn.currentHandler);
        }
    }

    switch (view) {
        case 'Foros':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear foro</span>";
            crearNuevoButton2.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear publicacion</span>";
            crearNuevoButton3.innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar publicacion</span>";
            crearNuevoButton4.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Comentar publicacion</span>";
            crearNuevoButton5.innerHTML = "<i class='fas fa-sign-in-alt'></i><span class='button-text'> Entrar a un foro</span>";
            crearNuevoButton6.innerHTML = "<i class='fas fa-sign-out-alt'></i><span class='button-text'> Salir de un foro</span>";
            crearNuevoButton7.innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar foro</span>";
            crearNuevoButton8.innerHTML = "<i class='fas fa-trash-alt'></i><span class='button-text'> Eliminar foros</span>";
            crearNuevoButton9.innerHTML = "<i class='fas fa-user-plus'></i><span class='button-text'> Asignar moderador</span>";
            crearNuevoButton10.innerHTML = "<i class='fas fa-user-edit'></i><span class='button-text'> Modificar datos</span>";

            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'block';
            crearNuevoButton3.style.display = 'block';
            crearNuevoButton4.style.display = 'block';
            crearNuevoButton5.style.display = 'block';
            crearNuevoButton6.style.display = 'block';
            crearNuevoButton7.style.display = 'block';
            crearNuevoButton8.style.display = 'block';
            crearNuevoButton9.style.display = 'block';
            crearNuevoButton10.style.display = 'block';


            crearNuevoButton.addEventListener('click', await crearForo);
            crearNuevoButton2.addEventListener('click', await crearPublicacion);
            crearNuevoButton3.addEventListener('click', await editarPublicacion);
            crearNuevoButton4.addEventListener('click', await crearComentario);
            crearNuevoButton5.addEventListener('click', async () => await entrarForo(2));
            crearNuevoButton6.addEventListener('click', async () => await salirForo(2));
            crearNuevoButton7.addEventListener('click', async () => await editarForo(2));
            crearNuevoButton8.addEventListener('click', await eliminarForo);
            crearNuevoButton9.addEventListener('click', await asignarModerador);
            crearNuevoButton10.addEventListener('click', await modificarDatos);

            crearNuevoButton.currentHandler = crearForo;
            crearNuevoButton.addEventListener('click', crearNuevoButton.currentHandler);
            crearNuevoButton2.currentHandler = crearPublicacion;
            crearNuevoButton2.addEventListener('click', crearNuevoButton2.currentHandler);
            crearNuevoButton3.currentHandler = editarPublicacion;
            crearNuevoButton3.addEventListener('click', crearNuevoButton3.currentHandler);
            crearNuevoButton4.currentHandler = crearComentario;
            crearNuevoButton4.addEventListener('click', crearNuevoButton4.currentHandler);
            crearNuevoButton5.currentHandler = () => entrarForo(2);
            crearNuevoButton5.addEventListener('click', crearNuevoButton5.currentHandler);
            crearNuevoButton6.currentHandler = salirForo;
            crearNuevoButton6.addEventListener('click', crearNuevoButton6.currentHandler);
            crearNuevoButton7.currentHandler = editarForo;
            crearNuevoButton7.addEventListener('click', crearNuevoButton7.currentHandler);
            crearNuevoButton8.currentHandler = eliminarForo;
            crearNuevoButton8.addEventListener('click', crearNuevoButton8.currentHandler);
            crearNuevoButton9.currentHandler = asignarModerador;
            crearNuevoButton9.addEventListener('click', crearNuevoButton9.currentHandler);
            crearNuevoButton10.currentHandler = modificarDatos;
            crearNuevoButton10.addEventListener('click', crearNuevoButton10.currentHandler);

            break;
        case 'Preguntas':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear pregunta</span>";
            crearNuevoButton2.innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar pregunta</span>";
            crearNuevoButton3.innerHTML = "<i class='fas fa-trash-alt'></i><span class='button-text'> Eliminar pregunta</span>";
            crearNuevoButton4.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear comentario</span>";
            crearNuevoButton5.innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar comentario</span>";
            crearNuevoButton6.innerHTML = "<i class='fas fa-trash-alt'></i><span class='button-text'> Eliminar comentario</span>";
            crearNuevoButton7.innerHTML = "<i class='fas fa-user-plus'></i><span class='button-text'> Asignar moderador</span>";
            crearNuevoButton8.innerHTML = "<i class='fas fa-user-edit'></i><span class='button-text'> Modificar datos</span>";

            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'block';
            crearNuevoButton3.style.display = 'block';
            crearNuevoButton4.style.display = 'block';
            crearNuevoButton5.style.display = 'block';
            crearNuevoButton6.style.display = 'block';
            crearNuevoButton7.style.display = 'block';
            crearNuevoButton8.style.display = 'block';
            crearNuevoButton9.style.display = 'none';
            crearNuevoButton10.style.display = 'none';


            crearNuevoButton.addEventListener('click', crearPregunta);
            crearNuevoButton2.addEventListener('click', editarPregunta);
            crearNuevoButton3.addEventListener('click', eliminarPregunta);
            crearNuevoButton4.addEventListener('click', crearComentario);
            crearNuevoButton5.addEventListener('click', editarComentario);
            crearNuevoButton6.addEventListener('click', eliminarComentario);
            crearNuevoButton7.addEventListener('click', asignarModerador);
            crearNuevoButton8.addEventListener('click', modificarDatos);

            crearNuevoButton.currentHandler = crearPregunta;
            crearNuevoButton.addEventListener('click', crearNuevoButton.currentHandler);
            crearNuevoButton2.currentHandler = editarPregunta;
            crearNuevoButton2.addEventListener('click', crearNuevoButton2.currentHandler);
            crearNuevoButton3.currentHandler = eliminarPregunta;
            crearNuevoButton3.addEventListener('click', crearNuevoButton3.currentHandler);
            crearNuevoButton4.currentHandler = crearComentario;
            crearNuevoButton4.addEventListener('click', crearNuevoButton4.currentHandler);
            crearNuevoButton5.currentHandler = editarComentario;
            crearNuevoButton5.addEventListener('click', crearNuevoButton5.currentHandler);
            crearNuevoButton6.currentHandler = eliminarComentario;
            crearNuevoButton6.addEventListener('click', crearNuevoButton6.currentHandler);
            crearNuevoButton7.currentHandler = asignarModerador;
            crearNuevoButton7.addEventListener('click', crearNuevoButton7.currentHandler);
            crearNuevoButton8.currentHandler = modificarDatos;
            crearNuevoButton8.addEventListener('click', crearNuevoButton8.currentHandler);

            obtenerPublicaciones(view);
            break;
        case 'Extravios':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Reportar extravío</span>";
            crearNuevoButton2.innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar reporte</span>";
            crearNuevoButton3.innerHTML = "<i class='fas fa-trash-alt'></i><span class='button-text'> Eliminar reporte</span>";
            crearNuevoButton4.innerHTML = "<i class='fas fa-user-plus'></i><span class='button-text'> Asignar moderador</span>";

            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'block';
            crearNuevoButton3.style.display = 'block';
            crearNuevoButton4.style.display = 'block';
            crearNuevoButton5.style.display = 'none';
            crearNuevoButton6.style.display = 'none';
            crearNuevoButton7.style.display = 'none';
            crearNuevoButton8.style.display = 'none';
            crearNuevoButton9.style.display = 'none';
            crearNuevoButton10.style.display = 'none';


            crearNuevoButton.addEventListener('click', reportarExtravio);
            crearNuevoButton2.addEventListener('click', editarReporte);
            crearNuevoButton3.addEventListener('click', eliminarReporte);
            crearNuevoButton4.addEventListener('click', asignarModerador);

            crearNuevoButton.currentHandler = reportarExtravio;
            crearNuevoButton.addEventListener('click', crearNuevoButton.currentHandler);
            crearNuevoButton2.currentHandler = editarReporte;
            crearNuevoButton2.addEventListener('click', crearNuevoButton2.currentHandler);
            crearNuevoButton3.currentHandler = eliminarReporte;
            crearNuevoButton3.addEventListener('click', crearNuevoButton3.currentHandler);
            crearNuevoButton4.currentHandler = asignarModerador;
            crearNuevoButton4.addEventListener('click', crearNuevoButton4.currentHandler);

            obtenerPublicaciones(view);
            break;
        case 'Market':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear venta</span>";
            crearNuevoButton2.innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar detalles</span>";
            crearNuevoButton3.innerHTML = "<i class='fas fa-trash-alt'></i><span class='button-text'> Eliminar venta</span>";
            crearNuevoButton4.innerHTML = "<i class='fas fa-user-plus'></i><span class='button-text'> Asignar moderador</span>";

            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'block';
            crearNuevoButton3.style.display = 'block';
            crearNuevoButton4.style.display = 'block';
            crearNuevoButton5.style.display = 'none';
            crearNuevoButton6.style.display = 'none';
            crearNuevoButton7.style.display = 'none';
            crearNuevoButton8.style.display = 'none';
            crearNuevoButton9.style.display = 'none';
            crearNuevoButton10.style.display = 'none';


            crearNuevoButton.addEventListener('click', crearVenta);
            crearNuevoButton2.addEventListener('click', editarVenta);
            crearNuevoButton3.addEventListener('click', eliminarVenta);
            crearNuevoButton4.addEventListener('click', asignarModerador);

            crearNuevoButton.currentHandler = crearVenta;
            crearNuevoButton.addEventListener('click', crearNuevoButton.currentHandler);
            crearNuevoButton2.currentHandler = editarVenta;
            crearNuevoButton2.addEventListener('click', crearNuevoButton2.currentHandler);
            crearNuevoButton3.currentHandler = eliminarVenta;
            crearNuevoButton3.addEventListener('click', crearNuevoButton3.currentHandler);
            crearNuevoButton4.currentHandler = asignarModerador;
            crearNuevoButton4.addEventListener('click', crearNuevoButton4.currentHandler);

            obtenerPublicaciones(view);
            break;
    }
    // Cambia la URL sin recargar la página
    history.pushState({}, '', '/' + view.toLowerCase());
}

function checkResolution() {
    let buttonTexts = document.getElementsByClassName("button-text");
    if (window.innerWidth <= 720) {
        for (let i = 0; i < buttonTexts.length; i++) {
            buttonTexts[i].style.display = "none";
        }
    } else {
        for (let i = 0; i < buttonTexts.length; i++) {
            buttonTexts[i].style.display = "inline";
        }
    }
}

checkResolution();