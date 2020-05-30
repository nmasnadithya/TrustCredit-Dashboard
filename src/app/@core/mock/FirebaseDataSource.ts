import {LocalDataSource} from 'ng2-smart-table';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {firestore} from 'firebase/app';


export class FirebaseDataSource extends LocalDataSource {

  private collection: AngularFirestoreCollection;

  public constructor(collection: AngularFirestoreCollection) {
    super([]);
    this.collection = collection;
    this.collection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              if (typeof data[key] === 'object' && data[key] !== null) {
                data[key] = data[key].toDate();
              }
            }
          }
          return { id: a.payload.doc.id, ...data };
        });
      }),
    ).subscribe(value => {
      this.load(value);
    });
  }

  update(element: any, values: any): Promise<any> {
    for (const key in element) {
      if (values.hasOwnProperty(key)) {
        if (!isNaN(element[key])) {
          values[key] = +values[key];
        }
      }
    }
    const {id, ...data} = values;
    return this.collection.doc(element.id).update(data);
  }

  issueLoan(values: any): void {
    const {id, ...data} = values;
    data.loanIssued = firestore.FieldValue.serverTimestamp();
    this.collection.doc(id).update(data);
  }

  settleLoan(values: any): void {
    const {id, ...data} = values;
    data.loanSettled = firestore.FieldValue.serverTimestamp();
    this.collection.doc(id).update(data);
  }

  remove(element: any): Promise<any> {
    return this.collection.doc(element.id).delete();
  }
}
