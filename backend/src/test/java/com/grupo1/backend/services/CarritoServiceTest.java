package com.grupo1.backend.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.grupo1.backend.entities.Carrito;
import com.grupo1.backend.entities.Producto;
import com.grupo1.backend.entities.User;
import com.grupo1.backend.repository.CarritoRepository;
import com.grupo1.backend.repository.UserRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

@ExtendWith(MockitoExtension.class)
public class CarritoServiceTest {
    
    @Mock
    private CarritoRepository carritoRepo;
    @Mock
    private UserRepository userRepo;

    @InjectMocks
    private CarritoService carritoService;
    
    @Test
    void testAddCarrito() {
        Carrito carrito = new Carrito();
        when(carritoRepo.save(carrito)).thenReturn(carrito);

        Carrito result = carritoService.addCarrito(carrito);

        assertNotNull(result);
        verify(carritoRepo, times(1)).save(carrito);
    }

    @Test
    void testGetByUserSuccess() throws NotFoundException {
        int userId = 1;
        User mockUser = new User();
        Carrito carrito = new Carrito();

        when(userRepo.existsById(userId)).thenReturn(true);
        when(userRepo.findById(userId)).thenReturn(Optional.of(mockUser));
        when(carritoRepo.findByUser(mockUser)).thenReturn(carrito);

        Carrito result = carritoService.getByUser(userId);

        assertNotNull(result);
        verify(userRepo).existsById(userId);
        verify(userRepo).findById(userId);
        verify(carritoRepo).findByUser(mockUser);
    }

    @Test
    void testGetByUserThrowsNotFound() {
        int userId = 2;

        when(userRepo.existsById(userId)).thenReturn(false);

        assertThrows(NotFoundException.class, () -> carritoService.getByUser(userId));
    }

    @Test
    void testGetById() {
        int carritoId = 1;
        Carrito carrito = new Carrito();

        when(carritoRepo.findById(carritoId)).thenReturn(Optional.of(carrito));

        Optional<Carrito> result = carritoService.getById(carritoId);

        assertTrue(result.isPresent());
        assertEquals(carrito, result.get());
    }

    @Test
    void testVaciarCarritoSuccess() {
        int carritoId = 1;
        Carrito carrito = new Carrito();
        Producto productoMock = new Producto();
        carrito.setProductos(new ArrayList<>(List.of(productoMock)));

        when(carritoRepo.findById(carritoId)).thenReturn(Optional.of(carrito));
        when(carritoRepo.save(any(Carrito.class))).thenReturn(carrito);

        boolean result = carritoService.vaciarCarrito(carritoId);

        assertTrue(result);
        assertEquals(0, carrito.getProductos().size());
        verify(carritoRepo).save(carrito);
    }

    @Test
    void testVaciarCarritoNotFound() {
        int carritoId = 999;

        when(carritoRepo.findById(carritoId)).thenReturn(Optional.empty());

        boolean result = carritoService.vaciarCarrito(carritoId);

        assertFalse(result);
        verify(carritoRepo, never()).save(any());
    }
}
