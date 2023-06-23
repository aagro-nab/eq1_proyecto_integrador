<?php
include ("./config.php");
$con = connect();
session_start();

$json = trim(file_get_contents("php://input"));
    $decode = json_decode($json, true);
    // var_dump($json);
    $accion = $decode["accion"];
    $rol = $decode["rol"];

// $accion = $_POST['accion'];
// $rol = $_POST['rol'];

// var_dump($accion);


$accionrol = asignar('1');
$accionotro = asignar('crear');

// $rol = 'crear';
$accionrol = 1;

$resultado = '3';


switch ($accion) {
    case 'crear':
        echo crearForo($con, $rol);
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
    global $decode;
    $valor = isset($decode[$campo]) ? $decode[$campo] : '';
    // var_dump($valor);
    if($campo == "esPublico" && $valor == "on"){
        $valor = 1;
    }elseif($campo == "esPublico"){
        $valor = 0;
    }
    return $valor;
}

function crearForo($con, $rol){
    $resultado = '0';
    $nombre = asignar("nombreForo");
    $descripcion = asignar("descripcionForo");
    $privacidad = asignar("esPublico");
    $foto = asignar("imagenForo");

    if ($rol == 1 || $rol == 2){
        // TODO : AGREGA FOTO
        $crearForo = "INSERT INTO foro (nombre, descripcion, privacidad) VALUES ('$nombre', '$descripcion', $privacidad)";
        // var_dump($crearForo);
        $query = mysqli_query ($con, $crearForo);
        if($query == 1){
            $resultado = '1';
        }
    }else{
        $resultado = '3';
    }
    $res = array('res' => $resultado);
    return json_encode($res);
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


return json_encode($resultado);