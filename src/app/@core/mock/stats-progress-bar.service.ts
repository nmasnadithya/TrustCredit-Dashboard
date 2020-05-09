import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { ProgressInfo, StatsProgressBarData } from '../data/stats-progress-bar';

@Injectable()
export class StatsProgressBarService extends StatsProgressBarData {
  private progressInfoData: ProgressInfo[] = [
    {
      title: 'New Applications',
      value: 78,
      activeProgress: 18,
      description: 'Better than last week (18%)',
    },
    {
      title: 'Completed Loans',
      value: 3787,
      activeProgress: 30,
      description: 'Better than last week (30%)',
    },
    {
      title: 'Due Loans',
      value: 126,
      activeProgress: 50,
      description: 'Worse than last week (50%)',
    },
  ];

  getProgressInfoData(): Observable<ProgressInfo[]> {
    return observableOf(this.progressInfoData);
  }
}
