<?php
include ("./config.php");
$con = connect();
session_start();


    function asignar($input)
    {
        $input = (isset($_POST[$input]) && $_POST[$input] != "")? $_POST[$input] : NULL;
        return $input; 
    }
    $grado = asignar("grado");
    //var_dump ($grado);

        if ($grado == "cuarto")
        {
            $sql =  "SELECT grupo FROM grupo WHERE ID_GRADO='1'";
        }
        if ($grado == "quinto")
        {
            $sql =  "SELECT grupo FROM grupo WHERE ID_GRADO='2'";
        }
        if ($grado == "sexto")
        {
            $sql =  "SELECT grupo FROM grupo WHERE ID_GRADO='3'";
        }
        
        
        $res = mysqli_query($con, $sql);

        $respuesta = [];
        while($datos = mysqli_fetch_assoc($res)){
            $respuesta[] = $datos;

        }
         json_encode($respuesta);
    
?>