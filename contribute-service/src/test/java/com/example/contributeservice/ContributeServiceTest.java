package com.example.contributeservice;

import com.example.contributeservice.Service.QuestionService;
import com.example.contributeservice.dao.CredentialsDao;
import com.example.contributeservice.dao.QuestionDao;
import com.example.contributeservice.feign.QuestionInterface;
import com.example.contributeservice.model.Credentials;
import com.example.contributeservice.model.Question;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ContributeServiceTest {

    @Mock
    private QuestionDao questionDao;

    @Mock
    private CredentialsDao credentialsDao;

    @Mock
    private QuestionInterface questionInterface;

    @InjectMocks
    private QuestionService contributeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testAddQuestion() {
        List<Question> questions = Arrays.asList(
                new Question(1, "Question 1", "Option A", "Option B", "Option C", "Option D", "Option A"),
                new Question(2, "Question 2", "Option X", "Option Y", "Option Z", "Option W", "Option Z")
        );

        when(questionDao.save(any(Question.class))).thenReturn(null);

        ResponseEntity<String> response = contributeService.addQuestion(questions);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("success", response.getBody());

        verify(questionDao, times(2)).save(any(Question.class));
    }

//    @Test
//    void testValidateCredentials() {
//        String email = "test@example.com";
//        String password = "password123";
//
//        Credentials credentials = new Credentials(email, password);
//
//        when(credentialsDao.findByEmail(email)).thenReturn(credentials);
//
//        assertTrue(contributeService.validateCredentials(email, password));
//        assertFalse(contributeService.validateCredentials(email, "incorrectPassword"));
//
//        verify(credentialsDao, times(2)).findByEmail(email);
//    }

    @Test
    void testGetAllQuestions() {
        List<Question> expectedQuestions = Arrays.asList(
                new Question(1, "Question 1", "Option A", "Option B", "Option C", "Option D", "Option A"),
                new Question(2, "Question 2", "Option X", "Option Y", "Option Z", "Option W", "Option Z")
        );

        when(questionDao.findAll()).thenReturn(expectedQuestions);

        ResponseEntity<List<Question>> response = contributeService.getAllQuestions();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedQuestions, response.getBody());

        verify(questionDao, times(1)).findAll();
    }

    @Test
    void testRemoveQuestion() {
        Integer id = 1;

        doNothing().when(questionDao).deleteById(id);

        ResponseEntity<String> response = contributeService.removeQuestion(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Success", response.getBody());

        verify(questionDao, times(1)).deleteById(id);
    }

    @Test
    void testApproveQuestion() {
        List<Question> questions = Arrays.asList(
                new Question(1, "Question 1", "Option A", "Option B", "Option C", "Option D", "Option A"),
                new Question(2, "Question 2", "Option X", "Option Y", "Option Z", "Option W", "Option Z")
        );

        ResponseEntity<String> expectedResponse = new ResponseEntity<>("Success", HttpStatus.OK);

        when(questionInterface.addQuestion(questions)).thenReturn(expectedResponse);

        ResponseEntity<String> response = contributeService.approveQuestion(questions);

        assertEquals(expectedResponse, response);

        verify(questionInterface, times(1)).addQuestion(questions);
    }
}