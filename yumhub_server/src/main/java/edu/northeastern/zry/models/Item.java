package edu.northeastern.zry.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Item {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private int quantity;
  private Double itemPrice;
  private String dishName;


  @ManyToOne
  @JsonIgnore
  private Dish dish;


  public Item() {
    quantity = 1;

  }


  public Item(int quantity, Double price, Dish dish) {
    super();
    this.quantity = quantity;
    this.itemPrice = price;
    this.dish = dish;
  }


  public int getId() {
    return id;
  }


  public void setId(int id) {
    this.id = id;
  }


  public int getQuantity() {
    return quantity;
  }


  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }


  public Double getItemPrice() {
    return itemPrice;
  }


  public void setItemPrice(Double price) {
    this.itemPrice = price;
  }


  public Dish getDish() {
    return dish;
  }


  public void setDish(Dish dish) {
    this.dish = dish;
  }


  public String getItemType() {
    return "";

  }

  public String getDishName() {
    return dishName;
  }

  public void setDishName(String dishName) {
    this.dishName = dishName;
  }
}
