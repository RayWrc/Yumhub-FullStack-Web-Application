package edu.northeastern.zry.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import edu.northeastern.zry.models.Restaurant;

@Repository
public interface RestaurantRepository extends CrudRepository<Restaurant, Integer> {

  @Query("SELECT r FROM Restaurant r WHERE r.yelpId=:yelpId")
  Optional<Restaurant> findRestaurantByYelpId(
          @Param("yelpId") String yelpId);

  @Query("SELECT r FROM Restaurant r WHERE r.city=:city")
  List<Restaurant> findRestaurantByCity(
          @Param("city") String city);

  @Query("SELECT r FROM Restaurant r WHERE r.name=:name")
  Optional<Restaurant> findRestaurantByName(@Param("name") String name);

}
