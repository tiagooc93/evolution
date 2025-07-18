package com.tiago.evolution_app.service;

import com.tiago.evolution_app.model.Work;
import com.tiago.evolution_app.repository.UserRepository;
import com.tiago.evolution_app.repository.WorkRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class WorkService {

    @Autowired
    WorkRepository workRepository;

    @Autowired
    UserRepository userRepository;

    public Work saveWork(@RequestBody Work work){
        log.info("Saving Work {}", work.toString());

        return workRepository.save(work);
    }

    public List<Work> workOnGivenDate(String date, Long userId){
        log.info("Listing all works done on a given date by user, date: {}, user ID: {}", date, userId);
        return workRepository.findByUserIdAndDate(userId, date);

    }

    public Double activityWorkByDate(String date, Long userId, Long activityId){
        log.info(
                "Calculating hours of work done on a given date by user on a given activity, " +
                        "date: {}, " +
                        "user ID: {}, " +
                        "activity ID: {}",
                date, userId, activityId
        );

        List<Work> allWorkOfToday = workRepository.findByUserIdAndDate(userId, date);

        Double hoursOfWork = 0.0;

        for(int i=0; i < allWorkOfToday.size(); i++) {
            if(allWorkOfToday.get(i).getActivityId() == activityId) {
                hoursOfWork += allWorkOfToday.get(i).getHoursOfWork();
            }
        }

        return hoursOfWork;
    }

    public Double activityWorkToday(Long activityId){
        log.info("Calculating all work done today on activity of ID: {}", activityId);

        if(!workRepository.existsById(activityId)){
            throw new RuntimeException("Activity of given Id does not exist");
        }

        LocalDate localDate = LocalDate.now();
        String date = localDate.format(DateTimeFormatter.ofPattern("dd/MM/YYYY"));

        List<Work> allWorkOfToday = workRepository.findByActivityIdAndDate(activityId, date);

        Double hoursOfWork = 0.0;

        for(int i=0; i < allWorkOfToday.size(); i++) {
            if(allWorkOfToday.get(i).getActivityId() == activityId) {
                hoursOfWork += allWorkOfToday.get(i).getHoursOfWork();
            }
        }

        return hoursOfWork;
    }

    public Map<String,Map<Long,Double>> allTimeWork(Long userId){
        log.info("Listing all time works done by a user of ID: {}", userId);

        if(!userRepository.existsById(userId)){
            throw new RuntimeException("User of given Id does not exist");
        }

        List<Work> allWork = workRepository.findByUserIdOrderByDateAsc(userId);

        Map<String,Map<Long,Double>> allWorkResponse = new HashMap<>();

        String currentDate = allWork.get(0).getDate();
        Boolean changeDate = false;
        Double activityWorkOnDay = 0.0;
        Long currentId = null;
        Long previousId = null;

        Map<Long,Double> activitiesWorkOnDate = new HashMap<>();

        int i=0;
        Map<Long,Double> activitiesWorkOnCurrentDate = new HashMap<>();

        currentDate = allWork.get(0).getDate();

        while(i < allWork.size()){
            Work currentWork = allWork.get(i);

            if (currentWork.getDate().equals(currentDate)) {
                if (activitiesWorkOnCurrentDate.containsKey(currentWork.getActivityId())){
                    activitiesWorkOnCurrentDate.put(
                            currentWork.getActivityId(),
                            activitiesWorkOnCurrentDate.get(currentWork.getActivityId()) + currentWork.getHoursOfWork()
                    );
                }
                else{
                    activitiesWorkOnCurrentDate.put(currentWork.getActivityId(), currentWork.getHoursOfWork());
                }
                i++;
            }
            else {

                allWorkResponse.put(currentDate,activitiesWorkOnCurrentDate);
                currentDate = currentWork.getDate();
                activitiesWorkOnCurrentDate = new HashMap<>();
            }
        }
        allWorkResponse.put(currentDate, activitiesWorkOnCurrentDate);

        return allWorkResponse;
    }
}
