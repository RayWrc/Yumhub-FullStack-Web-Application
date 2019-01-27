package edu.northeastern.zry.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import edu.northeastern.zry.models.Deliverer;
import edu.northeastern.zry.models.Order;
import edu.northeastern.zry.models.OrderStatus;
import edu.northeastern.zry.repositories.DelivererRepository;
import edu.northeastern.zry.repositories.OrderRepository;

import static edu.northeastern.zry.models.OrderStatus.DELIVERED;
import static edu.northeastern.zry.models.OrderStatus.HOLD;
import static edu.northeastern.zry.models.OrderStatus.SHIPPED;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrderService {

  @Autowired
  OrderRepository orderRepository;

  @Autowired
  DelivererRepository delivererRepository;

  @GetMapping("/api/customer/orders/{customerId}")
  public List<Order> findOrdersForCustomer(@PathVariable("customerId") int customerId) {
    List<Order> allOrders = (List<Order>) orderRepository.findAll();
    List<Order> resultOrders = new ArrayList<>();
    for (Order order : allOrders) {
      if (order.getCustomer() != null) {
        if (order.getCustomer().getId() == customerId) {
          resultOrders.add(order);
        }
      }
    }
    return resultOrders;
  }

  @GetMapping("/api/restaurant/{resId}/order")
  public List<Order> findOrdersForRestaurant(@PathVariable("resId") int restaurantId) {
    List<Order> allOrders = (List<Order>) orderRepository.findAll();
    List<Order> resultOrders = new ArrayList<>();
    for (Order order : allOrders) {
      if (order.getRestaurant() != null) {
        if (order.getRestaurant().getId() == restaurantId) {
          resultOrders.add(order);
        }
      }
    }
    return resultOrders;
  }

  @GetMapping("/api/deliverer/{dId}/order")
  public List<Order> findOrdersForDeliverer(@PathVariable("dId") int deliverId) {
    List<Order> allOrders = (List<Order>) orderRepository.findAll();
    List<Order> resultOrders = new ArrayList<>();
    for (Order order : allOrders) {
      if (order.getDeliver() != null) {
        if (order.getDeliver().getId() == deliverId) {
          resultOrders.add(order);
        }
      }
    }
    return resultOrders;
  }

  @GetMapping("/api/admin/orders")
  public List<Order> findAllOrdersForAdmin() {
    return (List<Order>) orderRepository.findAll();
  }


  @PutMapping("/api/deliverer/{dId}/order/{orderId}/confirm")
  public Order confirmReceiveAnOrder(@PathVariable("orderId") int orderId,
                                     @PathVariable("dId") int delivererId) {
    Optional<Order> data = orderRepository.findById(orderId);
    Optional<Deliverer> deliverData = delivererRepository.findById(delivererId);
    if (data.isPresent() && deliverData.isPresent()) {
      Order existedOrder = data.get();
      Deliverer existedDeliverer = deliverData.get();
      existedOrder.setStatus(DELIVERED);
      existedDeliverer.setIsFree(true);
      delivererRepository.save(existedDeliverer);
      return orderRepository.save(existedOrder);
    } else {
      return null;
    }

  }

  @PutMapping("/api/order/accept/{orderId}")
  public Order acceptOrder(@PathVariable("orderId") int orderId) {
    Optional<Order> data = orderRepository.findById(orderId);
    if (data.isPresent()) {
      Order existedOrder = data.get();
      existedOrder.setStatus(HOLD);
      return orderRepository.save(existedOrder);
    } else {
      return null;
    }

  }

  @PutMapping("/api/order/{orderId}/deliverer/{delivererId}")
  public Order assignDelivererOrder(@PathVariable("orderId") int orderId,
                                    @PathVariable("delivererId") int delivererId) {
    Optional<Order> orderData = orderRepository.findById(orderId);
    Optional<Deliverer> delivererData = delivererRepository.findById(delivererId);
    if (orderData.isPresent() && delivererData.isPresent()) {
      Order existedOrder = orderData.get();
      Deliverer existedDeliverer = delivererData.get();
      existedOrder.setDeliver(existedDeliverer);
      existedOrder.setStatus(SHIPPED);
      existedDeliverer.setIsFree(false);
      delivererRepository.save(existedDeliverer);
      return orderRepository.save(existedOrder);
    } else {
      return null;
    }

  }

  @PutMapping("/api/admin/order/{orderId}/{status}/{note}")
  public Order updateOrderById(@PathVariable("orderId") int orderId,
                               @PathVariable("status") String status, @PathVariable("note") String note) {
    Optional<Order> data = orderRepository.findById(orderId);
    if (data.isPresent()) {
      Order existedOrder = data.get();
      switch (status) {
        case "NEW":
          existedOrder.setStatus(OrderStatus.NEW);
          break;
        case "HOLD":
          existedOrder.setStatus(OrderStatus.HOLD);
          break;
        case "SHIPPED":
          existedOrder.setStatus(OrderStatus.SHIPPED);
          break;
        case "DELIVERED":
          existedOrder.setStatus(OrderStatus.DELIVERED);
      }
      existedOrder.setNote(note);
      return orderRepository.save(existedOrder);
    } else {
      return null;
    }


  }

  @DeleteMapping("/api/admin/order/{orderId}")
  public void deleteOrderById(@PathVariable("orderId") int orderId) {
    orderRepository.deleteById(orderId);
  }


}
