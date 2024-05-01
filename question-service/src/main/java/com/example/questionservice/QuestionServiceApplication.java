package com.example.questionservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;




@SpringBootApplication

public class QuestionServiceApplication {

   private static final Logger logger= LoggerFactory.getLogger(QuestionServiceApplication.class);
	public static void main(String[] args) {
		logger.info("start of execution");
		SpringApplication.run(QuestionServiceApplication.class, args);
	}



}
