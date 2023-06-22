<?php
define("ALGORITMO", "aes-256-cbc");
define("PASS", uniqid());
// para hashear la contraseña
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