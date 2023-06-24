<!-- Aqui la plantilla para lo que falta de suridad, espero ayude -->

<!-- cambiar este regex  en revisionInser.php y en inicioSesion.php-->
<!-- BTW si ocupan que les explique como funcionan los regex que hice me avisaaaan -->
$user = "/([A-z]|[0-9]){5,15}/i";<!-- de asi como esta a-->
$user = "/([A-z]|[0-9]){5,10}/i";<!-- de asi como esta a {5,10} por lo de la base de datos-->

<!-- =============================================================================================================================== -->

<!-- Limpiar las entradas desde las variables, esto ya lo hice creo en  inicioSesion.php pero aun asi chechar si faltan en otras entradas -->
<!-- la varibale $envio es lo que estamos recibiendo                     del form por ejmplo de resgistro admin o asi -->

<!-- // Limpiar si estamos usando Cadenas, osease el dato entra como un string como en el caso de username o del numero de cuenta-->
$cadena= filter_var($envio, FILTER_SANITIZE_STRING);
<!-- // recibimos por un form $envio, luego el 2do parametro es filter_sanitize_string
// reviw que solo nos dan strings -->

<!-- // Limpiar si estamos usando Email -->
$email= filter_var($envio, FILTER_SANITIZE_EMAIL);


<!-- // Limpiar si estamos usando numeros enteros, que creo que aqui no aplica pero por si las dudas-->
$numero = filter_var($envio, FILTER_SANITIZE_NUMBER_INT);
<!-- ============================================================================================================================== -->
<!-- CONSULTAS PARAMETRIZADAS PARA MySQL y la señorita MariaDB  SQLINJECTION-->
<!-- $id_usuario = $_POST["id"]; suponiendo que aki por ejemplo esto es lo que queremos -->

<!-- habemos que agregar estas lineas a TODAS las consultas, -->
$sentencia = mysqli_prepare("SELECT * FROM usuarios WHERE id = ?");
mysqli_stmt_bind_param($sentencia, "i", $id_usuario);
mysqli_stmt_execute($sentencia);

<!-- mini intento de explicacion -->
<!--solo debemos cambiar el TERCER PARAMETRO  DEPENDIENDO DE QUE TIPO DE DATO ES -->
<!--                         aqui esta la peticion a MySQL -->
$sentencia = mysqli_prepare("SELECT * FROM usuarios WHERE id = ?");
<!-- luego se le ponen los parametros    "i" este es el tercer parametro que tenemos que cambiar 
lo que se va a hacer es que solo va a ejecutar la sentencia si se mete el tipo de dato que especificamos 
por que al poner =? estamos esperando una variable
-->
mysqli_stmt_bind_param($sentencia, "i", $id_usuario);
mysqli_stmt_execute($sentencia);
<!-- les dejo aqui los tipos de dato segun ocupemos
"i" para int 
"s" para strings-->
<!-- ============================================================================================================================== -->
<!-- PARA HTML INJECTION -->
<!-- recuerdo que ya habia metido la funcion para esto en  revisionInser.php
pero aun asi por si las dudas, esto pues verifica que no nos metan cosas html donde no queremos-->

<!-- // ejmplo de aplicacion real
// define variables y las inicializa vacias -->
$name = $email = $gender = $comment = $website = "";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = test_input($_POST["name"]);
    $email = test_input($_POST["email"]);
    $website = test_input($_POST["website"]);
    $comment = test_input($_POST["comment"]);
    $gender = test_input($_POST["gender"]);
}
<!-- esta la meti en la funcion creo que se llama verificar, en esa en vez de $data aparece como $opcion -->
function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

<!-- ========================================================================================================================================= -->
<!-- // PARA MITIGAR con cookies -->

<!-- no se si ya metieron cookies, pero si es asi, donde esten metanles estos parametros -->
$name = 'foo';
$value = 'bar';
$expirationTime = 0; // Session cookie.
$path = '/';
$domain = 'localhost';
$isSecure = false;
$isHttpOnly = true;
setcookie($name, $value, $expirationTime, $path, $domain, $isSecure, $isHttpOnly);
<!-- ========================================================================================================================================== -->
<!-- aqui les voy a poner de donde me estaba basando para lo de los HASHEO DE CONTRASEÑA, que real son los ejercicios de las clases pero con mis notas-->

<!-- algo que tengo que decir es que segun mi razonamiento, loq eu pasa con CIFRAR/DESCIFRAR/HASHEO es que 
EN inicioSesion lo que ocupamos es que ya teniendo el hast de la contraseña guardado en la base de datos junto con su sal se compara con 
lo que mete el usuario al poner su contraseña y ya de eso depende de si te deja iniciar sesion o no 


y en REGISTRAR te va a generar apenas el hash y tambien la sal para guardarlo en la base de datos


PERO la pimienta pues no se guarda pq esa siempre se eata generando 
cada que requerimos la contraseña o la registramos, esa cambia no es la misma como el hash o la sal

esto si no lo avance mucho ayer pq ocupaba la columna de la sal y la contraseñahasheada donde esta lo de contraseña en la base de datos
segun yo deberia de estar algo asi
al poner SELECT contrasena FROM usuarios;//no recuerdo bien el nombre de las tablas pero espero se entienda la idea
______________________________________________
contrasena |        pass_hasheada|      sal
_______________________________________________
creo asi la tabla cRe0
-->

<!-- ====== en el documento seguridad.php -->
<?php

// ESTO ES PARA CIFRAR

define("ALGORITMO", "aes-256-cbc");
define("PASS", uniqid());
function cifrar($mensaje)
{
    $longitud_vi = openssl_cipher_iv_length(ALGORITMO); //Obtener length del VI que ocupa ese algoritmo especifico
    $vi = openssl_random_pseudo_bytes($longitud_vi); //genera un VI, cadena de bytes aleatorios
    $mensajeCifrado = openssl_encrypt($mensaje, ALGORITMO, PASS, 0, $vi); //cifra el mensaje 
    // lo cifra--------------------este mensaje, cn este algoritmo, con esta contraseña, con esta lenght en especifico
    $mensajeCifrado = base64_encode($mensajeCifrado . "=-=.-/" . $vi);
    return $mensajeCifrado;
}
function descifrar($mensaje)
{
    $mensaje = base64_decode($mensaje);
    $desc_mensaje = explode("=-=.-/", $mensaje);
    $mensaje_cifrado = $desc_mensaje[0];
    $vi = $desc_mensaje[1];
    $mensajeDescifrado = openssl_decrypt($mensaje_cifrado, ALGORITMO, PASS, 0, $vi); //decifrar
    return $mensajeDescifrado;
    // return $mensaje."descifrado";
}


function hashearContra($contra)
{
    $pass_hasheada = hash("SHA256", $contra);
    return $pass_hasheada;
}
function verificar_contra($contra, $correct, $sal){
    $coincide = false;
    $caracteres = str_split("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
    for ($i = 0; $i < count($caracteres); $i++) {
        for ($j = 0; $j < count($caracteres); $j++) {
            $pimienta = $caracteres[$i] .$caracteres[$j];
            $contraseña = $contra.$pimienta.$sal;
            if (hashearContra($contraseña) == $correct) {
                $coincide = true;
                break;
            }
            
        }
    }
    return $coincide;
}
function generarSal()
{
    $sal = uniqid();
    return $sal;
}
function generarPimienta()
{
    $caracteres = str_split("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
    $partes_pimienta = array_rand($caracteres, 2);
    $p1 = $caracteres[$partes_pimienta[0]];
    $p2 = $caracteres[$partes_pimienta[1]];
    $pimienta = $p1 . $p2;
    return $pimienta;
}
?>
<!-- ====== acaba  el documento seguridad.php -->



<!-- ====== en el documento revisionInser.php creo puse lo siguiente para generar sal, que en ejemplo aparece en el doc ver.php -->
<?php
// recepcion de los datos
require "seguridad.php";
$mensaje = (isset($_POST["mensaje"]) && $_POST["mensaje"]) ? $_POST["mensaje"] : "No hay mensaje";
$contra = (isset($_POST["contra"]) && $_POST["contra"]) ? $_POST["contra"] : "No hay contraseña";

// cifrado
$mensajeCifrado = cifrar($mensaje);
$mensajeDescifrado = descifrar($mensajeCifrado);
echo "Mensaje cifrado: $mensajeCifrado <br>";// ====================CREO que esto puede funcionar para poner lo de ver contraseña si es que queremos añdirlo como pluSS
echo "Mensaje original: $mensajeDescifrado <br>";



//hashes
$sal = generarSal();
$pimienta = generarPimienta();
$contraHash = hashearContra($contra.$pimienta.$sal);
echo $contra.$pimienta.$sal."<br>";
echo "Contraseña: $contraHash <br>";
// suponiendo que la guardamos en DB
$correct_pass = "f0984b3502a9c1952572632f93d07dd7120f870845a3defb32e90b38bcce5a29";
$sal_origin = "648a2169a272b";


//(la que el usuario mete, la que esta en la base)
if (verificar_contra($contra, $correct_pass, $sal_origin)){
    echo "Contraseña correcta";
} else {
    echo "Contraseña incorrecta";
}
?>