import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, map, Observable, switchMap } from 'rxjs';

export interface Quote {
  content: string;
  author: string;
}

export interface QuoteData {
  data: Quote;
  step: number;
}

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private readonly QUOTE_URL = 'https://api.quotable.io/random';
  private readonly httpClient: HttpClient = inject(HttpClient);

  public startUpdatingQuotes(tag: string): Observable<QuoteData> {
    return interval(1_000).pipe(
      switchMap((step) =>
        this.getQuoteByTag(tag).pipe(
          map((data) => ({
            data,
            step,
          })),
        ),
      ),
    );
  }

  private getQuoteByTag(tag: string): Observable<Quote> {
    return this.httpClient.get<Quote>(this.QUOTE_URL, {
      params: {
        tags: [tag],
      },
    });
  }
}
