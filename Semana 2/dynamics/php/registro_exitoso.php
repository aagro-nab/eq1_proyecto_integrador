<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Exitoso</title>
</head>
<body>
    <?php

        echo 'Los datos que ingresaste con los siguientes: <br><br>';

        function asignar($input)
        {
            $input = (isset($_POST[$input]) && $_POST[$input] != "")? $_POST[$input] : false;
            if($input == false)
                echo 'ERROR: No has introducido un dato requerido';
            return $input;
        }

        $usuario = asignar("usuario");
        $nombre = asignar("nombre");
        $num_cuenta = asignar("num_cuenta");
        $correo = asignar("correo");
        $contraseña = asignar("contraseña");
        $grupo = asignar("grupo");
        $recuerdame = (isset($_POST["recuerdame"]) && $_POST["recuerdame"] != "")? true : false;
        
        echo $usuario.'<br>';
        echo $nombre.'<br>';
        echo $num_cuenta.'<br>';
        echo $correo.'<br>';
        echo $contraseña.'<br>';
        echo $grupo.'<br>';
        echo $recuerdame.'<br>';

    ?>
</body>
</html>