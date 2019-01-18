package edu.northeastern.zry.models;

import javax.persistence.*;

@Entity
@DiscriminatorValue(value="Admin")
public class Admin  extends User{


	public Admin() {
		super( "ADMIN_USER");
	}

	
}
