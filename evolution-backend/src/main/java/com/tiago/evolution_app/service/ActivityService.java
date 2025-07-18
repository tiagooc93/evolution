package com.tiago.evolution_app.service;

import com.tiago.evolution_app.model.Activity;
import com.tiago.evolution_app.repository.ActivityRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    public Activity createActivity(Activity activity){
        log.info("Saving activity: {}", activity.toString());

        if (activityRepository.existsByActivityNameAndActivityGroup(activity.getActivityName(), activity.getActivityGroup())){
            throw new RuntimeException("Activity with same name and group already exists");
        }

        return activityRepository.save(activity);
    }

    public List<Activity> listAllActivities(){
        log.info("Listing all activies of all users");
        return activityRepository.findAll();
    }

    public List<Activity> listActivitiesByUserId(Long userId){
        log.info("Listing activities by user ID: {}", userId);
        return activityRepository.findByUserId(userId);
    }

    public Optional<Activity> getActivityById(Long activityId){
        log.info("Listing activity by ID: {}", activityId);
        return activityRepository.findById(activityId);
    }

    public ResponseEntity<Activity> updateActivityTime(Long activityId){
        log.info("Updating activity time by ID: {}", activityId);
        Activity activity = activityRepository.findById(activityId).get();

        return ResponseEntity.ok(activityRepository.save(activity));
    }
    public void deleteActivity(Long activityId){
        log.info("Deleting activity: {}", activityId);

        Activity activity = activityRepository.findById(
                activityId).orElseThrow(
                        () -> new RuntimeException("Activity not found !")
        );

        activity.setDeleted(true);

        activityRepository.save(activity);
    }


}


