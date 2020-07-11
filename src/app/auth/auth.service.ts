import {BehaviorSubject, Observable, of} from "rxjs";
import {delay, tap} from "rxjs/operators";

const TEST_LOGIN = 'ivanov';
const TEST_PASSWORD = 'ivanov';

export class AuthService {

  public $authorized = new BehaviorSubject<boolean>(false);
  public currentUser: string = '';

  constructor() {
    this.getAuthorized();
  }

  login(login, password): Observable<boolean> {
    const loginValid = login === TEST_LOGIN && password === TEST_PASSWORD;

    return of(loginValid)
      .pipe(
        delay(100),
        tap(console.log),
        tap(authorized => this.setAuthorized(authorized, login)),
      );
  }

  logout(): Observable<boolean> {
    return of(true)
      .pipe(
        delay(100),
        tap(() => this.setAuthorized(false)),
      );
  }

  private setAuthorized(isAuthorized: boolean, userName = '') {
    localStorage.setItem('authorized', isAuthorized ? '1' : '0');
    localStorage.setItem('currentUser', userName);
    this.currentUser = userName;
    this.$authorized.next(isAuthorized);
  }

  private getAuthorized() {
    this.currentUser = localStorage.getItem('currentUser') || '';
    this.$authorized.next(localStorage.getItem('authorized') === '1')
  }
}
