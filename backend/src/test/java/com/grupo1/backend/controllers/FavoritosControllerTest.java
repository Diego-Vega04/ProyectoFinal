package com.grupo1.backend.controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.grupo1.backend.entities.Favoritos;
import com.grupo1.backend.entities.Producto;
import com.grupo1.backend.entities.User;
import com.grupo1.backend.services.FavoritosService;
import com.grupo1.backend.services.UserService;

@WebMvcTest(FavoritosController.class)
public class FavoritosControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FavoritosService favSer;

    @MockBean
    private UserService userSer;

    @Test
    public void testGetById_Success() throws Exception {
        Favoritos favoritos = new Favoritos();
        favoritos.setId(1);
        favoritos.setProductos(new ArrayList<>());

        when(favSer.getById(1)).thenReturn(Optional.of(favoritos));

        mockMvc.perform(get("/api/favoritos/id/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    public void testCrearFavoritos_Success() throws Exception {
        User user = new User();
        user.setId(1);

        Favoritos favoritos = new Favoritos();
        favoritos.setId(10);
        favoritos.setUser(user);
        favoritos.setProductos(new ArrayList<>());

        when(userSer.getById(1)).thenReturn(user);
        when(favSer.addFavoritos(Mockito.any(Favoritos.class))).thenReturn(favoritos);
        when(userSer.addUser(Mockito.any(User.class))).thenReturn(user);

        mockMvc.perform(post("/api/favoritos/crear/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(10));
    }

    @Test
    public void testActualizarFavoritos_Success() throws Exception {
        Favoritos favoritos = new Favoritos();
        favoritos.setId(1);
        favoritos.setProductos(new ArrayList<>());

        String jsonFavoritos = "{\"id\":1,\"productos\":[]}";

        when(favSer.addFavoritos(Mockito.any(Favoritos.class))).thenReturn(favoritos);

        mockMvc.perform(put("/api/favoritos/actualizar")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonFavoritos))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    public void testAddProducto_Success() throws Exception {
        Favoritos favoritos = new Favoritos();
        favoritos.setId(1);
        favoritos.setProductos(new ArrayList<>());

        Producto producto = new Producto();
        producto.setId(5);

        favoritos.getProductos().add(producto);

        when(favSer.getById(1)).thenReturn(Optional.of(favoritos));
        when(favSer.addFavoritos(Mockito.any(Favoritos.class))).thenReturn(favoritos);

        String jsonProducto = "{\"id\":5}";

        mockMvc.perform(post("/api/favoritos/1/productos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonProducto))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productos[0].id").value(5));
    }

    @Test
    public void testVaciarFavoritos_Success() throws Exception {
        Mockito.doNothing().when(favSer).vaciarFavoritos(1);

        mockMvc.perform(delete("/api/favoritos/1/vaciar"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetById_BadRequest() throws Exception {
        mockMvc.perform(get("/api/favoritos/id/0"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("El id de favoritos no puede ser menor o igual que 0"));
    }
}
