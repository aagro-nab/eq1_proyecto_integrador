<?php
include_once "./config.php";
$con = connect();
session_start ();
$rol = $_SESSION["Rol"];

function sanitas($data){
    global $con;
    $data = mysqli_real_escape_string($con, $data); // Escapar caracteres especiales para SQL
    $data = trim(stripslashes(htmlspecialchars($data))); // Evitar ejecución de código HTML y limpiar la entrada
    return $data;
}

function asignar($input)
{
    $input = (isset($_POST[$input]) && $_POST[$input] != "")? sanitas($_POST[$input]) : NULL;
    return $input;
}

function verificar ($opcion)
{
    if (!isset ($opcion))
    {
        //header ("location: ./seleccionRol.php");
    }
    else
    {
        //echo $opcion;
        return $opcion;
    }
};

$nombre = verificar(asignar("nombre"));
$username = verificar(asignar("username"));
$ncuenta = verificar(asignar("nCuenta"));
$email = verificar(asignar("email"));
$contraseña = verificar(asignar("contraseña"));
$grupo = verificar(asignar("grupo"));

$buscarNombre = "SELECT * FROM usuario WHERE nombre = ?";
$stmt = mysqli_prepare($con, $buscarNombre);
mysqli_stmt_bind_param($stmt, 's', $nombre);
mysqli_stmt_execute($stmt); // Ejecutando la consulta
$query = mysqli_stmt_get_result($stmt);
$arreglo = mysqli_fetch_array($query);


if ($arreglo != NULL) {
    $respuesta = array("ok" => false, "mensaje" => "Ese nombre ya existe, no se puede guardar");
} else {
    $_SESSION["nombre"] = $nombre;
    $buscarUser = "SELECT * FROM usuario WHERE nombreUsuario = ?";
    $stmt = mysqli_prepare($con, $buscarUser);
    mysqli_stmt_bind_param($stmt, 's', $username);
    mysqli_stmt_execute($stmt);
    $query = mysqli_stmt_get_result($stmt);
    $arreglo = mysqli_fetch_array($query);
    if ($arreglo != NULL) {
        $respuesta = array("ok" => false, "mensaje" => "Ese usuario ya existe, no se puede guardar");
    } else {
        $_SESSION["user"] = $username;
        $buscarNC = "SELECT * FROM usuario WHERE numeroCuenta = ?";
        $stmt = mysqli_prepare($con, $buscarNC);
        mysqli_stmt_bind_param($stmt, 's', $ncuenta);
        mysqli_stmt_execute($stmt);
        $query = mysqli_stmt_get_result($stmt);
        $arreglo = mysqli_fetch_array($query);
        if ($arreglo != NULL) {
            $respuesta = array("ok" => false, "mensaje" => "Ese numero de cuenta ya está registrado, no se puede guardar");
        } else {
            $_SESSION["nCuenta"] = $ncuenta;
            $buscarCorreo = "SELECT * FROM usuario WHERE email = ?";
            $stmt = mysqli_prepare($con, $buscarCorreo);
            mysqli_stmt_bind_param($stmt, 's', $email);
            mysqli_stmt_execute($stmt);
            $query = mysqli_stmt_get_result($stmt);
            $arreglo = mysqli_fetch_array($query);
            if ($arreglo != NULL) {
                $respuesta = array("ok" => false, "mensaje" => "Ese email ya es usado en otra cuenta, no se puede guardar");
            } else {
                $_SESSION["email"] = $email;
                $meterDB = "INSERT INTO usuario (nombre, nombreUsuario, numeroCuenta, email, contrasena, grupo, rol) VALUES (?, ?, ?, ?, ?, ?, ?)";
                $stmt = mysqli_prepare($con, $meterDB);
                mysqli_stmt_bind_param($stmt, 'sssssss', $nombre, $username, $ncuenta, $email, $contraseña, $grupo, $rol);
                mysqli_stmt_execute($stmt);
                $respuesta = array("ok" => true, "mensaje" => "Se ha creado el usuario con éxito :)");

            }
        }
    }

}
echo json_encode($respuesta);
mysqli_close($con);

?>