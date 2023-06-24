<?php
    $include = include ("./config.php");
    $con = connect();
    session_start ();
    $rol = $_SESSION["Rol"];
    define("ALGORITMO", "aes-256-cbc");
    //define("PASS", uniqid());

    function hashearContra($contraseña)
    {
        $pass_hasheada = hash("SHA256", $contraseña);
        return $pass_hasheada;
    }

    function verificar_contra($contraseña, $correct, $sal)
    {
        $coincide = false;
        $caracteres = str_split("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
        for ($i = 0; $i < count($caracteres); $i++) {
            for ($j = 0; $j < count($caracteres); $j++) {
                $pimienta = $caracteres[$i] .$caracteres[$j];
                $contra = $contraseña.$pimienta.$sal;
                if (hashearContra($contra) == $correct) {
                    $coincide = true;
                    break;
                }
            }
        }
        return $coincide;
    }

    function generarSal()
    {
        $sal = uniqid();
        return $sal;
    }

    function generarPimienta()
    {
        $caracteres = str_split("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
        $partes_pimienta = array_rand($caracteres, 2);
        $p1 = $caracteres[$partes_pimienta[0]];
        $p2 = $caracteres[$partes_pimienta[1]];
        $pimienta = $p1 . $p2;
        return $pimienta;
    }

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
        else 
        { //si todo ok, se pasa a este filtro de sanitizacion
            $opcion = trim($opcion);
            $opcion = stripslashes($opcion);
            $opcion = htmlspecialchars($opcion);
        }
        return $opcion;
    }

    // verificar con regex
    $name = "/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?<!\s)$/m";// REVISAR 
    $user = "/([A-z]|[0-9]){5,10}/i";
    $no_cuenta = "/[3](20|21|22|23)\d{6}/i";
    $mail_all = "/([3](20|21|22|23)\d{6}?|\w+)@(alumno.enp.unam.mx|comunidad.unam.mx)/i";
    $pass = "/([A-z]|[0-9]){8,50}/i";

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

    if (preg_match($name, $nombre) ==1) 
    {
        if (preg_match($user, $username) ==1) 
        {
            if (preg_match($no_cuenta, $ncuenta) ==1)
            {
                if (preg_match($mail_all, $email) ==1) 
                {
                    if (preg_match($pass, $contraseña) ==1) 
                    {
                        $respuesta = array("ok" => true, "mensaje" => "Los datos que inroduciste son correctos");
                    }
                    else
                    {
                        $respuesta = array("ok" => false, "mensaje" => "Ingresaste una contraseña no valida con la solicitada");
                    }
                }
                else
                {
                    
                    $respuesta = array("ok" => false, "mensaje" => "Ingresaste un correo electronico no valido con el solicitado");
                }
            }
            else
            {
                $respuesta = array("ok" => false, "mensaje" => "Ingresaste un numero de cuenta no valido con el solicitado");
            } 
        }
        else
        {
            $respuesta = array("ok" => false, "mensaje" => "Ingresaste un usuario no correspondiente con el solicitado");
        }        
    }
    else
    {
        $respuesta = array("ok" => false, "mensaje" => "Ingresaste un nombre no correspondiente con el solicitado");
    }
    
    $sal = generarSal();
    $pimienta = generarPimienta();
    $contraHash = hashearContra($contraseña.$pimienta.$sal);

    echo json_encode($respuesta);  

?>