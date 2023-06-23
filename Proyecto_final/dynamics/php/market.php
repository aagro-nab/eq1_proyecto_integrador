
<?php
    $include = include("./config.php");
    require "./revisionInsert.php";
    $con = connect();
    session_start();
    $usuario =  $_SESSION['username'];//recibe el usuario que va a interactuar
    $rol = $_SESSION['rol'];
    
    
    function nuevaVenta(){
        $producto = asignar("tituloVenta");
        $descripcion = asignar("descripcionVenta");
        $precio = asignar("precioVenta");
        $imagen = asignar($_FILES["imagenVenta"]);

        $sql = "INSERT INTO producto (nombreProducto, descripcionProducto, precio, imagenProducto) VALUES ('$producto', '$descripcion', $precio, $imagen)";
        $query = mysqli_query($con, $sql);
        


    }
    function eliminarVenta(){


    }

?>