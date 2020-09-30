package com.efbs.resource.service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "user-service")
public interface UserServiceFeignClient {

	@GetMapping("/api/loginuser")
	public String getUserDetails();
}
