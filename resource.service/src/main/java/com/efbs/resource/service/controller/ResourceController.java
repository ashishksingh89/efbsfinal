package com.efbs.resource.service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efbs.resource.service.client.UserServiceFeignClient;

@RestController
@RequestMapping("/api")
public class ResourceController {

	
	@Autowired
	UserServiceFeignClient userService;
	
	@GetMapping("/loginuser")
	public String getUserDetails() {
		System.err.println("throught feign resource");
		return userService.getUserDetails();
	}
}
