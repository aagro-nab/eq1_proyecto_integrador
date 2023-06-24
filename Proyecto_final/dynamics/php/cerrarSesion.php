<?php
    session_start();
    $cookieUsuario = (isset($_COOKIE['usuario']) && $_COOKIE['usuario'] != "")? $_COOKIE['usuario'] : FALSE;
    $cookieRol = (isset($_COOKIE['rol']) && $_COOKIE['rol'] != "")? $_COOKIE['rol'] : FALSE;

    if($cookieUsuario){
        setcookie("usuario", 0, time() -1);
    }
    if($cookieRol){
        setcookie("rol", 0, time() -1);
    }
    //desconozco si hay más cookies, si las hay por favor agregarlas con la estructura de arriba
    session_destroy();
    header("location:../../../index.html");
?>