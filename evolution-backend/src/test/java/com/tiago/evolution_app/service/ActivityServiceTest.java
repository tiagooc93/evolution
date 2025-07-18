package com.tiago.evolution_app.service;

import com.tiago.evolution_app.model.Activity;
import com.tiago.evolution_app.repository.ActivityRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ActivityServiceTest {

    @Mock
    private ActivityRepository activityRepository;
    @InjectMocks
    private ActivityService activityService;

    @Test
    public void createActivityTest(){
        //Arrange
        Activity activity = new Activity();
        activity.setActivityName("programming");
        activity.setActivityGoal(500.0);
        activity.setActivityGroup("work");

        when(activityRepository.save(activity)).thenReturn(activity);
        //Act
        Activity createdActivity = activityService.createActivity(activity);

        //Assert
        assertEquals(activity.getActivityName(),createdActivity.getActivityName());
        assertEquals(activity.getActivityGoal(),createdActivity.getActivityGoal());
        assertEquals(activity.getActivityGroup(),createdActivity.getActivityGroup());

    }

    @Test
    public void testCreateActivityWithSameGroupAndNameOfAnother(){
        //Arrange
        Activity activity = new Activity();
        activity.setActivityName("programming");
        activity.setActivityGoal(500.0);
        activity.setActivityGroup("work");

        when(
                activityRepository.existsByActivityNameAndActivityGroup(
                        activity.getActivityName(),
                        activity.getActivityGroup())
        ).thenReturn(true);

        //Act and Assert
        assertThrows(RuntimeException.class,(() -> activityService.createActivity(activity)));
    }

}