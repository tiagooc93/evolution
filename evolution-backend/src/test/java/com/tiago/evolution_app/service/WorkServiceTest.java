package com.tiago.evolution_app.service;

import com.tiago.evolution_app.model.Work;
import com.tiago.evolution_app.repository.WorkRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class WorkServiceTest {
    @Mock
    WorkRepository workRepository;

    @InjectMocks
    WorkService workService;

    @Test
    public void testSaveWork(){
        //Arrange
        Work work = new Work();
        work.setUserId(1L);
        work.setActivityId(1L);
        work.setHoursOfWork(100.0);
        work.setDate("27/06/2025");

        when(workRepository.save(work)).thenReturn(work);

        //Act
        Work savedWork = workService.saveWork(work);

        //Assert
        assertEquals(work.getUserId(),savedWork.getUserId());
        assertEquals(work.getActivityId(),savedWork.getActivityId());
        assertEquals(work.getHoursOfWork(),savedWork.getHoursOfWork());
        assertEquals(work.getDate(),savedWork.getDate());
    }

    @Test
    public void testWorkOnGivenDate(){
        //Arrange
        Work work1 = new Work();
        work1.setUserId(1L);
        work1.setDate("26/06/2025");

        Work work2 = new Work();
        work2.setUserId(1L);
        work2.setDate("27/06/2025");

        Work work3 = new Work();
        work3.setUserId(1L);
        work3.setDate("27/06/2025");

        Long userId = 1L;
        String date = "27/06/2025";

        List<Work> workDoneOnDate = new ArrayList<>();
        workDoneOnDate.add(work2);
        workDoneOnDate.add(work3);

        //Act
        when(workRepository.findByUserIdAndDate(userId, date)).thenReturn(workDoneOnDate);

        //Assert
        List<Work> returnedWork = workService.workOnGivenDate(date, userId);
        assertEquals(date, returnedWork.get(0).getDate());
        assertEquals(date, returnedWork.get(1).getDate());
    }

}