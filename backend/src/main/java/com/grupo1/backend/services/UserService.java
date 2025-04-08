package com.grupo1.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.grupo1.backend.entities.User;
import com.grupo1.backend.repositories.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Método para registrar un nuevo usuario
    public void registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Ese email ya está registrado");
        }

        // Encriptación de la contraseña
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        userRepository.save(user);

        System.out.println("Usuario registrado: " + user.getEmail());
    }

     // Método para verificar un usuario al hacer login
     public boolean loginUser(String email, String plainPassword) {
        User user = userRepository.findByEmail(email);

        if (user == null) return false;

        // Comporbacion si la contraseña ingresada coincide con la almacenada
        return passwordEncoder.matches(plainPassword, user.getPassword());
    }
}
