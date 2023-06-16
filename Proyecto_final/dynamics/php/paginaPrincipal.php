<?php
    $include = include ("./config.php");
    $con = connect();
    session_start ();

    function asignar($input)
    {
        $input = (isset($_POST[$input]) && $_POST[$input] != "")? $_POST[$input] : NULL;
        return $input; 
    }

    function verificar ($opcion)
    {
        if (!isset ($opcion))
        {
            header ("location: ./registroAlumno.php");
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

    