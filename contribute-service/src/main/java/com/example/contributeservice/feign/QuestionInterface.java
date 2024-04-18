package com.example.contributeservice.feign;

import com.example.contributeservice.model.Question;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
@Component
@FeignClient("QUESTION-SERVICE")
public interface QuestionInterface {
    @PostMapping("question/add")
    public ResponseEntity<String> addQuestion(@RequestBody List<Question> questions);
}

