//ESTA VERSIÓN DEL CÓDIGO FORMA PARTE DE LA OPTIMIZACIÓN FINAL v1 (Primera Fase)
// PARA UN MEJOR MANEJO DE ERRORES TANTO EN EL DESARROLLO DE PROYECTO, COMO EN LA POSTERIDAD

window.addEventListener("resize", checkResolution);

let buttons = Array.from({length: 10}, (_, i) => document.getElementById(`button${i+1}`));

window.onload = function() {
    var activeButton = localStorage.getItem('activeButton');
    if (activeButton) {
        changeView(activeButton);
    } else {
        changeView('Foros');
    }
};

// Asigna la función de cambio de vista a cada botón
['forosButton', 'preguntasButton', 'extraviosButton', 'marketButton'].forEach(id => {
    document.getElementById(id).addEventListener('click', function() {
        localStorage.setItem('activeButton', this.dataset.text);
        changeView(this.dataset.text);
    });
});

async function changeView(view) {

    switch (view) {
        case 'Foros':
            buttons[0].innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear foro</span>";
            buttons[1].innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Crear publicacion</span>";
            buttons[2].innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar publicacion</span>";
            buttons[3].innerHTML = "<i class='fas fa-plus'></i><span class='button-text'> Comentar publicacion</span>";
            buttons[4].innerHTML = "<i class='fas fa-sign-in-alt'></i><span class='button-text'> Entrar a un foro</span>";
            buttons[5].innerHTML = "<i class='fas fa-sign-out-alt'></i><span class='button-text'> Salir de un foro</span>";
            buttons[6].innerHTML = "<i class='fas fa-edit'></i><span class='button-text'> Editar foro</span>";
            buttons[7].innerHTML = "<i class='fas fa-trash-alt'></i><span class='button-text'> Eliminar foros</span>";
            buttons[8].innerHTML = "<i class='fas fa-user-plus'></i><span class='button-text'> Asignar moderador</span>";
            buttons[9].innerHTML = "<i class='fas fa-user-edit'></i><span class='button-text'> Modificar datos</span>";

            buttons[0].style.display = 'block';
            buttons[1].style.display = 'block';
            buttons[2].style.display = 'block';
            buttons[3].style.display = 'block';
            buttons[4].style.display = 'block';
            buttons[5].style.display = 'block';
            buttons[6].style.display = 'block';
            buttons[7].style.display = 'block';
            buttons[8].style.display = 'block';
            buttons[9].style.display = 'block';


            buttons[0].addEventListener('click', async () => await crearForo(2));
            buttons[1].addEventListener('click', await crearPublicacion);
            buttons[2].addEventListener('click', await editarPublicacion);
            buttons[3].addEventListener('click', await crearComentario);
            buttons[4].addEventListener('click', async () => await entrarForo(2));
            buttons[5].addEventListener('click', async () => await salirForo('usuario'));//Se debe de enviar el nombre de usuario
            buttons[6].addEventListener('click', async () => await editarForo(2));
            buttons[7].addEventListener('click', async () => await eliminarForo(2));
            buttons[8].addEventListener('click', await asignarModerador);
            buttons[9].addEventListener('click', modificarUsuario('usuario')); //Añadir el ID de usuario en variable
            break;
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

