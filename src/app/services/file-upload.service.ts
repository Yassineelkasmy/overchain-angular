import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FileUpload } from '../models/file-upload.model';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private basePath = "uploads";

  constructor(
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    ) {
      this.afAuth.authState.subscribe(user=> {
        if(user) {
          this.basePath = user.uid;
        }
      })

     }
  pushFileToStorage(fileUpload: FileUpload, folder:string): Observable<number | undefined> {
    const filePath = `${this.basePath}/${folder}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }





  deleteFile(fileUpload: FileUpload, folder:string): void {

     this.deleteFileStorage(fileUpload.name!, folder);

  }



  private deleteFileStorage(name: string, folder: string): void {
    const storageRef = this.storage.ref(this.basePath+'/' + folder);
    storageRef.child(name).delete();
  }



}
