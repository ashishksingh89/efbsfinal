package com.efbs.user.service.controller;

import java.math.BigDecimal;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
//import org.springframework.cloud.config.environment.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api")
public class UserController {
	  private static final Logger LOG = Logger.getLogger(UserController.class.getName());

//	@Autowired
//	UserService userService;
	

	
	@GetMapping("/loginuser")
	public String getUserDetails() {
		System.err.println("throught userloginservice");
		return "User login successfully";
	}
	@GetMapping("/userregistration")
	public String saveUser() {
	

		return "User has been created successfully ";
	}
}
