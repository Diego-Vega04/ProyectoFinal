package com.grupo1.backend.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.grupo1.backend.entities.Producto;
import com.grupo1.backend.entities.enums.CategoriaProducto;
import com.grupo1.backend.services.ProductoService;

@ExtendWith(MockitoExtension.class)
public class ProductoControllerTest {
    private MockMvc mockMvc;

    @Mock
    private ProductoService productoSer;

    @InjectMocks
    private ProductoController productoController;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(productoController).build();
    }

    @Test
    public void testGetById_Success() throws Exception {
        Producto producto = new Producto();
        producto.setId(1);

        when(productoSer.getById(1)).thenReturn(producto);

        mockMvc.perform(get("/api/productos/id/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    public void testGetById_BadRequest() throws Exception {
        mockMvc.perform(get("/api/productos/id/0"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("El id no puede ser menor o igual que 0"));
    }

    @Test
    public void testAddProducto_Success() throws Exception {
        Producto producto = new Producto();
        producto.setId(1);
        String json = "{\"id\":1}";

        when(productoSer.addProducto(any(Producto.class))).thenReturn(producto);

        mockMvc.perform(post("/api/productos/añadir")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    public void testDeleteProducto_Success() throws Exception {
        doNothing().when(productoSer).deleteProducto(1);

        mockMvc.perform(delete("/api/productos/borrar/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Producto eliminado correctamente"));
    }

    @Test
    public void testDeleteProducto_BadRequest() throws Exception {
        mockMvc.perform(delete("/api/productos/borrar/0"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("El id no puede ser menor o igual que 0"));
    }

    @Test
    public void testActualizarProducto_Success() throws Exception {
        Producto producto = new Producto();
        producto.setId(1);
        String json = "{\"id\":1}";

        when(productoSer.addProducto(any(Producto.class))).thenReturn(producto);

        mockMvc.perform(put("/api/productos/actualizar")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    public void testGetAll_Success() throws Exception {
        Producto p1 = new Producto(); p1.setId(1);
        Producto p2 = new Producto(); p2.setId(2);
        List<Producto> productos = Arrays.asList(p1, p2);

        when(productoSer.getAllProdcutos()).thenReturn(productos);

        mockMvc.perform(get("/api/productos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    public void testGetByCategoria_Success() throws Exception {
        Producto p1 = new Producto(); p1.setId(1);
        List<Producto> productos = Arrays.asList(p1);

        when(productoSer.productosByCategoria(CategoriaProducto.COMPONENTES)).thenReturn(productos);

        mockMvc.perform(get("/api/productos/categoria/COMPONENTES"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    public void testGetByMarca_Success() throws Exception {
        Producto p1 = new Producto(); p1.setId(1);
        List<Producto> productos = Arrays.asList(p1);

        when(productoSer.productosByMarca("MarcaX")).thenReturn(productos);

        mockMvc.perform(get("/api/productos/marca/MarcaX"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }
}
