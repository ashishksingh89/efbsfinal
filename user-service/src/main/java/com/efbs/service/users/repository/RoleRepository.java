package com.efbs.service.users.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.efbs.service.users.models.ERole;
import com.efbs.service.users.models.Role;

import feign.Param;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	
	Optional<Role> findByRolename(ERole rolename);
	
	@Query(value = "select u.roleid,r.rolename  from userroles as u left join rolemaster as r on u.roleid = r.roleid \n"
			+ "where u.userProfileInfoId =:userProfileInfoId and u.companyId =:companyId and u.isActive = 1", nativeQuery = true)
	public List<Role> getRoleIdAndRoleName(@Param("userProfileInfoId") long userProfileInfoId,
			@Param("companyId") long companyId);
}
