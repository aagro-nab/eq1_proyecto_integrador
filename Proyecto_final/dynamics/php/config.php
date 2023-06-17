<?php
    const DBHOST = "localhost";
    const DBUSER = "equipo01";
    const PASSWORD = "equser01all"; //QUITAR PASSWORD
    const DB = "proyectoFinal"; 
    function connect ()
    {
    $conexion = mysqli_connect (DBHOST, DBUSER, PASSWORD, DB);
    return $conexion;
    }
?> 