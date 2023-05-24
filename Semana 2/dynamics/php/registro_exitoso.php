<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Exitoso</title>
    <link rel="stylesheet" href="../../statics/styles/Diseno.css">
</head>
<body>
    <?php

        echo '
        <header>
            Los datos que ingresaste con los siguientes: <br><br>
        <header>
        ';

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
        
        echo '
        <main class="regi">
            <article id="Guarda">
                <p>Usuario:</p>
                <i>'.$usuario.'</i><hr>
                <p>Nombre</p>
                <i>'.$nombre.'</i><hr>
                <p>Num de cuenta:</p>
                <i>'.$num_cuenta.'</i><hr>
                <p>Contraseña:</p>
                <i>'.$correo.'</i><hr>
                <p>Usuario:</p>
                <i>'.$contraseña.'</i><hr>
                <p>Grupo:</p>
                <i>'.$grupo.'</i><hr>
                <i>'.$recuerdame.'</i>
            </article>
         </main>
        ';
    ?>
</body>
</html>