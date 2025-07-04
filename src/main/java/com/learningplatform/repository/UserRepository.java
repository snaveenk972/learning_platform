package com.learningplatform.repository;

import com.learningplatform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for User entity with custom query methods
 * Provides data access operations for user management and authentication
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find user by username for authentication
     */
    Optional<User> findByUsername(String username);
    
    /**
     * Find user by email for validation and lookup
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Check if username already exists
     */
    Boolean existsByUsername(String username);
    
    /**
     * Check if email already exists
     */
    Boolean existsByEmail(String email);
    
    /**
     * Find user by username or email for flexible login
     */
    @Query("SELECT u FROM User u WHERE u.username = :identifier OR u.email = :identifier")
    Optional<User> findByUsernameOrEmail(@Param("identifier") String identifier);
    
    /**
     * Find user by phone number
     */
    Optional<User> findByPhoneNumber(String phoneNumber);
}
