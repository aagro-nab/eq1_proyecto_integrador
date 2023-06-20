<?php
    $include = include ("./config.php");
    $con = connect();
    session_start ();
    $rol = $_SESSION["Rol"];


    function asignar($input)
    {
        $input = (isset($_POST[$input]) && $_POST[$input] != "")? $_POST[$input] : NULL;
        return $input; 
    }

    function verificar ($opcion)
    {
        if (!isset ($opcion))
        {
            header ("location: ./seleccionRol.php");
        }
        return $opcion;
    }

    $nombretem = asignar("nombre");
    $nombre = verificar ($nombretem);
    //var_dump ($nombre);

    $usernametem = asignar("username");
    $username = verificar ($usernametem);
    //var_dump ($username);

    $nCuentatem = asignar ("nCuenta");
    $ncuenta = verificar ($nCuentatem);
    //var_dump ($ncuenta);

    $emailtem = asignar ("email");
    $email = verificar ($emailtem);
    //var_dump ($email);

    $contraseñatem = asignar ("contraseña");
    $contraseña = verificar ($contraseñatem);
    //var_dump ($contraseña);

    $grupotem = asignar ("grupo");
    $grupo = verificar ($grupotem);
    //var_dump ($grupo);

    
    $buscarNombre = "SELECT * FROM usuario WHERE nombre='$nombre'";
    $query = mysqli_query ($con, $buscarNombre);
    $arreglo = mysqli_fetch_array ($query);
    if ($arreglo != NULL)
    {
        echo "Ese nombre si existe, no se puede guardar<br>";
        //Lo mejor es que se mande un alert de que esas variables ya existen, pero si no, se puede redirigir a 'header ("location: ./seleccionRol.php");'
    } 
    else 
    {
        $_SESSION["nombre"] = $nombre;
        $buscarUser = "SELECT * FROM usuario WHERE nombreUsuario='$username'";
        $query = mysqli_query ($con, $buscarUser);
        $arreglo = mysqli_fetch_array ($query);
        if ($arreglo != NULL)
        {
            echo "Ese usuario si existe, no se puede guardar<br>";
            //header ("location: ./seleccionRol.php");
        } 
        else 
        {
            $_SESSION["user"] = $username;
            $buscarNC = "SELECT * FROM usuario WHERE numeroCuenta='$ncuenta'";
            $query = mysqli_query ($con, $buscarNC);
            $arreglo = mysqli_fetch_array ($query);
            if ($arreglo != NULL)
            {
                echo "Ese numero de cuenta si existe, no se puede guardar<br>";
                //header ("location: ./seleccionRol.php");
            }
            else 
            {
                $_SESSION["nCuenta"] = $ncuenta;
                $buscarCorreo = "SELECT * FROM usuario WHERE email='$email'";
                $query = mysqli_query ($con, $buscarCorreo);
                $arreglo = mysqli_fetch_array ($query);
                if ($arreglo != NULL)
                {
                    echo "Ese email ya es usado en otra cuenta, no se puede guardar<br>";
                    //header ("location: ./seleccionRol.php");
                }
                else
                {
                    $_SESSION["email"] = $email;
                    $meterDB = "INSERT INTO usuario (nombre, nombreUsuario, numeroCuenta, email, contrasena, grupo, rol) VALUES ('$nombre', '$username', '$ncuenta', '$email', '$contraseña', '$grupo', '$rol')";
                    var_dump ($meterDB);
                    echo "<br><br>";
                    $query = mysqli_query ($con, $meterDB);
                    var_dump ($query);
                    echo "<br><br>";

                }

            }          
        }
    }


    

    
?>