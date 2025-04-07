package com.grupo1.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo1.backend.entities.User;
import com.grupo1.backend.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
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

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getByEmail (@PathVariable String email) {
        return ResponseEntity.ok(userSer.getUserByEmail(email));
    }

    @PostMapping("/añadir")
    public ResponseEntity<User> addUser (@RequestBody User user) {
        return ResponseEntity.ok (userSer.addUser(user));
    }

    @DeleteMapping("/borrar/{id}")
    public void deleteUser (@PathVariable int id) throws NotFoundException {
        userSer.deleteUser(id);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<User> actualizarUser(@RequestBody User user) {
        return ResponseEntity.ok (userSer.addUser(user));
    }
    
    @GetMapping("/id/{id}")
    public ResponseEntity<User> getById (@PathVariable int id) throws NotFoundException {
        return ResponseEntity.ok(userSer.getById(id));
    }
}
