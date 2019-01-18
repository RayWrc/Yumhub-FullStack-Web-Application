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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import edu.northeastern.zry.models.Owner;
import edu.northeastern.zry.models.Restaurant;
import edu.northeastern.zry.repositories.OwnerRepository;
import edu.northeastern.zry.repositories.RestaurantRepository;


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class RestaurantService {

  @Autowired
  RestaurantRepository restaurantRepository;

  @Autowired
  OwnerRepository ownerRepo;


  @GetMapping("/api/restaurant")
  public List<Restaurant> findAllRestaurants() {
    List<Restaurant> resultRestaurant = new ArrayList<>();
    List<Restaurant> allRestaurants = (List<Restaurant>) restaurantRepository.findAll();
    for (Restaurant restaurant : allRestaurants) {
      if (restaurant.getOwner() != null) {
        resultRestaurant.add(restaurant);
      }
    }
    return resultRestaurant;
  }


  @GetMapping("/api/restaurant/{city}")
  public List<Restaurant> findRestaurantByCity(@PathVariable("city") String city) {
    return restaurantRepository.findRestaurantByCity(city);
  }

  @GetMapping("/api/restaurant/{resId}/owner")
  public Owner findOwnerForRestaurant(@PathVariable("resId") int resId) {
    Optional<Restaurant> restaurant = restaurantRepository.findById(resId);
    if (restaurant.isPresent()) {
      return restaurant.get().getOwner();
    } else {
      return null;
    }

  }


  @PostMapping("/api/restaurant/owner/{ownerId}")
  public Restaurant createRestaurant(@PathVariable("ownerId") int ownerId,
                                     @RequestBody Restaurant restaurant) {

    Optional<Restaurant> data = restaurantRepository.findRestaurantByName(restaurant.getName());
    Optional<Owner> ownerData = ownerRepo.findById(ownerId);
    if (ownerData.isPresent()) {
      Owner owner = ownerData.get();
      if (data.isPresent()) {
        return null;
      } else {
        restaurant.setOwner(owner);
        return restaurantRepository.save(restaurant);
      }
    }
    return null;


  }

  @PostMapping("/api/admin/restaurant/owner/{ownerName}")
  public Restaurant createRestaurantForOwner(@PathVariable("ownerName") String ownerName,
                                             @RequestBody Restaurant restaurant) {
    Optional<Owner> data = ownerRepo.findUserByUsername(ownerName);
    if (data.isPresent()) {
      Owner existedOwner = data.get();
      if (existedOwner.getRestaurant() != null) {
        return null;
      } else {
        restaurant.setOwner(existedOwner);
        return restaurantRepository.save(restaurant);
      }
    } else {
      Owner owner = new Owner();
      owner.setUsername(ownerName);
      Owner existedOwner = ownerRepo.save(owner);
      restaurant.setOwner(existedOwner);
      return restaurantRepository.save(restaurant);
    }
  }

  @GetMapping("/api/restaurant/detail/{Id}")
  public Restaurant findRestaurantByYelpId(@PathVariable("Id") int yelpId) {

    Optional<Restaurant> data = restaurantRepository.findById(yelpId);
    return data.orElse(null);
  }

  @GetMapping("/api/restaurant/owner/{ownerId}")
  public Restaurant findRestaurantByOwner(@PathVariable("ownerId") int ownerId
  ) {
    Optional<Owner> data = ownerRepo.findById(ownerId);

    if (data.isPresent()) {
      Owner restaurateur = data.get();
      return restaurateur.getRestaurant();
    }

    return null;
  }

  @PutMapping("/api/restaurant/info/update")
  public Restaurant updateRestaurantById(@RequestBody Restaurant restaurant) {
    Optional<Restaurant> data = restaurantRepository.findById(restaurant.getId());
    if (data.isPresent()) {
      Restaurant existedRestaurant = data.get();
      existedRestaurant.setName(restaurant.getName());
      existedRestaurant.setCuisineType(restaurant.getCuisineType());
      existedRestaurant.setPhotoLink(restaurant.getPhotoLink());
      existedRestaurant.setPhone(restaurant.getPhone());
      existedRestaurant.setAddress(restaurant.getAddress());
      existedRestaurant.setCity(restaurant.getCity());
      existedRestaurant.setState(restaurant.getState());
      existedRestaurant.setPrice(restaurant.getPrice());
      return restaurantRepository.save(existedRestaurant);
    } else {
      return null;
    }

  }

  @PutMapping("/api/admin/restaurant/{resId}")
  public Restaurant adminUpdateRes(@PathVariable("resId") int resId,
                                   @RequestBody Restaurant restaurant) {
    Optional<Restaurant> data = restaurantRepository.findById(resId);
    if (data.isPresent()) {
      Restaurant existedRes = data.get();
      existedRes.setRating(restaurant.getRating());
      existedRes.setRatingAmount(restaurant.getRatingAmount());
      return restaurantRepository.save(existedRes);
    } else {
      return null;
    }

  }

  @DeleteMapping("/api/restaurant/{resId}")
  public void deleteRestaurantById(@PathVariable("resId") int resId) {
    Optional<Restaurant> data = restaurantRepository.findById(resId);
    if (data.isPresent()) {
      Restaurant existedRes = data.get();
      existedRes.setOwner(null);
      restaurantRepository.save(existedRes);
      restaurantRepository.deleteById(resId);
    }
  }
}
