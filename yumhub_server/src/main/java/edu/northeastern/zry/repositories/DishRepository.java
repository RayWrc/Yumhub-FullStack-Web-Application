package edu.northeastern.zry.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

import edu.northeastern.zry.models.Dish;


public interface DishRepository extends CrudRepository<Dish, Integer> {


  @Query("SELECT s FROM Dish s WHERE s.name=:name")
  Optional<Dish> findDishByName(@Param("name") String name);

}
