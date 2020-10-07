package com.efbs.service.users.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.efbs.service.users.models.ERole;
import com.efbs.service.users.models.Role;


@Repository
@Component
public interface RoleRepository extends JpaRepository<Role, Long> {
	
	Optional<Role> findByRolename(ERole rolename);
}
