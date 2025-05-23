package com.grupo1.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grupo1.backend.entities.Carrito;
import com.grupo1.backend.entities.User;



@Repository
public interface CarritoRepository extends JpaRepository<Carrito, Integer>{

    Carrito findByUser(User user);
    
}
