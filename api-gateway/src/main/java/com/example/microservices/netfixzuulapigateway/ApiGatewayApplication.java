package com.example.microservices.netfixzuulapigateway;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;

import brave.sampler.Sampler;

@EnableZuulProxy
@EnableDiscoveryClient
@SpringBootApplication
public class ApiGatewayApplication {

	private static final Logger LOG = Logger.getLogger(ApiGatewayApplication.class.getName());

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);

		System.err.println("Zuul API gatway server is calling");
		LOG.log(Level.INFO, "Zuul API gatway server is calling");
	}

	@Bean
	public Sampler defaultSampler() {
		return Sampler.ALWAYS_SAMPLE;
	}

}
