package com.grupo1.backend.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import com.grupo1.backend.entities.Comentario;
import com.grupo1.backend.entities.Producto;
import com.grupo1.backend.entities.User;
import com.grupo1.backend.repository.ComentarioRepository;
import com.grupo1.backend.repository.ProductoRepository;
import com.grupo1.backend.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class ComentarioServiceTest {
    @Mock
    private ComentarioRepository comentarioRepo;

    @Mock
    private UserRepository userRepo;

    @Mock
    private ProductoRepository productoRepo;

    @InjectMocks
    private ComentarioService comentarioService;

    @Test
    void testGetComentariosByUserSuccess() throws NotFoundException {
        int userId = 1;
        User mockUser = new User();
        List<Comentario> comentarios = List.of(new Comentario());

        when(userRepo.existsById(userId)).thenReturn(true);
        when(userRepo.findById(userId)).thenReturn(Optional.of(mockUser));
        when(comentarioRepo.findByUser(mockUser)).thenReturn(comentarios);

        List<Comentario> result = comentarioService.getComentariosByUser(userId);

        assertEquals(comentarios, result);
    }

    @Test
    void testGetComentariosByUserNotFound() {
        int userId = 2;

        when(userRepo.existsById(userId)).thenReturn(false);

        assertThrows(NotFoundException.class, () -> comentarioService.getComentariosByUser(userId));
    }

    @Test
    void testGetComentariosByProductoSuccess() throws NotFoundException {
        int prodId = 3;
        Producto producto = new Producto();
        List<Comentario> comentarios = List.of(new Comentario());

        when(productoRepo.existsById(prodId)).thenReturn(true);
        when(productoRepo.findById(prodId)).thenReturn(Optional.of(producto));
        when(comentarioRepo.findByProducto(producto)).thenReturn(comentarios);

        List<Comentario> result = comentarioService.getComentariosByProducto(prodId);

        assertEquals(comentarios, result);
    }

    @Test
    void testGetComentariosByProductoNotFound() {
        int prodId = 999;

        when(productoRepo.existsById(prodId)).thenReturn(false);

        assertThrows(NotFoundException.class, () -> comentarioService.getComentariosByProducto(prodId));
    }

    @Test
    void testAddComentario() {
        Comentario comentario = new Comentario();

        when(comentarioRepo.save(comentario)).thenReturn(comentario);

        Comentario result = comentarioService.addComentario(comentario);

        assertEquals(comentario, result);
    }

    @Test
    void testDeleteComentarioSuccess() throws NotFoundException {
        int id = 4;
        Comentario comentario = new Comentario();

        when(comentarioRepo.findById(id)).thenReturn(Optional.of(comentario));

        comentarioService.deleteComentario(id);

        verify(comentarioRepo).delete(comentario);
    }

    @Test
    void testDeleteComentarioNotFound() {
        int id = 100;

        when(comentarioRepo.findById(id)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> comentarioService.deleteComentario(id));
    }

    @Test
    void testGetByIdSuccess() throws NotFoundException {
        int id = 5;
        Comentario comentario = new Comentario();

        when(comentarioRepo.existsById(id)).thenReturn(true);
        when(comentarioRepo.findById(id)).thenReturn(Optional.of(comentario));

        Comentario result = comentarioService.getById(id);

        assertEquals(comentario, result);
    }

    @Test
    void testGetByIdNotFound() {
        int id = 6;

        when(comentarioRepo.existsById(id)).thenReturn(false);

        assertThrows(NotFoundException.class, () -> comentarioService.getById(id));
    }
}
