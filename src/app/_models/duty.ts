import { DutyCategory } from '@app/_models/dutyCategory';
import { SeriesOfPerformances } from '@app/_models/seriesOfPerformances';

export interface Duty {
  dutyId: number;
  description?: string;
  dutyCategory: DutyCategory;
  start: string;
  end: string;
  seriesOfPerformances: SeriesOfPerformances;
}
