package com.grupo1.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.grupo1.backend.entities.Pedido;
import com.grupo1.backend.repository.PedidoRepository;
import com.grupo1.backend.repository.UserRepository;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepo;

    @Autowired
    private UserRepository userRepo;

    public Pedido addPedido (Pedido pedido) {
        return pedidoRepo.save(pedido);
    }

    public List<Pedido> getPedidosByUser(int id_user) throws NotFoundException {
        if (userRepo.existsById(id_user)) {
            return pedidoRepo.findByUser(userRepo.findById(id_user).get());
        } else {
            throw new NotFoundException();
        }
        
    }

    public Pedido getById (int id) throws NotFoundException {
        if (pedidoRepo.existsById(id)) {
            return pedidoRepo.findById(id).get();
        } else {
            throw new NotFoundException();
        }
        
    }
}
