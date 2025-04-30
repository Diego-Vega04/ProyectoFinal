package com.grupo1.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grupo1.backend.entities.Pedido;
import com.grupo1.backend.entities.User;

import java.util.List;


@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    List<Pedido> findByUser(User user);
    
}
