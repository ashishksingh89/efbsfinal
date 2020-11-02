//package com.efbs.service.users.controllers;
//
//import java.util.ArrayList;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Set;
//
//import javax.validation.Valid;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.efbs.apigateway.controllers.BaseController;
//import com.efbs.service.users.models.AppResponse;
//import com.efbs.service.users.models.ERole;
//import com.efbs.service.users.models.Role;
//import com.efbs.service.users.models.User;
//import com.efbs.service.users.models.UserRole;
//import com.efbs.service.users.payload.response.MessageResponse;
//import com.efbs.service.users.repository.RoleRepository;
//import com.efbs.service.users.repository.UserRepository;
//import com.efbs.service.users.repository.UserRolesRepository;
//import com.efbs.service.users.utils.ApplicationAuthorityConstants;
//import com.efbs.service.users.utils.ApplicationConstants;
//import com.efbs.service.users.utils.ApplicationURIConstants;
//import com.efbs.service.users.validators.AddUserValidator;
//
//@CrossOrigin(origins = "*", maxAge = 3600)
//@RestController
//@RequestMapping(ApplicationURIConstants.BASE_API)
//public class UserController extends BaseController{
//
//
//	private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
//
//
//	@Autowired
//	public AddUserValidator addUserValidator;
//
//	MessageResponse messageResponse;
//
//	@Autowired
//	UserRepository userRepository;
//
//	@Autowired
//	RoleRepository roleRepository;
//
//	@Autowired
//	PasswordEncoder encoder;
//
//	@Autowired
//	UserRolesRepository userRolesRepository;
//	
//	@PostMapping(ApplicationURIConstants.ADD_USER_BY_SYSTEM_ADMIN)
//	public AppResponse<Long> registerUserOrEmployee(@Valid @RequestBody User userDetails,final BindingResult bindingResult) {
//
//
//		final AppResponse<Long> response = new AppResponse<>();
//		LOGGER.info(ApplicationConstants.METHOD_CALLED_LABEL);
//		boolean flag = false;
//
//		final Set<String> errorSet = new HashSet<>();
//		try {
//
//			addUserValidator.validate(userDetails, bindingResult);
//			if (bindingResult.hasErrors()) {
//				bindingResult.getFieldErrors().forEach(er -> {
//					errorSet.add(getMessage(er.getCodes()[0]));
//				});
//				response.setErrors(errorSet);
//				response.setStatus(HttpStatus.BAD_REQUEST.value());
//				return response;
//			}
//
//			if (userRepository.existsByEmail(userDetails.getEmail())) {
//				flag=true;
//			}
//
//			if(!flag) {
//				// Creating new user's account
//				if(userDetails.getMiddlename() == null || userDetails.getMiddlename().isEmpty() )
//				{
//					userDetails.setMiddlename("");
//				}
//				userDetails.setPassword(encoder.encode(userDetails.getPassword()));
//				userDetails.setCreatedby(getUserPrinciple().getUserprofileinfoid());
//				userDetails.setStatus(true);
////				System.err.println(getUserPrinciple().getAuthorities().iterator());
//				Set<String> strRoles = userDetails.getRole();
//				List<Role> roles = new ArrayList<>();
//
//				if (strRoles == null) {
//					Role userRole = roleRepository.findByRolename(ERole.ROLE_EMPLOYEE)
//							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//					roles.add(userRole);
//				} else {                    
//					strRoles.forEach(role -> {
//						switch (role) {
//						case "COMPANY ADMIN":
//							Role comRole = roleRepository.findByRolename(ERole.ROLE_COMPANY_ADMIN)
//							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//							roles.add(comRole);
//
//							break;
//						case "COMPANY HR":
//							Role hrRole = roleRepository.findByRolename(ERole.ROLE_COMPANY_HR)
//							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//							roles.add(hrRole);
//
//							break;	
//						default:
//							Role userRole =roleRepository.findByRolename(ERole.ROLE_EMPLOYEE)
//							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//							roles.add(userRole);
//
//						}
//					});
//				}
//
//
//				User user=	userRepository.save(userDetails);
//
//				if(user !=null && user.getUserprofileinfoid()>0) {
//					UserRole userRoleObject=new UserRole();
//					for (Role userRole : roles) {
//						userRoleObject.setUserProfileInfoId(user.getUserprofileinfoid());
//						userRoleObject.setCompanyId(user.getCompanyid());
//						userRoleObject.setRoleId(userRole.getRoleid());
//						userRoleObject.setIsActive(true);
//						userRolesRepository.save(userRoleObject);
//					}
//
//					response.setStatus(HttpStatus.OK.value());
//					response.setMessage(ApplicationConstants.USER_ADD_SUCCESS);
//				}
//				else {
//					errorSet.add(ApplicationConstants.USERPROFILE_INFO_ID_NOT_FOUND);
//					response.setErrors(errorSet);
//					response.setStatus(HttpStatus.BAD_REQUEST.value());
//					response.setMessage(ApplicationConstants.USERPROFILE_INFO_ID_NOT_FOUND);
//
//				}
//			}
//
//			else {
//				errorSet.add(ApplicationConstants.USER_EMAIL_EXIST);
//				response.setErrors(errorSet);
//				response.setStatus(HttpStatus.BAD_REQUEST.value());
//				response.setMessage(ApplicationConstants.USER_EMAIL_EXIST);
//			}
//
//		} catch (final Exception exception) {
//			response.setStatus(HttpStatus.BAD_REQUEST.value());
//			response.setMessage(ApplicationConstants.ERROR_LABEL);
//			response.addError("Please verify the request format. It contains invalid value for one of the field.");
//			LOGGER.info(ApplicationConstants.METHOD_EXCEPTION_LABEL + exception);
//		}
//		LOGGER.info(ApplicationConstants.METHOD_EXIT_LABEL);
//		return response;
//
//	}
//}
