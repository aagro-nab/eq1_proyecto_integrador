<?php
    include ("./config.php");
    $con = connect();
    session_start();

    $grado = (isset($_POST["grado"]) && $_POST["grado"] != "")? $_POST ["grado"] : NULL;

        if ($grado == "cuarto")
        {
            $sql =  "SELECT grupo FROM grupo WHERE ID_GRADO='1'";
        }elseif ($grado == "quinto")
        {
            $sql =  "SELECT grupo FROM grupo WHERE ID_GRADO='2'";
         }elseif ($grado == "sexto")
        {
            $sql =  "SELECT grupo FROM grupo WHERE ID_GRADO='3'";
        }

        $res = mysqli_query($con, $sql);

        $respuesta = [];
        while($datos = mysqli_fetch_assoc($res))
        {
            $respuesta[] = $datos;
        }
        
        echo json_encode($respuesta); 
?>