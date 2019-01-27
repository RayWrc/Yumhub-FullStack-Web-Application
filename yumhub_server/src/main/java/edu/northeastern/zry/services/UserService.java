package edu.northeastern.zry.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import edu.northeastern.zry.models.Admin;
import edu.northeastern.zry.models.Customer;
import edu.northeastern.zry.models.Deliverer;
import edu.northeastern.zry.models.Owner;
import edu.northeastern.zry.models.User;
import edu.northeastern.zry.repositories.AdminRepository;
import edu.northeastern.zry.repositories.CustomerRepository;
import edu.northeastern.zry.repositories.DelivererRepository;
import edu.northeastern.zry.repositories.OwnerRepository;
import edu.northeastern.zry.repositories.ShoppingCartRepository;
import edu.northeastern.zry.repositories.UserRepository;

@RestController
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@CrossOrigin(origins = "http://yumhub-client.s3-website-us-east-1.amazonaws.com", allowCredentials = "true")
public class UserService {

  @Autowired
  UserRepository repository;
  @Autowired
  CustomerRepository customerRepository;
  @Autowired
  OwnerRepository ownerRepository;

  @Autowired
  ShoppingCartRepository shoppingCartRepository;

  @Autowired
  DelivererRepository delivererRepository;

  @Autowired
  AdminRepository adminRepository;


  @GetMapping("/api/admin/user")
  public List<User> findAllUsers() {
    return (List<User>) repository.findAll();
  }

  @GetMapping("/api/user/customer")
  public List<Customer> findAllCustomers() {
    return (List<Customer>) customerRepository.findAll();
  }

  @GetMapping("/api/deliverer")
  public List<Deliverer> findAllDeliverers() {
    return (List<Deliverer>) delivererRepository.findAll();
  }


  @GetMapping("/api/user/owner")
  public List<Owner> findAllOwners() {
    return (List<Owner>) ownerRepository.findAll();
  }


  @GetMapping("/api/user/{userId}")
  public User findUserById(@PathVariable("userId") int id) {
    Optional<User> data = repository.findById(id);
    return data.orElse(null);
  }

  @GetMapping("/api/currentUser")
  public User findCurrentUser(HttpSession session) {
    User currentUser = (User) session.getAttribute("currentUser");
    if (currentUser == null) {
      return null;
    } else {
      Optional<User> data = repository.findById(currentUser.getId());
      return data.orElse(null);
    }
  }

  // registers

  @PostMapping("/api/customer/signUp")
  public Customer customerRegister(@RequestBody Customer customer, HttpSession session) {
    String username = customer.getUsername();

    Optional<User> data = repository.findUserByUsername(username);
    if (!data.isPresent()) {
      Customer newCustomer = new Customer();
      newCustomer.setUsername(customer.getUsername());
      newCustomer.setPassword(customer.getPassword());
      // ShoppingCart newCart = new ShoppingCart();

      Customer savedCustomer = repository.save(newCustomer);
      session.setAttribute("currentUser", savedCustomer);
      // newCart.setCustomer(savedCustomer);
      //shoppingCartRepository.save(newCart);

      return savedCustomer;
    }

    return null;
  }

  @PostMapping("/api/owner/signUp")
  public Owner ownerRegister(@RequestBody Owner owner, HttpSession session) {

    String username = owner.getUsername();
    Optional<User> data = repository.findUserByUsername(username);
    if (!data.isPresent()) {
      Owner existedOwner = ownerRepository.save(owner);
      session.setAttribute("currentUser", existedOwner);
      return existedOwner;
    }

    return null;
  }

  @PostMapping("/api/deliverer/signUp")
  public Deliverer delivererRegister(@RequestBody Deliverer deliverer, HttpSession session) {
    String username = deliverer.getUsername();
    Optional<User> data = repository.findUserByUsername(username);
    if (!data.isPresent()) {
      Deliverer existedDeliverer = delivererRepository.save(deliverer);
      session.setAttribute("currentUser", existedDeliverer);
      return existedDeliverer;
    }
    return null;
  }


  @PostMapping("/api/admin/signUp")
  public Admin adminRegister(@RequestBody Admin admin, HttpSession session) {
    String username = admin.getUsername();


    Optional<User> data = repository.findUserByUsername(username);
    if (!data.isPresent()) {
      Admin existedAdmin = adminRepository.save(admin);
      session.setAttribute("currentUser", existedAdmin);
      return existedAdmin;
    }

    return null;
  }


  // logins
  @PostMapping("/api/customer/login")
  public Customer customerLogin(@RequestBody Customer credentials, HttpSession session) {
    String username = credentials.getUsername();
    String password = credentials.getPassword();

    Optional<Customer> result = customerRepository.findUserByCredentials(username, password);

    if (result.isPresent()) {
      Customer customer = result.get();
      session.setAttribute("currentUser", customer);
      return customer;
    }

    return null;

  }


  @PostMapping("/api/owner/logIn")
  public Owner ownerLogin(@RequestBody Owner credentials, HttpSession session) {
    String username = credentials.getUsername();
    String password = credentials.getPassword();

    Optional<Owner> result = ownerRepository.findUserByCredentials(username, password);

    if (result.isPresent()) {
      Owner owner = result.get();
      session.setAttribute("currentUser", owner);
      return owner;
    }

    return null;
  }


  @PostMapping("/api/deliverer/logIn")
  public Deliverer delivererLogin(@RequestBody Deliverer credentials, HttpSession session) {
    String username = credentials.getUsername();
    String password = credentials.getPassword();

    Optional<Deliverer> result = delivererRepository.findDelivererByCredentials(username, password);

    if (result.isPresent()) {
      Deliverer deliverer = result.get();

      session.setAttribute("currentUser", deliverer);
      return deliverer;
    }

    return null;
  }


  @PostMapping("/api/admin/logIn")
  public Admin adminLogin(@RequestBody Admin credentials, HttpSession session) {
    String username = credentials.getUsername();
    String password = credentials.getPassword();
    Optional<Admin> result = adminRepository.findUserByCredentials(username, password);
    if (result.isPresent()) {
      Admin admin = result.get();
      session.setAttribute("currentUser", admin);
      return admin;
    }
    return null;
  }


  @PostMapping("/api/currentUser/logOut")
  public void logout(HttpSession session) {
    session.invalidate();
  }

  @PostMapping("/api/admin/create/user")
  public User adminCreateUser(@RequestBody User user) {
    switch (user.getUserType()) {
      case "CUSTOMER_USER":
        Customer customer = new Customer();
        customer.setPassword(user.getPassword());
        customer.setUsername(user.getUsername());
        return customerRepository.save(customer);
      case "OWNER_USER":
        Owner owner = new Owner();
        owner.setPassword(user.getPassword());
        owner.setUsername(user.getUsername());
        return ownerRepository.save(owner);
      case "DELIVERER_USER":
        Deliverer deliverer = new Deliverer();
        deliverer.setPassword(user.getPassword());
        deliverer.setUsername(user.getUsername());
        return delivererRepository.save(deliverer);
      default:
        return null;
    }
  }

  @PutMapping("/api/user/profile/update")
  public User userProfileUpdate(@RequestBody User user, HttpSession session) {
    Optional<User> data = repository.findById(user.getId());
    if (data.isPresent()) {
      User existedUser = data.get();
      existedUser.setUsername(user.getUsername());
      existedUser.setEmail(user.getEmail());
      existedUser.setPassword(user.getPassword());
      existedUser.setAddress(user.getAddress());
      existedUser.setPhone(user.getPhone());
      session.setAttribute("currentUser", existedUser);
      return repository.save(existedUser);
    } else {
      return null;
    }

  }

  @PutMapping("/api/deliverer/profile/update")
  public Deliverer delivererProfileUpdate(@RequestBody Deliverer deliverer, HttpSession session) {
    Optional<Deliverer> data = delivererRepository.findById(deliverer.getId());
    if (data.isPresent()) {
      Deliverer existedUser = data.get();
      existedUser.setUsername(deliverer.getUsername());
      existedUser.setEmail(deliverer.getEmail());
      existedUser.setPassword(deliverer.getPassword());
      existedUser.setAddress(deliverer.getAddress());
      existedUser.setPhone(deliverer.getPhone());
      existedUser.setCarPlate(deliverer.getCarPlate());
      session.setAttribute("currentUser", existedUser);
      return delivererRepository.save(existedUser);
    } else {
      return null;
    }

  }


  @PutMapping("/api/admin/deliverer/update")
  public Deliverer adminUpdateDeliverer(@RequestBody Deliverer deliverer) {
    Optional<Deliverer> data = delivererRepository.findById(deliverer.getId());
    if (data.isPresent()) {
      Deliverer existedUser = data.get();
      existedUser.setUsername(deliverer.getUsername());
      existedUser.setEmail(deliverer.getEmail());
      existedUser.setPassword(deliverer.getPassword());
      existedUser.setAddress(deliverer.getAddress());
      existedUser.setPhone(deliverer.getPhone());
      existedUser.setCarPlate(deliverer.getCarPlate());
      existedUser.setRatingAmount(deliverer.getRatingAmount());
      existedUser.setRating(deliverer.getRating());
      return delivererRepository.save(existedUser);
    } else {
      return null;
    }

  }

  @PutMapping("/api/admin/user/update")
  public User adminUpdateUser(@RequestBody User user) {
    Optional<User> data = repository.findById(user.getId());
    if (data.isPresent()) {
      User existedUser = data.get();
      existedUser.setUsername(user.getUsername());
      existedUser.setEmail(user.getEmail());
      existedUser.setPassword(user.getPassword());
      existedUser.setAddress(user.getAddress());
      existedUser.setPhone(user.getPhone());
      return repository.save(existedUser);
    } else {
      return null;
    }

  }

  @DeleteMapping("/api/user/delete/{userId}")
  public void deleteUserById(@PathVariable("userId") int userId) {
    repository.deleteById(userId);
  }

}
	
	
	
	
	
	
	
	
	


