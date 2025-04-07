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

    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public User addUser (User user) {
        return userRepo.save(user);
    }

    public void deleteUser (int id) throws NotFoundException{
        userRepo.deleteById(id);
    }

    public User getById (int id) throws NotFoundException {
        return userRepo.findById(id).get();
    }
}
