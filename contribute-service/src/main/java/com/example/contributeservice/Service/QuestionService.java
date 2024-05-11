package com.example.contributeservice.Service;

import com.example.contributeservice.dao.CredentialsDao;
import com.example.contributeservice.dao.QuestionDao;
import com.example.contributeservice.feign.QuestionInterface;
import com.example.contributeservice.model.Credentials;
import com.example.contributeservice.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {

    @Autowired
    QuestionDao questionDao;
    @Autowired
    CredentialsDao credentialsDao;
    @Autowired
    QuestionInterface questionInterface;

    public ResponseEntity<String> addQuestion(List<Question> questions) {
        for(Question question : questions){
            questionDao.save(question);
        }
        return new ResponseEntity<>("success", HttpStatus.CREATED);
    }

    public boolean validateCredentials(String email, String password) {
        Credentials credentials = credentialsDao.findByEmail(email);
        if (credentials != null && password != null && password.equals(credentials.getPassword())) {
            return true; // Email and password match
        }
        return false; // Email or password is incorrect
    }


    public ResponseEntity<List<Question>> getAllQuestions(){
        try {
            return new ResponseEntity<>(questionDao.findAll(), HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> removeQuestion(Integer id) {
        questionDao.deleteById(id);
        return new ResponseEntity<>("Success",HttpStatus.OK);
    }

    public ResponseEntity<String> approveQuestion(List<Question> question) {
         questionInterface.addQuestion(question);
         return new ResponseEntity<>("Success",HttpStatus.OK);
    }
}
