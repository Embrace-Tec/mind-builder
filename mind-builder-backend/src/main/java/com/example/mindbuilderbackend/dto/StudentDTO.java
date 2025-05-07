package com.example.mindbuilderbackend.dto;

import lombok.Data;

@Data
public class StudentDTO {
    private Long id;
    private String name;
    private String email;
    private String imgUrl;
    private ParentDTO parent;
    private int rank;
    private Integer totalMarks;
}