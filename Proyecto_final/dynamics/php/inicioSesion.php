<?php
//conectar con la base de datos
$include = include("./config.php");
$con = connect();
session_start();

//recibe los datos de inicioSesion.html
$username = (isset($_POST["login-username"] && $_POST["login-username"] != ""): NULL);
$pswrd = (isset($_POST["login-password"] && $_POST["login-password"] != ""): NULL);
$remember = (isset($_POST["remember-me"] && $_POST["remember-me"] != ""): NULL);

//consultar datos
if($include && $con){
    $sql = "SELECT * FROM usuario WHERE nombreUsuario='$username' AND contrasena='$pswrd'";
    $query = mysqli_query($con, $sql);//busca que el usuario exista y que la contraseña también
    $datos = mysqli_fetch_assoc($query); //recibe los datos de $query para poder procesarlos
    if($datos){//si $datos es TRUE redireccionar a la página principal 
        $_SESSION['username'] = $username;// "$_SESSION es una variable que va a guardar el username para poder iniciar sesion en la página principal 

        header("location:./paginaPrincipal.php");
    }else{
        //si es FALSE mandar un mensaje de error
        echo "Usuario y/o contraseña incorrectos"//revisar donde se va a imprimir esto
    }
}
?>