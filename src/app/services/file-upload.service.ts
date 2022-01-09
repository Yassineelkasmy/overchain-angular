import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FileUpload } from '../models/file-upload.model';
import { finalize, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private basePath = "uploads";

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    ) {
      this.afAuth.authState.subscribe(user=> {
        if(user) {
          this.basePath = user.uid;
          
        }
      })

     }
  accountVerificationFilesCount  = 0;
  minAccountVerificationFiles  = 3;
  propertyVerificationFilesCount  = 0;
  minPropertyVerificationFiles  = 3;
  
  pushFileToStorage(fileUpload: FileUpload, folder:string): Observable<number | undefined> {
    const filePath = `${this.basePath}/${folder}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);



    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload, folder);
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


  private saveFileData(fileUpload: FileUpload, folder : string) {
    const userFilesData: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.basePath}`);


    var dataMap : Map<string, string> = new Map(); 

    dataMap.set(folder, fileUpload.name!);

    let dataObj = Array.from(dataMap).reduce((obj, [key, value]) => (
      Object.assign(obj, { [key]: value }) 
    ), {});

    return userFilesData.set(dataObj, {merge:true});
    
    
  }






}
