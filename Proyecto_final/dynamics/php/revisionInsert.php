<?php
    $include = include ("./config.php");
    $con = connect();
    require "seguridad.php";
    session_start ();
    $rol = $_SESSION["Rol"];
    echo $rol;

    // original, asi estba
    // function verificar ($opcion)
    // {
        //     if (!isset ($opcion))
        //     {
            //         //header ("location: ./seleccionRol.php");
            //         //grupo
            //         echo "ok<br>";
            //     }
            //     return $opcion;
            // }
function asignar($input)
{
    $input = (isset($_POST[$input]) && $_POST[$input] != "")? $_POST[$input] : NULL;
    return $input; 
}
// verifica que si entro un dato
function verificar ($opcion)
{
    if (!isset ($opcion))
    {
        //header ("location: ./seleccionRol.php");
        //grupo
        echo "ok<br>";
    }else { //si todo ok, se pasa a este filtro de sanitizacion
        $opcion = trim($opcion);
        $opcion = stripslashes($opcion);
        $opcion = htmlspecialchars($opcion);
    }
    return $opcion;
}


// verificar con regex
$name = "/([A-Z][a-z]*\s|[A-Z][a-z]*){2,}/i";//verifica que sea la primera letra mayuscula para los nombres: Morales
$user = "/([A-z]|[0-9]){5,15}/i";
$no_cuenta = "/[3](20|21|22|23)\d{6}/i";
$mail_all = "/([3](20|21|22|23)\d{6}?|\w+)@(alumno.enp.unam.mx|comunidad.unam.mx)/i";
$pass = "/([A-z]|[0-9]){6,}/i";

// intento de ponerle a lo de abajo ya el regex
// se supone que ya te super verifca que sea un dato que pedimos sumando la funcion verificar
$nombretem = asignar("nombre");
$nombre = verificar ($nombretem);

$usernametem = asignar("username");
$username = verificar ($usernametem);

$nCuentatem = asignar ("nCuenta");
$ncuenta = verificar ($nCuentatem);

$emailtem = asignar ("email");
$email = verificar ($emailtem);

$contraseñatem = asignar ("contraseña");
$contraseña = verificar ($contraseñatem);

$grupo = "602";

if (preg_match($name, $nombre) ==1) {
    var_dump ($nombre);
} else {
    echo("Ingresaste algo no valido con lo solicitado");
}

if (preg_match($user, $username) ==1) {
    var_dump ($username);
} else {
    echo("Ingresaste algo no valido con lo solicitado");
}

if (preg_match($no_cuenta, $ncuenta) ==1) {
    var_dump ($ncuenta);
} else {
    echo("Ingresaste algo no valido con lo solicitado");
}

if (preg_match($mail_all, $email) ==1) {
    var_dump ($email);
} else {
    echo("Ingresaste algo no valido con lo solicitado");
}

if (preg_match($pass, $contraseña) ==1) {
    var_dump ($contraseña);
} else {
    echo("Ingresaste algo no valido con lo solicitado");
}


// original, asi estba
// asi estaba (funciona)y si lo de arriba funciona ya no es necesario-->
// $nombretem = asignar("nombre");
// $nombre = verificar ($nombretem);
// var_dump ($nombre);

// $usernametem = asignar("username");
// $username = verificar ($usernametem);
// var_dump ($username);

// $nCuentatem = asignar ("nCuenta");
// $ncuenta = verificar ($nCuentatem);
// var_dump ($ncuenta);

// $emailtem = asignar ("email");
// $email = verificar ($emailtem);
// var_dump ($email);

// $contraseñatem = asignar ("contraseña");
// $contraseña = verificar ($contraseñatem);
// var_dump ($contraseña);

// $grupotem = asignar ("grupo");
// $grupo = verificar ($grupotem);
// var_dump ($grupo);





    
    $buscarNombre = "SELECT * FROM usuario WHERE nombre='$nombre'";
    $query = mysqli_query ($con, $buscarNombre);
    $arreglo = mysqli_fetch_array ($query);
    if ($arreglo != NULL)
    {
        $respuesta = array("ok" => false, "mensaje" => "Ese nombre ya existe, no se puede guardar");
        // echo "Ese nombre si existe, no se puede guardar<br>"
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
            $respuesta = array("ok" => false, "mensaje" => "Ese usuario ya existe, no se puede guardar");
            // echo "Ese usuario si existe, no se puede guardar<br>";
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
                $respuesta = array("ok" => false, "mensaje" => "Ese numero de cuenta ya está registrado, no se puede guardar");
                // echo "Ese numero de cuenta si existe, no se puede guardar<br>";
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
                    $respuesta = array("ok" => false, "mensaje" => "Ese email ya es usado en otra cuenta, no se puede guardar");
                    // echo "Ese email ya es usado en otra cuenta, no se puede guardar<br>";
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
                    $respuesta = array("ok" => true, "mensaje" => "Se ha creado el usuario con éxito :)");
                    echo "<br><br>";

                }

            }          
        }
    }

    echo json_encode($respuesta)
    

    
?>