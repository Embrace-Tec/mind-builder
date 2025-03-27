import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Parent, Student} from '../../model/student.model';
import {StudentService} from '../../service/student.service';
import {ParentService} from '../../service/parent.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  standalone: false
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  parents: Parent[] = [];
  searchText: string = '';
  filterBy: string = 'all';
  studentForm: FormGroup;
  isEditMode = false;
  currentStudentId: number | null = null;

  constructor(
    private studentService: StudentService,
    private parentService: ParentService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
      parentId: [null],
      studentRank: [0, [Validators.min(0)]],
      totalMarks: [0, [Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadParents();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.applyFilter();
      },
      error: (err) => console.error('Error loading students', err)
    });
  }

  loadParents(): void {
    this.parentService.getAllParents().subscribe({
      next: (parents) => {
        this.parents = parents;
      },
      error: (err) => console.error('Error loading parents', err)
    });
  }

  applyFilter(): void {
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        student.email.toLowerCase().includes(this.searchText.toLowerCase());

      if (this.filterBy === 'rank') {
        return matchesSearch && student.studentRank > 0;
      } else if (this.filterBy === 'marks') {
        return matchesSearch && student.totalMarks > 0;
      }
      return matchesSearch;
    });
  }

  openAddModal(content: any): void {
    this.isEditMode = false;
    this.studentForm.reset({
      studentRank: 0,
      totalMarks: 0
    });
    this.studentForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.modalService.open(content);
  }

  openEditModal(content: any, student: Student): void {
    this.isEditMode = true;
    this.currentStudentId = student.id;
    this.studentForm.patchValue({
      name: student.name,
      email: student.email,
      parentId: student.parent?.id || null,
      studentRank: student.studentRank,
      totalMarks: student.totalMarks
    });
    this.studentForm.get('password')?.clearValidators();
    this.modalService.open(content);
  }

  onSubmit(): void {
    if (this.studentForm.invalid) return;

    const studentData = this.studentForm.value;

    if (this.isEditMode && this.currentStudentId) {
      this.studentService.updateStudent(this.currentStudentId, studentData).subscribe({
        next: () => {
          this.loadStudents();
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error updating student', err)
      });
    } else {
      this.studentService.registerStudent(studentData).subscribe({
        next: () => {
          this.loadStudents();
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error registering student', err)
      });
    }
  }

  confirmDelete(content: any, id: number): void {
    this.currentStudentId = id;
    this.modalService.open(content);
  }

  deleteStudent(): void {
    if (this.currentStudentId) {
      this.studentService.deleteStudent(this.currentStudentId).subscribe({
        next: () => {
          this.loadStudents();
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error deleting student', err)
      });
    }
  }
}
