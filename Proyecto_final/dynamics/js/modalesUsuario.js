function modificarDatos() {
    let { modal, modalContent } = crearModal();

    let contenidoFormulario = [
        crearLabel('Nombre:', 'nombre'),
        crearInput('text', 'nombre', 'Nombre'),
        crearLabel('Nombre de Usuario:', 'nombreUsuario'),
        crearInput('text', 'nombreUsuario', 'Nombre de Usuario'),
        crearLabel('Número de Cuenta:', 'numeroCuenta'),
        crearInput('text', 'numeroCuenta', 'Número de Cuenta'),
        crearLabel('Correo Electrónico:', 'email'),
        crearInput('text', 'email', 'Correo Electrónico'),
        crearLabel('Contraseña:', 'contrasena'),
        crearInput('password', 'contrasena', 'Contraseña'),
        crearLabel('Grupo:', 'grupo'),
        crearInput('text', 'grupo', 'Grupo'),
        crearLabel('Foto de Perfil:', 'fotoPerfil'),
        crearInput('file', 'fotoPerfil', 'Foto de Perfil'),
        crearButton('submit', 'Modificar Usuario')
    ];

    let form = crearFormulario(contenidoFormulario);
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let formData = new FormData(form);
        // Incluir el ID_USUARIO en los datos enviados al servidor
        formData.append('ID_USUARIO', usuario);
        fetch('/Proyecto_final/dynamics/php/modalesUsuario.php', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                if (data === 'usuarioExistente') {
                    alert('Una cuenta con ese nombre de usuario ya existe.');
                } else if (data === 'correoExistente') {
                    alert('Una cuenta con ese correo electrónico ya existe.');
                } else if (data === 'actualizacionExitosa') {
                    alert('Información de usuario actualizada correctamente.');
                } else {
                    console.error(data);
                }
            })
            .catch(error => console.error('Error:', error));
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function asignarModerador() {
    let modal = document.createElement("div");
    modal.setAttribute("id", "modal");
    modal.classList.add("modal");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    let close = document.createElement("span");
    close.classList.add("close");
    close.innerHTML = "&times;";
    close.onclick = function() {
        modal.style.display = "none";
    }

    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "/Proyecto_final/dynamics/php/modalesUsuario.js");

    let label = document.createElement("label");
    label.setAttribute("for", "nombreUsuario");
    label.innerHTML = "Nombre del Usuario:";

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "nombreUsuario");
    input.setAttribute("name", "nombreUsuario");
    input.setAttribute("placeholder", "Nombre del Usuario");

    let button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.innerText = "Asignar como Moderador";

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);

    modalContent.appendChild(close);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.style.display = "block";

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

async function notiReportes() {
    let datosFormulario = new FormData();
    datosFormulario.append('accion', 'recuperarReportes');

    let response = await fetch('/ProyectoFinal/Proyecto_final/dynamics/php/modalesForos.php', {
        method: 'POST',
        body: datosFormulario
    });

    if (response.ok) {
        let reportes = await response.json();

        let { modal, modalContent } = crearModal();

        reportes.forEach(reporte => {
            let reporteDiv = document.createElement('div');
            reporteDiv.innerHTML = `
                <strong>Foro:</strong> ${reporte.nombreForo} <br>
                <strong>Reportado por:</strong> ${reporte.nombreUsuario} <br>
                <strong>Comentario:</strong> ${reporte.COMENTARIO}<br><br>
            `;

            modalContent.appendChild(reporteDiv);
        });

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    } else {
        alert("Error en la petición. Por favor, inténtalo de nuevo.");
    }
}

async function mostrarMensajes (){
    alert("La función no está disponible en este momento. Inténtalo más tarde.");
}

async function mostrarMapas (){

    let { modal, modalContent } = crearModal();

    modal.style.flexDirection = 'column';

    let modalContentMapa = document.createElement('div');

    //agregar svgs (pines) e imagen del mapa
    modalContentMapa.innerHTML += ` 
    
    <div id="mapa">

        <img id="mapaImg" src="../../statics/img/mapa(leyendas).png" alt="Mapa de la Prepa6">

        <svg class="pin" id="pulpo" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="-41.31 -41.31 495.72 495.72" 
            xml:space="preserve">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <g> 
                    <g> 
                        <path d="M206.549,0L206.549,0c-82.6,0-149.3,66.7-149.3,149.3c0,28.8,9.2,56.3,22,78.899l97.3,168.399c6.1,11,18.4,16.5,30,16.5 c11.601,0,23.3-5.5,30-16.5l97.3-168.299c12.9-22.601,22-49.601,22-78.901C355.849,66.8,289.149,0,206.549,0z M206.549,193.4 c-30,0-54.5-24.5-54.5-54.5s24.5-54.5,54.5-54.5s54.5,24.5,54.5,54.5C261.049,169,236.549,193.4,206.549,193.4z"></path> 
                    </g> 
                </g> 
            </g>
        </svg>

        <svg class="pin" id="p-quintos" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="-41.31 -41.31 495.72 495.72" 
        xml:space="preserve">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
            <g> 
                <g> 
                    <path d="M206.549,0L206.549,0c-82.6,0-149.3,66.7-149.3,149.3c0,28.8,9.2,56.3,22,78.899l97.3,168.399c6.1,11,18.4,16.5,30,16.5 c11.601,0,23.3-5.5,30-16.5l97.3-168.299c12.9-22.601,22-49.601,22-78.901C355.849,66.8,289.149,0,206.549,0z M206.549,193.4 c-30,0-54.5-24.5-54.5-54.5s24.5-54.5,54.5-54.5s54.5,24.5,54.5,54.5C261.049,169,236.549,193.4,206.549,193.4z"></path> 
                </g> 
            </g> 
        </g>
        </svg>

        <svg class="pin" id="p-cuartos" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="-41.31 -41.31 495.72 495.72" 
            xml:space="preserve">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <g> 
                    <g> 
                        <path d="M206.549,0L206.549,0c-82.6,0-149.3,66.7-149.3,149.3c0,28.8,9.2,56.3,22,78.899l97.3,168.399c6.1,11,18.4,16.5,30,16.5 c11.601,0,23.3-5.5,30-16.5l97.3-168.299c12.9-22.601,22-49.601,22-78.901C355.849,66.8,289.149,0,206.549,0z M206.549,193.4 c-30,0-54.5-24.5-54.5-54.5s24.5-54.5,54.5-54.5s54.5,24.5,54.5,54.5C261.049,169,236.549,193.4,206.549,193.4z"></path> 
                    </g> 
                </g> 
            </g>
        </svg>

        <svg class="pin" id="p-sextos" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="-41.31 -41.31 495.72 495.72" 
            xml:space="preserve">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <g> 
                    <g> 
                        <path d="M206.549,0L206.549,0c-82.6,0-149.3,66.7-149.3,149.3c0,28.8,9.2,56.3,22,78.899l97.3,168.399c6.1,11,18.4,16.5,30,16.5 c11.601,0,23.3-5.5,30-16.5l97.3-168.299c12.9-22.601,22-49.601,22-78.901C355.849,66.8,289.149,0,206.549,0z M206.549,193.4 c-30,0-54.5-24.5-54.5-54.5s24.5-54.5,54.5-54.5s54.5,24.5,54.5,54.5C261.049,169,236.549,193.4,206.549,193.4z"></path> 
                    </g> 
                </g> 
            </g>
        </svg>

        <svg class="pin" id="canchas" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="-41.31 -41.31 495.72 495.72" 
            xml:space="preserve">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <g> 
                    <g> 
                        <path d="M206.549,0L206.549,0c-82.6,0-149.3,66.7-149.3,149.3c0,28.8,9.2,56.3,22,78.899l97.3,168.399c6.1,11,18.4,16.5,30,16.5 c11.601,0,23.3-5.5,30-16.5l97.3-168.299c12.9-22.601,22-49.601,22-78.901C355.849,66.8,289.149,0,206.549,0z M206.549,193.4 c-30,0-54.5-24.5-54.5-54.5s24.5-54.5,54.5-54.5s54.5,24.5,54.5,54.5C261.049,169,236.549,193.4,206.549,193.4z"></path> 
                    </g> 
                </g> 
            </g>
        </svg>

        <svg class="pin" id="multicanchas" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="-41.31 -41.31 495.72 495.72" 
            xml:space="preserve">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <g> 
                    <g> 
                        <path d="M206.549,0L206.549,0c-82.6,0-149.3,66.7-149.3,149.3c0,28.8,9.2,56.3,22,78.899l97.3,168.399c6.1,11,18.4,16.5,30,16.5 c11.601,0,23.3-5.5,30-16.5l97.3-168.299c12.9-22.601,22-49.601,22-78.901C355.849,66.8,289.149,0,206.549,0z M206.549,193.4 c-30,0-54.5-24.5-54.5-54.5s24.5-54.5,54.5-54.5s54.5,24.5,54.5,54.5C261.049,169,236.549,193.4,206.549,193.4z"></path> 
                    </g> 
                </g> 
            </g>
        </svg>

        <svg class="pin" id="pimpos" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="-41.31 -41.31 495.72 495.72" 
            xml:space="preserve">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <g> 
                    <g> 
                        <path d="M206.549,0L206.549,0c-82.6,0-149.3,66.7-149.3,149.3c0,28.8,9.2,56.3,22,78.899l97.3,168.399c6.1,11,18.4,16.5,30,16.5 c11.601,0,23.3-5.5,30-16.5l97.3-168.299c12.9-22.601,22-49.601,22-78.901C355.849,66.8,289.149,0,206.549,0z M206.549,193.4 c-30,0-54.5-24.5-54.5-54.5s24.5-54.5,54.5-54.5s54.5,24.5,54.5,54.5C261.049,169,236.549,193.4,206.549,193.4z"></path> 
                    </g> 
                </g> 
            </g>
        </svg>

        <svg class="pin" id="hs" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="-41.31 -41.31 495.72 495.72" 
            xml:space="preserve">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <g> 
                    <g> 
                        <path d="M206.549,0L206.549,0c-82.6,0-149.3,66.7-149.3,149.3c0,28.8,9.2,56.3,22,78.899l97.3,168.399c6.1,11,18.4,16.5,30,16.5 c11.601,0,23.3-5.5,30-16.5l97.3-168.299c12.9-22.601,22-49.601,22-78.901C355.849,66.8,289.149,0,206.549,0z M206.549,193.4 c-30,0-54.5-24.5-54.5-54.5s24.5-54.5,54.5-54.5s54.5,24.5,54.5,54.5C261.049,169,236.549,193.4,206.549,193.4z"></path> 
                    </g> 
                </g> 
            </g>
        </svg>

        <svg class="pin" id="auditorio" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="-41.31 -41.31 495.72 495.72" 
            xml:space="preserve">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <g> 
                    <g> 
                        <path d="M206.549,0L206.549,0c-82.6,0-149.3,66.7-149.3,149.3c0,28.8,9.2,56.3,22,78.899l97.3,168.399c6.1,11,18.4,16.5,30,16.5 c11.601,0,23.3-5.5,30-16.5l97.3-168.299c12.9-22.601,22-49.601,22-78.901C355.849,66.8,289.149,0,206.549,0z M206.549,193.4 c-30,0-54.5-24.5-54.5-54.5s24.5-54.5,54.5-54.5s54.5,24.5,54.5,54.5C261.049,169,236.549,193.4,206.549,193.4z"></path> 
                    </g> 
                </g> 
            </g>
        </svg>

        <svg class="pin" id="biblioteca" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="-41.31 -41.31 495.72 495.72" 
            xml:space="preserve">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <g> 
                    <g> 
                        <path d="M206.549,0L206.549,0c-82.6,0-149.3,66.7-149.3,149.3c0,28.8,9.2,56.3,22,78.899l97.3,168.399c6.1,11,18.4,16.5,30,16.5 c11.601,0,23.3-5.5,30-16.5l97.3-168.299c12.9-22.601,22-49.601,22-78.901C355.849,66.8,289.149,0,206.549,0z M206.549,193.4 c-30,0-54.5-24.5-54.5-54.5s24.5-54.5,54.5-54.5s54.5,24.5,54.5,54.5C261.049,169,236.549,193.4,206.549,193.4z"></path> 
                    </g> 
                </g> 
            </g>
        </svg>

    </div>
    
    `;

    modal.appendChild(modalContent);
    modalContent.appendChild(modalContentMapa);
    document.body.appendChild(modal);

    let pin = document.getElementsByClassName("pin");

    console.log(pin);

    for(let element of pin){    
        element.addEventListener("mouseover", ()=> {
            element.style.fill = 'rgb(255, 210, 46)';
            element.style.stroke = 'rgb(255, 210, 46)';
            element.style.opacity = '100%';
        });
        element.addEventListener("mouseout", ()=> {
            element.style.fill = 'rgb(37, 26, 197)';
            element.style.stroke = 'rgb(255, 255, 255)';
            element.style.opacity = '80%';
        });
    }
}
async function mostrarCalendario (){
    alert("La función no está disponible en este momento. Inténtalo más tarde.");
}
