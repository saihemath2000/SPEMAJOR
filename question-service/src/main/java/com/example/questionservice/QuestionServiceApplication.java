package com.example.questionservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication

public class QuestionServiceApplication {


	public static void main(String[] args) {
		String temp= System.getenv("MYSQL_USERNAME");
		if(temp!=null)
			 System.out.print("not found");
		else System.out.print(temp);
		SpringApplication.run(QuestionServiceApplication.class, args);
	}



}
