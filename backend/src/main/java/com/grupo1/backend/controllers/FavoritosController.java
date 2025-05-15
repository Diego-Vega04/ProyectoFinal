package com.grupo1.backend.controllers;

import java.util.Optional;

import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.grupo1.backend.entities.Favoritos;
import com.grupo1.backend.entities.Favoritos;
import com.grupo1.backend.entities.Producto;
import com.grupo1.backend.services.FavoritosService;
import com.grupo1.backend.services.UserService;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;



@Controller
@RequestMapping("/api/favoritos")
public class FavoritosController {

    private final FavoritosService favSer;
    private final UserService userSer;

    public FavoritosController (FavoritosService favSer, UserService userSer) {
        this.favSer = favSer;
        this.userSer = userSer;
    }

    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizar (@RequestBody Favoritos entity) {
        try {
            if (entity == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La lista de favoritos puede estar vacia pero no puede ser null");
            }

            return ResponseEntity.ok(favSer.addFavoritos(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en la base de datos");
        }
    }

    @GetMapping("/user/{id_user}")
    public ResponseEntity<?> verByUser (@PathVariable Integer id_user) {
        try {
            if (id_user == null || id_user == 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El id de usuario no puede ser 0 o nulo");
            }

            if (userSer.getById(id_user) == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado un usuario con el id especificado");
            } else {
                return ResponseEntity.ok(favSer.getByUser(userSer.getById(id_user)));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en la base de datos");
        }
    }

    @PostMapping("/{idFavoritos}/productos")
    public ResponseEntity<?> addProductos(@PathVariable int idFavoritos, @RequestBody Producto producto) {
        Optional<Favoritos> FavoritosOpt = favSer.getById(idFavoritos);
        if (FavoritosOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Favoritos Favoritos = FavoritosOpt.get();
        Favoritos.getProductos().add(producto);
        Favoritos FavoritosActualizado = favSer.addFavoritos(Favoritos);

        return ResponseEntity.ok(FavoritosActualizado);
    }
 
    @GetMapping("/id/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        try {
            if (id <= 0) {
                throw new BadRequestException();
            }
            return ResponseEntity.ok(favSer.getById(id));

        } catch (BadRequestException c) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("El id de favoritos no puede ser menor o igual que 0");
        }

    }
}
