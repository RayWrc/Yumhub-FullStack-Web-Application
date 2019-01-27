package edu.northeastern.zry.repositories;

import org.springframework.data.repository.CrudRepository;

import edu.northeastern.zry.models.ShoppingCartItem;

public interface ShoppingCartItemRepository extends CrudRepository<ShoppingCartItem, Integer> {


}
