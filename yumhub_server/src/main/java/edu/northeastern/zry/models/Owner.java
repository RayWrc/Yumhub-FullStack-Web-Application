package edu.northeastern.zry.models;

import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
@DiscriminatorValue(value = "Owner")
public class Owner extends User {


  @OneToOne(mappedBy = "owner", cascade = CascadeType.ALL,
          orphanRemoval = true)
  private Restaurant restaurant;


  public Owner() {
    super("OWNER_USER");
  }

  public Owner(String username, String password, String first, String last, String email, String phone, String address,
               Date reg, String link) {
    super(username, password, first, last, email, phone, address, reg, link);

  }

  public Restaurant getRestaurant() {
    return restaurant;
  }

  public void setRestaurants(Restaurant restaurant) {
    this.restaurant = restaurant;
  }


}
