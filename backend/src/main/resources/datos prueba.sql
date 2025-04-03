-- Insertar usuarios
INSERT INTO users (apellidos, cp, direccion, email, nombre, password, rol) VALUES
('Gonzalez', 28001, 'Calle Falsa 123, Madrid', 'juan.gonzalez@email.com', 'Juan', 'password123', 'USER'),
('Perez', 08001, 'Avenida Diagonal 456, Barcelona', 'maria.perez@email.com', 'Maria', 'password456', 'ADMIN');

-- Insertar productos
INSERT INTO productos (categoria, descripcion, imagen, marca, nombre, precio) VALUES
('ALTAVOCES', 'Altavoces Bluetooth de alta calidad', 'altavoces.jpg', 'Logitech', 'Logitech Z607', 89.99),
('MONITOR', 'Monitor 24 pulgadas 144Hz', 'monitor.jpg', 'Samsung', 'Samsung Odyssey G5', 299.99),
('ORDENADOR', 'PC de sobremesa con procesador i7 y 16GB de RAM', 'ordenador.jpg', 'HP', 'HP Pavilion Desktop', 749.00),
('TECLADO', 'Teclado mecánico RGB', 'teclado.jpg', 'Corsair', 'Corsair K95', 169.99),
('RAM', 'Memoria RAM DDR4 16GB', 'ram.jpg', 'Corsair', 'Corsair Vengeance LPX 16GB', 79.99);

-- Insertar pedidos
INSERT INTO pedidos (direccion, fecha, metodo_pago, user) VALUES
('Calle Falsa 123, Madrid', '2025-04-01', 'VISA', 1),
('Avenida Diagonal 456, Barcelona', '2025-04-02', 'PAYPAL', 2);

-- Insertar relaciones entre pedidos y productos (pedido_producto)
INSERT INTO pedido_producto (id_pedido, id_producto) VALUES
(1, 1), -- Pedido 1 con producto 1 (Altavoces)
(1, 4), -- Pedido 1 con producto 4 (Teclado)
(2, 2), -- Pedido 2 con producto 2 (Monitor)
(2, 5); -- Pedido 2 con producto 5 (RAM)

-- Insertar comentarios
INSERT INTO comentarios (contras, nota, opinion, pros, id_producto, id_user) VALUES
('Fácil de usar, suena increíble', 5, 'Muy buenos altavoces, excelente calidad de sonido', 'Sonido claro, fácil instalación', 1, 1), -- Comentario para el producto 1 (Altavoces)
('Excelente monitor, perfecto para gaming', 5, 'Pantalla nítida y gran tasa de refresco', 'Buena calidad de imagen, rápido', 2, 2); -- Comentario para el producto 2 (Monitor)

-- Insertar carritos
INSERT INTO carritos (id_user) VALUES
(1), -- Carrito para el usuario 1
(2); -- Carrito para el usuario 2

-- Insertar relaciones entre carritos y productos (carrito_producto)
INSERT INTO carrito_producto (id_carrito, id_producto) VALUES
(1, 3), -- Carrito 1 con producto 3 (Ordenador)
(1, 4), -- Carrito 1 con producto 4 (Teclado)
(2, 2), -- Carrito 2 con producto 2 (Monitor)
(2, 5); -- Carrito 2 con producto 5 (RAM)
