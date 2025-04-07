package com.grupo1.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo1.backend.entities.Carrito;
import com.grupo1.backend.services.CarritoService;

import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<Carrito> addCarrito (@RequestBody Carrito carrito) {
        return ResponseEntity.ok(carritoSer.addCarrito(carrito));
    }
    
    @GetMapping("/user/{id_user}")
    public ResponseEntity<Carrito> getByUser(@PathVariable int id_user) {
        return ResponseEntity.ok(carritoSer.getByUser(id_user));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Carrito> getById (@PathVariable int id) {
        return ResponseEntity.ok(carritoSer.getById(id));
    }
    
}
