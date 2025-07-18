package com.tiago.evolution_app.controller;

import ch.qos.logback.core.joran.action.ActionUtil;
import com.tiago.evolution_app.dto.DeleteActivityDTO;
import com.tiago.evolution_app.model.Activity;
import com.tiago.evolution_app.service.ActivityService;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/activity")
@CrossOrigin
@Slf4j
public class ActivityController {


    @Autowired
    ActivityService activityService;

    @PostMapping("/create")
    public ResponseEntity<Activity> createActivity(@RequestBody Activity activity){
        log.info("POST /api/activity/create called");
        return ResponseEntity.ok(activityService.createActivity((activity)));

    }

    @GetMapping("/list")
    public ResponseEntity<List<Activity>> listAllActivities(){
        log.info("GET /api/activity/list");
        return ResponseEntity.ok(activityService.listAllActivities());
    }

    //ENTENDER MELHOR OS RESPONSE ENTITY, ESSE CASO PODE SER QUE RETORNE UM ERRO DE NOT FOUND
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Activity>> listActivitiesByUserId(@PathVariable Long userId){
        log.info("GET /api/activity/user/{} called", userId);
        return ResponseEntity.ok(activityService.listActivitiesByUserId(userId));
    }

    @GetMapping("/{activityId}")
    public ResponseEntity<Optional<Activity>> listActivitiesById(@PathVariable Long activityId){
        log.info("GET /api/activity/{} called", activityId);
        return ResponseEntity.ok(activityService.getActivityById(activityId));
    }

    @PostMapping("/update-time")
    public void updateActivityTime(){

    }

    @PostMapping("/delete")
    public ResponseEntity<Void> deleteActivity(@RequestBody DeleteActivityDTO deleteActivityDTO){
        log.info("POST /api/activity/delete called");

        activityService.deleteActivity(deleteActivityDTO.getActivityId());

        return ResponseEntity.noContent().build();
    }



}
