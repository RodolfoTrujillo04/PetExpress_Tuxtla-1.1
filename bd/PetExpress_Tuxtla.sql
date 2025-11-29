-- -----------------------------------------------------
-- BASE DE DATOS: PetExpress_Tuxtla
-- -----------------------------------------------------

CREATE DATABASE IF NOT EXISTS PetExpress_Tuxtla;
USE PetExpress_Tuxtla;

-- -----------------------------------------------------
-- TABLA: Clientes
-- -----------------------------------------------------
CREATE TABLE Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    correo VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    ciudad VARCHAR(100),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- TABLA: Mascotas
-- -----------------------------------------------------
CREATE TABLE Mascotas (
    id_mascota INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    nombre VARCHAR(100),
    tipo ENUM('Perro', 'Gato', 'Ave', 'Otro'),
    raza VARCHAR(100),
    edad INT,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

-- -----------------------------------------------------
-- TABLA: Categorias de productos
-- -----------------------------------------------------
CREATE TABLE Categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- -----------------------------------------------------
-- TABLA: Productos
-- -----------------------------------------------------
CREATE TABLE Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    imagen_url VARCHAR(255),
    certificado_calidad BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
);

-- -----------------------------------------------------
-- TABLA: Proveedores
-- -----------------------------------------------------
CREATE TABLE Proveedores (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    contacto VARCHAR(150),
    telefono VARCHAR(20),
    correo VARCHAR(150),
    direccion TEXT
);

-- -----------------------------------------------------
-- TABLA: Pedidos
-- -----------------------------------------------------
CREATE TABLE Pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('Pendiente', 'Pagado', 'Enviado', 'Entregado', 'Cancelado') DEFAULT 'Pendiente',
    total DECIMAL(10,2),
    metodo_pago ENUM('Tarjeta', 'Transferencia', 'Paypal', 'Efectivo'),
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

-- -----------------------------------------------------
-- TABLA: Detalle de pedidos
-- -----------------------------------------------------
CREATE TABLE Detalle_Pedido (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    id_producto INT,
    cantidad INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);

-- -----------------------------------------------------
-- TABLA: Servicios (Paseadores y cuidadores)
-- -----------------------------------------------------
CREATE TABLE Servicios (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('Paseo', 'Cuidado'),
    descripcion TEXT,
    precio_hora DECIMAL(10,2),
    disponible BOOLEAN DEFAULT TRUE
);

-- -----------------------------------------------------
-- TABLA: Reservas de servicios
-- -----------------------------------------------------
CREATE TABLE Reservas_Servicios (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_servicio INT,
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_servicio DATETIME,
    duracion_horas DECIMAL(4,2),
    total DECIMAL(10,2),
    estado ENUM('Pendiente', 'Confirmado', 'Completado', 'Cancelado') DEFAULT 'Pendiente',
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
    FOREIGN KEY (id_servicio) REFERENCES Servicios(id_servicio)
);

-- -----------------------------------------------------
-- TABLA: Suscripciones
-- -----------------------------------------------------
CREATE TABLE Suscripciones (
    id_suscripcion INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    tipo ENUM('Mensual', 'Trimestral', 'Anual'),
    fecha_inicio DATE DEFAULT (CURRENT_DATE),
    fecha_fin DATE,
    precio DECIMAL(10,2),
    estado ENUM('Activa', 'Inactiva', 'Cancelada') DEFAULT 'Activa',
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

-- -----------------------------------------------------
-- TABLA: Pagos
-- -----------------------------------------------------
CREATE TABLE Pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_pedido INT NULL,
    id_reserva INT NULL,
    id_suscripcion INT NULL,
    monto DECIMAL(10,2),
    metodo ENUM('Tarjeta', 'Transferencia', 'Paypal', 'Efectivo'),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('Pendiente', 'Completado', 'Fallido') DEFAULT 'Completado',
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (id_reserva) REFERENCES Reservas_Servicios(id_reserva),
    FOREIGN KEY (id_suscripcion) REFERENCES Suscripciones(id_suscripcion)
);

-- -----------------------------------------------------
-- TABLA: Colaboraciones con marcas
-- -----------------------------------------------------
CREATE TABLE Colaboraciones (
    id_colaboracion INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(150),
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    tipo ENUM('Publicidad', 'Patrocinio', 'Campaña conjunta'),
    estado ENUM('Activa', 'Finalizada') DEFAULT 'Activa'
);



-- -----------------------------------------------------
-- TABLA: Usuarios (Para autenticación)
-- -----------------------------------------------------
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'cliente', 'empleado') DEFAULT 'cliente',
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente) ON DELETE SET NULL
);

