package com.grupo1.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo1.backend.entities.Comentario;
import com.grupo1.backend.services.ComentarioService;

import java.util.HashMap;
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

@RestController
@RequestMapping("/api/comentarios")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioSer;

    @PostMapping("/añadir")
    public ResponseEntity<Comentario> addComentario(@RequestBody Comentario comentario) {
        return ResponseEntity.ok(comentarioSer.addComentario(comentario));
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> deleteComentario(@PathVariable int id) {
        try {
            System.out.println("Eliminando comentario con id: " + id);
            comentarioSer.deleteComentario(id);
        } catch (NotFoundException e) {
            e.printStackTrace();
        }
        Map<String, String> respuesta = new HashMap<>();
        respuesta.put("mensaje", "Comentario borrado con éxito");
        respuesta.put("mensaje", "Comentario borrado con éxito");
        return ResponseEntity.ok(respuesta);

    }

    @PutMapping("/actualizar")
    public ResponseEntity<Comentario> actualizarComentario(@RequestBody Comentario comentario) {
        return ResponseEntity.ok(comentarioSer.addComentario(comentario));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Comentario> getById(@PathVariable int id) throws NotFoundException {
        return ResponseEntity.ok(comentarioSer.getById(id));
    }

    @GetMapping("/user/{id_user}")
    public ResponseEntity<?> getByUser(@PathVariable int id_user) {
        try {
            if (id_user <= 0) {
                throw new BadRequestException();
            }

            List<Comentario> a = comentarioSer.getComentariosByUser(id_user);
            if (a == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No hay comentarios hechos por el usuario");
            }

            return ResponseEntity.ok(a);
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("El id del usuario no puede ser menor o igual que 0");
        } catch (NotFoundException z) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No existe usuario con id " + id_user);
        }
    }

    @GetMapping("/producto/{id_producto}")
    public ResponseEntity<?> getByProducto(@PathVariable int id_producto) {
        try {
            if (id_producto <= 0) {
                throw new BadRequestException();
            }

            List<Comentario> a = comentarioSer.getComentariosByProducto(id_producto);
            if (a == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No hay comentarios aun.");
            }

            return ResponseEntity.ok(a);
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("El id del producto no puede ser menor o igual que 0");
        } catch (NotFoundException z) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No existe producto con id " + id_producto);
        }

    }
}
