package com.example.contributeservice.model;

import jakarta.persistence.*;
import lombok.Data;



@Data
@Entity
@Table(name="Credentials")
public class Credentials {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String email;
    private String password;

    public Credentials(String email, String password) {
    }
    public Credentials() {

    }
}
