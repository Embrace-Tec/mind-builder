package com.example.mindbuilderbackend.config;

import com.example.mindbuilderbackend.model.IQGame;
import com.example.mindbuilderbackend.repository.IQGameRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;

/**
 * @author : L.H.J
 * @File: GameInitializer
 * @mailto : lharshana2002@gmail.com
 * @created : 2025-05-07, Wednesday
 **/
@Configuration
public class GameInitializer {

    @Bean
    CommandLineRunner initGames(IQGameRepository gameRepository) {
        return args -> {
            if (gameRepository.count() == 0) { // prevent duplicate insertion
                gameRepository.save(new IQGame(null, null, "Alphabet Game", "Easy", new ArrayList<>(), new ArrayList<>()));
                gameRepository.save(new IQGame(null, null, "Number Game", "Easy", new ArrayList<>(), new ArrayList<>()));
                gameRepository.save(new IQGame(null, null, "Color Game", "Easy", new ArrayList<>(), new ArrayList<>()));
                gameRepository.save(new IQGame(null, null, "Animal Game", "Easy", new ArrayList<>(), new ArrayList<>()));
                gameRepository.save(new IQGame(null, null, "Shape Game", "Easy", new ArrayList<>(), new ArrayList<>()));
                gameRepository.save(new IQGame(null, null, "Memory Game", "Medium", new ArrayList<>(), new ArrayList<>()));
            }
        };
    }
}
