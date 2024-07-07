import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private readonly userSelectedTagSource = new BehaviorSubject<string>(
    'science',
  );
  public readonly userSelectedTag$ = this.userSelectedTagSource.asObservable();

  public updateTag(tag: string): void {
    this.userSelectedTagSource.next(tag);
  }
}
