/*
 * Copyright (c) QuadProSoft.
 *
 * This software is copyrighted. Under the copyright laws, this software may not be copied, in whole or in part, without prior written consent of QuadProSoft.
 * This software is provided under the terms of a license between QuadProSoft and the recipient, and its use is subject to the terms of that license.
 */
package com.efbs.service.users.validators;

import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.efbs.service.users.models.User;
import com.efbs.service.users.payload.request.LoginRequest;
import com.efbs.service.users.utils.ApplicationConstants;
import com.efbs.service.users.utils.ApplicationRegExConstants;


/**
 * The <code>UserLoginValidator</code> class is responsible for validate
 * userlogin.
 *
 * @author Ashish Kumar Singh
 *
 */
@Component
public class LoginRequestValidator extends BaseValidator implements Validator {

	private static final Logger LOGGER = LoggerFactory.getLogger(LoginRequestValidator.class);

	private static final String EMAIL = "email";
	private static final String PASSWORD = "password";

	@Override
	public void validate(Object target, Errors errors) {
		LOGGER.info(ApplicationConstants.METHOD_CALLED_LABEL);

		final LoginRequest loginRequest = (LoginRequest) target;
		final Pattern patternForEmail = Pattern.compile(ApplicationRegExConstants.EMAIL_REGEX);
		final Pattern patternForPassword = Pattern.compile(ApplicationRegExConstants.PASSWORD_REGEX);

		// Step 1 Set the errors object in parent
		setErrors(errors);

		// Step 2 Validate Not Empty and Not Null Values
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, EMAIL, NOTEMPTY);
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, PASSWORD, NOTEMPTY);

		// Step 3 If no error found then validate length and other errors
		if (!errors.hasErrors()) {

			validateMaxLength(EMAIL, loginRequest.getEmail().length(), 60);

			validateAgainstPattern(patternForEmail, loginRequest.getEmail(), EMAIL);
			validateAgainstPattern(patternForPassword, loginRequest.getPassword(), PASSWORD);

		}
		LOGGER.info(ApplicationConstants.METHOD_EXIT_LABEL);

	}

	@Override
	public boolean supports(Class<?> clazz) {
		// TODO Auto-generated method stub
		return false;
	}

}
