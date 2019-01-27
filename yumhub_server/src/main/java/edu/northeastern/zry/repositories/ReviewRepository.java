package edu.northeastern.zry.repositories;

import org.springframework.data.repository.CrudRepository;

import edu.northeastern.zry.models.Review;

public interface ReviewRepository extends CrudRepository<Review, Integer> {

}
