import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationSubject.asObservable();

  showSuccess(message: string): void {
    this.notificationSubject.next({ message, type: 'success' });

    setTimeout(() => {
      this.notificationSubject.next(null);
    }, 3000);
  }

  showError(message: string): void {
    this.notificationSubject.next({ message, type: 'error' });

    // Автоматичне закриття через 3 секунди
    setTimeout(() => {
      this.notificationSubject.next(null);
    }, 3000);
  }
}