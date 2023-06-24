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
        case 'crearPregunta':
            crearPregunta($con);
            break;
        case 'editarPregunta':
            editarPregunta($con, $idUsuario);
            break;
        case 'eliminarPregunta':
            eliminarPregunta($con, $idUsuario);
            $data = json_decode(file_get_contents('php://input'), true);
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
function crearPregunta($con) {
    $textoPregunta = asignar('textoPregunta');
    //Implementar una sesión para obtener el ID de usuario aaaaa
    $idUsuario = $_SESSION['idUsuario'];

    if (!$textoPregunta) {
        echo 'Error: la pregunta no puede estar vacía.';
        return;
    }

    $stmt = $con->prepare('INSERT INTO preguntas (textoPregunta, ID_USUARIO) VALUES (?, ?)');
    $stmt->bind_param('si', $textoPregunta, $idUsuario);

    if ($stmt->execute()) {
        echo 'creacionExitosa';
    } else {
        echo 'Error: ' . $stmt->error;
    }

    $stmt->close();
}

function editarPregunta($con) {
    $textoPregunta = asignar('textoPregunta');
    $idPregunta = asignar('idPregunta');

    if ($textoPregunta === '' || $idPregunta === '') {
        echo 'Error: Ninguno de los campos puede estar vacío.';
        return;
    }

    $stmt = $con->prepare('UPDATE preguntas SET textoPregunta = ? WHERE ID_PREGUNTA = ?');
    $stmt->bind_param('si', $textoPregunta, $idPregunta);

    if ($stmt->execute()) {
        echo 'edicionExitosa';
    } else {
        echo 'Error: ' . $con->error;
    }
}

function eliminarPregunta($con) {
    $idPregunta = $data['idPregunta'];

    $idPregunta = asignar('idPregunta');

    if ($idPregunta === '') {
        echo 'Error: Se requiere el ID de la pregunta.';
        return;
    }

    $stmt = $con->prepare('DELETE FROM preguntas WHERE ID_PREGUNTA = ?');
    $stmt->bind_param('i', $idPregunta);

    if ($stmt->execute()) {
        echo '1';
    } else {
        echo 'Error: ' . $con->error;
    }
}
