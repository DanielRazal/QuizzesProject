import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  success(title: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  messageToUser(title: string) {
    return Swal.fire({
      title: title,
      allowOutsideClick: false
    })
  }

  isConfirm(title: string) {
    return Swal.fire({
      title: title,
      showCancelButton: true,
      confirmButtonText: `Yes`,
      allowOutsideClick: false
    })
  }
}
