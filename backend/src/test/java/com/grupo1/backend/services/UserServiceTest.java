package com.grupo1.backend.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import com.grupo1.backend.entities.User;
import com.grupo1.backend.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepo;

    @InjectMocks
    private UserService userService;

    @Test
    void testGetAllUsers() {
        List<User> users = List.of(new User(), new User());

        when(userRepo.findAll()).thenReturn(users);

        List<User> result = userService.getAllUsers();

        assertEquals(2, result.size());
    }

    @Test
    void testGetUserByEmailExists() throws NotFoundException {
        String email = "test@example.com";
        User user = new User();

        when(userRepo.existsByEmail(email)).thenReturn(true);
        when(userRepo.findByEmail(email)).thenReturn(user);

        User result = userService.getUserByEmail(email);

        assertEquals(user, result);
    }

    @Test
    void testGetUserByEmailNotFound() {
        String email = "missing@example.com";

        when(userRepo.existsByEmail(email)).thenReturn(false);

        assertThrows(NotFoundException.class, () -> userService.getUserByEmail(email));
    }

    @Test
    void testAddUser() {
        User user = new User();

        when(userRepo.save(user)).thenReturn(user);

        User result = userService.addUser(user);

        assertEquals(user, result);
    }

    @Test
    void testDeleteUserExists() throws NotFoundException {
        int id = 1;

        when(userRepo.existsById(id)).thenReturn(true);

        userService.deleteUser(id);

        verify(userRepo).deleteById(id);
    }

    @Test
    void testDeleteUserNotFound() {
        int id = 999;

        when(userRepo.existsById(id)).thenReturn(false);

        assertThrows(NotFoundException.class, () -> userService.deleteUser(id));
    }

    @Test
    void testGetByIdExists() throws NotFoundException {
        int id = 1;
        User user = new User();

        when(userRepo.existsById(id)).thenReturn(true);
        when(userRepo.findById(id)).thenReturn(Optional.of(user));

        User result = userService.getById(id);

        assertEquals(user, result);
    }

    @Test
    void testGetByIdNotFound() {
        int id = 2;

        when(userRepo.existsById(id)).thenReturn(false);

        assertThrows(NotFoundException.class, () -> userService.getById(id));
    }

    @Test
    void testExiste() {
        String email = "check@example.com";

        when(userRepo.existsByEmail(email)).thenReturn(true);

        assertTrue(userService.existe(email));

        when(userRepo.existsByEmail(email)).thenReturn(false);

        assertFalse(userService.existe(email));
    }
}
