package com.grupo1.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.grupo1.backend.entities.Carrito;
import com.grupo1.backend.repository.CarritoRepository;
import com.grupo1.backend.repository.UserRepository;

@Service
public class CarritoService {

    @Autowired
    private CarritoRepository carritoRepo;

    @Autowired
    private UserRepository userRepo;

    public Carrito addCarrito(Carrito carrito) {
        return carritoRepo.save(carrito);
    }

    public Carrito getByUser(int id_user) throws NotFoundException {
        if (userRepo.existsById(id_user)) {
            return carritoRepo.findByUser(userRepo.findById(id_user).get());
        } else {
            throw new NotFoundException();
        }
    }

    public Optional<Carrito> getById(int id) {
        return carritoRepo.findById(id);

    }

    public boolean vaciarCarrito(int id){
        Optional<Carrito> carritoOpt = carritoRepo.findById(id);
        
        if (carritoOpt.isPresent()) {
            Carrito carrito = carritoOpt.get();
            carrito.getProductos().clear(); 
            carritoRepo.save(carrito);
            return true;
        }
        return false;
    }
}
