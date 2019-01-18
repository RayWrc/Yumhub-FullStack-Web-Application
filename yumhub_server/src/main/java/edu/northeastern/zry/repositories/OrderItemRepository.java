package edu.northeastern.zry.repositories;

import org.springframework.data.repository.CrudRepository;

import edu.northeastern.zry.models.OrderItem;

public interface OrderItemRepository  extends CrudRepository<OrderItem, Integer>{

}
