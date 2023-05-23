<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
</head>
<body>
    <?php
        $rol = (isset($_POST["rol"]) && $_POST["rol"] != "")? $_POST["rol"] : false;
        if($rol == false)
            echo 'ERROR: No has introducido tu rol';

        echo '<i>'.$rol.'</i>';

        function formulario()
        {
            echo'
            <form action="./registro_exitoso.php" method="post" enctype="multipart/form-data" target="_self">
                <label for="nombre"><b> Nombre de usuario </b></label><br><br>
                    <input name="usuario" type="text" required> <br><br>
                <label for="nombre"><b> Nombre completo </b></label><br><br>
                    <input name="nombre" type="text" required> <br><br>
                <label for="num_cuenta"><b> Número de cuenta </b></label><br><br>
                    <input name="num_cuenta" type="text" required> <br><br>
                <label for="correo"><b> Correo </b></label><br><br>
                    <input name="correo" type="email" required> <br><br>
                <label for="contraseña"><b> Contraseña </b></label><br><br>
                    <input name="contraseña" type="password" required> <br><br>
                <label for="grupo"><b> Grupo </b></label><br><br>
                    <input name="grupo" type="text" required> <br><br>
                <label for="recuerdame" class="comprar"> Recordar usuario </label>
                    <input type="checkbox" name="recuerdame"><br><br>
                <button type="submit"> Registrarse </button>
            </form>';
        }



        if($rol == "alumno")
        {   
            echo '<p> Alumn@, porfavor ingresa tus datos. </p>';
            formulario();

        }

        if($rol == "administrador")
        {
            echo '<p> Administrador, porfavor ingresa tus datos. </p>
                <p> Recuerda que en contraseña debes añadir la clave proporcionada por la organización.</p>';
            formulario();
        }

        if($rol == "moderador")
        {
            echo '<p> Moderador, porfavor ingresa tus datos. </p>';
            formulario();
        }

    ?>

</body>
</html>