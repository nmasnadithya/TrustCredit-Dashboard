import {Observable} from 'rxjs';

export abstract class SmartTableData {
  abstract getData(): Observable<any[]>;
}
