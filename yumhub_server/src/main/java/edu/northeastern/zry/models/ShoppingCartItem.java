package edu.northeastern.zry.models;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity

@DiscriminatorValue(value = "ShoppingCartItem")
public class ShoppingCartItem extends Item {
	
	private String itemType;
	//ManyToOne with shopping cart
	
	@ManyToOne
	@JsonIgnore
	private ShoppingCart cart;

	
	public ShoppingCartItem(){
		super();
		itemType = "CartItem";
	}


	public ShoppingCart getCart() {
		return cart;
	}


	public void setCart(ShoppingCart cart) {
		this.cart = cart;
	}


	public String getItemType() {
		return itemType;
	}


	public void setItemType(String itemType) {
		this.itemType = itemType;
	}
	
	
	
}
