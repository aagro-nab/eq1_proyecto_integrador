<?php
include ("./config.php");
$con = connect();
session_start();

$accion = $_POST['accion'];
$rol = $_POST['rol'];

switch ($accion) {
    case 'crear':
        crearForo($con, $rol);
        break;
    case 'entrar':
        entrarForo($con, $rol);
        break;
    case 'editar':
        editarForo($con, $rol);
        break;
    case 'salir':
        salirForo($con, $rol);
        break;
    // Aquí se pueden agregar más casos o seguir una estructura similar para los demás modales
}

function asignar($campo){
    return isset($_POST[$campo]) ? $_POST[$campo] : '';
}

function crearForo($con, $rol){
    $resultado = '0';
    $nombre = asignar("nombreForo");
    $descripcion = asignar("descripcionForo");
    $privacidad = asignar("esPublico");
    $foto = asignar("imagenForo");

    if ($rol == 1 || $rol == 2){
        $crearForo = "INSERT INTO foro (nombre, descripcion, privacidad, foto, rol) VALUES ('$nombre', '$descripcion', $privacidad, $foto, $rol)";
        $query = mysqli_query ($con, $crearForo);

        if($query == 1){
            $resultado = '1';
        }
    }
    return $resultado;
}

function entrarForo($con, $rol){
    $resultado = '0';
    $usuario = $_SESSION['username'];
    $recuperarID = "SELECT ID_USUARIO FROM usuario WHERE nombreUsuario = '$usuario'";
    $query_id = mysqli_query($con, $recuperarID);
    $usuarioID = mysqli_fetch_assoc($query_id)['ID_USUARIO'];

    $foroID = asignar("foroId");

    if ($rol == 0 || $rol == 1 || $rol == 2){
        $entrarForo = "INSERT INTO usuario_foro (ID_USUARIO, ID_FORO) VALUES ('$usuarioID', '$foroID')";
        $query = mysqli_query ($con, $entrarForo);

        if($query == 1){
            $resultado = '1';
        }
    }
    return $resultado;
}

function editarForo($con, $rol){
    $resultado = '0';
    $foroID = asignar("foroId");
    $nuevoTitulo = asignar("nombreForo");
    $nuevoContenido = asignar("descripcionForo");

    if ($rol == 1 || $rol == 2){
        $editarForo = "UPDATE foro SET nombre = '$nuevoTitulo', descripcion = '$nuevoContenido' WHERE ID_FORO = $foroID";
        $query = mysqli_query($con, $editarForo);

        if($query == 1){
            $resultado = '1';
        }
    }
    return $resultado;
}

function salirForo($con, $rol){
    $resultado = '0';
    $usuario = $_SESSION['username'];
    $recuperarID = "SELECT ID_USUARIO FROM usuario WHERE nombreUsuario = '$usuario'";
    $query_id = mysqli_query($con, $recuperarID);
    $usuarioID = mysqli_fetch_assoc($query_id)['ID_USUARIO'];

    $foroID = asignar("foroId");

    if ($rol == 0 || $rol == 1 || $rol == 2){
        $salirForo = "DELETE FROM usuario_foro WHERE ID_USUARIO = $usuarioID AND ID_FORO = $foroID";
        $query = mysqli_query ($con, $salirForo);

        if($query == 1){
            $resultado = '1';
        }
    }
    return $resultado;
}
