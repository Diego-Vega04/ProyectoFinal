package com.grupo1.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo1.backend.entities.Carrito;
import com.grupo1.backend.entities.Favoritos;
import com.grupo1.backend.entities.User;
import com.grupo1.backend.entities.enums.Rol;
import com.grupo1.backend.services.CarritoService;
import com.grupo1.backend.services.FavoritosService;
import com.grupo1.backend.services.UserService;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userSer;

    @Autowired
    private FavoritosService favSer;

    @Autowired
    private CarritoService carritoSer;

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getByEmail (@PathVariable String email) {
        try {
            return ResponseEntity.ok(userSer.getUserByEmail(email));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro un usuario con email " + email);
        }
    }

    @PostMapping("/añadir")
    public ResponseEntity<?> addUser (@RequestBody User user) throws NotFoundException {
        if (!userSer.existe(user.getEmail())) {
            //al crear un objeto usuario se crean automaticamente los objetos de carrito y favoritos vacios
            
            if (user.getRol() == Rol.USER) {
                Carrito b = new Carrito();
                user.setCarrito(b);
            }

            Favoritos a = new Favoritos();
            user.setFavoritos(a);

            return ResponseEntity.ok (userSer.addUser(user));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ya existe un usuario con email: " + user.getEmail());
        }
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> deleteUser (@PathVariable int id) throws NotFoundException {
        try {
            if (id <= 0) {
                throw new BadRequestException();
            }

            userSer.deleteUser(id);
            return ResponseEntity.ok("Usuario eliminado correctamente");

        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro un usuario con id " + id);
        } catch (BadRequestException v) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El id no puede ser menor o igual que cero");
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<User> actualizarUser(@RequestBody User user) {
        return ResponseEntity.ok (userSer.addUser(user));
    }
    
    @GetMapping("/id/{id}")
    public ResponseEntity<?> getById (@PathVariable int id) {
        try {
            if (id <= 0) {
                throw new BadRequestException();
            }

            User a = userSer.getById(id);
            return ResponseEntity.ok(a);

        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro un usuario con id " + id);
        } catch (BadRequestException v) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El id no puede ser menor o igual que cero");
        }
       
    }
}

