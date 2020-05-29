import { DutyCategory } from './dutyCategory';
import { SeriesOfPerformances } from './seriesOfPerformances';

export interface Duty {
  dutyId: number;
  description?: string;
  dutyCategory: DutyCategory;
  start: string;
  end: string;
  seriesOfPerformances: SeriesOfPerformances;
}
