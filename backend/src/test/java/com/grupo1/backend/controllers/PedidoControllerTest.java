package com.grupo1.backend.controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.sql.Date;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import com.grupo1.backend.entities.Pedido;
import com.grupo1.backend.entities.User;
import com.grupo1.backend.entities.enums.MetodoPago;
import com.grupo1.backend.services.PedidoService;

@WebMvcTest(PedidoController.class)
public class PedidoControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PedidoService pedidoSer;

    private Pedido pedido;

    @BeforeEach
    public void setup() {
        pedido = new Pedido();
        pedido.setId(1);
        pedido.setDireccon("direccion");
        pedido.setFecha(new Date(2025-05-15));
        pedido.setMetodo_pago(MetodoPago.PAYPAL);
        pedido.setUser(new User());
    }

    @Test
    public void testAddPedido() throws Exception {
        when(pedidoSer.addPedido(Mockito.any(Pedido.class)))
                .thenReturn(ResponseEntity.ok(pedido));

        String pedidoJson = "{\"id\":1}";  

        mockMvc.perform(post("/api/pedidos/añadir")
                .contentType(MediaType.APPLICATION_JSON)
                .content(pedidoJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    public void testGetByUser_Success() throws Exception {
        List<Pedido> pedidos = Arrays.asList(pedido);
        when(pedidoSer.getPedidosByUser(1)).thenReturn(pedidos);

        mockMvc.perform(get("/api/pedidos/user/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1));
    }

    @Test
    public void testGetByUser_BadRequest() throws Exception {
        mockMvc.perform(get("/api/pedidos/user/0"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("El id de usuario no puede ser menor o igual que 0"));
    }

    @Test
    public void testGetById_Success() throws Exception {
        when(pedidoSer.getById(1)).thenReturn((pedido));

        mockMvc.perform(get("/api/pedidos/id/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    public void testGetById_BadRequest() throws Exception {
        mockMvc.perform(get("/api/pedidos/id/0"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("El id del pedido no puede ser menor o igual a 0"));
    }

    @Test
    public void testGetById_NotFound() throws Exception {
        when(pedidoSer.getById(999)).thenThrow(new org.springframework.data.crossstore.ChangeSetPersister.NotFoundException());

        mockMvc.perform(get("/api/pedidos/id/999"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("No se ha encontrado un pedido con el id 999"));
    }
}
