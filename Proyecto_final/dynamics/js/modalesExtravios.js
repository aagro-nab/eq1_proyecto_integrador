async function reportarExtravio() {
    let { modal, modalContent } = crearModal();

    let tituloExtravio = crearInput('text', 'tituloExtravio', 'Título de Extravío');
    let lugarExtravio = crearInput('text', 'lugarExtravio', 'Lugar de Extravío');
    let descripcionObjeto = crearTextArea('descripcionObjeto', 'Descripción del Objeto');
    let fotoObjeto = crearInput('file', 'fotoObjeto');
    let enviarButton = crearButton('submit', "Reportar Extravío");

    let form = crearFormulario([tituloExtravio, lugarExtravio, descripcionObjeto, fotoObjeto, enviarButton]);

    enviarButton.addEventListener('click', async (event) => {
        event.preventDefault();

        let formData = new FormData(form);
        formData.append('accion', 'crear');

        let response = await fetch('/ProyectoFinal/Proyecto_final/dynamics/php/modalesExtravios.php', {
            method: 'POST',
            body: formData
        });

        if(response.ok) {
            let resultado = await response.text();
            if(resultado === '1') {
                alert("La operación se realizó con éxito.");
            } else {
                alert("No se pudo realizar la operación. Verifica que los datos sean correctos.");
            }
        } else {
            alert("Error en la petición Fetch.");
        }
    });

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}
