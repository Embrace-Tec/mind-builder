import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Teacher, TeacherRegistration, TeacherUpdate } from '../../model/teacher.model';
import { TeacherService } from '../../service/teacher.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
  standalone: false
})
export class TeacherListComponent implements OnInit {
  teachers: Teacher[] = [];
  filteredTeachers: Teacher[] = [];
  searchText: string = '';
  teacherForm: FormGroup;
  isEditMode = false;
  currentTeacherId: number | null = null;

  constructor(
    private teacherService: TeacherService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.teacherForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
        this.applyFilter();
      },
      error: (err) => console.error('Error loading teachers', err)
    });
  }

  applyFilter(): void {
    this.filteredTeachers = this.teachers.filter(teacher => {
      return teacher.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        teacher.email.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  openAddModal(content: any): void {
    this.isEditMode = false;
    this.teacherForm.reset();
    this.teacherForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.teacherForm.get('password')?.updateValueAndValidity();
    this.modalService.open(content);
  }

  openEditModal(content: any, teacher: Teacher): void {
    this.isEditMode = true;
    this.currentTeacherId = teacher.id;
    this.teacherForm.patchValue({
      name: teacher.name,
      email: teacher.email
    });
    this.teacherForm.get('password')?.clearValidators();
    this.teacherForm.get('password')?.updateValueAndValidity();
    this.modalService.open(content);
  }

  onSubmit(): void {
    if (this.teacherForm.invalid) return;

    if (this.isEditMode && this.currentTeacherId) {
      const updateData: TeacherUpdate = {
        id: this.currentTeacherId,
        name: this.teacherForm.value.name,
        email: this.teacherForm.value.email
      };

      this.teacherService.updateTeacher(updateData).subscribe({
        next: () => {
          this.loadTeachers();
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error updating teacher', err)
      });
    } else {
      const registrationData: TeacherRegistration = {
        name: this.teacherForm.value.name,
        email: this.teacherForm.value.email,
        password: this.teacherForm.value.password
      };

      this.teacherService.registerTeacher(registrationData).subscribe({
        next: () => {
          this.loadTeachers();
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error registering teacher', err)
      });
    }
  }

  confirmDelete(content: any, id: number): void {
    this.currentTeacherId = id;
    this.modalService.open(content);
  }

  deleteTeacher(): void {
    if (this.currentTeacherId) {
      this.teacherService.deleteTeacher(this.currentTeacherId).subscribe({
        next: () => {
          this.loadTeachers();
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error deleting teacher', err)
      });
    }
  }
}
