package com.grupo1.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grupo1.backend.entities.Producto;
import com.grupo1.backend.entities.enums.CategoriaProducto;

import java.util.List;


@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer>{
    
    List<Producto> findByCategoria(CategoriaProducto categoria);

    List<Producto> findByMarca(String marca);

    List<Producto> findByNombreContainingIgnoreCase(String nombre);

}
