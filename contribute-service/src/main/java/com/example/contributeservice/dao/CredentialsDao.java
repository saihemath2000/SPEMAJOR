package com.example.contributeservice.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.contributeservice.model.Credentials;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CredentialsDao extends JpaRepository<Credentials, Integer> {
    @Query(value = "Select * from Credentials q WHERE q.email=:email",nativeQuery = true)
    Credentials findByEmail(String email);
}
