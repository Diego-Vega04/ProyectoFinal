package com.grupo1.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo1.backend.entities.Producto;
import com.grupo1.backend.entities.enums.CategoriaProducto;
import com.grupo1.backend.services.ProductoService;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    
    @Autowired
    private ProductoService productoSer;

    @PostMapping("/añadir")
    public ResponseEntity<Producto> addProducto (@RequestBody Producto producto) {
        return ResponseEntity.ok (productoSer.addProducto(producto));
    }

    @DeleteMapping("/borrar/{id}")
    public void deleteProducto (@PathVariable int id) throws NotFoundException {
        productoSer.deleteProducto(id);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Producto> actualizarProducto(@RequestBody Producto producto) {
        return ResponseEntity.ok (productoSer.addProducto(producto));
    }
    
    @GetMapping("/id/{id}")
    public ResponseEntity<Producto> getById (@PathVariable int id) throws NotFoundException {
        return ResponseEntity.ok(productoSer.getById(id));
    }

    @GetMapping("")
    public ResponseEntity<List<Producto>> getAll () {
        return ResponseEntity.ok(productoSer.getAllProdcutos());
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Producto>> getByCategoria (@PathVariable CategoriaProducto categoria) {
        return ResponseEntity.ok(productoSer.productosByCategoria(categoria));
    }

    @GetMapping("/marca/{marca}")
    public ResponseEntity<List<Producto>> getByMarca (@PathVariable String marca) {
        return ResponseEntity.ok(productoSer.productosByMarca(marca));
    }
}
