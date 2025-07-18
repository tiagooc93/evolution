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
@Table(
        name = "activity",
        uniqueConstraints = @UniqueConstraint(columnNames = {"activityName", "activityGroup"})
)
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String activityName;

    @Column(nullable = false)
    private Double activityGoal;

    private String activityGroup;

    private boolean isDeleted = false;

    //@ManyToOne
    //@JoinColumn(name = "activity-user-id")
    private Long userId;

    public Activity(String activityName, String activityGroup, Double activityGoal, Long userId){
        this.activityName = activityName;
        this.activityGroup = activityGroup;
        this.activityGoal = activityGoal;
        this.userId = userId;

    }

}
