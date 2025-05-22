package com.grupo1.backend.controllers;

import java.util.List;
import java.util.Map;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
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
import com.grupo1.backend.services.FavoritosService;
import com.grupo1.backend.services.ProductoService;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    
    @Autowired
    private ProductoService productoSer;
    @Autowired
    private FavoritosService favSer;

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getById (@PathVariable int id) {
        try {
            if (id <= 0) {
                throw new BadRequestException();
            }

            return ResponseEntity.ok(productoSer.getById(id));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro el producto con id " + id);
        } catch (BadRequestException a) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El id no puede ser menor o igual que 0");
        } catch (Exception b) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + b.getMessage());
        }
        
    }

    @PostMapping("/añadir")
    public ResponseEntity<?> addProducto (@RequestBody Producto producto) {
        return ResponseEntity.ok (productoSer.addProducto(producto));
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> deleteProducto (@PathVariable int id) {
        try {
            if (id <= 0) {
                throw new BadRequestException();
            }
            favSer.eliminarProductoDeTodosLosFavoritos(id);
            productoSer.deleteProducto(id);
            return ResponseEntity.ok(Map.of("message", "Producto eliminado correctamente"));

        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro el producto con id " + id);
        } catch (BadRequestException a) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El id no puede ser menor o igual que 0");
        } catch (Exception b) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + b.getMessage());
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizarProducto(@RequestBody Producto producto) {
        return ResponseEntity.ok (productoSer.addProducto(producto));
    }

    @GetMapping("")
    public ResponseEntity<?> getAll () {
        List<Producto> a = productoSer.getAllProdcutos();
        if (a == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No hay productos en la base de datos");
        }
        return ResponseEntity.ok(a);
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<?> getByCategoria (@PathVariable CategoriaProducto categoria) {
        List<Producto> a = productoSer.productosByCategoria(categoria);
        if (a == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No hay productos con esa categoria");
        }
        return ResponseEntity.ok(a);
    }

    @GetMapping("/marca/{marca}")
    public ResponseEntity<?> getByMarca (@PathVariable String marca) {
        List<Producto> a = productoSer.productosByMarca(marca);
        if (a == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No hay productos de esa marca");
        }
        return ResponseEntity.ok(a);
    }
}
