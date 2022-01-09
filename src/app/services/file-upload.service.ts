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

  public propertyCode?:string;
  
  pushAccountFileToStorage(fileUpload: FileUpload, folder:string): Observable<number | undefined> {
    const filePath = `${this.basePath}/${folder}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveAccountFileData(fileUpload, folder);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  deleteAccountFile(fileUpload: FileUpload, folder:string): void {
    this.deleteAccountFileStorage(fileUpload.name!, folder);
  }

  private deleteAccountFileStorage(name: string, folder: string): void {
    const storageRef = this.storage.ref(this.basePath+'/' + folder);
    storageRef.child(name).delete();
  }

  private saveAccountFileData(fileUpload: FileUpload, folder : string) {
    const userFilesData: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.basePath}`);


    var dataMap : Map<string, string> = new Map(); 

    dataMap.set(folder, fileUpload.name!);

    let dataObj = Array.from(dataMap).reduce((obj, [key, value]) => (
      Object.assign(obj, { [key]: value }) 
    ), {});

    return userFilesData.set(dataObj, {merge:true});
       
  }

  // Property Upload Methods

  pushPropertyFileToStorage(fileUpload: FileUpload, folder:string): Observable<number | undefined> {
    const filePath = `${this.basePath}/properties/${this.propertyCode}/${folder}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.savePropertyFileData(fileUpload, folder);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  deletePropertyFile(fileUpload: FileUpload, folder:string): void {
    this.deletePropertyFileStorage(fileUpload.name!, folder);
  }

  private deletePropertyFileStorage(name: string, folder: string): void {
    const storageRef = this.storage.ref(this.basePath + "/properties/"+ this.propertyCode + "/" + folder);
    storageRef.child(name).delete();
  }

  private savePropertyFileData(fileUpload: FileUpload, folder : string) {
    const userFilesData: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.basePath}`)
    .collection('properties').doc(this.propertyCode);


    var dataMap : Map<string, string> = new Map(); 

    dataMap.set(folder, fileUpload.name!);

    let dataObj = Array.from(dataMap).reduce((obj, [key, value]) => (
      Object.assign(obj, { [key]: value }) 
    ), {});

    return userFilesData.set(dataObj, {merge:true});
       
  }




}
