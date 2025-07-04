package com.learningplatform.security;

import com.learningplatform.model.User;
import com.learningplatform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Custom UserDetailsService implementation for Spring Security
 * Handles user authentication and principal creation
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * Load user by username for authentication
     * Supports both username and email as login identifiers
     */
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        
        return UserPrincipal.create(user);
    }
    
    /**
     * Load user by ID (used for JWT token validation)
     */
    @Transactional
    public UserDetails loadUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
        
        return UserPrincipal.create(user);
    }
}
