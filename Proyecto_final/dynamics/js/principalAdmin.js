window.addEventListener("resize", checkResolution);
// Selecciona los botones que se mostrarán u ocultarán
var hrButton = document.getElementById('hrButton');
var crearNuevoButton = document.getElementById('crearNuevoButton');
var crearNuevoButton2 = document.getElementById('crearNuevoButton2');
var crearNuevoButton3 = document.getElementById('crearNuevoButton3');
var crearNuevoButton4 = document.getElementById('crearNuevoButton4');
var crearNuevoButton5 = document.getElementById('crearNuevoButton5');
var crearNuevoButton6 = document.getElementById('crearNuevoButton6');

// Asigna la función de cambio de vista a cada botón
document.getElementById('forosButton').addEventListener('click', function() {
    localStorage.setItem('activeButton', this.dataset.text);
    changeView(this.dataset.text);
});

document.getElementById('preguntasButton').addEventListener('click', function() {
    changeView('Preguntas');
});
document.getElementById('extraviosButton').addEventListener('click', function() {
    changeView('Extravios');
});
document.getElementById('marketButton').addEventListener('click', function() {
    changeView('Market');
});

function changeView(view) {
    switch(view) {
        case 'Foros':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear foro</span>";
            crearNuevoButton2.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear publicacion</span>";
            crearNuevoButton3.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Editar publicacion</span>";
            crearNuevoButton4.innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar foro</span>";
            crearNuevoButton5.innerHTML = "<i class='fas fa-sign-out-alt'></i><span class='button-text'> Salir de un foro</span>";
            crearNuevoButton6.innerHTML = "<i class='fas fa-user-plus'></i><span class='button-text'> Asignar moderador</span>";
            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'block';
            crearNuevoButton3.style.display = 'block';
            crearNuevoButton4.style.display = 'block';
            crearNuevoButton5.style.display = 'block';
            crearNuevoButton6.style.display = 'block';
            crearNuevoButton.addEventListener('click', crearForo);
            crearNuevoButton2.addEventListener('click', crearPublicacion);
            crearNuevoButton3.addEventListener('click', editarPublicacion);
            crearNuevoButton4.addEventListener('click', editarForo);
            crearNuevoButton5.addEventListener('click', salirForo);
            crearNuevoButton6.addEventListener('click', asignarModerador);
            break;
        case 'Preguntas':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear pregunta</span>";
            crearNuevoButton2.innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar pregunta</span>";
            crearNuevoButton3.innerHTML = "<i class='fas fa-trash-alt'></i><span class='button-text'> Eliminar pregunta</span>";
            crearNuevoButton4.innerHTML = "<i class='fas fa-user-plus'></i><span class='button-text'> Asignar moderador</span>";
            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'block';
            crearNuevoButton3.style.display = 'block';
            crearNuevoButton4.style.display = 'block';
            crearNuevoButton5.style.display = 'none';
            crearNuevoButton6.style.display = 'none';
            crearNuevoButton.addEventListener('click', crearPregunta);
            crearNuevoButton2.addEventListener('click', editarPregunta);
            crearNuevoButton3.addEventListener('click', eliminarPregunta);
            crearNuevoButton4.addEventListener('click', asignarModerador);
            break;
        case 'Extravios':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Reportar extravío</span>";
            crearNuevoButton2.innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar publicación</span>";
            crearNuevoButton3.innerHTML = "<i class='fas fa-trash-alt'></i><span class='button-text'> Eliminar publicación</span>";
            crearNuevoButton4.innerHTML = "<i class='fas fa-user-plus'></i><span class='button-text'> Asignar moderador</span>";

            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'block';
            crearNuevoButton3.style.display = 'block';
            crearNuevoButton4.style.display = 'block';
            crearNuevoButton5.style.display = 'none';
            crearNuevoButton6.style.display = 'none';
            crearNuevoButton.addEventListener('click', reportarExtravio);
            crearNuevoButton2.addEventListener('click', editarPublicacion);
            crearNuevoButton3.addEventListener('click', eliminarPublicacion);
            crearNuevoButton4.addEventListener('click', asignarModerador);
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
            crearNuevoButton.addEventListener('click', crearVenta);
            crearNuevoButton2.addEventListener('click', editarVenta);
            crearNuevoButton3.addEventListener('click', eliminarVenta);
            crearNuevoButton4.addEventListener('click', asignarModerador);
            break;
    }

    // Muestra los botones
    hrButton.style.display = 'block';

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