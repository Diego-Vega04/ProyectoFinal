package com.grupo1.backend.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.grupo1.backend.entities.Favoritos;
import com.grupo1.backend.entities.Producto;
import com.grupo1.backend.entities.User;
import com.grupo1.backend.repository.FavoritosRepository;

@ExtendWith(MockitoExtension.class)
public class FavoritosServiceTest {

    @Mock
    private FavoritosRepository favRep;

    @InjectMocks
    private FavoritosService favoritosService;

    @Test
    void testGetByUser() {
        User user = new User();
        Favoritos favoritos = new Favoritos();

        when(favRep.findByUser(user)).thenReturn(favoritos);

        Favoritos result = favoritosService.getByUser(user);

        assertEquals(favoritos, result);
    }

    @Test
    void testAddFavoritos() {
        Favoritos favoritos = new Favoritos();

        when(favRep.save(favoritos)).thenReturn(favoritos);

        Favoritos result = favoritosService.addFavoritos(favoritos);

        assertEquals(favoritos, result);
    }

    @Test
    void testGetByIdFound() {
        int id = 1;
        Favoritos favoritos = new Favoritos();

        when(favRep.findById(id)).thenReturn(Optional.of(favoritos));

        Optional<Favoritos> result = favoritosService.getById(id);

        assertTrue(result.isPresent());
        assertEquals(favoritos, result.get());
    }

    @Test
    void testGetByIdNotFound() {
        int id = 99;

        when(favRep.findById(id)).thenReturn(Optional.empty());

        Optional<Favoritos> result = favoritosService.getById(id);

        assertTrue(result.isEmpty());
    }

    @Test
    void testVaciarFavoritosSuccess() {
        int id = 5;
        Producto producto = mock(Producto.class);
        Favoritos favoritos = new Favoritos();
        favoritos.setProductos(new ArrayList<>(List.of(producto)));

        when(favRep.findById(id)).thenReturn(Optional.of(favoritos));

        favoritosService.vaciarFavoritos(id);

        assertTrue(favoritos.getProductos().isEmpty());
        verify(favRep).save(favoritos);
    }

    @Test
    void testVaciarFavoritosNotFound() {
        int id = 999;

        when(favRep.findById(id)).thenReturn(Optional.empty());

        RuntimeException thrown = assertThrows(RuntimeException.class, () -> favoritosService.vaciarFavoritos(id));
        assertTrue(thrown.getMessage().contains("Favoritos no encontrados"));
    }

}
