package com.tiago.evolution_app.repository;

import com.tiago.evolution_app.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByUserId(Long userId);

    boolean existsByActivityNameAndActivityGroup(String name, String group);
}
