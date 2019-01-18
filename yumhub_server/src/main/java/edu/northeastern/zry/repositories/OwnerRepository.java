package edu.northeastern.zry.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


import edu.northeastern.zry.models.Owner;

public interface OwnerRepository extends CrudRepository <Owner, Integer> {
	
	@Query("SELECT user FROM Owner user WHERE  user.username=:username")
	Optional <Owner> findUserByUsername(@Param("username") String username);
	@Query("SELECT u FROM Owner u WHERE u.username=:username AND u.password=:password")
	  Optional<Owner> findUserByCredentials(@Param("username") String username,
	                                       @Param("password") String password);

}
