-- Insertar usuarios
INSERT INTO users (apellidos, cp, direccion, email, nombre, password, rol) VALUES
('Gonzalez', 28001, 'Calle Falsa 123, Madrid', 'juan.gonzalez@email.com', 'Juan', 'password123', 'USER'),
('Pastor', '28001', 'Calle Ficticia 123', 'gonzalez@mail.com', 'Juan', 'contraseña123', 'ADMIN'),
('Lopez', '28002', 'Calle Real 456', 'lopez@mail.com', 'Maria', 'password456', 'USER'),
('Perez', '28003', 'Avenida Central 789', 'perez@mail.com', 'Carlos', 'secreto789', 'USER'),
('Martinez', '28004', 'Plaza Mayor 101', 'martinez@mail.com', 'Ana', 'clave101', 'ADMIN'),
('Perez', 08001, 'Avenida Diagonal 456, Barcelona', 'maria.perez@email.com', 'Maria', 'password456', 'ADMIN');

-- Insertar productos
INSERT INTO productos (categoria, descripcion, imagen, marca, nombre, precio) VALUES
('PERIFÉRICOS', 'Altavoces Bluetooth de alta calidad', 'altavoces.jpg', 'Logitech', 'Logitech Z607', 89.99),
('TELEVISORES', 'Monitor 24 pulgadas 144Hz', 'monitor.jpg', 'Samsung', 'Samsung Odyssey G5', 299.99),
('ORDENADORES', 'PC de sobremesa con procesador i7 y 16GB de RAM', 'ordenador.jpg', 'HP', 'HP Pavilion Desktop', 749.00),
('PERIFÉRICOS', 'Teclado mecánico RGB', 'teclado.jpg', 'Corsair', 'Corsair K95', 169.99),
('COMPONENTES', 'Memoria RAM DDR4 16GB', 'ram.jpg', 'Corsair', 'Corsair Vengeance LPX 16GB', 79.99),
('PERIFÉRICOS', 'Ratón inalámbrico para gaming', 'raton.jpg', 'Logitech', 'Ratón Gaming', 29.99),
('TELEVISORES', 'Televisor Full HD 42"', 'televisor42.jpg', 'Samsung', 'Televisor LED', 299.99),
('COMPONENTES', 'Placa base compatible con Intel', 'placa_base.jpg', 'ASUS', 'Placa Base Intel', 89.99),
('ORDENADORES', 'Ordenador de sobremesa 16GB RAM', 'ordenador16gb.jpg', 'HP', 'PC Sobremesa', 799.99);


-- Insertar pedidos
INSERT INTO pedidos (direccion, fecha, metodo_pago, user) VALUES
('Calle Falsa 123, Madrid', '2025-04-01', 'VISA', 1),
('Avenida Diagonal 456, Barcelona', '2025-04-02', 'PAYPAL', 2),
('Calle Ficticia 1, 28001', '2025-04-01 12:00:00', 'VISA', '3'),
('Calle Ficticia 2, 28002', '2025-04-02 14:30:00', 'PAYPAL', '4'),
('Calle Ficticia 3, 28003', '2025-04-03 09:45:00', 'BIZUM', '5'),
('Calle Ficticia 4, 28004', '2025-04-04 18:15:00', 'VISA', '6');


-- Insertar relaciones entre pedidos y productos (pedido_producto)
INSERT INTO pedido_producto (id_pedido, id_producto) VALUES
(1, 1), -- Pedido 1 con producto 1 (Altavoces)
(1, 4), -- Pedido 1 con producto 4 (Teclado)
(2, 2), -- Pedido 2 con producto 2 (Monitor)
(2, 5); -- Pedido 2 con producto 5 (RAM)

-- Insertar comentarios
INSERT INTO comentarios (contras, nota, opinion, pros, id_producto, id_user) VALUES
('Fácil de usar, suena increíble', 5, 'Muy buenos altavoces, excelente calidad de sonido', 'Sonido claro, fácil instalación', 1, 1), -- Comentario para el producto 1 (Altavoces)
('Excelente monitor, perfecto para gaming', 5, 'Pantalla nítida y gran tasa de refresco', 'Buena calidad de imagen, rápido', 2, 2), -- Comentario para el producto 2 (Monitor)
('El tamaño podría ser mayor', 4, 'Buen producto pero algo pequeño', 'Buena calidad, entrega rápida', 3, 3),
('No tiene muchas opciones de color', 3, 'Cumple con lo prometido, pero le faltan opciones', 'Buen rendimiento, fácil de usar', 3, 3),
('El sonido podría ser mejor', 5, 'Excelente producto, lo recomendaría a todos', 'Sonido claro, diseño elegante', 4, 4),
('La batería no dura lo esperado', 2, 'No me convenció, la duración de la batería es mala', 'Bonito diseño, fácil de transportar', 5, 5);


-- Insertar carritos
INSERT INTO carritos (id_user) VALUES
(1), -- Carrito para el usuario 1
(2), -- Carrito para el usuario 2
(3),
(4),
(5),
(6);

-- Insertar relaciones entre carritos y productos (carrito_producto)
INSERT INTO carrito_producto (id_carrito, id_producto) VALUES
(1, 3), -- Carrito 1 con producto 3 (Ordenador)
(1, 4), -- Carrito 1 con producto 4 (Teclado)
(2, 2), -- Carrito 2 con producto 2 (Monitor)
(2, 5); -- Carrito 2 con producto 5 (RAM)
