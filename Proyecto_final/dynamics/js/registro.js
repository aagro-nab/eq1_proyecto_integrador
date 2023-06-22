window.addEventListener("load", ()=>{
    let grado = document.querySelector ('#grado');
    const selectGrupo = document.getElementById("grupos");
    selectGrupo.innerHTML = "<option disabled selected>Selecciona tu grupo</option>";
    const formRegistro = document.getElementById("formRegistro");

    grado.addEventListener ("change", evento =>{
        //console.log (evento.target.value);
        let grado = evento.target.value;
        //console.log (grado);
        let form = new FormData ();
        
        form.append ("grado", grado);

        fetch ("../php/desplegarGrupos.php",{
            method: "POST",
            body: form,
        })
        .then ((respuesta) => {
            if (!respuesta.ok){
                throw new Error ("Eror en la seleccion");    
            }
            return respuesta.json ();
        })
        .then ((datos) =>{
            //console.log (datos);
            selectGrupo.innerHTML ="<option disabled selected>Selecciona tu grupo</option>";
            for(let grupo of datos){
                selectGrupo.innerHTML += `<option value = ${grupo.ID_GRUPO}>${grupo.grupo}</option>`;
            }
          
        })
        .catch (error =>{
            console.error ('Ocurrio un error'+error);
        })
    })


    formRegistro.addEventListener("submit", (event) => {
        event.preventDefault();
        datosRegistro = new FormData(formRegistro);
            
        fetch("../php/revisionInsert.php", {
            method: "POST",
            body: datosRegistro
        })
        .then((respuesta) => {
                return respuesta.json();
        })
        .then((datosJSON) => {
                    
            //console.log (datosJSON.ok);
            if (datosJSON.ok == true){
                alert(datosJSON.mensaje);
                window.location = "./seleccionRol.php";
            }
            else
            {
                alert(datosJSON.mensaje);      
            }
    
        });
    });
});