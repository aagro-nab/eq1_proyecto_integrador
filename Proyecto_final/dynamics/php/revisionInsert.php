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
            //header ("location: ./seleccionRol.php");
        }
        else
        {
            //echo $opcion;
            return $opcion;
            
        }
    };

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

    $grupotem = asignar ("grupos");
    $grupo = verificar ($grupotem);
    //var_dump ($grupo);

    
    $buscarNombre = "SELECT * FROM usuario WHERE nombre='$nombre'";
    $query = mysqli_query ($con, $buscarNombre);
    $arreglo = mysqli_fetch_array ($query);
    if ($arreglo != NULL)
    {
        $respuesta = array("ok" => false, "mensaje" => "Ese nombre ya existe, no se puede guardar");
    } 
    else 
    {
        $_SESSION["nombre"] = $nombre;
        $buscarUser = "SELECT * FROM usuario WHERE nombreUsuario='$username'";
        $query = mysqli_query ($con, $buscarUser);
        $arreglo = mysqli_fetch_array ($query);
        if ($arreglo != NULL)
        {
            $respuesta = array("ok" => false, "mensaje" => "Ese usuario ya existe, no se puede guardar");
        } 
        else 
        {
            $_SESSION["user"] = $username;
            $buscarNC = "SELECT * FROM usuario WHERE numeroCuenta='$ncuenta'";
            $query = mysqli_query ($con, $buscarNC);
            $arreglo = mysqli_fetch_array ($query);
            if ($arreglo != NULL)
            {
                $respuesta = array("ok" => false, "mensaje" => "Ese numero de cuenta ya está registrado, no se puede guardar");
            }
            else 
            {
                $_SESSION["nCuenta"] = $ncuenta;
                $buscarCorreo = "SELECT * FROM usuario WHERE email='$email'";
                $query = mysqli_query ($con, $buscarCorreo);
                $arreglo = mysqli_fetch_array ($query);
                if ($arreglo != NULL)
                {
                    $respuesta = array("ok" => false, "mensaje" => "Ese email ya es usado en otra cuenta, no se puede guardar");
                }
                else
                {
                    $_SESSION["email"] = $email;
                    $meterDB = "INSERT INTO usuario (nombre, nombreUsuario, numeroCuenta, email, contrasena, grupo, rol) VALUES ('$nombre', '$username', '$ncuenta', '$email', '$contraseña', '$grupo', '$rol')";
                    $query = mysqli_query ($con, $meterDB);
                    $respuesta = array("ok" => true, "mensaje" => "Se ha creado el usuario con éxito :)");
                }
            }          
        }
    }
    echo json_encode($respuesta);    
?>