import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QuoteService, QuoteData } from './quote.service';
import { TagsService } from './tags.service';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
})
export class QuoteComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly quoteService = inject(QuoteService);
  private readonly tagsService = inject(TagsService);

  public readonly currentQuote = signal<QuoteData | null>(null);

  public ngOnInit(): void {
    this.tagsService.userSelectedTag$
      .pipe(
        switchMap((tag) => this.quoteService.startUpdatingQuotes(tag)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response) => {
        console.log(response.step, response.data.content);
        this.currentQuote.set(response);
      });
  }
}
