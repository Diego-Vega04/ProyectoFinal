package com.grupo1.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.grupo1.backend.entities.Producto;
import com.grupo1.backend.entities.enums.CategoriaProducto;
import com.grupo1.backend.repository.ProductoRepository;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepo;

    public Producto addProducto(Producto producto) {
        return productoRepo.save(producto);
    }

    public void deleteProducto(int id) throws NotFoundException {
        if (productoRepo.existsById(id)) {
            productoRepo.deleteById(id);
        } else {
            throw new NotFoundException();
        }
        
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

    public Producto getById (int id) throws NotFoundException {
        if (productoRepo.existsById(id)) {
            return productoRepo.findById(id).get();
        } else  {
            throw new NotFoundException();
        }
        
    }
}
