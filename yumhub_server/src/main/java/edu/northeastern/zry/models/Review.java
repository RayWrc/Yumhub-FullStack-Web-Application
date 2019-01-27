package edu.northeastern.zry.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Review {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private double restaurantRating;
  private double delivererRating;
  private String text;
  private String reply;

  @OneToOne
  @JsonIgnore
  private Order order;


  public Review() {

  }


  public Review(Double restaurantRating, Double delivererRating, String text, String reply,
                String pictureLink, Order order) {
    this.restaurantRating = restaurantRating;
    this.delivererRating = delivererRating;
    this.text = text;
    this.reply = reply;
    this.order = order;
  }

  public Review(Double restaurantRating, Double delivererRating, Order order) {
    this.restaurantRating = restaurantRating;
    this.delivererRating = delivererRating;
    this.order = order;
  }


  public int getId() {
    return id;
  }


  public void setId(int id) {
    this.id = id;
  }


  public Double getRestaurantRating() {
    return restaurantRating;
  }


  public void setRestaurantRating(Double restaurantRating) {
    this.restaurantRating = restaurantRating;
  }


  public Double getDelivererRating() {
    return delivererRating;
  }


  public void setDelivererRating(Double delivererRating) {
    this.delivererRating = delivererRating;
  }


  public String getText() {
    return text;
  }


  public void setText(String text) {
    this.text = text;
  }


  public String getReply() {
    return reply;
  }


  public void setReply(String reply) {
    this.reply = reply;
  }


  public Order getOrder() {
    return order;
  }


  public void setOrder(Order order) {
    this.order = order;
  }


}
