package com.example.mindbuilderbackend.model;

import com.example.mindbuilderbackend.model.Lesson;
import com.example.mindbuilderbackend.model.Teacher;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "iq_games")
public class IQGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameId;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;

    private String title;

    private String difficultyLevel;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentGameResult> results = new ArrayList<>();
}