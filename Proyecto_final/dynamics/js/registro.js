window.addEventListener("load", ()=>{
    // alert("hola");
    const selectGrupo = document.getElementById("grupos");
    const formRegistro = document.getElementById("formRegistro");

    //fetch: asigna los grupos almacenados en la base de datos al select del formulario de registro
    fetch("../php/consultarGrupos.php")
    .then((respuesta)=>{
        return respuesta.json();
    }).then((datosJSON)=>{
        console.log(datosJSON);
        for(let grupo of datosJSON){
            selectGrupo.innerHTML += `<option value = ${grupo.grupo_id}>${grupo.grupo_name}</option>`;
        }

        //evento: se ejecuta al enviar el formulario, evita que se recargue la pagina
        formRegistro.addEventListener("submit", (event) => {
            event.preventDefault();
            datosRegistro = new FormData(formRegistro);

            //fetch: ejecuta las funciones en revisionInsert.php con los datos del form y manda un alert con 
            //el resultado de las funciones
            fetch("../php/revisionInsert.php", {
                method: "POST",
                body: datosRegistro
            }).then((respuesta) => {
                return respuesta.json();
            }).then((datosJSON) => {
                alert(datosJSON.mensaje);
            });
        });
    });

});