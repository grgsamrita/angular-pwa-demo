import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {
  @ViewChild('iosModal') iosModal: NgbModal;
  @ViewChild('androidModal') androidModal: NgbModal;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { mobileType: 'ios' | 'android', promptEvent?: any },
    private bottomSheetRef: MatBottomSheetRef<PromptComponent>,
    private modalService: NgbModal
  ) {}

  public installPwa(): void {
    this.data.promptEvent.prompt();
    this.close();
  }

  public close() {
    this.bottomSheetRef.dismiss();
  }

  ngAfterViewInit() {
    if(this.data.mobileType === 'android') {
      this.modalService.open(this.androidModal);
    }
    if(this.data.mobileType === 'ios') {
      this.modalService.open(this.iosModal);
    }
  }
  ngOnInit() {}

}
