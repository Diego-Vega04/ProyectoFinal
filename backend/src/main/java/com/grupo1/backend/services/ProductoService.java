package com.grupo1.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.grupo1.backend.entities.Producto;
import com.grupo1.backend.entities.enums.CategoriaProducto;
import com.grupo1.backend.repository.ProductoRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Service
public class ProductoService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ProductoRepository productoRepo;

    public Producto addProducto(Producto producto) {
        return productoRepo.save(producto);
    }

    @Transactional
    public void deleteProducto(int id) throws NotFoundException {
        if (!productoRepo.existsById(id)) {
            throw new NotFoundException();
        }

        // Elimina relaciones en pedido_producto
        entityManager.createNativeQuery("DELETE FROM pedido_producto WHERE id_producto = :id")
                .setParameter("id", id)
                .executeUpdate();

        // Elimina relaciones con favoritos
        entityManager.createNativeQuery("DELETE FROM favoritos_producto WHERE id_producto = :id")
                .setParameter("id", id)
                .executeUpdate();

        // Elimina relaciones con pedidos
        entityManager.createNativeQuery("DELETE FROM carrito_producto WHERE id_producto = :id")
                .setParameter("id", id)
                .executeUpdate();

        productoRepo.deleteById(id);
    }

    public List<Producto> productosByCategoria(CategoriaProducto categoria) {
        return productoRepo.findByCategoria(categoria);
    }

    public List<Producto> productosByMarca(String marca) {
        return productoRepo.findByMarca(marca);
    }

    public List<Producto> getAllProdcutos() {
        return productoRepo.findAll();
    }

    public Producto getById(int id) throws NotFoundException {
        if (productoRepo.existsById(id)) {
            return productoRepo.findById(id).get();
        } else {
            throw new NotFoundException();
        }

    }
}
