<?php
    const DBHOST = "localhost";
    const DBUSER = "root";
    const PASSWORD = "karen"; //QUITAR PASSWORD
    const DB = "proyectoFinal"; 
    function connect ()
    {
    $conexion = mysqli_connect (DBHOST, DBUSER, PASSWORD, DB);
    return $conexion;
    }
?> 