package edu.northeastern.zry.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;


@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String username;
  private String password;
  private String firstName;
  private String lastName;
  private String email;
  private String phone;
  private String address;
  private Date registered;
  private String photoLink;
  private String userType;

  public User(String userType) {
    registered = new Date();
    this.userType = userType;
  }

  public User() {
    registered = new Date();
  }

  public User(String username, String password, String first, String last, String email, String phone, String address,
              Date reg, String link) {
    this.username = username;
    this.password = password;
    this.firstName = first;
    this.lastName = last;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.registered = reg;
    this.photoLink = link;

  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }


  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public Date getRegistered() {
    return registered;
  }

  public void setRegistered(Date registered) {
    this.registered = registered;
  }

  public String getPhotoLink() {
    return photoLink;
  }

  public void setPhotoLink(String photoLink) {
    this.photoLink = photoLink;
  }

  public String getUserType() {
    return this.userType;
  }

  public void setCarPlate(String carPlate) {

  }

  public String getCarPlate() {
    return null;
  }

  public void setUserType(String userType) {
    this.userType = userType;
  }
}
