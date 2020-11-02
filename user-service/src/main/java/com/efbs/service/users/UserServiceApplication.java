package com.efbs.service.users;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import brave.sampler.Sampler;

@SpringBootApplication
@EnableDiscoveryClient
@RestController
public class UserServiceApplication{
	

	
	@RequestMapping(value = "/admin")
	public String echoStudentName(Principal principal) {
		
		 
		return "Hello  Admin!" ;
	}

	@GetMapping("/user")
	public String userInfo(Authentication authentication) {

//		String role = authentication.getAuthorities().stream()
//				.findAny().get().getAuthority();

		return "Your user name is: "  + " and your role is: " ;
	}
	@RequestMapping(value = "/guest")
	public String getStudentDetail() {
		
//		long id=getUserPrinciple().getUserprofileinfoid();
//		String email=getUserPrinciple().getEmail();
		return "Hello Guest!";
	}
	
	
	
	
	@RequestMapping("/hj")   
	 public String showResults(final HttpServletRequest request, Principal principal) {

	     final String currentUser = principal.getName();
              return currentUser;
	 }
	
	public static void main(String[] args) {
		SpringApplication.run(UserServiceApplication.class, args);
	}

	@Bean
	public Sampler defaultSampler(){
		return Sampler.ALWAYS_SAMPLE;
	}

}



