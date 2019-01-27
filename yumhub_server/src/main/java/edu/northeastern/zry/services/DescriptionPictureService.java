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

import edu.northeastern.zry.models.DescriptionPicture;
import edu.northeastern.zry.models.Restaurant;
import edu.northeastern.zry.repositories.DescriptionPictureRepository;
import edu.northeastern.zry.repositories.RestaurantRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class DescriptionPictureService {

  @Autowired
  RestaurantRepository restaurantRepository;

  @Autowired
  DescriptionPictureRepository descriptionPictureRepository;

  @GetMapping("/api/res/{resId}/pic")
  public List<DescriptionPicture> findAllPicsForRes(@PathVariable("resId") int resId) {
    List<DescriptionPicture> allPics = (List<DescriptionPicture>) descriptionPictureRepository.findAll();
    List<DescriptionPicture> resultPics = new ArrayList<>();
    for (DescriptionPicture pic : allPics) {
      if (pic.getRestaurantPicture().getId() == resId) {
        resultPics.add(pic);
      }
    }
    return resultPics;

  }

  @PostMapping("/api/restaurant/{resId}/link")
  public DescriptionPicture createDishForRestaurant(@PathVariable("resId") int restaurantId,
                                                    @RequestBody DescriptionPicture link) {
    Optional<Restaurant> data = restaurantRepository.findById(restaurantId);

    if (!data.isPresent()) {
      return null;
    } else {
      Restaurant rest = data.get();
      link.setRestaurantPicture(rest);
      return descriptionPictureRepository.save(link);
    }
  }

  @PutMapping("/api/picLink/{linkId}")
  public DescriptionPicture updateDishForRestaurant(@PathVariable("linkId") int linkId,
                                                    @RequestBody DescriptionPicture newLink) {
    Optional<DescriptionPicture> data = descriptionPictureRepository.findById(linkId);
    if (data.isPresent()) {
      DescriptionPicture existedPic = data.get();
      existedPic.setLink(newLink.getLink());
      return descriptionPictureRepository.save(existedPic);
    }
    return null;
  }

  @DeleteMapping("/api/picLink/{linkId}")
  public void deleteDishForRestaurant(@PathVariable("linkId") int linkId) {
    descriptionPictureRepository.deleteById(linkId);
  }

}
