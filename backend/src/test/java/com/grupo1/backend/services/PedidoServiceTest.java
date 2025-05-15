package com.grupo1.backend.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;

import com.grupo1.backend.entities.Pedido;
import com.grupo1.backend.entities.User;
import com.grupo1.backend.repository.PedidoRepository;
import com.grupo1.backend.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class PedidoServiceTest {
    @Mock
    private PedidoRepository pedidoRepo;

    @Mock
    private UserRepository userRepo;

    @InjectMocks
    private PedidoService pedidoService;

    @Test
    void testAddPedidoWithUserFound() {
        User user = new User();
        user.setId(1);
        Pedido pedido = new Pedido();
        pedido.setUser(user);

        when(userRepo.findById(1)).thenReturn(Optional.of(user));
        when(pedidoRepo.save(pedido)).thenReturn(pedido);

        ResponseEntity<Pedido> response = pedidoService.addPedido(pedido);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(pedido, response.getBody());
    }

    @Test
    void testAddPedidoWithUserNotFound() {
        User user = new User();
        user.setId(2);
        Pedido pedido = new Pedido();
        pedido.setUser(user);

        when(userRepo.findById(2)).thenReturn(Optional.empty());
        when(pedidoRepo.save(pedido)).thenReturn(pedido);

        ResponseEntity<Pedido> response = pedidoService.addPedido(pedido);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(pedido, response.getBody());
    }

    @Test
    void testGetPedidosByUserSuccess() throws NotFoundException {
        int userId = 3;
        User user = new User();
        List<Pedido> pedidos = List.of(new Pedido());

        when(userRepo.existsById(userId)).thenReturn(true);
        when(userRepo.findById(userId)).thenReturn(Optional.of(user));
        when(pedidoRepo.findByUser(user)).thenReturn(pedidos);

        List<Pedido> result = pedidoService.getPedidosByUser(userId);

        assertEquals(pedidos, result);
    }

    @Test
    void testGetPedidosByUserNotFound() {
        int userId = 4;

        when(userRepo.existsById(userId)).thenReturn(false);

        assertThrows(NotFoundException.class, () -> pedidoService.getPedidosByUser(userId));
    }

    @Test
    void testGetByIdFound() throws NotFoundException {
        int pedidoId = 5;
        Pedido pedido = new Pedido();

        when(pedidoRepo.existsById(pedidoId)).thenReturn(true);
        when(pedidoRepo.findById(pedidoId)).thenReturn(Optional.of(pedido));

        Pedido result = pedidoService.getById(pedidoId);

        assertEquals(pedido, result);
    }

    @Test
    void testGetByIdNotFound() {
        int pedidoId = 6;

        when(pedidoRepo.existsById(pedidoId)).thenReturn(false);

        assertThrows(NotFoundException.class, () -> pedidoService.getById(pedidoId));
    }
}
