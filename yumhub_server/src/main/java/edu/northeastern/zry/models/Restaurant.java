package edu.northeastern.zry.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "restaurant")
public class Restaurant {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String name;
  private String address;
  private String city;
  private String cuisineType;
  private String phone;
  private String yelpId;
  private String photoLink;
  private String state;
  private String price;
  private double rating;
  private Double distance;
  private int ratingAmount;

  @OneToOne
  @JsonIgnore
  private Owner owner;


  @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  private List<Dish> dishes = new ArrayList<>();

  @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  private List<Order> orders = new ArrayList<>();


  @OneToMany(mappedBy = "restaurantPicture", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<DescriptionPicture> descriptionPictures = new ArrayList<>();


  public Restaurant() {
    super();
    rating = 5;
    ratingAmount = 0;
  }


  public int getId() {
    return id;
  }


  public void setId(int id) {
    this.id = id;
  }


  public Double getRating() {
    return rating;
  }


  public void setRating(Double rating) {
    this.rating = rating;
  }

  public Owner getOwner() {
    return owner;
  }


  public void setOwner(Owner owner) {
    this.owner = owner;
  }


  public List<Dish> getDishes() {
    return dishes;
  }


  public void setDishes(List<Dish> dishes) {
    this.dishes = dishes;
  }


  public List<Order> getOrders() {
    return orders;
  }


  public void setOrders(List<Order> orders) {
    this.orders = orders;
  }


  // add orders to a restaurant

  public void addOrder(Order order) {

    this.orders.add(order);
    if (order.getRestaurant() != this) {
      order.setRestaurant(this);
    }
  }


  public String getCity() {
    return city;
  }


  public void setCity(String city) {
    this.city = city;
  }


  public String getName() {
    return name;
  }


  public void setName(String name) {
    this.name = name;
  }


  public String getCuisineType() {
    return cuisineType;
  }


  public void setCuisineType(String cuisineType) {
    this.cuisineType = cuisineType;
  }


  public String getPhone() {
    return phone;
  }


  public void setPhone(String phone) {
    this.phone = phone;
  }


  public String getYelpId() {
    return yelpId;
  }


  public void setYelpId(String yelpId) {
    this.yelpId = yelpId;
  }


  public String getPhotoLink() {
    return photoLink;
  }


  public void setPhotoLink(String photoLink) {
    this.photoLink = photoLink;
  }


  public String getState() {
    return state;
  }


  public void setState(String state) {
    this.state = state;
  }


  public String getPrice() {
    return price;
  }


  public void setPrice(String price) {
    this.price = price;
  }


  public Double getDistance() {
    return distance;
  }


  public void setDistance(Double distance) {
    this.distance = distance;
  }


  public String getAddress() {
    return address;
  }


  public void setAddress(String address) {
    this.address = address;
  }

  public List<DescriptionPicture> getDescriptionPictures() {
    return descriptionPictures;
  }

  public void setDescriptionPictures(List<DescriptionPicture> descriptionPictures) {
    this.descriptionPictures = descriptionPictures;
  }

  public void addDescriptionPicture(DescriptionPicture descriptionPicture) {
    this.descriptionPictures.add(descriptionPicture);
  }

  public int getRatingAmount() {
    return ratingAmount;
  }

  public void setRatingAmount(int ratingAmount) {
    this.ratingAmount = ratingAmount;
  }
}
