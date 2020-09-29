package com.efbs.user.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import brave.sampler.Sampler;

@SpringBootApplication
//@EnableFeignClients("com.efbs.user.service")
@EnableDiscoveryClient
public class UserLoginServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserLoginServiceApplication.class, args);
	}
	
	 @Bean
	  public Sampler defaultSampler(){
	    return Sampler.ALWAYS_SAMPLE;
	  }
	
}
