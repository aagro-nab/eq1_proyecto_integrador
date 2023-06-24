<?php
    include ("./config.php");
    $con = connect();
    session_start ();

    $usuario = $_SESSION['username'];

    function buscarUsuario ($usuario, $con)
    {
        //echo $usuario;
        $buscarUser = "SELECT * FROM usuario WHERE nombreUsuario='$usuario'";
        $query = mysqli_query ($con, $buscarUser);
        $arreglo = mysqli_fetch_array ($query);
        $user = $arreglo ['ID_USUARIO'];
        //echo $user;
        return $user;
    }
    $user = buscarUsuario ($usuario, $con);
    //echo $user;

    function buscarForo ($user, $con)
    {
        $buscarForo = "SELECT * FROM foro WHERE ID_USUARIO='$user'";
        $query = mysqli_query ($con, $buscarForo);
        $arreglo = mysqli_fetch_array ($query);
        //var_dump ($arreglo);
        $foro = $arreglo ['nombre'];
        //echo $user;
        return $foro;
    }
    $foro = buscarForo ($user, $con);
    //echo $foro;

    function buscarProducto ($user, $con)
    {
        $buscarProducto = "SELECT * FROM producto WHERE ID_USUARIO='$user'";
        $query = mysqli_query ($con, $buscarProducto);
        $arreglo = mysqli_fetch_array ($query);
        //var_dump ($arreglo);
        $producto = $arreglo ['nombreProducto'];
        $productoDes = $arreglo ['descripcionProducto'];
        $dispo = $arreglo ['existencia'];
        $venta = "Producto:".$producto."<br>Descripcion:".$productoDes."<br>Existencia:".$dispo;
        return $venta;
    }
    $producto = buscarProducto ($user, $con);


    function recuperarPublicacionUsuario ($user, $con)
    {
        $buscarPubli = "SELECT * FROM publicacion WHERE ID_USUARIO='$user'";
        $query = mysqli_query ($con, $buscarPubli);
        $arreglo = mysqli_fetch_array ($query);
        //var_dump ($arreglo);
        $publicacion = $arreglo ['contenidoPublicacion'];
        $fecha = $arreglo ['fechaPublicacion'];
        echo $publicacion."<br>".$fecha;
    };

    function recuperarPublicacionMarket ($user, $foro, $producto)
    {
        echo "Usuario: ".$user."<br>";
        echo "Foro: ".$foro."<br>";
        echo $producto;
    };

    function recuperarPublicacionForo ($user, $con)
    {
        $buscarForo = "SELECT * FROM foro WHERE ID_USUARIO='$user'";
        $query = mysqli_query ($con, $buscarForo);
        $foros = [];
        while($datos = mysqli_fetch_assoc($query))
        {
            $foros[] = $datos;
        }
        var_dump ($foros);
    };

    function recuperarPublicacionExtravio ($con, $usuario)
    {
        $buscarPubli = " SELECT * FROM objeto_perdido";
        
        $query = mysqli_query ($con, $buscarPubli);

        $arreglo = mysqli_fetch_array ($query);

        $obj = [];
        while($datos = mysqli_fetch_assoc($query))
        {
            $descripcion = $datos ['descripcionObjeto'];
            $fecha = $datos['fechaObjetoPerdido']; 
            $usuario = $datos['ID_USUARIO'];
            $publicacion = "El objeto con caracteristicas: ".$descripcion.", esta extraviado, fue publicado por el usuario: ".$usuario.", el dia: ".$fecha;
            $obj[] = $publicacion;

        };
    };

    function recuperarPublicacionQyA ($user, $con)
    {
        
    };

    //recuperarPublicacionUsuario ($user, $con);
    //recuperarPublicacionMarket ($user, $foro, $producto);
    //recuperarPublicacionForo ($user, $con);
    //recuperarPublicacionExtravio ($con, $usuario);
    recuperarPublicacionQyA ($user, $con);
?>
