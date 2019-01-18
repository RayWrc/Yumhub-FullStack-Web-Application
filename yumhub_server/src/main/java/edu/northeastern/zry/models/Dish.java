package edu.northeastern.zry.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Comparator;

@Entity
public class Dish {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private  String name;
	private String description;
	private Double price;
	

	
	@ManyToOne
	@JsonIgnore
	private Restaurant restaurant;
	
	


	// one to many relation with item
	@OneToMany(mappedBy = "dish", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Item> dishItem = new ArrayList<>();
	
	
	
	
	public Dish() {
		
	}
	
	
	public Dish(String name, String des, Double price, int available) {
		this.name = name;
		this.description = des;
		this.price = price;
			}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Double getPrice() {
		return price;
	}


	public void setPrice(Double price) {
		this.price = price;
	}


	public List<Item> getDishItem() {
		return dishItem;
	}


	public void setDishItem(List<Item> dishItem) {
		this.dishItem = dishItem;
	}
	
	
	public Restaurant getRestaurant() {
		return restaurant;
	}


	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

  // sort dish by name
	public static Comparator<Dish> DishNameComparator = new Comparator<Dish>() {
		public int compare(Dish d1, Dish d2) {
			String name1 = d1.getName().toUpperCase();
			String name2 =d2.getName().toUpperCase();
			
			return name1.compareTo(name2);
		}
	};
	
	
}
