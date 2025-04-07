package com.grupo1.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo1.backend.entities.Comentario;
import com.grupo1.backend.services.ComentarioService;

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


@RestController
@RequestMapping("/api/comentarios")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioSer;

    @PostMapping("/añadir")
    public ResponseEntity<Comentario> addComentario (@RequestBody Comentario comentario) {
        return ResponseEntity.ok (comentarioSer.addComentario(comentario));
    }

    @DeleteMapping("/borrar/{id}")
    public void deleteComentario (@PathVariable int id) throws NotFoundException {
        comentarioSer.deleteComentario(id);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Comentario> actualizarComentario(@RequestBody Comentario comentario) {
        return ResponseEntity.ok (comentarioSer.addComentario(comentario));
    }
    
    @GetMapping("/id/{id}")
    public ResponseEntity<Comentario> getById (@PathVariable int id) throws NotFoundException {
        return ResponseEntity.ok(comentarioSer.getById(id));
    }

    @GetMapping("/user/{id_user}")
    public ResponseEntity<List<Comentario>> getByUser(@PathVariable int id_user) {
        return ResponseEntity.ok(comentarioSer.getComentariosByUser(id_user));
    }

    @GetMapping("/producto/{id_producto}")
    public ResponseEntity<List<Comentario>> getByProducto (@PathVariable int id_producto) {
        return ResponseEntity.ok(comentarioSer.getComentariosByProducto(id_producto));
    }
}
