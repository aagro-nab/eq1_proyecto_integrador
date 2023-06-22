<?php
    include ("./config.php");
    $con = connect();

    require "revisionInsert.php";

    function crearForo(){
        $resultado = '0';
        $nombre = asignar("nombreForo");
        $descripcion = asignar("descripcionForo");
        $privacidad = asignar("esPublico");
        $foto = asignar("imagenForo");
        
        $crearForo = "INSERT INTO foro (nombre, descripcion, privacidad, foto) VALUES ('$nombre', '$descripcion', $privacidad, $foto)";
        $query = mysqli_query ($con, $crearForo);

        if($query == 1){
            $resultado = '1';
        }

        return $resultado;
    }


    function entrarForo(){
        //En el js viene el ID del foro como JSON.stringify({accion: 'unirse', foroId: foro.foroId})
        //no se como poner que eso se vuelva variable aquí en php

        $resultado = '0';

        $usuario = $_SESSION['username'];
        $recuperarId = "SELECT ID_USUARIO FROM usuario WHERE nombreUsuario = '$usuario'";
        $query_id = mysqli_query($con, $recuperarId);
        $usuarioID = mysqli_fetch_assoc($query_id);

        $foroId = asignar("foroId");
        
        $entrarForo = "INSERT INTO usuario_foro (ID_USUARIO, ID_FORO) VALUES ('$usuarioId', '$foroId')";
        $query = mysqli_query ($con, $entrarForo);

        if($query == 1){
            $resultado = '1';
        }

        return $resultado;

    }

    function editarForo(){
        $resultado = '0';

        $nombre = asignar("nombreForo");
        $descripcion = asignar("descripcionForo");
        $privacidad = asignar("esPublico");
        $foto = asignar("imagenForo");
        
        $editarForo = "UPDATE foro SET nombre = '$nombre', descripcion = '$descripcion', privacidad = $privacidad, foro = $foto
        WHERE ID_FORO = '$foroid')";
        $query = mysqli_query ($con, $editarForo);

        if($query == 1){
            $resultado = '1';
        }

        return $resultado;
    }

    function salirForo(){
        //En el js viene el ID del foro como JSON.stringify({accion: 'salir', foroId: foro.foroId})
        //no se como poner que eso se vuelva variable aquí en php

        $resultado = '0';

        $usuario = $_SESSION['username'];
        $recuperarId = "SELECT ID_USUARIO FROM usuario WHERE nombreUsuario = '$usuario'";
        $query_id = mysqli_query($con, $recuperarId);
        $usuarioId = mysqli_fetch_assoc($query_id);

        $foroId = asignar("foroId");
        
        $salirForo = "DELETE FROM usuario_foro WHERE ID_USUARIO = $usuarioId AND ID_FORO = $foroId";
        $query = mysqli_query ($con, $salirForo);

        if($query == 1){
            $resultado = '1';
        }

        return $resultado;

    }

?>