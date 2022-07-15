import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../model/login';
import { OperationIndex } from './operations.index';
import { RequestService } from '../api/request.service';
import { Business } from 'src/app/model/business';

@Injectable({
  providedIn: 'root'
})
export class UserService extends RequestService{

  constructor(
    protected http: HttpClient
    ) {
    super(http)
  }

  authenticate(email: string, password: string, rememberMe) {
    let login = new Login()
    login.email = email
    login.password = password
    return this.postNMCRequest(
        this.setOperationParams(OperationIndex.LOGIN, login))
  }
  saveRoleLocation(role: string, location: string, id) {
    return this.postNMCRequest(
        this.setOperationParams(OperationIndex.SAVE_MERCHANT_ROLE_LOCATION, new Business().saveRoleLocation({department: role, location_id: location, id}))
      )
  }


}
