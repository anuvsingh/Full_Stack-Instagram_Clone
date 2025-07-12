package com.insta.instagram.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.insta.instagram.config.SecurityContext;
import com.insta.instagram.exceptions.UserException;
import com.insta.instagram.modal.User;
import com.insta.instagram.repository.UserRepository;
import com.insta.instagram.service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthController {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping("/signup")
	public ResponseEntity<User> registerUserHandler(@RequestBody User user) throws UserException {

		User createdUser = userService.registerUser(user);

		return new ResponseEntity<User>(createdUser, HttpStatus.OK);
	}

	@PostMapping("/signin")
	public ResponseEntity<Map<String, String>> signinHandler(@RequestBody Map<String, String> credentials) {
		try {
			String email = credentials.get("email");
			String password = credentials.get("password");

			Optional<User> opt = userRepo.findByEmail(email);

			if (opt.isEmpty()) {
				throw new BadCredentialsException("Invalid username or password");
			}

			User user = opt.get();

			// Verify password
			if (!passwordEncoder.matches(password, user.getPassword())) {
				throw new BadCredentialsException("Invalid username or password");
			}

			// Generate JWT token
			SecretKey key = Keys.hmacShaKeyFor(SecurityContext.JWT_KEY.getBytes());
			String token = Jwts.builder().setSubject(user.getEmail()).claim("username", user.getUsername())
					.signWith(key).compact();

			Map<String, String> response = new HashMap<>();
			response.put("token", token);
			response.put("username", user.getUsername());

			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (BadCredentialsException e) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
		}
	}
}
