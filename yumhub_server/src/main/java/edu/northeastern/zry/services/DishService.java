package edu.northeastern.zry.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import edu.northeastern.zry.models.Dish;
import edu.northeastern.zry.models.Restaurant;
import edu.northeastern.zry.repositories.DishRepository;
import edu.northeastern.zry.repositories.RestaurantRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class DishService {


  @Autowired
  DishRepository dishRepo;

  @Autowired
  RestaurantRepository restRepo;


  @PostMapping("/api/restaurant/{restaurantId}/dish")
  public Dish createDishForRestaurant(@PathVariable("restaurantId") int restaurantId,
                                      @RequestBody Dish dish) {
    Optional<Restaurant> data = restRepo.findById(restaurantId);

    if (!data.isPresent()) {
      return null;
    } else {
      Restaurant rest = data.get();
      Dish dishData = findDishByName(dish.getName());
      if (dishData != null) {
        return null;
      }
      dish.setRestaurant(rest);
      return dishRepo.save(dish);

    }
  }

  @GetMapping("/api/restaurant/{restaurantId}/dishes")
  public List<Dish> sortAllDishByNameForRestaurant(@PathVariable("restaurantId") int restaurantId) {
    Optional<Restaurant> data = restRepo.findById(restaurantId);
    if (!data.isPresent()) {
      return null;
    }
    Restaurant rest = data.get();
    List<Dish> dishes = rest.getDishes();
    dishes.sort(Dish.DishNameComparator);
    return dishes;
  }


  @DeleteMapping("/api/dish/{dishId}")
  public void deleteDishForRestaurant(@PathVariable("dishId") int dishId) {
    dishRepo.deleteById(dishId);
  }

  @PutMapping("/api/dish/{dishId}")
  public Dish updateDishForRestaurant(@PathVariable("dishId") int dishId,
                                      @RequestBody Dish newDish) {
    Optional<Dish> data = dishRepo.findById(dishId);
    if (data.isPresent()) {
      Dish dish = data.get();
      dish.setName(newDish.getName());
      dish.setPrice(newDish.getPrice());
      dish.setDescription(newDish.getDescription());
      return dishRepo.save(dish);
    }
    return null;
  }


  private Dish findDishByName(String name) {
    Optional<Dish> data = dishRepo.findDishByName(name);
    return data.orElse(null);
  }


}
