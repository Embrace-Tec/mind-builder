package com.example.mindbuilderbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "iq_games")
@NoArgsConstructor
@AllArgsConstructor
public class IQGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameId;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = true)
    private Teacher teacher;

    private String title;

    private String difficultyLevel;

    @OneToMany(mappedBy = "iqGame", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Lesson> lessons = new ArrayList<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentGameResult> results = new ArrayList<>();

    public IQGame(Teacher teacher, String title, String difficultyLevel) {
        this.teacher = teacher;
        this.title = title;
        this.difficultyLevel = difficultyLevel;
        this.lessons = new ArrayList<>();
        this.results = new ArrayList<>();
    }

}
