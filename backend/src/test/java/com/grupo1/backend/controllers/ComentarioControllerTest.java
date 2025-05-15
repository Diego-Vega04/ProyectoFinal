package com.grupo1.backend.controllers;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo1.backend.entities.Comentario;
import com.grupo1.backend.services.ComentarioService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Collections;

@WebMvcTest(ComentarioController.class)
public class ComentarioControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ComentarioService comentarioSer;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testAddComentario() throws Exception {
        Comentario comentario = new Comentario();
        comentario.setId(1);
        comentario.setOpinion("Muy buen producto");

        Mockito.when(comentarioSer.addComentario(Mockito.any())).thenReturn(comentario);

        mockMvc.perform(post("/api/comentarios/añadir")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(comentario)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.opinion").value("Muy buen producto"));
    }

    @Test
    void testGetByUser() throws Exception {
        Mockito.when(comentarioSer.getComentariosByUser(1)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/comentarios/user/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void testGetByProducto() throws Exception {
        Mockito.when(comentarioSer.getComentariosByProducto(1)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/comentarios/producto/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void testDeleteComentario() throws Exception {
        Mockito.doNothing().when(comentarioSer).deleteComentario(1);

        mockMvc.perform(delete("/api/comentarios/borrar/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.mensaje").value("Comentario borrado con éxito"));
    }

    @Test
    void testGetById() throws Exception {
        Comentario comentario = new Comentario();
        comentario.setId(1);
        comentario.setOpinion("Comentario de prueba");

        Mockito.when(comentarioSer.getById(1)).thenReturn(comentario);

        mockMvc.perform(get("/api/comentarios/id/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.opinion").value("Comentario de prueba"));
    }
}
