<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        $usuario = (isset($_POST['NombreDeUsuario']) && $_POST["NombreDeUsuario"]!= "")? $_POST['NombreDeUsuario'] : "Falta introducir el nombre de usuario";
        $correo = (isset($_POST['email']) && $_POST["email"]!= "")? $_POST['email'] : "Falta introducir el correo elctronico";
        $contra = (isset($_POST['Contra']) && $_POST["Contra"]!= "")? $_POST['Contra'] : "Falta introducir la contraseña";
        var_dump ($usuario);
        echo "<br><br>";
        var_dump ($correo);
        echo "<br><br>";
        var_dump ($contra);
        echo "<br><br>";
        /*Si los datos registrados coinciden con los alamcenados en la base de datos
            echo "Su sesion se ha iniciado correctamente";
            echo "<br>";*/
        /*Si los datos no coinciden con los almacenados en la base de datos
        echo "Los datos ingresados no fueron encontrados exitosamente :(";
        echo "<br>";*/
    ?>
</body>
</html>