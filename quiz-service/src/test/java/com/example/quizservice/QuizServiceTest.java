package com.example.quizservice;

import com.example.quizservice.dao.QuizDao;
import com.example.quizservice.feign.QuizInterface;
import com.example.quizservice.model.QuestionWrapper;
import com.example.quizservice.model.Quiz;
import com.example.quizservice.model.Response;
import com.example.quizservice.service.QuizService;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class QuizServiceTest {

    @Mock
    private QuizDao quizDao;

    @Mock
    private QuizInterface quizInterface;

    @InjectMocks
    private QuizService quizService;

    private Quiz testQuiz;
    private List<QuestionWrapper> testQuestions;
    private List<Response> testResponses;

    @BeforeEach
    void setUp() {
        // Create a test quiz
        testQuiz = new Quiz();
        testQuiz.setId(1);
        testQuiz.setTitle("Test Quiz");
        testQuiz.setSetQuestionIds(Arrays.asList(1, 2, 3));

        // Create test question wrappers
        testQuestions = Arrays.asList(
                new QuestionWrapper(1, "Question 1", "Option 1", "Option 2", "Option 3", "Option 4", "Option 1"),
                new QuestionWrapper(2, "Question 2", "Option A", "Option B", "Option C", "Option D", "Option C"),
                new QuestionWrapper(3, "Question 3", "Option X", "Option Y", "Option Z", "Option W", "Option W")
        );

        // Create test responses
        testResponses = Arrays.asList(
                new Response(1, "Option 1"),
                new Response(2, "Option C"),
                new Response(3, "Option W")
        );
    }

    @Test
    void testCreateQuiz() {
        String category = "Test Category";
        int numQ = 3;
        String difficultyLevel = "Easy";
        String title = "Test Quiz";

        // Mock quizInterface.getQuestionsForQuiz() response
        when(quizInterface.getQuestionsForQuiz(category, numQ, difficultyLevel, title))
                .thenReturn(ResponseEntity.ok(Arrays.asList(1, 2, 3)));

        // Mock quizDao.save() response
        when(quizDao.save(any(Quiz.class))).thenReturn(testQuiz);

        ResponseEntity<Integer> response = quizService.createQuiz(category, numQ, difficultyLevel, title);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testQuiz.getId(), response.getBody());
        verify(quizDao, times(1)).save(any(Quiz.class));
    }

    @Test
    void testGetQuizQuestions() {
        int quizId = 1;

        // Mock quizDao.findById() response
        when(quizDao.findById(quizId)).thenReturn(Optional.of(testQuiz));

        // Mock quizInterface.getQuestionsFromId() response
        when(quizInterface.getQuestionsFromId(testQuiz.getSetQuestionIds()))
                .thenReturn(ResponseEntity.ok(testQuestions));

        ResponseEntity<List<QuestionWrapper>> response = quizService.getQuizQuestions(quizId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testQuestions.size(), response.getBody().size());
    }

    @Test
    void testCalculateResult() {
        int quizId = 1;

        //Mock quizInterface.getScore() response
        when(quizInterface.getScore(testResponses)).thenReturn(ResponseEntity.ok(3));

        ResponseEntity<Integer> response = quizService.calculateResult(quizId, testResponses);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(3, response.getBody());
    }
}