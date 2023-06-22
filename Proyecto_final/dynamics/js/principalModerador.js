window.addEventListener("resize", checkResolution);
// Selecciona los botones que se mostrarán u ocultarán
var hrButton = document.getElementById('hrButton');
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

function changeView(view) {
    let buttons = [crearNuevoButton, crearNuevoButton2, crearNuevoButton3, crearNuevoButton4, crearNuevoButton5, crearNuevoButton6, crearNuevoButton7, crearNuevoButton8, crearNuevoButton9, crearNuevoButton10];

    // Desasignar las funciones actuales de los botones
    for(let btn of buttons) {
        if (btn.currentHandler) {
            btn.removeEventListener('click', btn.currentHandler);
        }
    }

    switch(view) {
        case 'Foros':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear foro</span>";
            crearNuevoButton2.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear publicacion</span>";
            crearNuevoButton3.innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar publicacion</span>";
            crearNuevoButton4.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Comentar publicacion</span>";
            crearNuevoButton5.innerHTML = "<i class='fas fa-sign-in-alt'></i><span class='button-text'> Entrar a un foro</span>";
            crearNuevoButton6.innerHTML = "<i class='fas fa-sign-out-alt'></i><span class='button-text'> Salir de un foro</span>";
            crearNuevoButton7.innerHTML = "<i class='fas fa-exclamation-triangle'></i><span class='button-text'> Reportar foro</span>";
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

            crearNuevoButton.addEventListener('click', crearForo);
            crearNuevoButton2.addEventListener('click', crearPublicacion);
            crearNuevoButton3.addEventListener('click', editarPublicacion);
            crearNuevoButton4.addEventListener('click', crearComentario);
            crearNuevoButton5.addEventListener('click', () => entrarForo(1));

            crearNuevoButton6.addEventListener('click', salirForo);
            crearNuevoButton7.addEventListener('click', reportarForo);
            crearNuevoButton8.addEventListener('click', modificarDatos);

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
            crearNuevoButton7.currentHandler = reportarForo();
            crearNuevoButton7.addEventListener('click', crearNuevoButton7.currentHandler);
            crearNuevoButton8.currentHandler = modificarDatos;
            crearNuevoButton8.addEventListener('click', crearNuevoButton8.currentHandler);
            break;
        case 'Preguntas':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear pregunta</span>";
            crearNuevoButton2.innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar pregunta</span>";
            crearNuevoButton3.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear comentario</span>";
            crearNuevoButton4.innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar comentario</span>";
            crearNuevoButton5.innerHTML = "<i class='fas fa-user-edit'></i><span class='button-text'> Modificar datos</span>";

            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'block';
            crearNuevoButton3.style.display = 'block';
            crearNuevoButton4.style.display = 'block';
            crearNuevoButton5.style.display = 'block';
            crearNuevoButton6.style.display = 'none';
            crearNuevoButton7.style.display = 'none';
            crearNuevoButton8.style.display = 'none';
            crearNuevoButton9.style.display = 'none';
            crearNuevoButton10.style.display = 'none';

            crearNuevoButton.addEventListener('click', crearPregunta);
            crearNuevoButton2.addEventListener('click', editarPregunta);
            crearNuevoButton3.addEventListener('click', crearComentario);
            crearNuevoButton4.addEventListener('click', editarComentario);
            crearNuevoButton5.addEventListener('click', modificarDatos);

            crearNuevoButton.currentHandler = crearPregunta;
            crearNuevoButton.addEventListener('click', crearNuevoButton.currentHandler);
            crearNuevoButton2.currentHandler = editarPregunta;
            crearNuevoButton2.addEventListener('click', crearNuevoButton2.currentHandler);
            crearNuevoButton4.currentHandler = crearComentario;
            crearNuevoButton4.addEventListener('click', crearNuevoButton3.currentHandler);
            crearNuevoButton5.currentHandler = editarComentario;
            crearNuevoButton5.addEventListener('click', crearNuevoButton4.currentHandler);
            crearNuevoButton8.currentHandler = modificarDatos;
            crearNuevoButton8.addEventListener('click', crearNuevoButton5.currentHandler);
            break;
        case 'Extravios':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Reportar extravío</span>";
            crearNuevoButton2.innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar reporte</span>";

            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'block';
            crearNuevoButton3.style.display = 'none';
            crearNuevoButton4.style.display = 'none';
            crearNuevoButton5.style.display = 'none';
            crearNuevoButton6.style.display = 'none';
            crearNuevoButton7.style.display = 'none';
            crearNuevoButton8.style.display = 'none';
            crearNuevoButton9.style.display = 'none';
            crearNuevoButton10.style.display = 'none';

            crearNuevoButton.addEventListener('click', reportarExtravio);
            crearNuevoButton2.addEventListener('click', editarReporte);

            crearNuevoButton.currentHandler = reportarExtravio;
            crearNuevoButton.addEventListener('click', crearNuevoButton.currentHandler);
            crearNuevoButton2.currentHandler = editarReporte;
            crearNuevoButton2.addEventListener('click', crearNuevoButton2.currentHandler);
            break;
        case 'Market':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear venta</span>";
            crearNuevoButton2.innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar detalles</span>";

            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'block';
            crearNuevoButton3.style.display = 'none';
            crearNuevoButton4.style.display = 'none';
            crearNuevoButton5.style.display = 'none';
            crearNuevoButton6.style.display = 'none';
            crearNuevoButton7.style.display = 'none';
            crearNuevoButton8.style.display = 'none';
            crearNuevoButton9.style.display = 'none';
            crearNuevoButton10.style.display = 'none';

            crearNuevoButton.addEventListener('click', crearVenta);
            crearNuevoButton2.addEventListener('click', editarVenta);

            crearNuevoButton.currentHandler = crearVenta;
            crearNuevoButton.addEventListener('click', crearNuevoButton.currentHandler);
            crearNuevoButton2.currentHandler = editarVenta;
            crearNuevoButton2.addEventListener('click', crearNuevoButton2.currentHandler);
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