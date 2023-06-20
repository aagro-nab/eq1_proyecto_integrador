<?php

    //consultarGrupos almacena todos los grupos contenidos en la base en el arreglo de respuesta, luego los devuelve para
    //asignarlos al select del registro

    require "config.php";
    $conexion = connect ();
    if(!$conexion)
    {
        echo "No se puedo conectar la base";
    }else{
        $sql =  "SELECT grupo_id, grupo_name FROM grupo"; //Seleccionar el Id de los grupos y el nombre de los grupos
        $res = mysqli_query($conexion, $sql);
        $respuesta = [];
        while($datos = mysqli_fetch_assoc($res)){
            $respuesta[] = $datos;
        }
        echo json_encode($respuesta);
    }
?>