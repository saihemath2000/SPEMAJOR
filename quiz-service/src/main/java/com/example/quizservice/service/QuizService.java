package com.example.quizservice.service;


import com.example.quizservice.dao.QuizDao;
import com.example.quizservice.feign.QuizInterface;
import com.example.quizservice.model.Question;
import com.example.quizservice.model.QuestionWrapper;
import com.example.quizservice.model.Quiz;
import com.example.quizservice.model.Response;
import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {
    @Autowired
    QuizDao quizDao;
//    @Autowired
//    QuestionDao questionDao;
    @Autowired
     QuizInterface quizInterface;
    public ResponseEntity<Integer> createQuiz(String category, int numQ, String difficulty_Level, String title) {
       List<Integer> questions = quizInterface.getQuestionsForQuiz(category,numQ,difficulty_Level,title).getBody();
       Quiz quiz = new Quiz();
       quiz.setTitle(title);
       quiz.setSetQuestionIds(questions);
       quizDao.save(quiz);
       return new ResponseEntity<>(quiz.getId(), HttpStatus.OK);
    }

    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
          Quiz quiz = quizDao.findById(id).get();
          List<Integer> questionIds = quiz.getSetQuestionIds();
          ResponseEntity<List<QuestionWrapper>> questions = quizInterface.getQuestionsFromId(questionIds);

        return questions;
    }

    public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {
          ResponseEntity<Integer> correct = quizInterface.getScore(responses);
        return correct;
    }
}
