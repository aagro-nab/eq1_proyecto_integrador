<?php
//ESTA VERSIÓN DEL CÓDIGO FORMA PARTE DE LA OPTIMIZACIÓN FINAL v2 DE LOS ENTREGABLES
// PARA UN MEJOR MANEJO DE ERRORES TANTO EN EL DESARROLLO FINAL DEL PROYECTO, COMO EN LA POSTERIDAD
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
            echo crearForo($con, $rol);
            break;
        case 'recuperar':
            recuperarForos($con);
            break;
        case 'unirse':
            echo entrarForo($con, $foroId, $idUsuario);
            break;
        case 'salir':
            echo salirDeForo($con, $foroId);
            break;
        case 'recuperarSalida':
            recuperarForosUsuario($con);
            break;
        case 'editar':
            echo editarForo($con);
            break;
        case 'eliminar':
            echo eliminarForo($con, $foroId);
            break;
        case 'reportar':
            $comentario = isset($_POST['comentario']) ? $_POST['comentario'] : '';
            echo reportarForo($con, $foroId, $comentario);
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

function crearForo($con, $rol){
    global $idUsuario;
    $resultado = '0';
    $nombre = asignar("nombreForo");
    $descripcion = asignar("descripcionForo");
    $privacidad = asignar("esPublico") === 'on' ? 1 : 0;
    $foto = !empty(asignar("imagenForo")) ? asignar("imagenForo") : 'default.jpg';

    $crearForo = "INSERT INTO foro (nombre, descripcion, privacidad, foto, ID_USUARIO) VALUES ('$nombre', '$descripcion', '$privacidad', '$foto', '$idUsuario')";
    $query = mysqli_query ($con, $crearForo);

    if ($query === false) {
        echo "Error en la consulta: " . mysqli_error($con);
    } else {
        if($query == 1){
            $resultado = '1';
        }
    }
    return $resultado;
}

function editarForo($con){
    $resultado = '0';
    $idForo = $_POST['idForo'];
    $nombre = $_POST['nombreForo'];
    $descripcion = $_POST['descripcionForo'];
    $privacidad = isset($_POST['esPublico']) ? 1 : 0;
    $foto = isset($_POST['imagenForo']) ? $_POST['imagenForo'] : 'default.jpg';

    $editarForo = "UPDATE foro SET nombre = '$nombre', descripcion = '$descripcion', privacidad = '$privacidad', foto = '$foto' WHERE ID_FORO = $idForo";
    $query = mysqli_query($con, $editarForo);

    if ($query === false) {
        echo "Error en la consulta: " . mysqli_error($con);
    } else {
        if(mysqli_affected_rows($con) > 0){
            $resultado = '1';
        }
    }
    return $resultado;
}

function eliminarForo($con, $foroId) {

}

function recuperarForos($con){
    $rol = $_SESSION['rol'];
    $recuperarForos = "";

    // Si el rol es 0, solo se seleccionan los foros públicos pq es alumno
    if ($rol == 'alumno'){
        $recuperarForos = "SELECT ID_FORO, nombre, descripcion, privacidad FROM foro WHERE privacidad = 1";
    }
    // Si el rol es 1 o 2, (moderador o admin) se seleccionan todos los foros
    else if ($rol == 'moderador' || $rol == 'administrador'){
        $recuperarForos = "SELECT ID_FORO, nombre, descripcion, privacidad FROM foro";
    }

    $query = mysqli_query($con, $recuperarForos);

    if ($query === false) {
        echo "Error en la consulta: " . mysqli_error($con);
    } else {
        $foros = array();
        while ($row = mysqli_fetch_assoc($query)) {
            $foros[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode($foros);
    }
}

function recuperarForosUsuario($con) {
    $idUsuario = $_SESSION['id'];

    $forosQuery = "SELECT f.ID_FORO, f.nombre FROM foro f
        INNER JOIN usuario_foro uf ON f.ID_FORO = uf.ID_FORO
        WHERE uf.ID_USUARIO = ?";
    $stmtForos = $con->prepare($forosQuery);
    $stmtForos->bind_param('i', $idUsuario);
    $stmtForos->execute();
    $resultadoForos = $stmtForos->get_result();
    $foros = $resultadoForos->fetch_all(MYSQLI_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($foros);
}

function entrarForo($con, $foroId, $idUsuario){
    $resultado = '0';

    $verificar = "SELECT * FROM usuario_foro WHERE ID_USUARIO = $idUsuario AND ID_FORO = $foroId";
    $queryVerificar = mysqli_query($con, $verificar);

    if (mysqli_num_rows($queryVerificar) > 0) {
        $resultado = '2';
    } else {
        $unirseAForo = "INSERT INTO usuario_foro (ID_USUARIO, ID_FORO) VALUES ($idUsuario, $foroId)";
        $queryUnirse = mysqli_query($con, $unirseAForo);

        if ($queryUnirse === false) {
            echo "Error en la consulta: " . mysqli_error($con);
        } else {
            if(mysqli_affected_rows($con) > 0){
                $resultado = '1';
            }
        }
    }
    return $resultado;
}

function salirDeForo($con, $foroId) {
    $resultado = '0';
    $idUsuario = $_SESSION['id'];

    $salirForo = "DELETE FROM usuario_foro WHERE ID_USUARIO = $idUsuario AND ID_FORO = $foroId";
    $query = mysqli_query($con, $salirForo);

    if ($query === false) {
        echo "Error en la consulta: " . mysqli_error($con);
    } elseif (mysqli_affected_rows($con) > 0){
            $resultado = '1';
    }
    return $resultado;
}

function reportarForo($con, $foroId, $comentario) {
    $resultado = '0';
    $idUsuario = $_SESSION['id'];

    $reportarForo = "INSERT INTO reportes_foro (ID_FORO, ID_USUARIO, COMENTARIO) VALUES (?, ?, ?)";

    if ($stmt = mysqli_prepare($con, $reportarForo)) {
        mysqli_stmt_bind_param($stmt, "iis", $foroId, $idUsuario, $comentario);

        if (mysqli_stmt_execute($stmt)) {
            if (mysqli_stmt_affected_rows($stmt) > 0) {
                $resultado = '1';
            }
        } else {
            echo "Error en la consulta: " . mysqli_error($con);
        }
        mysqli_stmt_close($stmt);
    } else {
        echo "Error al preparar la consulta: " . mysqli_error($con);
    }

    return $resultado;
}