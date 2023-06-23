window.addEventListener("load", ()=> {
    const pin = document.getElementsByClassName("pin");
    const hola = document.getElementById("hola");

    console.log(pin);
    console.log(hola);

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
});