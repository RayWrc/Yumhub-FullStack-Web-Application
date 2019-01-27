package edu.northeastern.zry.models;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue(value = "Admin")
public class Admin extends User {


  public Admin() {
    super("ADMIN_USER");
  }


}
