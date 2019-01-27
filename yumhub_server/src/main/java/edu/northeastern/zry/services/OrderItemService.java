package edu.northeastern.zry.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import edu.northeastern.zry.models.Customer;
import edu.northeastern.zry.models.Order;
import edu.northeastern.zry.models.OrderItem;
import edu.northeastern.zry.models.OrderStatus;
import edu.northeastern.zry.models.Restaurant;
import edu.northeastern.zry.models.ShoppingCartItem;
import edu.northeastern.zry.repositories.CustomerRepository;
import edu.northeastern.zry.repositories.OrderItemRepository;
import edu.northeastern.zry.repositories.OrderRepository;
import edu.northeastern.zry.repositories.ShoppingCartItemRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrderItemService {

  @Autowired
  ShoppingCartItemRepository shoppingCartItemRepository;

  @Autowired
  OrderItemRepository orderItemRepository;

  @Autowired
  OrderRepository orderRepository;

  @Autowired
  CustomerRepository customerRepository;

  @PostMapping("/api/shoppingCart/{shoppingCartId}")
  public void placeOrder(@PathVariable("shoppingCartId") int shoppingCartId,
                         @RequestBody String note) {
    List<ShoppingCartItem> thisCartItems = new ArrayList<>();
    List<ShoppingCartItem> allCartItems = (List<ShoppingCartItem>) shoppingCartItemRepository.findAll();
    for (ShoppingCartItem item : allCartItems) {
      if (item.getCart().getId() == shoppingCartId) {
        thisCartItems.add(item);
      }
    }
    Restaurant orderRestaurant = thisCartItems.get(0).getDish().getRestaurant();
    Order newOrder = orderRepository.save(new Order());
    Optional<Customer> customer = customerRepository.findById(shoppingCartId);
    if (customer.isPresent()) {
      Customer existedCustomer = customer.get();
      // new Order
      newOrder.setCustomer(existedCustomer);
      newOrder.setStatus(OrderStatus.NEW);
      newOrder.setNote(note);
      newOrder.setRestaurant(orderRestaurant);
      orderRepository.save(newOrder);
      // new OrderItems
      List<OrderItem> orderItems = new ArrayList<>();
      for (ShoppingCartItem item : thisCartItems) {
        OrderItem newOrderItem = new OrderItem();
        newOrderItem.setOrder(newOrder);
        newOrderItem.setDish(item.getDish());
        newOrderItem.setDishName(item.getDishName());
        newOrderItem.setItemPrice(item.getItemPrice());
        newOrderItem.setQuantity(item.getQuantity());
        orderItems.add(newOrderItem);
        orderItemRepository.saveAll(orderItems);
        shoppingCartItemRepository.deleteAll(thisCartItems);

      }

    }


  }

}
