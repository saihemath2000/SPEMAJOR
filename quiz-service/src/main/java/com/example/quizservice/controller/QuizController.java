package com.example.quizservice.controller;


import com.example.quizservice.model.QuestionWrapper;
import com.example.quizservice.model.QuizDto;
import com.example.quizservice.model.Response;
import com.example.quizservice.service.QuizService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("quiz")
@CrossOrigin(origins = "*")
public class QuizController {

    private static final Logger log= LoggerFactory.getLogger(QuizController.class);
    @Autowired
    QuizService quizService;
    @PostMapping("create")
    public ResponseEntity<Integer> createQuiz(@RequestBody QuizDto quizDto){
         log.info("quiz got created");
         return quizService.createQuiz(quizDto.getCategoryName(),quizDto.getNumQ(), quizDto.getDifficulty_Level(), quizDto.getTitle());
    }
    @GetMapping("get/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable Integer id){
          log.info("Questions of quiz are fetched");
          return quizService.getQuizQuestions(id);
    }
    @PostMapping("submit/{id}")
    public ResponseEntity<Integer> getScore(@PathVariable Integer id, @RequestBody List<Response> responses){
        log.info("responses of user got submitted");
        return quizService.calculateResult(id,responses);
    }

}

