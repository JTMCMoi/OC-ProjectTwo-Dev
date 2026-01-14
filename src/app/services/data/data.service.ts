import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,shareReplay,catchError,throwError,BehaviorSubject, mergeMap, of, delay } from 'rxjs';
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
        mergeMap(data => {
          if (data.length === 0) {
            this.stateSubject.next('empty');
            console.log('data: empty');
            return throwError(() => new Error('Erreur on getting datas (empty)'));
          }
          return of(data);
        }),
        shareReplay(1),
        delay(1500),
        catchError((r:HttpErrorResponse) => {
          this.stateSubject.next('error');
          console.log('data: error');
          return throwError(() => new Error(`Erreur on getting datas (${r.message})`));
        })
      );

      if ( this.stateSubject.value !== 'empty' && this.stateSubject.value !== 'error' )
      {
        this.stateSubject.next('ready');
        console.log('data: ready');
      }
    }

    return this.olympics$;

  }
}