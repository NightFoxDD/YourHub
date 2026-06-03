package com.yourhub.backend.controller;

import com.yourhub.backend.model.User;
import com.yourhub.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") 
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.yourhub.backend.security.JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if(user.getName() == null || user.getName().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Name is required!");
        }
        if(user.getEmail() == null || user.getEmail().isEmpty() || !user.getEmail().contains("@") || !user.getEmail().contains(".")) {
            return ResponseEntity.badRequest().body("Error: Invalid email address!");
        }
        if(user.getPassword() == null || user.getPassword().isEmpty() || user.getPassword().length() < 8) {
            return ResponseEntity.badRequest().body("Error: Password is required and must be at least 8 characters long!");
        }
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
        if(user.getUsername() == null || user.getUsername().isEmpty() || user.getUsername().length() < 3) {
            return ResponseEntity.badRequest().body("Error: Username is too short!");
        }

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        return userRepository.findByUsername(loginRequest.getUsername())
                .filter(user -> user.getPassword().equals(loginRequest.getPassword()))
                .map(user -> {
                    String token = jwtUtils.generateJwtToken(user.getUsername());
                    java.util.Map<String, String> response = new java.util.HashMap<>();
                    response.put("token", token);
                    response.put("username", user.getUsername());
                    return ResponseEntity.ok(response); // hashowanie tokenu w lokal storage
                })
                .orElse(ResponseEntity.badRequest().body("Error: Invalid username or password!"));
    }
    @PostMapping("/checkToken")
    public ResponseEntity<?> getCurrentUser(@RequestHeader(value="Authorization", required = false) String tokenHeader) {
        if(tokenHeader == null || !tokenHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Error: Invalid token!");
        }
        String token = tokenHeader.substring(7);
        if(!jwtUtils.validateJwtToken(token)){
            return ResponseEntity.badRequest().body("Error: invalid token!");
        }
        String username = jwtUtils.getUserNameFromJwtToken(token);
        return userRepository.findByUsername(username)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.badRequest().body("Error: User not found!"));
    }
    
    @PostMapping("/logOut")
    public ResponseEntity<?> logOutUser() {
        return ResponseEntity.ok("Logout successful!");
    }
}
