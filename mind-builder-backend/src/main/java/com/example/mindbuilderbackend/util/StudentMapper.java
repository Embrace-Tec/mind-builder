package com.example.mindbuilderbackend.util;

import com.example.mindbuilderbackend.dto.StudentDTO;
import com.example.mindbuilderbackend.model.Student;

public class StudentMapper {
    public static StudentDTO toDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setName(student.getName());
        dto.setEmail(student.getEmail());
        if (student.getParent() != null) {
            dto.setParentId(student.getParent().getId());
        }
        dto.setRank(student.getStudentRank());
        dto.setTotalMarks(student.getTotalMarks());
        return dto;
    }

    public static Student toEntity(StudentDTO dto) {
        Student student = new Student();
        student.setId(dto.getId());
        student.setName(dto.getName());
        student.setEmail(dto.getEmail());
        // Note: Parent and password need to be handled separately
        student.setStudentRank(dto.getRank());
        student.setTotalMarks(dto.getTotalMarks());
        return student;
    }
}