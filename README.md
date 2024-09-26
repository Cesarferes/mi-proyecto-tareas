# Mi Proyecto de Gestión de Tareas

Este proyecto es una aplicación web que permite a los usuarios gestionar tareas mediante operaciones CRUD (Crear, Leer, Actualizar y Eliminar). La aplicación tiene un backend en Node.js con Express y una base de datos MongoDB, y un frontend en React que muestra las tareas en una tabla y permite editarlas, eliminarlas o crear nuevas.

## 1. Características

- Crear, leer, actualizar y eliminar tareas.
- Validación de datos en el backend y el frontend.
- Sistema de prioridades y estados de las tareas.
- Interfaz responsive, adaptable a diferentes tamaños de pantalla.
- Almacenamiento de datos en MongoDB.

## 2. Tecnologías utilizadas

- **Backend**: Node.js, Express, MongoDB.
- **Frontend**: React, Bootstrap para estilos.
- **Base de datos**: MongoDB.
- **Control de versiones**: Git.

## 3. Requisitos previos para levantar el proyecto

Tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

## 4. Instrucciones de instalación y ejecución

- **Para la base de datos**
Deberas instalar MongoDB Community Edition

- Agregar la ruta al path para poder iniciarlo desde el cmd 
con el siguiente comando: mongod

- Abre otra terminal y ejecuta: mongosh

- Crea tu base de datos con el comando: use gestionTareas

- Para crear la coleccion utilizamos el siguiente comando: db.createCollection('tareas')

- **Para la carpeta Backend**
Estando en la carpeta mi-proyecto-tareas

- Entra a la carpeta del backend con la siguiente ruta:
cd ./backend

- Instala las dependencias:
npm install

- Configura la conexión a MongoDB. Crea un archivo .env y añade tu conexión de MongoDB:
Quedara asi: MONGODB_URI=mongodb://127.0.0.1:27017/gestionTareas

- Levanta el servidor del backend:
node server.js
El backend estará disponible en http://localhost:5000.

- **Para la carpeta Gestion-tareas**
Estando en la carpeta mi-proyecto-tareas

- Entra a la carpeta de gestion-tareas:
cd ./gestion-tareas

- Instala las dependencias:
npm install

- Levanta el servidor del frontend:
npm start

El frontend estará disponible en http://localhost:3000.


### 4.1 Clonar el repositorio

- Utlizamos el siguiente comando

```bash
git clone https://github.com/Cesarferes/mi-proyecto-tareas.git
