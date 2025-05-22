package com.grupo1.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.grupo1.backend.entities.Favoritos;
import com.grupo1.backend.entities.User;
import com.grupo1.backend.repository.FavoritosRepository;

@Service
public class FavoritosService {

    private final FavoritosRepository favRep;

    public FavoritosService(FavoritosRepository favRep) {
        this.favRep = favRep;
    }

    public Favoritos getByUser(User user) {
        return favRep.findByUser(user);
    }

    public Favoritos addFavoritos(Favoritos fav) {
        return favRep.save(fav);
    }

    public Optional<Favoritos> getById(int id) {
        return favRep.findById(id);
    }

    public void vaciarFavoritos(int id) {
        Favoritos favoritos = favRep.findById(id)
                .orElseThrow(() -> new RuntimeException("Favoritos no encontrados con ID: " + id));

        favoritos.getProductos().clear();
        favRep.save(favoritos);
    }

    public void eliminarProductoDeTodosLosFavoritos(int idProducto) {
    List<Favoritos> todasLasListas = favRep.findAll();
    for (Favoritos lista : todasLasListas) {
        lista.getProductos().removeIf(p -> p.getId() == idProducto);
        favRep.save(lista);
    }
}
}
