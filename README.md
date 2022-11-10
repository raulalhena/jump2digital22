# JUMP2DIGITAL22 HACKATHON BACKEND CHALLENGE

> Proyecto para la participación del Hackathon del Jump2Digital 2022. Creación de una API con diferentes endpoints que facilitan información desde la base de datos al Fronted.

## BACKGROUND

## USAGE

Existen varios endpoints que usan el método GET con los que se obtienen diferentes datos de la tabla _"companies"_. Se ha creado también un endpoint que usa el método POST, para cargar la información contenida en el archivo _"/data/companies.js"_ en la tabla _"companies"_.

## INSTALLATION

Clonar el respositorio de GITHUB:

```
    git clone https://github.com/raulalhena/jump2digital22.git
```

Creación de la base de datos en el gestor de tu elección.

Configuración de las variables de entorno:

Creación de archivo _.env_ que debe contener las siguientes variables:

```
    HOST= "DIRECCION/NOMBRE SERVER"
    SRV_PORT= "PUERTO ESCUCHA DEL SERVIDOR EXPRESS"
    DB_USER= "USUARIO ACCESO A LA BBDD"
    DB_PASSW= "PASSWORD PARA ACCESO A LA BBDD"
    DB_DATABASE= "NOMBRE DE LA BASE DE DATOS"
    DB_DIALECT= "DIALECTO QUE USARA SEQUELIZE PARA ACCESO A LA BBDD"
    DB_FILE= "RUTA AL ARCHIVOS CON LAS COMPANIAS A CARGAR EN LA BBDD, POR DEFECTO: /data/companies.json"
```

## LICENSE

[GNU General Public License v3.0](https://opensource.org/licenses/gpl-license)

