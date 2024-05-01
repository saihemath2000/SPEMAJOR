package com.example.contributeservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableFeignClients
public class ContributeServiceApplication {
	private static final Logger logger= LoggerFactory.getLogger(ContributeServiceApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(ContributeServiceApplication.class, args);
	}

}
