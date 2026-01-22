# Sistema Web Interactivo para Hostales


https://github.com/user-attachments/assets/da30053d-cc2a-4461-ac96-6699388b492c
<img width="2065" height="1240" alt="image" src="https://github.com/user-attachments/assets/1c60b522-898d-44da-b153-e03d83b428c0" /><img width="1931" height="801" alt="image" src="https://github.com/user-attachments/assets/a99241e9-db1b-4a6d-bd34-4f1b782cd387" />
<img width="1811" height="988" alt="image" src="https://github.com/user-attachments/assets/710272bf-4d7f-4f90-97c2-bddb2e0ec436" />





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


## Flujo de Reserva y Notificaciones

El proceso de reserva se realiza en varios pasos, combinando la interacción del usuario en el frontend con la lógica del backend para registrar la información y notificar al administrador.

1.  **Inicio de la Reserva:** El usuario comienza el proceso haciendo clic en el botón "Reservar" en la página principal, lo que lo redirige al formulario de registro en la ruta `/registro`.

2.  **Registro de Datos del Huésped (Paso 1):** El usuario completa un formulario con su información personal (nombre, apellido, teléfono, email) y detalles de su vehículo si aplica.

3.  **Selección de Fechas y Habitaciones (Paso 2):** El cliente elige las fechas de entrada y salida en un calendario y especifica el número de habitaciones que desea. El sistema verifica la disponibilidad de habitaciones para el rango de fechas seleccionado consultando el endpoint `/api/verificarDisponibilidad` del backend.

4.  **Información de Pago (Paso 3):** Una vez validadas las fechas, el usuario avanza al paso de pago. Aquí se le presenta la información para realizar una transferencia bancaria y se le ofrece la opción de adjuntar un comprobante de pago.

5.  **Envío y Notificación por Correo:** Al hacer clic en "Enviar", se activa la función `handleSubmit` en el componente `pagregistrohuesped.jsx`:
    *   Se recopilan todos los datos del formulario (información del huésped, fechas, número de habitaciones y método de pago).
    *   Se realiza una solicitud `POST` al endpoint `/api/guardarDatosYReservarFechas` para almacenar la reserva en la base de datos.
    *   Inmediatamente después, se prepara y envía una segunda solicitud `POST` al endpoint `/api/email/send-email`. Este endpoint del backend está configurado para enviar un correo electrónico a la dirección `programacionprueba99@gmail.com` con un resumen detallado de la reserva.
