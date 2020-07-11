import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";

export interface DocumentData {
  title: string;
  content: string;
}

export enum DOCUMENT_RESOLUTIONS {
  TOTALLY_APPROVED = 'totally_approved',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ALLOW_PAINT_IN_BLUE = 'allow_paint_in_blue',
}
export enum DOCUMENT_STATES {
  REJECT = '0',
  ACCEPT = '1'
}

export interface DocumentState {
  approver: string;
  resolution: DOCUMENT_RESOLUTIONS;
  comment: string;
  state: DOCUMENT_STATES;
}

const MOCK_DATA: DocumentData = {
  title: 'Test Document',
  content: 'Test Document Content'
};


export class DocumentService {
  constructor() {
  }

  getDocument(id: number): Observable<DocumentData> {
    return of(MOCK_DATA).pipe(delay(100));
  }

  setDocumentState(id: number, state: DocumentState): Observable<DocumentState> {
    console.log(state);

    return of(state).pipe(delay(100));
  }
}
