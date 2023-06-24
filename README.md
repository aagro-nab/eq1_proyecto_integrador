# PROYECTO INTEGRADOR CURSO WEB
## Equipo 1 
1. Aguilar Rojo Ameyalli **(Ame)**
2. Morales Olivares Stephanie Guadalupe **(Fany)**
3. Resendiz Linares Karen **(Karen)**
4. Rodríguez Martínez Erick Daniel **(Dani)**
5. Toríz Flores Jesús Alejandro **(Jesús)**
## División de responsabilidades para la elaboración del proyecto
| Área  | Nombres de las personas |
| ------------- |:-------------:|
| HTML    | Fany y Dani |
| CSS      | Dani, Fany y Ame |
| JavaScript      | Dani, Karen y Ame   |
|PHP| Dani, Ame, Karen y Jesús |
|DATABASES |  Dani, Karen y Jesús |
|Seguridad | Fany y Ame |
|Documentación | Fany|
****************
## Índice 
- [Descripción del proyecto](#descripción-del-proyecto)
- [Para comenzar](#para-comenzar)
    - [Registro](#registro)
        - [Registro para Alumnos](#registro-para-alumnos)
        - [Registro para Moderadores](#registro-para-moderadores)
        - [Registro para Administradores](#registro-para-administradores)
    - [Iniciar sesión](#iniciar-sesión)
- [Instalación del proyecto y la DATABASE](#instalación-del-proyecto-y-la-database)
- [Seguimiento semanal:](#seguimiento-semanal)
- [Licencia](#licencia)

## Descripción del proyecto 
> Nuestro objetivo es poder brindarle a la comunidad de Prepa 6 un espacio dónde se pueda expresar libremente y con respeto.
> En este espacio podemos destacar que te servira como herramienta para conversar sobre tus temas favoritos con más personas, publicar en el foro especifico de cosas perdidas para que tenga mayor visibilidad y sea encontrado lo mas pronto posible ademas de que si eres una persona que venda algun producto dentro de nuestra institución podras promocionarte y tener al tanto a tus clientes de tus nuevos productos así como de tus horarios disponibles para vender.
- [back to top](#proyecto-integrador-curso-web)
## Para comenzar...
- El proyecto se encuentra en la carpeta [Proyecto_final](Proyecto_final)
- Para su comodidad como usuario abre nuestro landing page, que se encuentra en el archivo `index.html` y comienza a navegar.
### Registro
- Encuentra tú forma de registro correcto sí es la primera vez que nos visitas, si no es el caso ve a la sección _[Iniciar sesión](#iniciar-sesión)_.
- Se te pediran los siguientes datos en ambos casos, por favor tenlos a la mano.
    1. **Nombre completo**: comenzando por apellidos preferentemente.
    2. **Nombre de usuario**: crea un nombre de usario que utlizaras para iniciar sesión más adelante, puede contener números del 0 al 9 y letras mayúsculas o minúsculas y tiene un mínimo de 5 caracteres y un máximo de 15.
    3. **Número de cuenta**: recuerda que consta de 9 digitos y debes ser parte de las generaciones ingresadas en el año 2020, 2021, 2022 o 2023.
    4. **Email**: solo correos institucionales, ya sea @alumno.enp.unam.mx o @comunidad.unam.mx
    5. **Contraseña**: deberá tener un mínimo de 6 caracteres, los cuales pueden ser números del 0 al 9 y letras mayúsculas o minúsculas. 
    6. **Grupo**: del año en curso, ya sea que seas de 4to, 5to o 6to año.
    - ### Registro para Alumnos
    Si cumples con las siguientes características esté registro es el ideal para ti (^_^)
  -  Número de cuenta debe de estar vigente, por lo que si eres de generaciones pasadas, no podrás entrar.
  -  No tener algun tipo de suspensión escolar, en el caso de tener una por plagio quedaras banneado de nuestra plataforma.
- Como alumno podras realizar las siguientes acciones:
    - Publicar preguntas.
    - Responder preguntas.
    - Crear foros.
    - Salirte de los foros.
    - Eliminar foros.
- [back to top](#proyecto-integrador-curso-web)
    - ### Registro para Moderadores
    Si cumples con las siguientes características esté registro es el ideal para ti (oﾟvﾟ)ノ
  - Tu número de cuenta debió de haber sido dado de alta previamente para que la plataforma te permita el acceso, de lo contrario, no podrás entrar.
- Como moderador podras realizar las siguientes acciones:
    - Publicar preguntas.
    - Responder preguntas.
    - Crear foros.
    - Salirte de los foros.
    - Eliminar foros.
    - Podrá modificar las preguntas.
    - Podrán reportar foros con los administradores y este se encargará de evaluar la situación.
- [back to top](#proyecto-integrador-curso-web)
    - ### Registro para Administradores
    Si cumples con las siguientes características esté registro es el ideal para ti  ╰(*°▽°*)╯
  - Recuerda que en contraseña debes poner la clave proporcionada por tu organización.
  - Ser autoridad vigente en la institución.
  - Ser instructor del curso web.
- Como administrador podras realizar las siguientes acciones:
    - Publicar preguntas.
    - Responder preguntas.
    - Crear foros.
    - Salirte de los foros.
    - Eliminar foros.
    - Podrá modificar las preguntas.
    - Podrá modificar las respuestas.
    - Podrán evaluar los reportes de los foros por parte de los moderadores.
- [back to top](#proyecto-integrador-curso-web)
### Iniciar sesión 
- Querido usuario, una vez registrado se te pedira que ingreses los siguientes datos para iniciar sesión:
    1. Nombre de usuario: creado en el _[Registro](#registro)_.
    2. Contraseña: recuerda que tiene un minimo de 6 caracteres y fue creada en el _[Registro](#registro)_.
## Instalación del proyecto y la DATABASE
- Por favor verifica que en el archivo `config.php` aparezcan así los siguientes espacios para una correcta ejecución:
```PHP
const HOST = "localhost";
const USER=" ";
const PASS=" ";
const DB="proyectoFinal";
```
1.   Clonar el repositorio de Github 
```Powershell 
<# en tu ruta te tienes que encontrar en una carpeta vacia, en la que no tengas 
otro repositorio de Git, procura revisar los elementos ocultos para asegurarte de que 
no haya ninguna carpeta .git dentro antes de clonar nuestro repo en ese carpeta

Desde tu Powershell
#>
git clone https://github.com/aagro-nab/eq1_proyecto_integrador.git
#a continuación se te clonara el repo de nuestro proyecto y podrás ejecutar su contenido
```
2.  Instalar la base de datos en MariaDB
```cmd
//el respaldo de la DB tiene que estar en -> /xampp/mysql/bin
//ahora entramos en MariaDB

cd C:/xampp/mysql/bin
mysql -u root --default-character-set=utf8

//ya en Maria DB ejecutamos los siguientes comandos

SET names 'utf8';
CREATE DATABASE proyectoFinal CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
SHOW DATABASES;
USE PROYECTO; //esta es la DB vacía 
SOURCE resp_db.sql; //ponemos el respaldo de nuestra DB
```
- [back to top](#proyecto-integrador-curso-web)
### Seguimiento semanal:
1. #### semana 1 
    - Wireframes basicos
    - Maquetado básico
2.  #### semana 2
    - Bases de datos 
    - Wireframes de otras vistas
## Licencia
Distributed under the MIT License. See `LICENSE.txt` for more information.
- [back to top](#proyecto-integrador-curso-web)
