//package com.example.apigateway;
//
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class FallBackMethodController {
//   @GetMapping("/questionServiceFallBack")
//    public String questionServiceFallBackMethod(){
//       return "question service is taking longer than Expected please try again later";
//   }
//
//    @GetMapping("/quizServiceFallBack")
//    public String quizServiceFallBackMethod(){
//        return "quiz service is taking longer than Expected please try again later";
//    }
//
//    @GetMapping("/contributeServiceFallBack")
//    public String contributeServiceFallBackMethod(){
//        return "contribute service is taking longer than Expected please try again later";
//    }
//}
