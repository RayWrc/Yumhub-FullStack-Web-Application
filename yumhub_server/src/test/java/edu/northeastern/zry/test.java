package edu.northeastern.zry;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.util.List;

import org.json.JSONException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import edu.northeastern.zry.models.Restaurant;
import edu.northeastern.zry.services.RestaurantService;
import edu.northeastern.zry.services.YelpAPIService;
/*
@RunWith(SpringRunner.class)
@SpringBootTest
public class test {
	@Autowired
	YelpAPIService yelp;
	@Autowired
	RestaurantService res;
	
	
	
	@Before
	public void insertData() throws IOException, JSONException {
		
		List<Restaurant> ress = yelp.findRelativeBusinessesByCity("Boston");
		for(int i=0; i<ress.size();i++) {
			res.createRestaurant(ress.get(i));
		}
	}
	
	
	
	@Test
	public void testFindAllUsers() {
		assertEquals(30,res.findAllRestaurants().size());
	
	}
	}
	*/


