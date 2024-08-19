import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

    // Alerta de éxito
    success(message: string, title: string = '¡Éxito!'): void {
      Swal.fire({
        title: title,
        text: message,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    }
  
    // Alerta de error
    error(message: string, title: string = '¡Error!'): void {
      Swal.fire({
        title: title,
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  
    // Alerta de información
    info(message: string, title: string = 'Información'): void {
      Swal.fire({
        title: title,
        text: message,
        icon: 'info',
        confirmButtonText: 'Ok'
      });
    }
  
    // Alerta de advertencia
    warning(message: string, title: string = 'Advertencia'): void {
      Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
    }
  
    // Alerta de confirmación con promesa
    confirm(message: string, title: string = '¿Estás seguro?', confirmButtonText: string = 'Sí', cancelButtonText: string = 'No'): Promise<boolean> {
      return Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText
      }).then((result) => {
        return result.isConfirmed;
      });
    }
}
