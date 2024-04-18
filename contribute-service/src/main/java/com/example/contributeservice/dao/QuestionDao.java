package com.example.contributeservice.dao;



import com.example.contributeservice.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionDao extends JpaRepository<Question, Integer> {
  List<Question>  findByCategory(String category);

  @Query(value = "SELECT q.id FROM questions q WHERE q.category=:category AND q.difficulty_Level=:difficulty_Level  ORDER BY RAND() LIMIT :numQ", nativeQuery = true)
  List<Integer> findRandomQuestionsByCategory(String category, int numQ, String difficulty_Level);
}
