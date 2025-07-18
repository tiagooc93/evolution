package com.tiago.evolution_app.repository;

import com.tiago.evolution_app.model.Work;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkRepository extends JpaRepository<Work, Long> {

    List<Work> findByUserIdOrderByDateAsc(Long userId);

    List<Work> findByUserIdAndDate(Long userId, String date);

    List<Work> findByActivityIdAndDate(Long activityId, String date);

    boolean existsById(Long activityId);
}
