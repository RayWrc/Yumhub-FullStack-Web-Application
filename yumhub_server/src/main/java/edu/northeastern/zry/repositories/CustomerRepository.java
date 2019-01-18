package edu.northeastern.zry.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.zry.models.Customer;
import edu.northeastern.zry.models.User;

public interface CustomerRepository extends CrudRepository< Customer, Integer> {
	
	@Query("SELECT user FROM Customer user WHERE  user.username=:username")
	Optional <Customer> findUserByUsername(@Param("username") String username);
	@Query("SELECT u FROM Customer u WHERE u.username=:username AND u.password=:password")
	  Optional<Customer> findUserByCredentials(@Param("username") String username,
	                                       @Param("password") String password);

}
