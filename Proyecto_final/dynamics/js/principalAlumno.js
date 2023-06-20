window.addEventListener("resize", checkResolution);

// Selecciona los botones que se mostrarán u ocultarán
var hrButton = document.getElementById('hrButton');
var crearNuevoButton = document.getElementById('crearNuevoButton');
var crearNuevoButton2 = document.getElementById('crearNuevoButton2');
var crearNuevoButton3 = document.getElementById('crearNuevoButton3');
var crearNuevoButton4 = document.getElementById('crearNuevoButton4');

// Asigna la función de cambio de vista a cada botón
document.getElementById('forosButton').addEventListener('click', function() {
    changeView('Foros');
});
document.getElementById('preguntasButton').addEventListener('click', function() {
    changeView('Preguntas');
});
document.getElementById('ventasButton').addEventListener('click', function() {
    changeView('Ventas');
});
document.getElementById('extraviosButton').addEventListener('click', function() {
    changeView('Extravios');
});
document.getElementById('gamingButton').addEventListener('click', function() {
    changeView('Gaming');
});
document.getElementById('marketButton').addEventListener('click', function() {
    changeView('Market');
});


function changeView(view) {
    switch(view) {
        case 'Foros':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear foro</span>";
            crearNuevoButton2.innerHTML = "<i class='fas fa-sign-out-alt'></i><span class='button-text'> Salir de un foro</span>";
            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'block';
            crearNuevoButton3.style.display = 'none';
            crearNuevoButton4.style.display = 'none';
            break;
        case 'Preguntas':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear pregunta</span>";
            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'none';
            crearNuevoButton3.style.display = 'none';
            crearNuevoButton4.style.display = 'none';
            break;
        case 'Ventas':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear venta</span>";
            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'none';
            crearNuevoButton3.style.display = 'none';
            crearNuevoButton4.style.display = 'none';
            break;
        case 'Extravios':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Reportar extravío</span>";
            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'none';
            crearNuevoButton3.style.display = 'none';
            crearNuevoButton4.style.display = 'none';
            break;
        case 'Gaming':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear partida</span>";
            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'none';
            crearNuevoButton3.style.display = 'none';
            crearNuevoButton4.style.display = 'none';
            break;
        case 'Market':
            crearNuevoButton.innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Añadir al market</span>";
            crearNuevoButton.style.display = 'block';
            crearNuevoButton2.style.display = 'none';
            crearNuevoButton3.style.display = 'none';
            crearNuevoButton4.style.display = 'none';
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