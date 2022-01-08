import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FileUpload } from 'src/app/models/file-upload.model';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-upload-field',
  templateUrl: './upload-field.component.html',
  styleUrls: ['./upload-field.component.scss']
})
export class UploadFieldComponent implements OnInit {

  constructor(
    private uploadService : FileUploadService
  ) {

   }

  ngOnInit(): void {
  }

  @Input() folder: string = '';
  @Input() label: string = '';


  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage?: number;
  uploaded:boolean = false;

  @ViewChild('fileInput')
  myInputVariable?: ElementRef;


  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles!.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file!);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.folder).subscribe(

      percentage => {
        this.percentage = Math.round(percentage!);

      },
      error => {
        console.log(error);
      },
      () => {
        this.uploaded = true;
        this.uploadService.accountVerificationFilesCount++;
      }

    );

  }

  deleteFileUpload(): void {
    this.uploadService.deleteFile(this.currentFileUpload!, this.folder);
    this.uploaded = false;
    this.currentFileUpload = undefined;
    this.myInputVariable!.nativeElement.value = '';
    this.uploadService.accountVerificationFilesCount--;

  }



}
