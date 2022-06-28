import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    token: string = "FakeToken"

    getToken(): string {
        return this.token;
    }

}