package com.efbs.user.service.controller;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efbs.user.service.jwt.JwtTokenProvider;
import com.efbs.user.service.model.Role;
import com.efbs.user.service.model.User;
import com.efbs.user.service.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
	private static final Logger LOG = Logger.getLogger(UserController.class.getName());

//	@Autowired
//	UserService userService;

//	@GetMapping("/loginuser")
//	public String getUserDetails() {
//		System.err.println("throught userloginservice");
//		return "User login successfully";
//	}
//
//	@GetMapping("/userregistration")
//	public String saveUser() {
//
//		return "User has been created successfully ";
//	}
	
	 @Autowired
	    private JwtTokenProvider jwtTokenProvider;

	    @Autowired
	    private UserService userService;

	    @PostMapping("/user/registration")
	    public ResponseEntity<?> register(@RequestBody User user){
	        if(userService.findByUsername(user.getUsername()) != null){
	            return new ResponseEntity<>(HttpStatus.CONFLICT);
	        }
	        user.setRole(Role.USER);
	        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
	    }
}
