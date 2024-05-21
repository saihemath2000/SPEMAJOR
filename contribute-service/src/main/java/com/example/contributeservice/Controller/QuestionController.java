package com.example.contributeservice.Controller;

import com.example.contributeservice.Service.QuestionService;
import com.example.contributeservice.model.Credentials;
import com.example.contributeservice.model.Question;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("contribute")
@CrossOrigin(origins="*")
public class QuestionController {
    private static final Logger log= LoggerFactory.getLogger(QuestionController.class);
    @Autowired
    QuestionService questionService;
    @GetMapping("/")
    public String hello(){
        return "Hello";
    }
    @PostMapping("/add")
    public ResponseEntity<String> addQuestion(@RequestBody List<Question> questions){
        log.info("added question --> contribute");
        return questionService.addQuestion(questions);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody  Credentials credentials) {
        if (questionService.validateCredentials(credentials.getEmail(), credentials.getPassword())) {
            log.info("Admin got logged in");
            return ResponseEntity.ok("Login successful"); // Return success message
        } else {
            log.error("not able to login");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password"); // Return unauthorized status
        }
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<String> removeQuestion(@PathVariable Integer id){
        log.info("question deleted");
        return questionService.removeQuestion(id);
    }

    @PostMapping("/approve")
    public ResponseEntity<String> approveQuestion(@RequestBody List<Question> question){
        log.info("question got approved by admin");
        return questionService.approveQuestion(question);
    }

    @GetMapping("/allQuestions")
    public ResponseEntity<List<Question>> getAllQuestions(){
        log.info("All questions fetched --> contribute");
        return questionService.getAllQuestions();
    }
}
