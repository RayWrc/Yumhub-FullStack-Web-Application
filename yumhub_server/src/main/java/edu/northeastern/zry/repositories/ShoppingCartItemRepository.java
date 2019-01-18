package edu.northeastern.zry.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import edu.northeastern.zry.models.ShoppingCartItem;
import edu.northeastern.zry.models.User;

public interface ShoppingCartItemRepository extends CrudRepository<ShoppingCartItem, Integer> {


}
