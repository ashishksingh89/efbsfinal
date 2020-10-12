package com.efbs.service.users.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.efbs.service.users.dto.CompanyDTO;
import com.efbs.service.users.models.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {

	@Query(value = "select new com.efbs.service.users.dto.CompanyDTO(cominfo.companyid,cominfo.companyname,cominfo.companyaddress,cominfo.companywebsite,cominfo.companysize,cominfo.createdby,cominfo.createdatetime) from Company as cominfo")
	List<CompanyDTO> findAllCompany();
}
