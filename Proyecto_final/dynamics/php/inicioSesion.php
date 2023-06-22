<?php
//conectar con la base de datos
$include = include("./config.php");
$con = connect();
session_start();

//recibe los datos de inicioDeSesion
$username = (isset($_POST["login-username"]) && $_POST["login-username"] != "")? $_POST["login-username"] : NULL;
$pswrd = (isset($_POST["login-password"]) && $_POST["login-password"] != "")? $_POST["login-password"] : NULL;
$remember = (isset($_POST["remember-me"]) && $_POST["remember-me"] != "")? $_POST["remember-me"] : NULL;

// validar el username con regex
$user = "/([A-z]|[0-9]){5,15}/i";
$pass = "/([A-z]|[0-9]){6,}/i";

if (preg_match($user, $username) ==1) {
    echo("ingresaste un username valido");
} else {
    echo("ingresaste un username invalido");
}
if (preg_match($pass, $pswrd) ==1) {
    echo("ingresaste una contraseña valida");
} else {
    echo("ingresaste una contraseña invalida");
}
// estaba pensando en un
// return $al inicio de sesion tipo que ya te deje continuar normal si todo ok



//consultar datos
if($include && $con){
    $sql = "SELECT * FROM usuario WHERE nombreUsuario='$username' AND contrasena='$pswrd'";
    $query = mysqli_query($con, $sql);//busca que el usuario exista y que la contraseña también
    
    $sql_rol = "SELECT rol FROM usuario WHERE nombreUsuario='$username'";    
    $query_rol = mysqli_query($con, $sql_rol);

    

    $datos = mysqli_fetch_assoc($query); //recibe los datos de $query para poder procesarlos
    $rol = mysqli_fetch_array($query_rol);

    $r = $rol[0];//

    if($datos){//si $datos es TRUE redireccionar a la página principal 
        $_SESSION['username'] = $username;// "$_SESSION es una variable que va a guardar el username para poder iniciar sesion en la página principal 

        //revisa el valor de $rol, y cuando encuentre una coincidencia es la direccion que va a tomar
        switch($r){
            case "estudiante":
                header("location:./paginaPrincipal.php");
                break;
            case "moderador":
                header("location:[pagina para moderadores]");//cambiar a la pagina correcta
                break;
            case "administrador":
                header("location:[pagina para administradores]");//cambiar a la pagina correcta
                break;
        }
    }else{
        //si es FALSE mandar un mensaje de error y redireccionar otra vez al inicio de sesion
        header("location:./inicioDeSesion.html");
        echo "Usuario y/o contraseña incorrectos";//revisar donde se va a imprimir esto
    }
}
?>