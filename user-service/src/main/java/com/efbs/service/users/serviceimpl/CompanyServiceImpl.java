package com.efbs.service.users.serviceimpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.efbs.service.users.dto.CompanyDTO;
import com.efbs.service.users.models.Company;
import com.efbs.service.users.repository.CompanyRepository;
import com.efbs.service.users.service.CompanyService;
import com.efbs.service.users.utils.ApplicationConstants;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CompanyServiceImpl implements CompanyService {

	private static final Logger LOGGER = LoggerFactory.getLogger(CompanyServiceImpl.class);

	@Autowired
	CompanyRepository companyRepository;

	@Override
	public List<CompanyDTO> findAllCompany() {
		LOGGER.info(ApplicationConstants.METHOD_ENTER_LABEL);
		//
		
				List<CompanyDTO> list= companyRepository.findAllCompany();
				return list;
	}


}
