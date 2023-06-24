<?php
include("./config.php");
$con = connect();
session_start();

$grado = (isset($_POST["grado"]) && $_POST["grado"] != "") ? $_POST["grado"] : NULL;



if ($grado == "cuarto") {
    $sql = mysqli_prepare("SELECT grupo FROM grupo WHERE ID_GRADO='1'");
    mysqli_stmt_bind_param($sql, "s", $id_usuario);
    mysqli_stmt_execute($sql);
} elseif ($grado == "quinto") {
    $sql = mysqli_prepare("SELECT grupo FROM grupo WHERE ID_GRADO='2'");
    mysqli_stmt_bind_param($sql, "s", $id_usuario);
    mysqli_stmt_execute($sql);
    
} elseif ($grado == "sexto") {
    $sql = mysqli_prepare("SELECT grupo FROM grupo WHERE ID_GRADO='3'");
    mysqli_stmt_bind_param($sql, "s", $id_usuario);
    mysqli_stmt_execute($sql);

}

$res = mysqli_query($con, $sql);

$respuesta = [];
while ($datos = mysqli_fetch_assoc($res)) {
    $respuesta[] = $datos;
}

echo json_encode($respuesta);
?>