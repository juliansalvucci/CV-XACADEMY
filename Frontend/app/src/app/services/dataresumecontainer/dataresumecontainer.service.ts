import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataresumecontainerService {
  resume = {
    firstName: '',
    lastName: '',
    contactEmail: '',
    contactPhone: '',
    photoUrl: '',
  };
}
