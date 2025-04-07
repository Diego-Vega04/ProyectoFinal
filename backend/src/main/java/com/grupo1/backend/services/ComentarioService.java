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

    public List<Comentario> getComentariosByUser(int id_user) {
        return comentarioRepo.findByUser(userRepo.findById(id_user).get());
    }

    public List<Comentario> getComentariosByProducto (int id_producto) {
        return comentarioRepo.findByProducto(productoRepo.findById(id_producto).get());
    }

    public Comentario addComentario(Comentario comentario) {
        return comentarioRepo.save(comentario);
    }

    public void deleteComentario(int id) throws NotFoundException {
        comentarioRepo.deleteById(id);
    }

    public Comentario getById (int id) throws NotFoundException {
        return comentarioRepo.findById(id).get();
    }
}
