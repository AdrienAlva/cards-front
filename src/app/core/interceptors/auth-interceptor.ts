import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {AuthService} from '@core/services/auth-service';


/**
 * Intercepts HTTP requests to attach an authorization token if available.
 *
 * This interceptor checks for a token from the authentication service
 * and, if present, clones the original request to include the token in
 * the `Authorization` header. If no token is available, the original
 * request is passed through without modification.
 *
 * @param {HttpRequest} req - The outgoing HTTP request.
 * @param {HttpHandler} next - The next handler in the chain to forward the request.
 * @returns {Observable<HttpEvent<any>>} An observable that emits the HTTP events.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
