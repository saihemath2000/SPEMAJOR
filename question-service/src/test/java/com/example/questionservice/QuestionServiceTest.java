package com.example.questionservice;

import com.example.questionservice.dao.QuestionDao;
import com.example.questionservice.model.Question;
import com.example.questionservice.model.Response;
import com.example.questionservice.model.QuestionWrapper;
import com.example.questionservice.service.QuestionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class QuestionServiceTest {

    @Mock
    private QuestionDao questionDao;

    @InjectMocks
    private QuestionService questionService;

    private List<Question> testQuestions;

    @BeforeEach
    void setUp() {
        testQuestions = Arrays.asList(
                new Question(1, "Question 1", "Option 1", "Option 2", "Option 3", "Option 4", "Option 1"),
                new Question(2, "Question 2", "Option A", "Option B", "Option C", "Option D", "Option C")
        );
    }

    @Test
    void testGetAllQuestions() {
        when(questionDao.findAll()).thenReturn(testQuestions);

        ResponseEntity<List<Question>> response = questionService.getAllQuestions();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testQuestions, response.getBody());
    }

    @Test
    void testGetAllQuestionsByCategory() {
        String category = "Test";
        when(questionDao.findByCategory(category)).thenReturn(testQuestions);

        ResponseEntity<List<Question>> response = questionService.getAllQuestionsByCategory(category);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testQuestions, response.getBody());
    }

    @Test
    void testAddQuestion() {
        ResponseEntity<String> response = questionService.addQuestion(testQuestions);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("success", response.getBody());
        verify(questionDao, times(testQuestions.size())).save(any(Question.class));
    }

    @Test
    void testGetQuestionsFromId() {
        List<Integer> questionIds = Arrays.asList(1, 2);
        when(questionDao.findById(1)).thenReturn(Optional.of(testQuestions.get(0)));
        when(questionDao.findById(2)).thenReturn(Optional.of(testQuestions.get(1)));

        ResponseEntity<List<QuestionWrapper>> response = questionService.getQuestionsFromId(questionIds);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
    }

//    @Test
//    void testGetScore() {
//        List<Response> responses = Arrays.asList(
//                new Response(1, "Option 1"),
//                new Response(2, "Option C")
//        );
//        when(questionDao.findById(1)).thenReturn(Optional.of(testQuestions.get(0)));
//        when(questionDao.findById(2)).thenReturn(Optional.of(testQuestions.get(1)));
//
//        ResponseEntity<Integer> response = questionService.getScore(responses);
//
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(2, response.getBody());
//    }

    @Test
    void testGetAllCategories() {
        Set<String> categories = Set.of("Category1", "Category2");
        List<Question> allQuestions = new ArrayList<>(testQuestions);
        allQuestions.forEach(q -> q.setCategory("Category1"));
        allQuestions.add(new Question(3, "Question 3", "Option 1", "Option 2", "Option 3", "Option 4", "Option 1"));
        allQuestions.get(2).setCategory("Category2");

        when(questionDao.findAll()).thenReturn(allQuestions);

        Set<String> result = questionService.getAllCategories();

        assertEquals(categories, result);
    }
}