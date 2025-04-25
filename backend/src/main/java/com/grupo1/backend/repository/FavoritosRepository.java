package com.grupo1.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grupo1.backend.entities.Favoritos;
import com.grupo1.backend.entities.User;


@Repository
public interface FavoritosRepository extends JpaRepository<Favoritos, Integer>{

    Favoritos findByUser(User user);
}
