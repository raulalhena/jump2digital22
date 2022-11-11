# Jump2Digital22 Hackathon Backend

API de control de compañías. Se gestionan compañías a través de diferentes endpoints que facilitan la información contenida en la **BBDD**, tienendo un endpoint para cargar la información de las compañías en la tabla correspondiente.

## Background

El proyecto ha sido creado para la participación en el Hackathon de **_Jump2Digital22_** promocionado por **_Nuwe_**, siguiendo las especificaciones facilitadas.

## Usage

Para usarlo, es necesario realizar consultas a los endpoints descritos en la sección API para realizar la acción deseada a través del verbo HTTP: GET.

Se pone a la escucha el servidor Express, por defecto en el puerto 3000, para la exposición de la API, usando el **ORM Sequelize** junto a **MariaDB** para la persistencia de datos.

Encontrarás el uso de **_importación de módulos de ES6_**, configurado en el package.json. Se ha realizado con JS funcional. El trabajo asíncrono se ha implementado con el uso de **_async/await_** para simplificar y conseguir una mayor legibilidad del código.

## API/Component

Descripción de la API **_Companies_** con sus correspondientes endpoints.

### Endpoint: '/' y '/api' => Uso para comprobaciones de funcionamiento.

### Endpoint: /api/companies

- **GET** - Consulta de todas las compañías existentes, ordenadas por el campo **_counter_** (clave primaria y auto incremental):

  - Recibe: 
    - Parametros:
  - Devuelve: JSON

### Endpoint: /api/companies/bysize

- **GET** - Consulta las compañías ordenadas por tamaño:

  - Recibe: 
    - Parametros:
  - Devuelve: JSON

### Endpoint: /api/companies/byfoundedyear

- **GET** - Consulta las compañías ordenadas por año de fundación, de la más actual a la más antigua:

  - Recibe: 
    - Parametros:
  - Devuelve: JSON

- Estos tres endpoints devuelven el mismo tipo de información:

    - code = Number (Código de estado HTTP: **_200 OK, 400 SOLICITUD INCORRECTA, 500 ERROR SERVIDOR_**).
    - message = String \- Mensaje de éxito **_"success"_** o fallo **_"fail"_**.
    - data = Object \- Objeto con las compañías ordenadas como corresponde a cada endpoint.


      - counter
      - id
      - website
      - name
      - founded
      - size
      - locality
      - region
      - country
      - industry
      - linkedin_url
      - createdAt
      - updatedAt

    **Ejemplo: /api/companies/bysize**

    ```JSON
    JSON:
    {
        "code": 200,
        "message": "success",
        "data": {
            "0": {
                "counter": 256,
                "id": "cb-power-inc-",
                "website":	"careaid.ie",
                "name":	"cb power, inc.",
                "founded":	null,
                "size":	"1-10",
                "locality":	null,
                "region":	null,
                "country":	null,
                "industry":	"wholesale",
                "linkedin_url":	"linkedin.com/company/cb-power-inc-",
                "createdAt":	"2022-11-10T19:09:28.000Z",
                "updatedAt":	"2022-11-10T19:09:28.000Z"
            }
            ...
        }
    }
    ERROR:
    {
        "code": 400,
        "message": "fail",
        "data": null
    }
    ```

### Endpoint: /api/companies/amount

- **GET** - Consulta el número de compañías en tres consultas diferentes, agrupadas por los campos **_industry_**, **_size_** y **_founded_** :

  - Recibe: 
    - Parametros:
  - Devuelve: JSON

    - code = Number (Código de estado HTTP: **_200 OK, 400 SOLICITUD INCORRECTA, 500 ERROR SERVIDOR_**).
    - message = String \- Mensaje de éxito **_"success"_** o fallo **_"fail"_**.
    - data = Object \- Objeto con los números de compañías por cada uno de los grupos existentes.

    **Ejemplo:**

    ```JSON
    JSON:
    {
        "code": 200,
        "message": "success",
        "data": {
            "byIndustry": {
                "0": {
                    "amount": 31,
                    "industry": "information technology and services"
                },
                ...
            },
            "bySize": {
                "0": {
                    "amount": 3,
                    "size": "10001+"
                },
                ...
            },
            "byFoundedYear": {
                 "0": {
                    "amount": 3,
                    "founded": 2020
                },
                ...
            }
        }
    }
    ERROR:
    {
        "code": 400,
        "message": "fail",
        "data": null
    }
    ```

### Endpoint: /api/companies/loadall

- **GET** - Inserta todas las compañías del archivo **_/data/companies.json_** dentro de la tabla **_companies_**:

  - Recibe:
    - Parametros:
    - Se obtiene de archivo local **_/data/companies.json_** o **_DB_FILE_**
  - Devuelve: JSON

    - code = Number (Código de estado HTTP: **_200 OK, 400 SOLICITUD INCORRECTA, 500 ERROR SERVIDOR_**).
    - message = String \- Mensaje de producto creado o de error.
    - data = Objeto con todas las compañías cargadas en la **_BBDD_** **_DB_NAME_**

      - id
      - name
      - price
      - description

    **Ejemplo:**

    ```JSON
    JSON:
    {
        "code": 200,
        "message": "success",
        "data": [
            {
                "counter": 1,
                "id": "pope-&-company-limited",
                "website": "popecompany.com",
                "name": "pope & company limited",
                "founded": 1962,
                "size": "11-50",
                "locality": "toronto",
                "region": null,
                "country": "canada",
                "industry": "investment banking",
                "linkedin_url": "linkedin.com/company/pope-&-company-limited",
                "createdAt": "2022-11-10T20:13:06.014Z",
                "updatedAt": "2022-11-10T20:13:06.014Z"
            },
            ...
        ]
    }
    ERROR:
    {
        "code": 400,
        "message": "fail",
        "data": null
    }
    ```

## Installation

Para el correcto funcionamiento se requiere de los siguientes tecnologías:

1. NodeJS
2. Express
3. Sequelize
4. MariaDB
5. Git

Para agilizar el desarrollo se ha utilizado el paquete _nodemon_ que se encuentra en las dependencias de desarrollo del paquete _package.json_.

Para poder instalar todo lo necesario a excepción del servidor MariaDB hay que seguir los siguientes pasos:

### \# Clonar repositorio

```shell
git clone https://github.com/raulalhena/jump2digital22.git
```

### \# Instalación

```shell
npm install
```

### \# Creación de archivo .env en el directorio raíz de la app

```shell
touch .env
```

### \# El archivo .env tendrá las siguientes variables:

```shell
HOST=[Nombre o dirección IP del Servidor tanto Web como de BD ["localhost"]]
SRV_PORT=[Puerto de escucha del servidor Web: Express ["3000"]]
DB_USER=[Usuario de la BBDD]
DB_PASSW=[Password de acceso del usuario de la BBDD]
DB_NAME=[Nombre de la BBDD]
DB_DIALECT=[Identificador de Sequelize para el gestor de BBDD que se use. Ejemplo: ["mariadb"]]
DB_FILE=[Archivo con los datos de las compañías ["/data/companies.json"]]
API_VERSION=[Versión de la API ["v1.0"]]
```

### \# Importación esquema una vez creada la BBDD en MariaDB

La tabla se crea al ejecutarse la app si no existe previamente de forma automatica, el esquema se configura a partir del modelo **Companies** de Sequelize (**_/models/companies.js_**) estos son los campos de la tabla **_companies_**:

```JS

        counter: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        website: type.STRING,
        name: {
            type: type.STRING,
            unique: true
        },
        founded: type.INTEGER,
        size: type.STRING,
        locality: type.STRING,
        region: type.STRING,
        country: type.STRING,
        industry: type.STRING,
        linkedin_url: type.STRING
```

El modelo **Companies** no contiene los campos **_createdAt_** y **_updatedAt_**, estos los crea Sequelize por defecto si no se le indica lo contrario.

### \# Ejecución del servidor

```shell
Modo Desarrollo (con nodemon): npm run dev
Modo Producción: npm run start
```

## Stack

1. NodeJS
2. Express
3. Sequelize
4. MariaDB

## Contact info

Contactame a mi email: raul.alhena@gmail.com

## License

GNU General Public License v3.0
[GNU](https://opensource.org/licenses/GPL-3.0)