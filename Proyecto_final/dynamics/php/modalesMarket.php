<?php
$include = include("./config.php");
$con = connect();
    if ($con->connect_errno) {
        echo "No se pudo connectar a MySQL: " . $con->connect_error;
        exit();
    }

    session_start();
    $res = 0;
    $usuario =  $_SESSION['username'];//recibe el usuario que va a interactuar
    $rol = $_SESSION['rol'];
    $id = $_SESSION['id'];
    
    try {
        switch ($accion) {
            case 'crearVenta':
                crearVenta($con);
                break;
            case 'editarVenta':
                editarVenta($con, $id);
                break;
            case 'eliminarVente':
                eliminarVenta($con, $id);
                break;
            default:
                echo "Error: acción no reconocida.";
        }
    
    } catch (Exception $e) {
        echo 'Error: ',  $e->getMessage();
    }
    

    function nuevaVenta($con){
        $ventaID = asignar("ventaId");
        $producto = asignar("tituloVenta");
        $descripcion = asignar("descripcionVenta");
        $precio = asignar("precioVenta");
        $imagen = $foto = !empty(asignar("imagenForo")) ? asignar("imagenForo") : 'default.jpg';
        
        $crearVenta = "INSERT INTO producto (nombreProducto, descripcionProducto, existencia, ID_USUARIO, precio, imagenProducto) VALUES ('$producto', '$descripcion', TRUE, $id, '$precio', $imagen)";
        $query = mysqli_query($con, $crearVenta);
        
        if($query == 1){
            echo "Venta creada exitosamente";
            $res = 1;
        }elseif($query != TRUE){
            echo "Hubo un error en la consulta";
            mysqli_error($con);
        }
    }
    function modificarProducto($con, $rol, id){
        $ventaID = asignar("ventaId");
        $producto = asignar("tituloVenta");
        $descripcion = asignar("descripcionVenta");
        $precio = asignar("precioVenta");
        $imagen = isset($_POST['imagenForo']) ? $_POST['imagenForo'] : 'default.jpg';
        
        $revisarId = "SELECT ID_USUARIO FROM producto WHERE nombreProducto='$producto'";

        if($id == $revisarId ||$rol !=0){//revisa si el usuario actual es el mismo que creo la venta o si tiene permisos de mod o admin
            $modificarVenta = "UPDATE producto WHERE ID_PRODUCTO='ventaId', SET nombreProducto='$producto', descripcionProducto= '$descripcion', precio='$precio', imagenProducto='$imagen')";
        $query = mysqli_query($con, $modificarVenta);
        
        if($query == 1){
                echo "Producto modificado exitosamente";
                $res = 1;
            }elseif($query != TRUE){
                echo "Hubo un error en la consulta";
                mysqli_error($con);
            }
        }else{
            echo "No tienes permiso para editar este Producto";
        }
        
    }
    function terminarVenta($con, $rol, $id){
        $ventaID = asignar("ventaId");
        $producto = asignar("tituloVenta");
        $descripcion = asignar("descripcionVenta");
        $precio = asignar("precioVenta");
        $imagen = isset($_POST['imagenForo']) ? $_POST['imagenForo'] : 'default.jpg';
        
        $revisarId = "SELECT ID_USUARIO FROM producto WHERE nombreProducto='$producto'";

        if($id == $revisarId ||$rol !=0){//revisa si el usuario actual es el mismo que creo la venta o si tiene permisos de mod o admin
            $modificarVenta = "UPDATE producto WHERE ID_PRODUCTO='ventaId', SET existencia=FALSE)";
        $query = mysqli_query($con, $modificarVenta);
        
        if($query == 1){
                echo "Venta cerrada exitosamente";
                $res = 1;
            }elseif($query != TRUE){
                echo "Hubo un error en la consulta";
                mysqli_error($con);
            }
        }else{
            echo "No tienes permiso para cerrar esta venta";
        }
    }
    function eliminarProducto($con, $rol, $id){
        $ventaID = asignar("ventaId");
        $revisarId = "SELECT ID_USUARIO FROM producto WHERE nombreProducto='$producto'";

        if($id == $revisarId ||$rol !=0){//revisa si el usuario actual es el mismo que creo la venta o si tiene permisos de mod o admin
            $eliminarVenta = "DELETE FROM producto WHERE ID_PRODUCTO='ventaID'";
        $query = mysqli_query($con, $eliminarVenta);
        
        if($query == 1){
                echo "Producto eliminado exitosamente";
                $res = 1;
            }elseif($query != TRUE){
                echo "Hubo un error en la consulta";
                mysqli_error($con);
            }
        }else{
            echo "No tienes permiso para borrar este Producto";
        }
    }

?>