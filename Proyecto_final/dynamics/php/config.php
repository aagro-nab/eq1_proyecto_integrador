<?php
    const DBHOST = "localhost";
    const DBUSER = "equipo01";
    const PASSWORD = "equser01all"; 
    const DB = "proyectoFinal"; 
    function connect ()
    {
    $conexion = mysqli_connect (DBHOST, DBUSER, PASSWORD, DB);
    return $conexion;
    }
?> 