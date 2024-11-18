import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<any[]>([]);
  public notifications$: Observable<any[]> = this.notificationsSubject.asObservable();

  constructor() {}

  /**
   * Agrega una nueva notificación.
   * @param notification Objeto de notificación.
   */
  addNotification(notification: any) {
    const currentNotifications = this.notificationsSubject.getValue();
    this.notificationsSubject.next([...currentNotifications, notification]);
  }

  /**
   * Elimina una notificación por su índice.
   * @param index Índice de la notificación a eliminar.
   */
  removeNotification(index: number) {
    const currentNotifications = this.notificationsSubject.getValue();
    currentNotifications.splice(index, 1);
    this.notificationsSubject.next(currentNotifications);
  }

  /**
   * Obtiene todas las notificaciones filtradas por userId.
   * @param userId El ID del usuario para filtrar las notificaciones.
   * @returns Observable con las notificaciones filtradas.
   */
  getNotifications(userId: string): Observable<any[]> {
    // Filtrar las notificaciones según el userId (si tienes un campo userId en la notificación)
    const filteredNotifications = this.notificationsSubject.getValue().filter(
      (notification) => notification.userId === userId
    );
    return new BehaviorSubject<any[]>(filteredNotifications).asObservable();
  }
}
