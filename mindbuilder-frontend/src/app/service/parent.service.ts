import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import {Parent, ParentDTO} from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private apiUrl = `${environment.apiBaseUrl}/api/parents`;

  constructor(private http: HttpClient) { }

  getAllParents(): Observable<Parent[]> {
    return this.http.get<ParentDTO[]>(this.apiUrl).pipe(
      map(dtos => dtos.map(dto => this.mapDtoToParent(dto))
      ));
  }

  private mapDtoToParent(dto: ParentDTO): Parent {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      phone: dto.phone_number || '',  // Map snake_case to camelCase
      address: dto.home_address || '' // Map different field names
    };
  }
}
