<?php
include ("./config.php");
$con = connect();

if ($con->connect_errno) {
    echo "No se pudo connectar a MySQL: " . $con->connect_error;
    exit();
}

session_start();

if (!isset($_SESSION['id']) || !isset($_SESSION['username'])) {
    die("Error: Sesión no iniciada.");
}

$accion = isset($_POST['accion']) ? $_POST['accion'] : '';
$rol = isset($_POST['rol']) ? $_POST['rol'] : '';
$idUsuario = $_SESSION['id'];
$nombreUsuario = $_SESSION['username'];
$foroId = isset($_POST['foroId']) ? $_POST['foroId'] : null;

try {
    switch ($accion) {
        case 'crear':
            echo reportarExtravio($con);
            break;


        default:
            echo "Error: acción no reconocida.";
    }

} catch (Exception $e) {
    echo 'Error: ',  $e->getMessage();
}

function asignar($campo){
    return isset($_POST[$campo]) ? $_POST[$campo] : '';
}

function reportarExtravio($con){
    $idUsuario = $_SESSION['id'];
    $resultado = '0';
    $titulo = asignar("tituloExtravio");
    $lugar = asignar("lugarExtravio");
    $descripcion = asignar("descripcionObjeto");
    $foto = !empty(asignar("fotoObjeto")) ? asignar("fotoObjeto") : 'default.jpg';

    $crearExtravio = "INSERT INTO objeto_perdido (tituloExtravio, lugarExtravio, descripcionObjeto, fotoObjeto, ID_USUARIO) VALUES ('$titulo', '$lugar', '$descripcion', '$foto', '$idUsuario')";
    $query = mysqli_query ($con, $crearExtravio);

    if ($query === false) {
        echo "Error en la consulta: " . mysqli_error($con);
    } else {
        if($query == 1){
            $resultado = '1';
        }
    }
    return $resultado;
}
