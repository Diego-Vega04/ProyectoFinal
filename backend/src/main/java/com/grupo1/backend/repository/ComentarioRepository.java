package com.grupo1.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grupo1.backend.entities.Comentario;
import com.grupo1.backend.entities.Producto;
import com.grupo1.backend.entities.User;

import java.util.List;


@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Integer>{

    List<Comentario> findByUser(User user);

    List<Comentario> findByProducto(Producto producto);
}
