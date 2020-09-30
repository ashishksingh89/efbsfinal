package com.efbs.user.service.service;

import com.efbs.user.service.model.*;

import java.util.List;

public interface UserService {
    User saveUser(User user);

    User findByUsername(String username);

    List<User> findAllUsers();
}
