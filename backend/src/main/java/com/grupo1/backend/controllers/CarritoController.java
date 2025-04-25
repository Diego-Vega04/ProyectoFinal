package com.grupo1.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo1.backend.entities.Carrito;
import com.grupo1.backend.entities.enums.Rol;
import com.grupo1.backend.services.CarritoService;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/carritos")
public class CarritoController {
    
    @Autowired
    private CarritoService carritoSer;

    @PutMapping("/actualizar")
    public ResponseEntity<Carrito> actualizarCarrito (@RequestBody Carrito carrito) {
        return ResponseEntity.ok (carritoSer.addCarrito(carrito));
    }

    @PostMapping("/añadir")
    public ResponseEntity<?> addCarrito (@RequestBody Carrito carrito) {
        try {
            if (carrito == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El carrito puede estar vacio pero no puede ser nulo");
            }
    
            if (carrito.getUser().getRol() == Rol.ADMIN) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Un usuario admin no puede tener un carrito");
            } else {
                return ResponseEntity.ok(carritoSer.addCarrito(carrito));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en la base de datos");
        }
    }
    
    @GetMapping("/user/{id_user}")
    public ResponseEntity<?> getByUser(@PathVariable int id_user) {
        try {
            if (id_user <= 0) {
                throw new BadRequestException();
            }

            return ResponseEntity.ok(carritoSer.getByUser(id_user));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No existe un usuario con id " + id_user);
        } catch (BadRequestException c) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El id de usuario no puede ser menor o igual que 0");
        }
        
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getById (@PathVariable int id) {
        try {
            if (id <= 0) {
                throw new BadRequestException();
            }
            
            return ResponseEntity.ok(carritoSer.getById(id));        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No existe un carrito con id " + id);
        } catch (BadRequestException c) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El id del carrito no puede ser menor o igual que 0");
        }
        
    }
    
}
