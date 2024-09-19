# Proyecto CRUD Básico con Express y Sequelize

Este proyecto implementa un CRUD básico utilizando Express como framework para el servidor y Sequelize como ORM para interactuar con una base de datos MySQL. 

## Tecnologías Utilizadas

- **Express**: Framework para aplicaciones web Node.js.
- **Sequelize**: ORM para Node.js que soporta varios dialectos de SQL.
- **MySQL**: Sistema de gestión de bases de datos relacional.

## Endpoints

1. **Crear Usuario**: `POST /users`
   - Crea un nuevo usuario en la base de datos.
   - Ejemplo de uso:
     ```json
     {
       "name": "Nuevo Usuario",
       "email": "nuevo@usuario.com"
     }
     ```

2. **Leer Todos los Usuarios**: `GET /users`
   - Obtiene todos los usuarios de la base de datos.
   - Ejemplo de uso: `/users`

3. **Leer Usuario por ID**: `GET /users/:id`
   - Obtiene un usuario específico por su ID.
   - Ejemplo de uso: `/users/1`

4. **Actualizar Usuario**: `PUT /users/:id`
   - Actualiza un usuario existente por su ID.
   - Ejemplo de uso:
     ```json
     {
       "name": "Usuario Actualizado",
       "email": "actualizado@usuario.com"
     }
     ```

5. **Eliminar Usuario**: `DELETE /users/:id`
   - Elimina un usuario específico por su ID.
   - Ejemplo de uso: `/users/1`

## Instalación

1. Clona el repositorio.
   ```sh
   git clone (https://github.com/juanhaag/base_datos_isft.git)