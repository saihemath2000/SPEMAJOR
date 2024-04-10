package com.example.contributeservice.Controller;

import com.example.contributeservice.Service.QuestionService;
import com.example.contributeservice.model.Credentials;
import com.example.contributeservice.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("contribute")
@CrossOrigin(origins="*")
public class QuestionController {
    @Autowired
    QuestionService questionService;
    @GetMapping("/")
    public String hello(){
        return "Hello";
    }
    @PostMapping("/add")
    public ResponseEntity<String> addQuestion(@RequestBody List<Question> questions){
        return questionService.addQuestion(questions);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody  Credentials credentials) {
        if (questionService.validateCredentials(credentials.getEmail(), credentials.getPassword())) {
            return ResponseEntity.ok("Login successful"); // Return success message
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password"); // Return unauthorized status
        }
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<String> removeQuestion(@PathVariable Integer id){
        return questionService.removeQuestion(id);
    }

    @PostMapping("/approve")
    public ResponseEntity<String> approveQuestion(@RequestBody List<Question> question){
        return questionService.approveQuestion(question);
    }

    @GetMapping("/allQuestions")
    public ResponseEntity<List<Question>> getAllQuestions(){
        return questionService.getAllQuestions();
    }
}
