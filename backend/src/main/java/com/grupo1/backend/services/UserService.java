package com.grupo1.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.grupo1.backend.entities.User;
import com.grupo1.backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User getUserByEmail(String email) throws NotFoundException {
        if (userRepo.existsByEmail(email)) {
            return userRepo.findByEmail(email);
        } else {
            throw new NotFoundException();
        }
        
    }

    public User addUser (User user) {
        return userRepo.save(user);
    }

    public void deleteUser (int id) throws NotFoundException{
        if (userRepo.existsById(id)) {
            userRepo.deleteById(id);
        } else {
            throw new NotFoundException();
        }
        
    }

    public User getById (int id) throws NotFoundException {
        if (userRepo.existsById(id)) {
            return userRepo.findById(id).get();        
        } else {
            throw new NotFoundException();
        }
    }

    public boolean existe (String email) {
        return userRepo.existsByEmail(email);
    }
}
