<?php
include ("./config.php");
$con = connect();

if ($con->connect_errno) {
    echo "No se pudo connectar a MySQL: " . $con->connect_error;
    exit();
}

session_start();

$accion = isset($_POST['accion']) ? $_POST['accion'] : '';
$rol = isset($_POST['rol']) ? $_POST['rol'] : '';
$nombreUsuario = isset($_POST['usuario']) ? $_POST['usuario'] : '';
$foroId = isset($_POST['foroId']) ? $_POST['foroId'] : null;

try {
    switch ($accion) {
        case 'crear':
            echo crearForo($con, $rol);
            break;
        case 'recuperar':
            recuperarForos($con, $rol);
            break;
        case 'recuperarSalida':
        case 'salir':
            manejarForos($con, $accion, $nombreUsuario, $foroId);
            break;
        case 'editar':
            echo editarForo($con, $rol);
            break;
        case 'eliminar':
            echo eliminarForo($con, $rol, $foroId);
            break;
        case 'reportar':
            $usuarioId = isset($_POST['usuarioId']) ? $_POST['usuarioId'] : '';
            $comentario = isset($_POST['comentario']) ? $_POST['comentario'] : '';
            echo reportarForo($con, $foroId, $usuarioId, $comentario);
            break;

        // Aquí se pueden agregar más casos
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
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $resultado = '0';
    $nombre = asignar("nombreForo");
    $descripcion = asignar("descripcionForo");
    $privacidad = asignar("esPublico") === 'on' ? 1 : 0;
    $foto = !empty(asignar("imagenForo")) ? asignar("imagenForo") : 'default.jpg';

    $crearForo = "INSERT INTO foro (nombre, descripcion, privacidad, foto) VALUES ('$nombre', '$descripcion', '$privacidad', '$foto')";
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

function editarForo($con, $rol){
    $resultado = '0';
    $idForo = asignar("idForo");
    $nombre = asignar("nombreForo");
    $descripcion = asignar("descripcionForo");
    $privacidad = asignar("esPublico") === 'on' ? 1 : 0;
    $foto = !empty(asignar("imagenForo")) ? asignar("imagenForo") : 'default.jpg';

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

function recuperarForos($con, $rol){
    $recuperarForos = "";

    // Si el rol es 0, solo se seleccionan los foros públicos pq es alumno
    if ($rol == 0){
        $recuperarForos = "SELECT ID_FORO, nombre, descripcion, privacidad FROM foro WHERE privacidad = 1";
    }
    // Si el rol es 1 o 2, (moderador o admin) se seleccionan todos los foros
    else if ($rol == 1 || $rol == 2){
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

function manejarForos($db, $accion, $nombreUsuario, $foroId = null) {
    switch ($accion) {
        case 'recuperarSalida':
            $usuarioQuery = "SELECT ID_USUARIO FROM usuario WHERE nombreUsuario = ?";
            $stmtUsuario = $db->prepare($usuarioQuery);
            $stmtUsuario->bind_param('s', $nombreUsuario);
            $stmtUsuario->execute();
            $resultadoUsuario = $stmtUsuario->get_result();
            $usuario = $resultadoUsuario->fetch_assoc();

            $forosQuery = "SELECT f.ID_FORO, f.nombre FROM foro f
                INNER JOIN usuario_foro uf ON f.ID_FORO = uf.ID_FORO
                WHERE uf.ID_USUARIO = ?";
            $stmtForos = $db->prepare($forosQuery);
            $stmtForos->bind_param('i', $usuario['ID_USUARIO']);
            $stmtForos->execute();
            $resultadoForos = $stmtForos->get_result();
            $foros = $resultadoForos->fetch_all(MYSQLI_ASSOC);

            echo json_encode($foros);
            break;
        case 'salir':
            $usuarioQuery = "SELECT ID_USUARIO FROM usuario WHERE nombreUsuario = ?";
            $stmtUsuario = $db->prepare($usuarioQuery);
            $stmtUsuario->bind_param('s', $nombreUsuario);
            $stmtUsuario->execute();
            $resultadoUsuario = $stmtUsuario->get_result();
            $usuario = $resultadoUsuario->fetch_assoc();

            $salirQuery = "DELETE FROM usuario_foro WHERE ID_USUARIO = ? AND ID_FORO = ?";
            $stmtSalir = $db->prepare($salirQuery);
            $stmtSalir->bind_param('ii', $usuario['ID_USUARIO'], $foroId);
            $resultadoSalir = $stmtSalir->execute();

            if ($resultadoSalir) {
                echo '1';
            } else {
                echo '0';
            }
            break;
        default:
            break;
    }
}

function eliminarForo($con, $rol, $foroId){
    $resultado = '0';

    if ($rol == 2){
        $eliminarUsuarioForo = "DELETE FROM usuario_foro WHERE ID_FORO = $foroId";
        $queryUsuarioForo = mysqli_query($con, $eliminarUsuarioForo);

        if ($queryUsuarioForo === false) {
            echo "Error en la consulta: " . mysqli_error($con);
        } else {
            $eliminarForo = "DELETE FROM foro WHERE ID_FORO = $foroId";
            $queryForo = mysqli_query($con, $eliminarForo);

            if ($queryForo === false) {
                echo "Error en la consulta: " . mysqli_error($con);
            } else {
                $resultado = '1';
            }
        }
    }
    return $resultado;
}

function reportarForo($con, $foroId, $usuarioId, $comentario){
    $resultado = '0';
    $reportarForo = "INSERT INTO reportes_foro (ID_FORO, ID_USUARIO, COMENTARIO) VALUES ($foroId, $usuarioId, '$comentario')";
    $query = mysqli_query($con, $reportarForo);

    if ($query === false) {
        echo "Error en la consulta: " . mysqli_error($con);
    } else {
        if(mysqli_affected_rows($con) > 0){
            $resultado = '1';
        }
    }
    return $resultado;
}
