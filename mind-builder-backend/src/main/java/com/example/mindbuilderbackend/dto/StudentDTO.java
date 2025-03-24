package com.example.mindbuilderbackend.dto;

import lombok.Data;

@Data
public class StudentDTO {
    private Long id;
    private String name;
    private String email;
    private Long parentId;
    private Integer rank;
    private Integer totalMarks;
}