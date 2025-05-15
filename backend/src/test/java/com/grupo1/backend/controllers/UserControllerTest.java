package com.grupo1.backend.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
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
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo1.backend.entities.User;
import com.grupo1.backend.entities.enums.Rol;
import com.grupo1.backend.services.UserService;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {
    private MockMvc mockMvc;

    @Mock
    private UserService userSer;

    @InjectMocks
    private UserController userController;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void testGetByEmail_Success() throws Exception {
        User user = new User();
        user.setEmail("test@example.com");

        when(userSer.getUserByEmail("test@example.com")).thenReturn(user);

        mockMvc.perform(get("/api/users/email/test@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@example.com"));
    }

    @Test
    void testGetByEmail_NotFound() throws Exception {
        when(userSer.getUserByEmail("noexiste@example.com")).thenThrow(new NotFoundException());

        mockMvc.perform(get("/api/users/email/noexiste@example.com"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("No se encontro un usuario con email noexiste@example.com"));
    }

    @Test
    void testAddUser_Success() throws Exception {
        User user = new User();
        user.setEmail("nuevo@example.com");
        user.setRol(Rol.USER);


        when(userSer.existe("nuevo@example.com")).thenReturn(false);
        when(userSer.addUser(any(User.class))).thenReturn(user);

        mockMvc.perform(post("/api/users/añadir")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("nuevo@example.com"));
    }

    @Test
    void testAddUser_AlreadyExists() throws Exception {
        User user = new User();
        user.setEmail("existente@example.com");

        when(userSer.existe("existente@example.com")).thenReturn(true);

        mockMvc.perform(post("/api/users/añadir")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Ya existe un usuario con email: existente@example.com"));
    }

    @Test
    void testDeleteUser_Success() throws Exception {
        doNothing().when(userSer).deleteUser(1);

        mockMvc.perform(delete("/api/users/borrar/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Usuario eliminado correctamente"));
    }

    @Test
    void testDeleteUser_NotFound() throws Exception {
        doThrow(new NotFoundException()).when(userSer).deleteUser(999);

        mockMvc.perform(delete("/api/users/borrar/999"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("No se encontro un usuario con id 999"));
    }

    @Test
    void testDeleteUser_BadRequest() throws Exception {
        mockMvc.perform(delete("/api/users/borrar/0"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("El id no puede ser menor o igual que cero"));
    }

    @Test
    void testActualizarUser_Success() throws Exception {
        User user = new User();
        user.setEmail("actualizar@example.com");

        when(userSer.addUser(any(User.class))).thenReturn(user);

        mockMvc.perform(put("/api/users/actualizar")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("actualizar@example.com"));
    }

    @Test
    void testGetById_Success() throws Exception {
        User user = new User();
        user.setId(1);

        when(userSer.getById(1)).thenReturn(user);

        mockMvc.perform(get("/api/users/id/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void testGetById_BadRequest() throws Exception {
        mockMvc.perform(get("/api/users/id/0"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("El id no puede ser menor o igual que cero"));
    }

    @Test
    void testGetById_NotFound() throws Exception {
        when(userSer.getById(999)).thenThrow(new NotFoundException());

        mockMvc.perform(get("/api/users/id/999"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("No se encontro un usuario con id 999"));
    }

    @Test
    void testGetAllUsers_Success() throws Exception {
        User u1 = new User(); u1.setId(1);
        User u2 = new User(); u2.setId(2);
        List<User> users = Arrays.asList(u1, u2);

        when(userSer.getAllUsers()).thenReturn(users);

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }
}
