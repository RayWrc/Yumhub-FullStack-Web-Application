package edu.northeastern.zry.repositories;

import org.springframework.data.repository.CrudRepository;

import edu.northeastern.zry.models.Item;

public interface ItemRepository extends CrudRepository <Item, Integer> {

}
