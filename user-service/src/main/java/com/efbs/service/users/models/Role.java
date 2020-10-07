package com.efbs.service.users.models;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer roleid;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private ERole rolename;

	public Integer getRoleid() {
		return roleid;
	}

	public void setRoleid(Integer roleid) {
		this.roleid = roleid;
	}

	public ERole getRolename() {
		return rolename;
	}

	public void setRolename(ERole rolename) {
		this.rolename = rolename;
	}

	public Role(Integer roleid, ERole rolename) {
		super();
		this.roleid = roleid;
		this.rolename = rolename;
	}

	public Role() {
		
	}

	@Override
	public String toString() {
		return "Role [roleid=" + roleid + ", rolename=" + rolename + "]";
	}

	
}