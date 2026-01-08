import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './services/token.service';
import { NotificationService } from './services/notification.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  const token = tokenService.getToken();

  if (!token || !tokenService.isLoggedIn()) {
    // Show unauthorized notification
    notificationService.show('Unauthorized! Please log in.', 'error');

    // Redirect to login page
    router.navigate(['/login'], { queryParams: { error: 'unauthorized' } });
    return false; // block navigation
  }

  return true; // allow navigation
};
