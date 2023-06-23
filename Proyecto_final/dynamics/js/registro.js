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
    });


    function revisionBase ()
    {
        datosRegistro = new FormData(formRegistro);
            
        fetch("../php/revisionInsert.php", {
            method: "POST",
            body: datosRegistro
        })
        .then((respuesta) => {
                //console.log (respuesta);
                return respuesta.json();
        })
        .then((json) => {                    
            //console.log (json.ok);
            if (json.ok == true){
                console.log (json.mensaje);
                alert(json.mensaje);
                
                window.location = "./principal.php";
            }
            else
            {
                console.log (json.mensaje);
                alert(json.mensaje);      
            }
    
        });
    };
    // });



    formRegistro.addEventListener("submit", (event) => {
        event.preventDefault();
        datosRegistro = new FormData(formRegistro);
            
        fetch("../php/seguridad.php", {
            method: "POST",
            body: datosRegistro
        })
        .then((respuesta) => {
                //console.log (respuesta);
                return respuesta.json();
        })
        .then((datosJSON) => 
        {                    
            //console.log (datosJSON.ok);
            //console.log (datosJSON.mensaje);
            if (datosJSON.ok == true)
            {
                alert(datosJSON.mensaje);
                revisionBase ();
                
            }
            else
            {
                alert(datosJSON.mensaje);      
            }
    
        });
    });
})