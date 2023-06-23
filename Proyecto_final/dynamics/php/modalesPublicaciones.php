<?php
include ("./config.php");
$con = connect();

if ($con->connect_errno) {
    echo "No se pudo connectar a MySQL: " . $con->connect_error;
    exit();
}

session_start();

$accion = isset($_POST['accion']) ? $_POST['accion'] : '';
$nombreUsuario = isset($_POST['nombreUsuario']) ? $_POST['nombreUsuario'] : '';

try {
    switch ($accion) {
        case 'crearPublicacion':
            crearPublicacion($con);
            break;
        case 'editarPublicacion':
            editarPublicacion($con);
            break;
        case 'eliminarPublicacion':
            eliminarPublicacion($con);
            break;
        case 'obtenerPublicaciones':
            obtenerPublicaciones($con);
            break;
        case 'crearComentario':
            crearComentario($con);
            break;
        case 'editarComentario':
            editarComentario($con);
            break;
        case 'eliminarComentario':
            eliminarComentario($con);
            break;
        default:
            echo "Error: acción no reconocida.";
    }

} catch (Exception $e) {
    echo 'Error: ',  $e->getMessage();
}

function asignar($campo) {
    return isset($_POST[$campo]) ? $_POST[$campo] : '';
}

function crearPublicacion($con) {
    $tituloPublicacion = asignar('tituloPublicacion');
    $textoPublicacion = asignar('textoPublicacion');
    $imagenPublicacion = asignar('imagenPublicacion');
    $estiloTexto = asignar('estiloTexto');
    $idUsuario = asignar('ID_USUARIO');
    $idForo = asignar('ID_FORO');

    $query = "INSERT INTO publicacion (tituloPublicacion, contenidoPublicacion, imagenPublicacion, estiloTexto, ID_USUARIO, ID_FORO) VALUES (?, ?, ?, ?, ?, ?)";

    if ($stmt = $con->prepare($query)) {
        $stmt->bind_param("ssssii", $tituloPublicacion, $textoPublicacion, $imagenPublicacion, $estiloTexto, $idUsuario, $idForo);


        if ($stmt->execute()) {
            echo "creacionExitosa";
        } else {
            echo "Hubo un error al intentar crear la publicación.";
        }
    } else {
        echo "Error en la preparación de la consulta: " . $con->error;
    }
}

function editarPublicacion($con) {
    $idPublicacion = asignar('publicacionId');
    $tituloPublicacion = asignar('tituloPublicacion');
    $contenidoPublicacion = asignar('textoPublicacion');
    $imagenPublicacion = file_get_contents($_FILES['imagenPublicacion']['tmp_name']);
    $estiloTexto = asignar('estiloTexto');

    $query = "UPDATE publicacion SET tituloPublicacion = ?, contenidoPublicacion = ?, imagenPublicacion = ?, estiloTexto = ?, fechaPublicacion = CURRENT_TIMESTAMP WHERE ID_PUBLICACION = ?";
    if ($stmt = $con->prepare($query)) {
        $stmt->bind_param("ssbsi", $tituloPublicacion, $contenidoPublicacion, $imagenPublicacion, $estiloTexto, $idPublicacion);
        if ($stmt->execute()) {
            echo "edicionExitosa";
        } else {
            echo "Error al intentar editar la publicación: " . $stmt->error;
        }
    } else {
        echo "Error en la preparación de la consulta: " . $con->error;
    }
}

function eliminarPublicacion($con) {
    $idPublicacion = asignar('publicacionId');

    $query = "DELETE FROM publicacion WHERE ID_PUBLICACION = ?";
    if ($stmt = $con->prepare($query)) {
        $stmt->bind_param("i", $idPublicacion);
        if ($stmt->execute()) {
            echo "eliminacionExitosa";
        } else {
            echo "Error al intentar eliminar la publicación: " . $stmt->error;
        }
    } else {
        echo "Error en la preparación de la consulta: " . $con->error;
    }
}

function obtenerPublicaciones($con) {
    $query = "SELECT ID_PUBLICACION, tituloPublicacion FROM publicacion ORDER BY fechaPublicacion DESC";
    if ($result = $con->query($query)) {
        $publicaciones = [];
        while ($row = $result->fetch_assoc()) {
            $publicaciones[] = $row;
        }
        echo json_encode($publicaciones);
    } else {
        echo "Error al intentar obtener las publicaciones: " . $con->error;
    }
}

function crearComentario($con) {
    $contenidoRespuesta = asignar('contenidoComentario');
    $idUsuario = isset($_SESSION['ID_USUARIO']) ? $_SESSION['ID_USUARIO'] : ''; //Corregir la forma en la que obtiene el ID de usuario
    $idPublicacion = asignar('idPublicacion');

    $query = "INSERT INTO respuesta (contenidoRespuesta, ID_USUARIO, ID_PUBLICACION) VALUES (?, ?, ?)";
    if ($stmt = $con->prepare($query)) {
        $stmt->bind_param("sii", $contenidoRespuesta, $idUsuario, $idPublicacion);
        if ($stmt->execute()) {
            echo "creacionExitosa";
        } else {
            echo "Error al intentar crear el comentario: " . $stmt->error;
        }
    } else {
        echo "Error en la preparación de la consulta: " . $con->error;
    }
}

function editarComentario($con) {
    $idRespuesta = asignar('idRespuesta');
    $contenidoRespuesta = asignar('contenidoComentario');

    $query = "UPDATE respuesta SET contenidoRespuesta = ?, fechaPublicacion = CURRENT_TIMESTAMP, editado = 1 WHERE ID_RESPUESTA = ?";
    if ($stmt = $con->prepare($query)) {
        $stmt->bind_param("si", $contenidoRespuesta, $idRespuesta);
        if ($stmt->execute()) {
            echo "edicionExitosa";
        } else {
            echo "Error al intentar editar el comentario: " . $stmt->error;
        }
    } else {
        echo "Error en la preparación de la consulta: " . $con->error;
    }
}

function eliminarComentario($con) {
    $idComentario = asignar('comentarioId');

    $query = "DELETE FROM respuesta WHERE ID_RESPUESTA = ?";
    if ($stmt = $con->prepare($query)) {
        $stmt->bind_param("i", $idComentario);
        if ($stmt->execute()) {
            echo "eliminacionExitosa";
        } else {
            echo "Error al intentar eliminar el comentario: " . $stmt->error;
        }
    } else {
        echo "Error en la preparación de la consulta: " . $con->error;
    }
}
