package com.tiago.evolution_app.service;

import com.tiago.evolution_app.model.Users;
import com.tiago.evolution_app.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserService userService;

    @Test
    public void createUserTest(){
        //Arrange
        Users user = new Users();
        user.setName("joao");
        user.setUsername("joao10");
        user.setEmail("joao@test.com");
        user.setPassword("12345");

        when(userRepository.save(user)).thenReturn(user);

        //Act
        Users createdUser = userService.createUser((user));

        //Assert
        assertEquals(user.getName(),createdUser.getName());
        assertEquals(user.getEmail(),createdUser.getEmail());
        assertEquals(user.getUsername(),createdUser.getUsername());
        assertEquals(user.getPassword(),createdUser.getPassword());
    }

    @Test
    public void createUserWithAlreadyInUseUsername(){
        //Arrange
        Users user = new Users();
        user.setName("joao");
        user.setUsername("joao10");
        user.setEmail("joao@test.com");
        user.setPassword("12345");

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);
        when(userRepository.existsByUsername(user.getUsername())).thenReturn(true);

        //Act and Assert
        RuntimeException exception = assertThrows(RuntimeException.class,(() -> userService.createUser(user)));
        assertEquals("Username already in use !", exception.getMessage());
    }

    @Test
    public void createUserWithSameEmail(){
        //Arrange
        Users user = new Users();
        user.setName("joao");
        user.setUsername("joao10");
        user.setEmail("joao@test.com");
        user.setPassword("12345");

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

        //Act and Assert
        RuntimeException exception = assertThrows(RuntimeException.class,(() -> userService.createUser(user)));
        assertEquals("Email already in use !", exception.getMessage());
    }

    @Test
    public void listAllCreatedUsers(){
        //Arrange
        Users user1 = new Users();
        user1.setName("joao");
        Users user2 = new Users();
        user2.setName("maria");
        Users user3 = new Users();
        user3.setName("marcos");

        List<Users> createdUsers = new ArrayList<>();
        createdUsers.add(user1);
        createdUsers.add(user2);
        createdUsers.add(user3);
        when(userRepository.findAll()).thenReturn(createdUsers);

        //Act
        List<Users> allUsers = userService.listAllUsers();

        //Assert
        assertEquals(allUsers.size(), createdUsers.size());
    }

    @Test
    public void updateUserInfo(){

    }

    @Test void testDeleteUser(){
        //Arrange
        Long userId = 1L;
        doNothing().when(userRepository).deleteById(userId);

        //Act
        userService.deleteUser(userId);

        //Assert
        verify(userRepository, times(1)).deleteById(userId);
    }
}