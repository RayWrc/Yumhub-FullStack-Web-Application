package edu.northeastern.zry.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

import edu.northeastern.zry.models.Deliverer;


public interface DelivererRepository extends CrudRepository<Deliverer, Integer> {

  @Query("SELECT s FROM Deliverer s WHERE s.username=:username")
  Optional<Deliverer> findDelivererByUsername(@Param("username") String username);

  @Query("SELECT u FROM Deliverer u WHERE u.username=:username AND u.password=:password")
  Optional<Deliverer> findDelivererByCredentials(@Param("username") String username,
                                                 @Param("password") String password);

}
