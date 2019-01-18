package edu.northeastern.zry.repositories;

import org.springframework.data.repository.CrudRepository;

import edu.northeastern.zry.models.ShoppingCart;

public interface ShoppingCartRepository extends CrudRepository<ShoppingCart, Integer> {

}
