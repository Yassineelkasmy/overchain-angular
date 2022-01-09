import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { UploadFieldType } from 'src/app/enums/UploadFieldType';
import { FileUpload } from 'src/app/models/file-upload.model';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-upload-field',
  templateUrl: './upload-field.component.html',
  styleUrls: ['./upload-field.component.scss']
})
export class UploadFieldComponent implements OnInit {

  constructor(
    public uploadService : FileUploadService
  ) {

   }

  ngOnInit(): void {
  }

  @Input() folder: string = '';
  @Input() label: string = '';
  @Input() type?: UploadFieldType;


  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage?: number;
  uploaded:boolean = false;


  @ViewChild('fileInput')
  myInputVariable?: ElementRef;


  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadAccountFile(): void {
    const file = this.selectedFiles!.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file!);
    this.uploadService.pushAccountFileToStorage(this.currentFileUpload, this.folder).subscribe(

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

  deleteAccountFileUpload(): void {
    this.uploadService.deleteAccountFile(this.currentFileUpload!, this.folder);
    this.uploaded = false;
    this.currentFileUpload = undefined;
    this.myInputVariable!.nativeElement.value = ''; 
    this.uploadService.accountVerificationFilesCount--;
  

  }


  uploadPropertyFile(): void {
    const file = this.selectedFiles!.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file!);
    this.uploadService.pushPropertyFileToStorage(this.currentFileUpload, this.folder).subscribe(

      percentage => {
        this.percentage = Math.round(percentage!);

      },
      error => {
        console.log(error);
      },
      () => {
        this.uploaded = true;       
        this.uploadService.propertyVerificationFilesCount++;
        
      }

    );

  }

  deletePropertyFileUpload(): void {
    this.uploadService.deletePropertyFile(this.currentFileUpload!, this.folder);
    this.uploaded = false;
    this.currentFileUpload = undefined;
    this.myInputVariable!.nativeElement.value = '';
    this.uploadService.propertyVerificationFilesCount--;

  }



}
