package com.example.mindbuilderbackend.model;

import com.example.mindbuilderbackend.model.Student;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;


@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("PARENT")
public class Parent extends User {

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Student> children = new ArrayList<>();
}