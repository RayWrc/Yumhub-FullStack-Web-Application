package edu.northeastern.zry.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

//import java.util.Iterator;


@Entity
@DiscriminatorValue(value = "Deliverer")
public class Deliverer extends User {

  private String carPlate;
  private Boolean isFree;
  private double rating;

  private int ratingAmount;


  @OneToMany(mappedBy = "deliver")
  @JsonIgnore
  private List<Order> orders = new ArrayList<>();

  public Deliverer() {
    super("DELIVERER_USER");
    rating = 5.0;
    ratingAmount = 0;
    isFree = true;
  }

  public Deliverer(String username, String password, String first, String last, String email, String phone, String address,
                   Date reg, String link, String plate, Boolean free, Double r) {
    super(username, password, first, last, email, phone, address, reg, link);
    this.carPlate = plate;
    this.isFree = free;
    this.rating = r;
  }


  public String getCarPlate() {
    return carPlate;
  }


  public void setCarPlate(String plate) {
    carPlate = plate;
  }


  public Boolean getIsFree() {
    return isFree;
  }


  public void setIsFree(Boolean isFree) {
    this.isFree = isFree;
  }


  public Double getRating() {
    return rating;
  }


  public void setRating(Double rating) {
    this.rating = rating;
  }


  public List<Order> getOrders() {
    return orders;
  }


  public void setOrders(List<Order> order) {
    this.orders = order;
  }


  // add order to deliverer
  public void addOrder(Order order) {
    this.orders.add(order);
    if (order.getDeliver() != this) {
      order.setDeliver(this);
    }

  }

  // remove order from deliver ?
  public void removeOrder(Order o) {
    this.orders.remove(o);
    o.setDeliver(null);
    	
    	/*
    	for( Iterator<Order> iterator = orders.iterator(); iterator.hasNext();) {
    		Order order = iterator.next();
    		if (order.getDeliver().equals(this)){
    			iterator.remove();
    			order.setDeliver(null);
    		}
    	}
    	*/
  }


  public int getRatingAmount() {
    return ratingAmount;
  }

  public void setRatingAmount(int ratingAmount) {
    this.ratingAmount = ratingAmount;
  }

  //calculate rating of a deliverer ?


}
