package edu.northeastern.zry.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import edu.northeastern.zry.models.Deliverer;
import edu.northeastern.zry.models.Order;
import edu.northeastern.zry.models.Restaurant;
import edu.northeastern.zry.models.Review;
import edu.northeastern.zry.repositories.DelivererRepository;
import edu.northeastern.zry.repositories.OrderRepository;
import edu.northeastern.zry.repositories.RestaurantRepository;
import edu.northeastern.zry.repositories.ReviewRepository;


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReviewService {

  @Autowired
  OrderRepository orderRepository;

  @Autowired
  ReviewRepository reviewRepository;

  @Autowired
  RestaurantRepository restaurantRepository;

  @Autowired
  DelivererRepository delivererRepository;

  @PostMapping("/api/order/review/{orderId}")
  public Review writeReviewForOrder(@PathVariable("orderId") int orderId,
                                    @RequestBody Review review) {
    Optional<Order> data = orderRepository.findById(orderId);
    if (data.isPresent()) {
      Order order = data.get();
      Review newReview = new Review();
      newReview.setDelivererRating(review.getDelivererRating());
      newReview.setRestaurantRating(review.getRestaurantRating());
      newReview.setText(review.getText());
      newReview.setOrder(order);

      //Update Rating for restaurant
      Restaurant restaurant = order.getRestaurant();
      double currentRating = restaurant.getRating() * restaurant.getRatingAmount();
      double resultRating = round((currentRating + review.getRestaurantRating()) / (restaurant.getRatingAmount() + 1));
      restaurant.setRating(resultRating);
      restaurant.setRatingAmount(restaurant.getRatingAmount() + 1);
      restaurantRepository.save(restaurant);

      //Update Rating for deliverer
      Deliverer deliverer = order.getDeliver();
      double currentDeliverRating = deliverer.getRating() * deliverer.getRatingAmount();
      double resultDeliverRating = round((currentDeliverRating + review.getDelivererRating()) / (deliverer.getRatingAmount() + 1));
      deliverer.setRating(resultDeliverRating);
      deliverer.setRatingAmount(deliverer.getRatingAmount() + 1);
      delivererRepository.save(deliverer);

      return reviewRepository.save(newReview);
    } else {
      return null;
    }

  }

  @PostMapping("/api/review/{reviewId}/reply")
  public Review writeReplyReview(@PathVariable("reviewId") int reviewId, @RequestBody String reply) {

    Optional<Review> data = reviewRepository.findById(reviewId);
    return getReview(reply, data);
  }

  @PutMapping("/api/order/review/{orderId}")
  public Review updateReviewForOrder(@PathVariable("orderId") int orderId,
                                     @RequestBody Review review) {
    Optional<Order> data = orderRepository.findById(orderId);
    if (data.isPresent()) {
      Order order = data.get();
      Review existedReview = order.getReview();
      existedReview.setText(review.getText());
      existedReview.setDelivererRating(review.getDelivererRating());
      existedReview.setRestaurantRating(review.getRestaurantRating());

      //Update Rating for restaurant
      Restaurant restaurant = order.getRestaurant();
      double currentRating = restaurant.getRating() * (restaurant.getRatingAmount() - 1);
      double resultRating = round((currentRating + review.getRestaurantRating()) / (restaurant.getRatingAmount()));
      restaurant.setRating(resultRating);
      restaurantRepository.save(restaurant);

      //Update Rating for deliverer
      Deliverer deliverer = order.getDeliver();
      double currentDeliverRating = deliverer.getRating() * (deliverer.getRatingAmount() - 1);
      double resultDeliverRating = round((currentDeliverRating + review.getDelivererRating()) / (deliverer.getRatingAmount()));
      deliverer.setRating(resultDeliverRating);
      delivererRepository.save(deliverer);

      return reviewRepository.save(existedReview);
    } else {
      return null;
    }

  }

  @PutMapping("/api/review/{reviewId}/reply")
  public Review updateReplyReview(@PathVariable("reviewId") int reviewId, @RequestBody String reply) {
    Optional<Review> data = reviewRepository.findById(reviewId);
    return getReview(reply, data);
  }

  private Review getReview(@RequestBody String reply, Optional<Review> data) {
    if (data.isPresent()) {
      Review existedReview = data.get();
      existedReview.setReply(reply);
      return reviewRepository.save(existedReview);
    } else {
      return null;
    }
  }

  private double round(double num) {
    num = num * 100;
    num = Math.round(num);
    return num / 100;
  }

}
