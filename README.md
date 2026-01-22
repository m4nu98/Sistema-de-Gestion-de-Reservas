# Sistema Web Interactivo para Hostales

Página web diseñada para optimizar la gestión de reservas y mejorar la experiencia tanto para clientes como para administradores.

## Características

### Para Clientes:

*   Realización de reservas con selección de fechas y cantidad de habitaciones.
*   Registro de datos personales y asignación de estacionamiento para vehículos.
*   Información del hostal y ubicación en mapa.

### Para Administradores:

*   Acceso a panel de administración con:
    *   Gestión de habitaciones por fecha.
    *   Administración de huéspedes y reservas.
    *   Asignación de estacionamientos.
    *   Calendario de reservas con disponibilidad diaria.

## Tecnologías Utilizadas

*   **Frontend:** React
*   **Backend:** Node.js, Express
*   **Base de Datos:** MySQL

## Instalación y Puesta en Marcha

1.  **Instalación de dependencias:**
    ```bash
    npm install
    ```

2.  **Configuración de la base de datos:**
    *   El proyecto requiere una base de datos MySQL.
    *   Crear una nueva base de datos e importar el esquema y los datos desde `samaykiti.sql` y `paraelservidor.sql`.

3.  **Variables de entorno:**
    *   La conexión a la base de datos se configura en un archivo `.env` en `src/backend` con las siguientes variables:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña
    DB_DATABASE=nombre_de_tu_bd
    ```

4.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

## Uso

### Portal de Clientes

La aplicación se ejecuta en `http://localhost:5173`. Permite consultar disponibilidad y realizar reservas.

### Panel de Administración

El panel de administración se encuentra en la ruta `/login`.

*   **Usuario:** a
*   **Contraseña:** a

La autenticación otorga acceso a las funciones de administración.

## Proceso de Pago

El sistema maneja pagos por transferencia bancaria. Al reservar, se muestra la información de la cuenta para el pago de una seña.

**Nota:** La información de la cuenta bancaria está definida en `src/components/comp-Pago.jsx`. Para producción, se recomienda gestionar esta información de forma más segura.
