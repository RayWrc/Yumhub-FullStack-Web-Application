package edu.northeastern.zry.models;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@DiscriminatorValue(value = "OrderItem")
public class OrderItem  extends Item{
	private String itemType;
	
	
	
	@ManyToOne
	@JsonIgnore
	private Order order;
	
	
	public OrderItem() {
		super();
		this.itemType = "OrderItem";
	}


	public Order getOrder() {
		return order;
	}


	public void setOrder(Order order) {
		this.order = order;
		if(!order.getOrderItems().contains(this)) {
			order.getOrderItems().add(this);
		}
	}


	public String getItemType() {
		return itemType;
	}


	public void setItemType(String itemType) {
		this.itemType = itemType;
	}
	
	

	

}
