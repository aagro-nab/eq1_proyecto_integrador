<?php
    include ("./config.php");
    $con = connect();

    function crearForo(){
        $buscarUser = "SELECT * FROM usuario WHERE nombreUsuario='$username'";
        $query = mysqli_query ($con, $buscarUser);
    }



?>