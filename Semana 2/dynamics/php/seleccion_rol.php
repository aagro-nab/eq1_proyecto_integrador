<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Selección de Rol</title>
</head>
<body>
    <p> Bienvenid@ al sistema multipropositos de Prepa 6. </p>
    <p> Por favor, selecciona tu rol para ser dirigido al registro correspondiente. </p>
    
    <form action="./form_registro.php" method="post" enctype="multipart/form-data" target="_self">

        <label for="rol"></label><br><br>
            <input name="rol" type="radio" value="alumno" required> Alumn@ </input><br><br>
            <input name="rol" type="radio" value="moderador" required> Moderador@ </input><br><br>
            <input name="rol" type="radio" value="administrador" required> Admistrador@ </input><br><br>
        
        <br>
        <button type="submit"> Siguiente </button>
        
    </form>

    <br>

    <p> ¿No sabes que rol elegir? </p>
</body>
</html>