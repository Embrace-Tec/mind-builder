import { Component } from '@angular/core';
import {LessonService} from '../../../service/lesson.service';
import {LessonDTO} from '../../../model/lesson.model';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
  standalone: false,

})
export class MainContentComponent {

  lessons: LessonDTO[] = [];
  filteredLessons: LessonDTO[] = [];
  isLoading = true;
  searchQuery = '';
  selectedStatus = 'all';
  selectedDifficulty = 'all';

  statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: '' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' }
  ];

  difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'easy', label: 'Advanced' },
  ];

  constructor(private lessonService: LessonService) {}

  ngOnInit(): void {
    this.loadLessons();
  }

  loadLessons(): void {
    this.isLoading = true;
    this.lessonService.getAllLessons()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (lessons) => {
          this.lessons = lessons;
          this.filterLessons();
        },
        error: (err) => console.error('Failed to load lessons', err)
      });
  }

  filterLessons(): void {
    this.filteredLessons = this.lessons.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = this.selectedStatus === 'all' || lesson.status.toLowerCase() === this.selectedStatus;
      const matchesDifficulty = this.selectedDifficulty === 'all' ||
        lesson.difficultyLevel.toLowerCase() === this.selectedDifficulty;
      return matchesSearch && matchesStatus && matchesDifficulty;
    });
  }

  onSearchChange(): void {
    this.filterLessons();
  }

  onStatusChange(): void {
    this.filterLessons();
  }

  get activeLessonsCount(): number {
    return this.lessons.filter(lesson => lesson.status === 'APPROVED').length;
  }
  get freeLessonsCount(): number {
    return this.lessons.filter(lesson => lesson.isFree).length;
  }
  onDifficultyChange(): void {
    this.filterLessons();
  }

  getMostPopularLesson(): LessonDTO | null {
    if (this.lessons.length === 0) return null;
    return this.lessons.reduce((prev, current) =>
      (prev.viewCount > current.viewCount) ? prev : current);
  }
}
