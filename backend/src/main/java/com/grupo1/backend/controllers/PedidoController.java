package com.grupo1.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo1.backend.entities.Pedido;
import com.grupo1.backend.services.PedidoService;

import java.util.List;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoSer;

    @PostMapping("/añadir")
    public ResponseEntity<Pedido> addPedido(@RequestBody Pedido pedido) {
        System.out.println("Pedido recibido: " + pedido);
        System.out.println("User dentro del pedido: " + pedido.getUser());
        System.out.println("ID del user: " + (pedido.getUser() != null ? pedido.getUser().getId() : "NULL"));
        return pedidoSer.addPedido(pedido);
    }

    @GetMapping("/user/{id_user}")
    public ResponseEntity<?> getByUser(@PathVariable int id_user) {
        try {
            if (id_user <= 0) {
                throw new BadRequestException();
            }

            List<Pedido> a = pedidoSer.getPedidosByUser(id_user);

            if (a == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se han encontrado pedidos hechos por el usuario");
            }
            return ResponseEntity.ok(a);

        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No existe un usuario con id " + id_user);
        } catch (BadRequestException a) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("El id de usuario no puede ser menor o igual que 0");
        }

    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        try {
            if (id <= 0) {
                throw new BadRequestException();
            }

            return ResponseEntity.ok(pedidoSer.getById(id));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("El id del pedido no puede ser menor o igual a 0");
        } catch (NotFoundException c) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado un pedido con el id " + id);
        }

    }
}
