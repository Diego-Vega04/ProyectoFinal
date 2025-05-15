package com.grupo1.backend.controllers;

import static org.mockito.Mockito.when;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo1.backend.entities.Carrito;
import com.grupo1.backend.entities.Producto;
import com.grupo1.backend.services.CarritoService;

@WebMvcTest(CarritoController.class)
public class CarritoControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CarritoService carritoSer;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetByUser_Success() throws Exception {
        Carrito carrito = new Carrito();
        int userId = 1;

        when(carritoSer.getByUser(userId)).thenReturn(carrito);

        mockMvc.perform(get("/api/carritos/user/{id_user}", userId))
                .andExpect(status().isOk());
    }

    @Test
    void testGetByUser_NotFound() throws Exception {
        int userId = 1;
        when(carritoSer.getByUser(userId)).thenThrow(new NotFoundException());

        mockMvc.perform(get("/api/carritos/user/{id_user}", userId))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetByUser_BadRequest() throws Exception {
        mockMvc.perform(get("/api/carritos/user/{id_user}", 0))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testAddProductosToCarrito_NotFound() throws Exception {
        int carritoId = 999;

        when(carritoSer.getById(carritoId)).thenReturn(Optional.empty());

        mockMvc.perform(post("/api/carritos/{idCarrito}/productos", carritoId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new Producto())))
                .andExpect(status().isNotFound());
    }

    @Test
    void testVaciarCarrito_Success() throws Exception {
        int id = 1;

        when(carritoSer.vaciarCarrito(id)).thenReturn(true);

        mockMvc.perform(delete("/api/carritos/delete/{id}", id))
                .andExpect(status().isOk())
                .andExpect(content().string("Carrito vaciado con éxito"));
    }

    @Test
    void testVaciarCarrito_NotFound() throws Exception {
        int id = 99;

        when(carritoSer.vaciarCarrito(id)).thenReturn(false);

        mockMvc.perform(delete("/api/carritos/delete/{id}", id))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Carrito no encontrado"));
    }

    @Test
    void testGetById_Success() throws Exception {
        when(carritoSer.getById(1)).thenReturn(Optional.of(new Carrito()));

        mockMvc.perform(get("/api/carritos/id/{id}", 1))
                .andExpect(status().isOk());
    }

    @Test
    void testGetById_BadRequest() throws Exception {
        mockMvc.perform(get("/api/carritos/id/{id}", 0))
                .andExpect(status().isBadRequest());
    }
}
