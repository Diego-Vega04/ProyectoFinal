package com.grupo1.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.grupo1.backend.entities.Favoritos;
import com.grupo1.backend.services.FavoritosService;
import com.grupo1.backend.services.UserService;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



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
    
}
