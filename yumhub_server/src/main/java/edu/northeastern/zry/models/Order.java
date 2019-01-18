package edu.northeastern.zry.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name ="`order`")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private Date created;
	private String note;
	
	@Enumerated(EnumType.STRING)
	private OrderStatus status;
	
	
	@ManyToOne

	private Deliverer deliver;
	
	@OneToOne(mappedBy="order", cascade = CascadeType.ALL, orphanRemoval = true)

	private Review review;
	
	@ManyToOne

	private Customer customer;
	
	@ManyToOne

	private Restaurant restaurant;
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderItem> orderItems = new ArrayList<>();
	
	
	


	public Order() {
		created = new Date();
		
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public Date getCreated() {
		return created;
	}


	public void setCreated(Date created) {
		this.created = created;
	}


	public String getNote() {
		return note;
	}


	public void setNote(String note) {
		this.note = note;
	}


	public OrderStatus getStatus() {
		return status;
	}


	public void setStatus(OrderStatus status) {
		this.status = status;
	}


	public Deliverer getDeliver() {
		return deliver;
	}

	public void setDeliver(Deliverer deliver) {
		this.deliver = deliver;

	}
	
	
	
	

	
	public Customer getCustomer() {
		return customer;
	}


	// set the customer to the customer
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	


	
	public Review getReview() {
		return review;
	}


	// set the review to the order
	public void setReviews(Review review) {
		this.review = review;
		review.setOrder(this);
		
	}
	
	// remove the review from the order
	public void removeReview() {
		this.review.setOrder(null);
		this.review = null;
	}


	public List<OrderItem> getOrderItems() {
		return orderItems;
	}


	 // set an orderItem to an order
	public void setOrderItems(OrderItem orderItem) {
		this.orderItems.add(orderItem);
		if(orderItem.getOrder()!=this) {
			orderItem.setOrder(this);
		}
	}


	public Restaurant getRestaurant() {
		return restaurant;
	}


	// set the restaurant to the order
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
		if(!restaurant.getOrders().contains(this)) {
			restaurant.getOrders().add(this);
		}
	}
	
	
	
	
	
	

	
}
