package com.agromart.backend.service;

import com.agromart.backend.dto.UserDTO;
import com.agromart.backend.entity.User;
import com.agromart.backend.exception.ResourceNotFoundException;
import com.agromart.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return new UserDTO(user);
    }

    @Transactional(readOnly = true)
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return new UserDTO(user);
    }

    @Transactional
    public UserDTO updateProfile(String email, UserDTO profileData) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (profileData.getName() != null && !profileData.getName().isBlank()) {
            user.setName(profileData.getName().trim());
        }
        if (profileData.getPhone() != null) {
            user.setPhone(profileData.getPhone().trim());
        }
        if (profileData.getAddress() != null) {
            user.setAddress(profileData.getAddress().trim());
        }
        if (profileData.getCity() != null) {
            user.setCity(profileData.getCity().trim());
        }
        if (profileData.getState() != null) {
            user.setState(profileData.getState().trim());
        }
        if (profileData.getPincode() != null) {
            user.setPincode(profileData.getPincode().trim());
        }

        User updatedUser = userRepository.save(user);
        return new UserDTO(updatedUser);
    }

    @Transactional(readOnly = true)
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDTO toggleUserStatus(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setEnabled(!Boolean.TRUE.equals(user.getEnabled()));
        return new UserDTO(userRepository.save(user));
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
}
