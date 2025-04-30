package com.grupo1.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.grupo1.backend.entities.Comentario;
import com.grupo1.backend.repository.ComentarioRepository;
import com.grupo1.backend.repository.ProductoRepository;
import com.grupo1.backend.repository.UserRepository;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProductoRepository productoRepo;

    public List<Comentario> getComentariosByUser(int id_user) throws NotFoundException {
        if (userRepo.existsById(id_user)) {
            return comentarioRepo.findByUser(userRepo.findById(id_user).get());
        } else {
            throw new NotFoundException();
        }
        
    }

    public List<Comentario> getComentariosByProducto (int id_producto) throws NotFoundException {
        if (productoRepo.existsById(id_producto)) {
            return comentarioRepo.findByProducto(productoRepo.findById(id_producto).get());
        }  else {
            throw new NotFoundException();
        }
    }

    public Comentario addComentario(Comentario comentario) {
        return comentarioRepo.save(comentario);
    }

    public void deleteComentario(int id) throws NotFoundException {
        if (comentarioRepo.existsById(id)) {
            comentarioRepo.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }

    public Comentario getById (int id) throws NotFoundException {
        if (comentarioRepo.existsById(id)) {
            return comentarioRepo.findById(id).get();        
        } else {
            throw new NotFoundException();
        }
    }
}
