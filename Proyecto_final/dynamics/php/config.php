<<<<<<< HEAD
<?php
const HOST = "localhost";
const USER = "equipo01";
const PASS = "equser01all";
const DB = "proyectoFinal";
=======
<?php 
const HOST="127.0.0.1";
const USER="equipo01";
const PASS="equser01all";
const DB="proyectoFinal";
>>>>>>> f176a52cab25c331222fa1ebb9460fa7c5106121

const nRespaldo = "proyectoFinalRespaldo";

function connect()
{
    $conexion = mysqli_connect(HOST, USER, PASS, DB);

    if (!$conexion) {
        echo "Error: No se pudo conectar a MySQL. <br> ";
        echo "Error: " . mysqli_connect_errno() . "<br>";
        echo "Error: " . mysqli_connect_error() . "<br>";
        exit;
    }
    return $conexion;
}

//Si usan MariaDB cambien los datos de HOST, USER, PASS y DB y tambien el picoparentesis por -r
function generarRespaldo()
{
    $command = "C:\xampp\mysql\bin\mysqldump.exe -u" . USER . " -p" . PASS . " " . DB . " > " . nRespaldo;

    system($command, $output);

    if ($output !== 0) {
        echo 'Ocurrió un error al crear el respaldo de la base de datos.';
    }
}