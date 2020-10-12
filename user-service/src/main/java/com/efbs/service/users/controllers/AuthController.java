package com.efbs.service.users.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efbs.service.users.models.AppResponse;
import com.efbs.service.users.payload.request.LoginRequest;
import com.efbs.service.users.payload.response.JwtResponse;
import com.efbs.service.users.repository.UserRepository;
import com.efbs.service.users.security.jwt.JwtUtils;
import com.efbs.service.users.security.services.UserDetailsImpl;
import com.efbs.service.users.utils.ApplicationConstants;
import com.efbs.service.users.utils.ApplicationURIConstants;
import com.efbs.service.users.validators.LoginRequestValidator;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(ApplicationURIConstants.BASE_API)
public class AuthController extends BaseController {

	private final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);


	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	LoginRequestValidator userLoginValidator;

	@Autowired
	UserRepository userRepository;

	@Autowired
	JwtUtils jwtUtils;

	
	@PostMapping(ApplicationURIConstants.USER_AUTHENTICATION)
	public AppResponse<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,final BindingResult bindingResult) {

		System.err.println(loginRequest.toString());

		LOGGER.info(ApplicationConstants.METHOD_CALLED_LABEL);
		final Set<String> errorSet = new HashSet<>();
		final AppResponse<JwtResponse> response = new AppResponse<>();

		try {
			userLoginValidator.validate(loginRequest, bindingResult);
			if (bindingResult.hasErrors()) {
				bindingResult.getFieldErrors().forEach(er -> {
					errorSet.add(getMessage(er.getCodes()[0]));
				});
				response.setErrors(errorSet);
				response.setStatus(HttpStatus.BAD_REQUEST.value());
				return response;
			}
			if (userRepository.isUserActive(loginRequest.getEmail())>0) {
				Authentication authentication = authenticationManager.authenticate(
						new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

				SecurityContextHolder.getContext().setAuthentication(authentication);
				String jwt = jwtUtils.generateJwtToken(authentication);

				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
				List<String> roles = userDetails.getAuthorities().stream()
						.map(item -> item.getAuthority())
						.collect(Collectors.toList());


				final JwtResponse jwtResponse = new JwtResponse(jwt, userDetails.getUserprofileinfoid(),
						userDetails.getUsername(),userDetails.getCompanyid(), userDetails.getEmail(), roles);

				response.setStatus(HttpStatus.OK.value());
				response.setMessage(ApplicationConstants.SUCCESS_LABEL);
				response.setData(jwtResponse);		
			}
			else {
				errorSet.add(ApplicationConstants.INACTIVE_USER);
				response.setErrors(errorSet);
				response.setStatus(HttpStatus.BAD_REQUEST.value());
				response.setMessage(ApplicationConstants.INACTIVE_USER);
			}

		} catch (final Exception exception) {
			response.setStatus(HttpStatus.BAD_REQUEST.value());
			response.addError(ApplicationConstants.INVALID_CREDENTIALS);
			response.setMessage(ApplicationConstants.ERROR_LABEL);

			LOGGER.error(ApplicationConstants.METHOD_EXCEPTION_LABEL + exception);
		}

		LOGGER.info(ApplicationConstants.METHOD_EXIT_LABEL);
		return response;


	}

}
