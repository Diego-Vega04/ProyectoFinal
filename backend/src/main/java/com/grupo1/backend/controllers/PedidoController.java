package com.grupo1.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo1.backend.entities.Pedido;
import com.grupo1.backend.services.PedidoService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<Pedido> addPedido (@RequestBody Pedido pedido) {
        return ResponseEntity.ok(pedidoSer.addPedido(pedido));
    }

    @GetMapping("/user/{id_user}")
    public ResponseEntity<List<Pedido>> getByUser(@PathVariable int id_user) {
        return ResponseEntity.ok(pedidoSer.getPedidosByUser(id_user));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Pedido> getById (@PathVariable int id) {
        return ResponseEntity.ok(pedidoSer.getById(id));
    }
}
