package edu.northeastern.zry.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.zry.models.ShoppingCart;
import edu.northeastern.zry.models.ShoppingCartItem;
import edu.northeastern.zry.repositories.CustomerRepository;
import edu.northeastern.zry.repositories.ShoppingCartItemRepository;
import edu.northeastern.zry.repositories.ShoppingCartRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ShoppingCartService {
	
	
	@Autowired
	ShoppingCartRepository shopRepo;
	
	@Autowired
	
	CustomerRepository customerRepository;
	
	@Autowired
	ShoppingCartItemRepository shoppingCartItemRepository;
	
	
	/*@GetMapping("/api/customer/{customerId}/shoppingcart")
	public ShoppingCart findShoppingCartByCustomerId(@PathVariable("customerId") int customerId) {
		
		Optional<Customer> data = customerRepository.findById(customerId);
		if (data.isPresent()) {
			Customer customer = data.get();
			
			return customer.getShoppingCart();
		}
		return null;
		
	}*/
	
	
/*	@PostMapping("/api/customer/{customerId}/shoppingcart")
	public ShoppingCart createShoppingCart(@PathVariable("customerId") int customerId,
			@RequestBody ShoppingCart cart) {
		
		Optional<Customer> data = customerRepository.findById(customerId);
		if (data.isPresent()) {
			Customer customer = data.get();
			cart.setCustomer(customer);
			return shopRepo.save(cart);
		}
		return null;
	}*/

	@GetMapping("/api/shoppingCart/price/{shoppingCartId}")
	public ShoppingCart getPriceForShoppingCart(@PathVariable ("shoppingCartId") int cartId){
		Optional<ShoppingCart> shoppingCart = shopRepo.findById(cartId);
		if(shoppingCart.isPresent()){
			ShoppingCart existedShoppingCart = shoppingCart.get();
				Iterable<ShoppingCartItem> existedItems = shoppingCartItemRepository.findAll();
				double totalPrice = 0;
				for(ShoppingCartItem item : existedItems){
					if(item.getCart().getId() == cartId){
						totalPrice = totalPrice + item.getItemPrice();
					}
				}
				existedShoppingCart.setTotalPrice(totalPrice);
				return shopRepo.save(existedShoppingCart);
		}else{
			return null;
		}

	}
	
	
	@DeleteMapping("/api/shoppingcart/{cartId}")
	public void deleteShoppingCart(@PathVariable ("cartId") int cartId) {
		shopRepo.deleteById(cartId);
		
	}
	
	

}
