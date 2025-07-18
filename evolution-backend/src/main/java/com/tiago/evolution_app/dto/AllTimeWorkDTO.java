package com.tiago.evolution_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AllTimeWorkDTO{

    private  String date;

    private  Long activityId;

    private  Double HoursOfWork;


}
