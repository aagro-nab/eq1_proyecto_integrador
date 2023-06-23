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
        case 'asignarModerador':
            asignarModerador($con, $nombreUsuario);
            break;
        case 'actualizarUsuario':
            actualizarUsuario($con);
            break;

        // Aquí se pueden agregar más casos
        default:
            echo "Error: acción no reconocida.";
    }
} catch (Exception $e) {
    echo 'Error: ',  $e->getMessage();
}

function asignar($campo) {
    return isset($_POST[$campo]) ? $_POST[$campo] : '';
}

function asignarModerador($con, $nombreUsuario){
    $query = "UPDATE usuario SET rol = 'moderador' WHERE nombreUsuario = ?";

    if($stmt = $con->prepare($query)) {
        $stmt->bind_param("s", $nombreUsuario);
        if($stmt->execute()) {
            echo "El usuario ha sido asignado como moderador.";
        } else {
            echo "Hubo un error al intentar asignar el rol al usuario.";
        }
    } else {
        echo "Error en la preparación de la consulta: " . $con->error;
    }
}

function actualizarUsuario($con) {
    $nombre = asignar('nombre');
    $nombreUsuario = asignar('nombreUsuario');
    $numeroCuenta = asignar('numeroCuenta');
    $email = asignar('email');
    $contrasena = asignar('contrasena');
    $grupo = asignar('grupo');
    $rol = asignar('rol');
    $fotoPerfil = asignar('fotoPerfil');
    $etiquetas = asignar('etiquetas');
    $idHorario = asignar('ID_HORARIO');
    $idUsuario = asignar('ID_USUARIO');

    $query = "UPDATE usuario SET nombre = ?, nombreUsuario = ?, numeroCuenta = ?, email = ?, contrasena = ?, grupo = ?, rol = ?, fotoPerfil = ?, etiquetas = ?, ID_HORARIO = ? WHERE ID_USUARIO = ?";
    $stmtUsuario = $con->prepare("SELECT * FROM usuario WHERE nombreUsuario = ? AND ID_USUARIO != ?");
    $stmtEmail = $con->prepare("SELECT * FROM usuario WHERE email = ? AND ID_USUARIO != ?");

    $stmtUsuario->bind_param("si", $nombreUsuario, $idUsuario);
    $stmtUsuario->execute();
    $resultUsuario = $stmtUsuario->get_result();
    if($resultUsuario->num_rows > 0){
        echo 'usuarioExistente';
        exit();
    }

    $stmtEmail->bind_param("si", $email, $idUsuario);
    $stmtEmail->execute();
    $resultEmail = $stmtEmail->get_result();
    if($resultEmail->num_rows > 0){
        echo 'correoExistente';
        exit();
    }

    if ($stmt = $con->prepare($query)) {
        $stmt->bind_param("sssssssbssi", $nombre, $nombreUsuario, $numeroCuenta, $email, $contrasena, $grupo, $rol, $fotoPerfil, $etiquetas, $idHorario, $idUsuario);

        if ($stmt->execute()) {
            echo "actualizacionExitosa";
        } else {
            echo "Hubo un error al intentar actualizar los datos del usuario.";
        }
    } else {
        echo "Error en la preparación de la consulta: " . $con->error;
    }
}

