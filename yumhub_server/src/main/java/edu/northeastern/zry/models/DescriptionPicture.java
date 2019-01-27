package edu.northeastern.zry.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class DescriptionPicture {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String link;


  @ManyToOne
  @JsonIgnore
  private Restaurant restaurantPicture;


  public DescriptionPicture() {

  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getLink() {
    return link;
  }

  public void setLink(String link) {
    this.link = link;
  }

  public Restaurant getRestaurantPicture() {
    return restaurantPicture;
  }

  public void setRestaurantPicture(Restaurant restaurantPicture) {
    this.restaurantPicture = restaurantPicture;
  }


}
