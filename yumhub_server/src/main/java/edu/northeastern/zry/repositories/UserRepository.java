package edu.northeastern.zry.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

import edu.northeastern.zry.models.User;

public interface UserRepository extends CrudRepository<User, Integer> {

  @Query("SELECT s FROM User s WHERE s.username=:username")
  Optional<User> findUserByUsername(@Param("username") String username);

  @Query("SELECT u FROM User u WHERE u.username=:username AND u.password=:password")
  Optional<User> findUserByCredentials(@Param("username") String username,
                                       @Param("password") String password);
}
	
