package com.efbs.service.users.controllers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efbs.service.users.models.ERole;
import com.efbs.service.users.models.Role;
import com.efbs.service.users.models.User;
import com.efbs.service.users.payload.request.SignupRequest;
import com.efbs.service.users.payload.response.MessageResponse;
import com.efbs.service.users.repository.RoleRepository;
import com.efbs.service.users.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class UserController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}



	@PostMapping("/signup")
	@PreAuthorize("hasRole('ROLE_SYSTEM_ADMIN')")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		//		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
		//			return ResponseEntity
		//					.badRequest()
		//					.body(new MessageResponse("Error: Username is already taken!"));
		//		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), 
				signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()));

		List<String> strRoles = signUpRequest.getRole();
		List<Role> roles = new ArrayList<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByRolename(ERole.ROLE_EMPLOYEE)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "SYSTEM ADMIN":
					Role adminRole = roleRepository.findByRolename(ERole.ROLE_SYSTEM_ADMIN)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "COMPANY ADMIN":
					Role comRole = roleRepository.findByRolename(ERole.ROLE_COMPANY_ADMIN)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(comRole);


					break;
				case "HR ADMIN":
					Role hrRole = roleRepository.findByRolename(ERole.ROLE_COMPANY_HR)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(hrRole);

					break;
				default:
					Role userRole = roleRepository.findByRolename(ERole.ROLE_EMPLOYEE)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}
