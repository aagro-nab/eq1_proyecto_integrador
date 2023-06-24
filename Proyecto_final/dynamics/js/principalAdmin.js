window.addEventListener("resize", checkResolution);

let buttons = Array.from({length: 10}, (_, i) => document.getElementById(`button${i+1}`));
let hr = document.getElementById("hr");

window.onload = function() {
    var activeButton = localStorage.getItem('activeButton');
    if (activeButton) {
        changeView(activeButton);
    } else {
        changeView('Foros');
    }
};

let notificaciones = document.getElementById('Notificaciones');
let calendario = document.getElementById('Calendario');
let mensajes = document.getElementById('Mensajes');
let mapa = document.getElementById('Mapas');
let datos = document.getElementById('Datos');
let moderador = document.getElementById('AsignarModerador');

notificaciones.addEventListener('click', async () => {
    await notiReportes();
});
calendario.addEventListener('click', mostrarCalendario);
mensajes.addEventListener('click', mostrarMensajes);
mapa.addEventListener('click', mostrarMapas);
datos.addEventListener('click', async () => {
    await modificarDatos();
});

moderador.addEventListener('click', async () => {
    await asignarModerador();
});


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

notificaciones.addEventListener('click', async() => {
    await notiReportes();
});

calendario.addEventListener('click', async() => {
    await mostrarCalendario();
});

mensajes.addEventListener('click', async() => {
    await mostrarMensajes();
});

mapa.addEventListener('click', async() => {
    await mostrarMapas();
});

async function changeView(view) {

    switch (view) {
        case 'Foros':
            buttons[0].innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear foro</span>";
            buttons[1].innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar foro</span>";
            buttons[2].innerHTML = "<i class='fas fa-trash-alt'></i><span class='button-text'> Eliminar foros</span>";
            buttons[3].innerHTML = "<i class='fas fa-sign-in-alt'></i><span class='button-text'> Entrar a un foro</span>";
            buttons[4].innerHTML = "<i class='fas fa-sign-out-alt'></i><span class='button-text'> Salir de un foro</span>";

            buttons[0].style.display = 'block';
            buttons[1].style.display = 'block';
            buttons[2].style.display = 'block';
            buttons[3].style.display = 'block';
            buttons[4].style.display = 'block';
            buttons[5].style.display = 'none';
            buttons[6].style.display = 'none';
            buttons[7].style.display = 'none';
            buttons[8].style.display = 'none';
            buttons[9].style.display = 'none';
            hr.style.display = 'block';

            buttons[0].addEventListener('click', async () => await crearForo(2));
            buttons[1].addEventListener('click', await editarForo);
            buttons[2].addEventListener('click', await eliminarForo);
            buttons[3].addEventListener('click', await entrarForo);
            buttons[4].addEventListener('click', await salirForo);
            break;

        case 'Preguntas':
            buttons[0].innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear pregunta</span>";
            buttons[1].innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar pregunta</span>";
            buttons[2].innerHTML = "<i class='fas fa-trash-alt'></i><span class='button-text'> Eliminar pregunta</span>";
            buttons[3].innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear comentario</span>";
            buttons[4].innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar comentario</span>";
            buttons[5].innerHTML = "<i class='fas fa-trash-alt'></i><span class='button-text'> Eliminar comentario</span>";

            buttons[0].style.display = 'block';
            buttons[1].style.display = 'block';
            buttons[2].style.display = 'block';
            buttons[3].style.display = 'block';
            buttons[4].style.display = 'block';
            buttons[5].style.display = 'block';
            buttons[6].style.display = 'none';
            buttons[7].style.display = 'none';
            buttons[8].style.display = 'none';
            buttons[9].style.display = 'none';
            hr.style.display = 'block';

            buttons[0].addEventListener('click', await crearPregunta);
            buttons[1].addEventListener('click', await editarPregunta);
            buttons[2].addEventListener('click', await eliminarPregunta);
            buttons[3].addEventListener('click', await crearComentario);
            buttons[4].addEventListener('click', await editarComentario);
            buttons[5].addEventListener('click', await eliminarComentario);

            break;

        case 'Extravios':
            buttons[0].innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear extravío</span>";
            buttons[1].innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar extravío</span>";
            buttons[2].innerHTML = "<i class='fas fa-trash-alt'></i><span class='button-text'> Eliminar extravío</span>";

            buttons[0].style.display = 'block';
            buttons[1].style.display = 'block';
            buttons[2].style.display = 'block';
            buttons[3].style.display = 'none';
            buttons[4].style.display = 'none';
            buttons[5].style.display = 'none';
            buttons[6].style.display = 'none';
            buttons[7].style.display = 'none';
            buttons[8].style.display = 'none';
            buttons[9].style.display = 'none';
            hr.style.display = 'block';

            buttons[0].addEventListener('click', await reportarExtravio);
            buttons[1].addEventListener('click', await editarExtravio);
            buttons[2].addEventListener('click', await eliminarExtravio);
            break;

        case 'Market':
            buttons[0].innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear producto</span>";
            buttons[1].innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar producto</span>";
            buttons[2].innerHTML = "<i class='fas fa-trash-alt'></i><span class='button-text'> Eliminar producto</span>";

            buttons[0].style.display = 'block';
            buttons[1].style.display = 'block';
            buttons[2].style.display = 'block';
            buttons[3].style.display = 'none';
            buttons[4].style.display = 'none';
            buttons[5].style.display = 'none';
            buttons[6].style.display = 'none';
            buttons[7].style.display = 'none';
            buttons[8].style.display = 'none';
            buttons[9].style.display = 'none';
            hr.style.display = 'block';

            buttons[0].addEventListener('click', await crearProducto);
            buttons[1].addEventListener('click', await editarProducto);
            buttons[2].addEventListener('click', await eliminarProducto);

    }
    for (let btn of buttons) {
        if (btn.currentHandler) {
            btn.removeEventListener('click', btn.currentHandler);
        }
    }
    // Cambia la URL sin recargar la página
    history.pushState({}, '', '/' + view.toLowerCase());
}

function checkResolution() {
    let buttonTexts = document.getElementsByClassName("button-text");
    let display = window.innerWidth <= 720 ? "none" : "inline";
    for (let i = 0; i < buttonTexts.length; i++) {
        buttonTexts[i].style.display = display;
    }
}

checkResolution();

