package com.efbs.service.users.service;

import java.util.List;

import com.efbs.service.users.dto.CompanyDTO;

public interface CompanyService {

	/**
	 * The <code>CompanyService</code> interface responsible to communicate with database for User module.
	 *
	 * @author Ashish Kumar Singh
	 */

	public List<CompanyDTO> findAllCompany();
}
