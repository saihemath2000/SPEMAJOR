package com.example.contributeservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableFeignClients
public class ContributeServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContributeServiceApplication.class, args);
	}

}
