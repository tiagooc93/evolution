package com.tiago.evolution_app.controller;

import com.tiago.evolution_app.dto.AllTimeWorkDTO;
import com.tiago.evolution_app.model.Work;
import com.tiago.evolution_app.service.WorkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/work")
@Slf4j
public class WorkController {

    @Autowired
    WorkService workService;

    //TEM Q GARANTIR Q A DATA QUE CHEGA ESTA NO FORMATO CERTO, PESQUISAR QUAL O TIPO CERTO DE SALVAR DATA, jogar excessao se formato for errado
    @PostMapping("/create")
    public ResponseEntity<Work> saveWork(@RequestBody Work work){
        log.info("POST /api/work/create called");
        return ResponseEntity.ok(workService.saveWork(work));
    }

    @GetMapping("/{activityId}")
    public ResponseEntity<Double> getTodayWorkFromActivity(@PathVariable Long activityId){
        log.info("POST /api/work/{} called", activityId);
        return ResponseEntity.ok(workService.activityWorkToday(activityId));

    }

    @GetMapping("/all-time/{userId}")
    public ResponseEntity<List<AllTimeWorkDTO>> allTimeWork(@PathVariable Long userId){
        log.info("POST /api/work/all-time/{} called", userId);

        Map<String,Map<Long,Double>> allTimeWork = workService.allTimeWork(userId);
        List<AllTimeWorkDTO> response = new ArrayList<>();

        for (Map.Entry<String,Map<Long,Double>> i :allTimeWork.entrySet()) {
            System.out.println(i.getKey() + " " + i.getValue());

            for (Map.Entry<Long,Double> j :i.getValue().entrySet()) {
                System.out.println(j.getKey() + " " + j.getValue());

                response.add(new AllTimeWorkDTO(i.getKey(),j.getKey(),j.getValue()));
            }
        }

        return ResponseEntity.ok(response);

    }

}
