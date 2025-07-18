package com.tiago.evolution_app;

import com.tiago.evolution_app.model.Activity;
import com.tiago.evolution_app.model.Users;
import com.tiago.evolution_app.model.Work;
import com.tiago.evolution_app.repository.ActivityRepository;
import com.tiago.evolution_app.repository.UserRepository;
import com.tiago.evolution_app.repository.WorkRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class EvolutionAppApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ActivityRepository activityRepository;
	@Autowired
	private WorkRepository workRepository;


	public static void main(String[] args) {
		log.info("Stating Application");
		SpringApplication.run(EvolutionAppApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception{
		userRepository.save(new Users("test", "test@test.com","test", "123"));




	}

}
