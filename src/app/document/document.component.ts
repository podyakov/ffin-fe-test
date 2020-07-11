import {Component, OnInit} from '@angular/core';
import {
  DOCUMENT_RESOLUTIONS,
  DOCUMENT_STATES,
  DocumentService,
  DocumentState,
  DocumentData
} from "./document.service";
import {AuthService} from "../auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  public submitted = false;
  public result: DocumentState;
  public DOCUMENT_STATES = DOCUMENT_STATES;
  public documentId = 1;
  public document: DocumentData;
  public isLoading = true;

  public resolutionTranslations: {[k in DOCUMENT_RESOLUTIONS]: string}  = {
    [DOCUMENT_RESOLUTIONS.APPROVED]: 'Согласен',
    [DOCUMENT_RESOLUTIONS.TOTALLY_APPROVED]: 'Полность согласен',
    [DOCUMENT_RESOLUTIONS.ALLOW_PAINT_IN_BLUE]: 'Разрешаю красить в синий',
    [DOCUMENT_RESOLUTIONS.REJECTED]: 'Не согласен',
  };

  public stateTranslations: {[k in DOCUMENT_STATES]: string}  = {
    [DOCUMENT_STATES.ACCEPT]: 'Утвердить',
    [DOCUMENT_STATES.REJECT]: 'Отклонить'
  };

  public resolutionSelect: {value: DOCUMENT_RESOLUTIONS, label: string}[] = [];

  public form = this.fb.group({
    resolution: [DOCUMENT_RESOLUTIONS.APPROVED, [Validators.required]],
    comment: ['', []],
  });

  constructor(
    private documentService: DocumentService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.resolutionSelect = Object.values(DOCUMENT_RESOLUTIONS).map(k => ({value: k, label: this.resolutionTranslations[k]}));
  }

  ngOnInit() {
    const subscription = this.documentService.getDocument(this.documentId)
      .subscribe(res => {
        this.isLoading = false;
        this.document = res;
        subscription.unsubscribe();
      });
  }

  setState(state: DOCUMENT_STATES) {
    const documentState: DocumentState = {
      approver: this.authService.currentUser,
      resolution: this.form.value.resolution,
      state,
      comment: this.form.value.comment
    }

    const subscription = this.documentService
      .setDocumentState(this.documentId, documentState)
      .subscribe(res => {
        this.result = res;
        this.submitted = true;

        subscription.unsubscribe();
      })
  }

}
