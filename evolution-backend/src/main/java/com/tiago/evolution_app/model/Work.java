package com.tiago.evolution_app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long activityId;

    @Column(nullable = false)
    private Double hoursOfWork;

    @Column(nullable = false)
    private String date;

    public Work(Long userId, Long activityId, Double hoursOfWork, String date){
        this.userId = userId;
        this.activityId = activityId;
        this.hoursOfWork = hoursOfWork;
        this.date = date;
    }

}
