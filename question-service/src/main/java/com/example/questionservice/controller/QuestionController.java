package com.example.questionservice.controller;


import com.example.questionservice.QuestionServiceApplication;
import com.example.questionservice.model.Question;
import com.example.questionservice.model.QuestionWrapper;
import com.example.questionservice.model.Response;
import com.example.questionservice.service.QuestionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("question")
@CrossOrigin(origins = "*")
//@Slf4j
public class QuestionController {
    private static final Logger logger= LoggerFactory.getLogger(QuestionController.class);
    @Autowired
    QuestionService questionService;
    @GetMapping("categories")
    public ResponseEntity<Set<String>> getAllCategories() {
        logger.info("fetched all categories available");
        Set<String> categories = questionService.getAllCategories();
        if (categories.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(categories);
    }
    @GetMapping("allQuestions")
    public ResponseEntity<List<Question>> getAllQuestions(){
        logger.info("All available questions are fetched");
        return questionService.getAllQuestions();
    }

    @GetMapping("category/{category}")
    public ResponseEntity<List<Question>> getAllQuestionsByCategory(@PathVariable String category){
        logger.info("Questions of given category are fetched");
        return questionService.getAllQuestionsByCategory(category);
    }

    @PostMapping("add")
    public ResponseEntity<String> addQuestion(@RequestBody List<Question> questions){
        logger.info("New question is added");
        return questionService.addQuestion(questions);
    }

    @GetMapping("generate")
    public ResponseEntity<List<Integer>> getQuestionsForQuiz(@RequestParam String categoryName, @RequestParam Integer numQ, @RequestParam String difficulty_Level){
        logger.info("categoryname, numq,difficutlylevel and title of quiz are given");
        return questionService.getQuestionsForQuiz(categoryName, numQ, difficulty_Level);
    }

    @PostMapping("getQuestions")
    public ResponseEntity<List<QuestionWrapper>> getQuestionsFromId(@RequestBody List<Integer> questionIds){
        logger.info("Questions of quiz selected");
        return questionService.getQuestionsFromId(questionIds);
    }

    @PostMapping("getScore")
    public ResponseEntity<Integer> getScore(@RequestBody List<Response> responses){
        logger.info("Hurray this is your final result");
        return questionService.getScore(responses);
    }
}
