package com.example.mindbuilderbackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("STUDENT")
public class Student extends User {
    private int studentRank; // Renamed from 'rank'
    private int totalMarks;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Parent parent;
}