import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,shareReplay,catchError,throwError,BehaviorSubject, mergeMap, of, delay, tap } from 'rxjs';
import { Olympic } from 'src/app/models/olympic';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = './assets/mock/olympic.json';
  private olympics$! : Observable<Olympic[]>;
  private stateSubject = new BehaviorSubject<string>('loading');
  public readonly state$ = this.stateSubject.asObservable();

  constructor(private http: HttpClient) { }

  getOlympics() : Observable<Olympic[]> {

    if ( !this.olympics$ )
    {
      this.stateSubject.next('loading');
      console.log('data: loading');

      this.olympics$ = this.http.get<Olympic[]>(this.url).pipe(
        delay(1500),
        tap(data => {
          if (data.length === 0) {
            this.stateSubject.next('empty');
            console.log('data: empty');
          } else {
            this.stateSubject.next('ready');
            console.log('data: ready');
          }
        }),
        mergeMap(data => {
          if (data.length === 0) {
            this.stateSubject.next('empty');
            console.log('data: empty');
            return throwError(() => new Error('Erreur on getting datas (empty)'));
          }
          return of(data);
        }),
        catchError((r:HttpErrorResponse) => {
          this.stateSubject.next('error');
          console.log('data: error');
          return throwError(() => new Error(`Erreur on getting datas (${r.message})`));
        }),
        shareReplay(1)
      );
    }

    return this.olympics$;

  }
}