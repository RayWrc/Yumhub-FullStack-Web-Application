package edu.northeastern.zry.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

import edu.northeastern.zry.models.Admin;


public interface AdminRepository extends CrudRepository<Admin, Integer> {


  @Query("SELECT user FROM Admin user WHERE  user.username=:username")
  Optional<Admin> findUserByUsername(@Param("username") String username);

  @Query("SELECT u FROM Admin u WHERE u.username=:username AND u.password=:password")
  Optional<Admin> findUserByCredentials(@Param("username") String username,
                                        @Param("password") String password);

}
