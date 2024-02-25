import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private snackBar: MatSnackBar) {}

  openNotification(
    durationMs: number,
    text: string,
    verticalPosition: 'top' | 'bottom',
    horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right'
  ): void {
    this.snackBar.open(text, 'Dismiss', {
      duration: durationMs,
      verticalPosition: verticalPosition,
      horizontalPosition: horizontalPosition,
    });
  }
}
