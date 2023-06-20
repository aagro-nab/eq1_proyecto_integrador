function crearModal () {
    let modal = document.createElement('div');
    modal.style.display = 'block';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0,0,0,0.4)';

    // Crear el contenido del modal
    let modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fefefe';
    modalContent.style.margin = '15% auto';
    modalContent.style.padding = '20px';
    modalContent.style.border = '1px solid #888';
    modalContent.style.width = '80%';

    // Agregar un botón de cerrar
    let close = document.createElement('span');
    close.style.color = '#aaa';
    close.style.float = 'right';
    close.style.fontSize = '28px';
    close.style.fontWeight = 'bold';
    close.innerHTML = "&times;";
    close.onclick = function () {
        document.body.removeChild(modal);
    }
    modalContent.appendChild(close);
    return { modal, modalContent };
}

function crearForo() {
    let { modal, modalContent } = crearModal();
    let form = document.createElement('form');
    form.setAttribute('method', 'post');

    let nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'forumName');
    form.appendChild(nameInput);

    let imageInput = document.createElement('input');
    imageInput.setAttribute('type', 'file');
    imageInput.setAttribute('name', 'forumImage');
    form.appendChild(imageInput);

    let descInput = document.createElement('textarea');
    descInput.setAttribute('name', 'forumDescription');
    form.appendChild(descInput);

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    window.onclick = function(event) {
        if (event.target == modal) {
            document.body.removeChild(modal);
        }
    }

    document.body.appendChild(modal);
}


function editarForo() {
    let { modal, modalContent } = crearModal();
    let form = document.createElement('form');
    form.setAttribute('method', 'post');

    let select = document.createElement('select');
    select.setAttribute('name', 'forumName');

    // Asumiendo que tienes una lista de foros
    let forums = ["Foro1", "Foro2", "Foro3"];
    forums.forEach(function(forumName) {
        let option = document.createElement('option');
        option.value = forumName;
        option.text = forumName;
        select.appendChild(option);
    });

    form.appendChild(select);

    let nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'newForumName');
    form.appendChild(nameInput);

    let imageInput = document.createElement('input');
    imageInput.setAttribute('type', 'file');
    imageInput.setAttribute('name', 'newForumImage');
    form.appendChild(imageInput);

    let descInput = document.createElement('textarea');
    descInput.setAttribute('name', 'newForumDescription');
    form.appendChild(descInput);

    modalContent.appendChild(form);
    modal.appendChild(modalContent);

    window.onclick = function(event) {
        if (event.target == modal) {
            document.body.removeChild(modal);
        }
    }

    document.body.appendChild(modal);

}
