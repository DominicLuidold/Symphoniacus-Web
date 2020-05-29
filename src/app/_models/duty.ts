import { DutyCategory, SeriesOfPerformances } from '@app/_models';

export interface Duty {
  dutyId: number;
  description?: string;
  dutyCategory: DutyCategory;
  start: string;
  end: string;
  seriesOfPerformances: SeriesOfPerformances;
}
