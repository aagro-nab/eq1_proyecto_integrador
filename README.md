# PROYECTO INTEGRADOR CURSO WEB
## Equipo 1 
1. Aguilar Rojo Ameyalli **(Ame)**
2. Morales Olivares Stephanie Guadalupe **(Fany)**
3. Naranjo Vieyra Carlos **(Carlos)**
4. Resendiz Linares Karen **(Karen)**
5. Rodríguez Martínez Erick Daniel **(Dani)**
6. Toríz Flores Jesús Alejandro **(Jesús)**
## División de responsabilidades para la elaboración del proyecto
| Área  | Nombres de las personas |
| ------------- |:-------------:|
| HTML    | Carlos y  Fany |
| CSS      | Dani, Fany, Carlos y Ame |
| JavaScript      | Dani, Karen y Ame   |
|PHP| Karen y Jesús |
|DATABASES |  Karen y Jesús |
|Seguridad | Fany y Ame |
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
## Para comenzar...
- El proyecto se encuentra en la carpeta [Proyecto_final](Proyecto_final)
- Para comenzar con la experiencia abre el `index.html`
- Para su comodidad como usuario abre nuestro landing page y comienza a navegar
### Registro
- Encuentra tú forma de registro correcto sí es la primera vez que nos visitas, si no es el caso ve a la sección _Iniciar Sesión_
    - ### Registro para Alumnos
    Se requieren los siguientes datos, si los cumples esté  registro es el ideal para ti (^_^)
    1. Nombre completo
    2. Numero de cuenta, siendo parte de las generaciones ingresadas en el año 2020,2021,2022 o 2023
    3. Grupo del año en curso ya sea que seas de 4to, 5to o 6to año
    - ### Registro para Moderadores
    Se requieren los siguientes datos, si los cumples esté  registro es el ideal para ti (^_^)
    - ### Registro para Administradores
    Se requieren los siguientes datos, si los cumples esté  registro es el ideal para ti (^_^)
- [back to top](#equipo-1)
### Iniciar sesión 
- Querido usuario, se te pedira que ingreses los siguientes datos para iniciar sesión:
    1. Nombre de usuario
    2. Contraseña: con un maximo de 8 caracteres
## Instalación del proyecto y la DATABASE
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
CREATE DATABASE PROYECTO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
SHOW DATABASES;
USE PROYECTO; //esta es la DB vacía 
SOURCE PROYECTO.sql; //ponemos el respaldo de nuestra DB
```
### Seguimiento semanal:
1. #### semana 1 
    - Wireframes basicos
    - Maquetado básico
2.  #### semana 2
    - Bases de datos 
    - Wireframes de otras vistas
## Fonts
tengo que checars
## Licencia
pues aquí 

