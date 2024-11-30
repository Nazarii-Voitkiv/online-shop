import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationService, Notification } from '../../services/notification/notification.service';
import {NgClass, NgIf} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-notification',
  template: `
    <div *ngIf="notification" class="notification" [ngClass]="notification.type" [@slideInOut]="'in'">
      <span>{{ notification?.message }}</span>
      <button class="close-btn" (click)="closeNotification()">×</button>
    </div>
  `,
  styles: [
    `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        color: white;
      }

      .notification.success {
        background-color: #4caf50;
      }

      .notification.error {
        background-color: #f44336;
      }

      .close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        line-height: 1;
        padding: 0;
        margin-left: 1rem;
      }

      .close-btn:hover {
        color: #ffcccc;
      }
    `,
  ],
  animations: [
    trigger('slideInOut', [
      state('void', style({ transform: 'translateY(-100%)', opacity: 0 })),
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition(':enter', [animate('300ms ease-out')]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))]),
    ]),
  ],
  imports: [NgIf, NgClass],
})
export class NotificationComponent implements OnInit {
  notification: Notification | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe((notification) => {
      this.notification = notification;
    });
  }

  closeNotification(): void {
    this.notification = null;
  }
}