package edu.northeastern.zry.repositories;

import org.springframework.data.repository.CrudRepository;

import edu.northeastern.zry.models.Order;

public interface OrderRepository extends CrudRepository<Order, Integer> {

}
