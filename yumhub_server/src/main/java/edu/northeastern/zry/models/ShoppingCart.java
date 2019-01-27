package edu.northeastern.zry.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;


@Entity
public class ShoppingCart {

  @Id
  private int id;

  private double totalPrice;


  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id")
  @MapsId
  private Customer customer;


  @OneToMany(mappedBy = "cart")
  @JsonIgnore
  private List<ShoppingCartItem> cartItems = new ArrayList<>();


  public ShoppingCart() {

  }


  public Double getTotalPrice() {
    return totalPrice;
  }


  public void setTotalPrice(Double totalPrice) {
    this.totalPrice = totalPrice;
  }


  public Customer getCustomer() {
    return customer;
  }


  public void setCustomer(Customer customer) {
    this.customer = customer;
  }


  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }
}
