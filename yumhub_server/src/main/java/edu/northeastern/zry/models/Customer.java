package edu.northeastern.zry.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
@DiscriminatorValue(value = "Customer")
public class Customer extends User {


  @OneToOne(cascade = CascadeType.ALL, mappedBy = "customer", fetch = FetchType.LAZY, orphanRemoval = true)
  @JsonIgnore
  //@LazyToOne(LazyToOneOption.NO_PROXY)
  private ShoppingCart shoppingCart;


  @OneToMany(mappedBy = "customer")
  @JsonIgnore
  private List<Order> orders = new ArrayList<>();



  public Customer() {
    super("CUSTOMER_USER");
  }


  public Customer(String username, String password, String first, String last, String email, String phone, String address,
                  Date reg, String link) {
    super(username, password, first, last, email, phone, address, reg, link);

  }

  public ShoppingCart getShoppingCart() {
    return shoppingCart;
  }

  public void setShoppingCart(ShoppingCart shoppingCart) {
    this.shoppingCart = shoppingCart;
  }

  public List<Order> getOrders() {
    return orders;
  }

  public void setOrders(List<Order> orders) {
    this.orders = orders;
  }



  // add an order

  public void addOrder(Order order) {
    this.orders.add(order);
    if (order.getCustomer() != this) {
      order.setCustomer(this);
    }
  }


  // remove an order
  public void removeOrder(Order order) {
    this.orders.remove(order);
    order.setCustomer(null);
  }

}
