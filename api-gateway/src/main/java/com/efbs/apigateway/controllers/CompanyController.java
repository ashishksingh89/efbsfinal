package com.efbs.apigateway.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class CompanyController {
	
	@GetMapping("/api/user/hello")
	@PreAuthorize("hasRole('ROLE_COMPANY_ADMIN')")
	public String convertSpringDemo() {
		
		RestTemplate restTemplate=new RestTemplate();
		restTemplate.getForObject("http://localhost:8042/hello", CompanyController.class);
		System.err.println("inside company controller");
       String message= restTemplate.toString();
//		final ResponseEntity<String> response = new RestTemplate().getForEntity("http://localhost:8042/hello",CompanyController.class);

		return message;
	}
	
}
