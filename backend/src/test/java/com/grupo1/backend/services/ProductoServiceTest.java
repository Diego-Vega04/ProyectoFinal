package com.grupo1.backend.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import com.grupo1.backend.entities.Producto;
import com.grupo1.backend.entities.enums.CategoriaProducto;
import com.grupo1.backend.repository.ProductoRepository;

@ExtendWith(MockitoExtension.class)
public class ProductoServiceTest {
     @Mock
    private ProductoRepository productoRepo;

    @InjectMocks
    private ProductoService productoService;

    @Test
    void testAddProducto() {
        Producto producto = new Producto();

        when(productoRepo.save(producto)).thenReturn(producto);

        Producto result = productoService.addProducto(producto);

        assertEquals(producto, result);
    }

    @Test
    void testDeleteProductoExists() throws NotFoundException {
        int id = 1;

        when(productoRepo.existsById(id)).thenReturn(true);

        productoService.deleteProducto(id);

        verify(productoRepo).deleteById(id);
    }

    @Test
    void testDeleteProductoNotFound() {
        int id = 2;

        when(productoRepo.existsById(id)).thenReturn(false);

        assertThrows(NotFoundException.class, () -> productoService.deleteProducto(id));
    }

    @Test
    void testProductosByCategoria() {
        CategoriaProducto categoria = CategoriaProducto.COMPONENTES;
        List<Producto> productos = List.of(new Producto());

        when(productoRepo.findByCategoria(categoria)).thenReturn(productos);

        List<Producto> result = productoService.productosByCategoria(categoria);

        assertEquals(productos, result);
    }

    @Test
    void testProductosByMarca() {
        String marca = "Sony";
        List<Producto> productos = List.of(new Producto());

        when(productoRepo.findByMarca(marca)).thenReturn(productos);

        List<Producto> result = productoService.productosByMarca(marca);

        assertEquals(productos, result);
    }

    @Test
    void testGetAllProductos() {
        List<Producto> productos = List.of(new Producto(), new Producto());

        when(productoRepo.findAll()).thenReturn(productos);

        List<Producto> result = productoService.getAllProdcutos();

        assertEquals(2, result.size());
    }

    @Test
    void testGetByIdExists() throws NotFoundException {
        int id = 1;
        Producto producto = new Producto();

        when(productoRepo.existsById(id)).thenReturn(true);
        when(productoRepo.findById(id)).thenReturn(Optional.of(producto));

        Producto result = productoService.getById(id);

        assertEquals(producto, result);
    }

    @Test
    void testGetByIdNotFound() {
        int id = 5;

        when(productoRepo.existsById(id)).thenReturn(false);

        assertThrows(NotFoundException.class, () -> productoService.getById(id));
    }
}
