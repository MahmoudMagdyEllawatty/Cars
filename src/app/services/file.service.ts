import {Injectable} from '@angular/core';


declare var window: any;
@Injectable({
  providedIn: 'root'
})
export class FileService {


  makeFileIntoBlob(imagePath, name, type) {
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(imagePath, (fileEntry) => {
        fileEntry.file((resFile) => {
          const reader = new FileReader();
          reader.onloadend = (evt: any) => {
            const imgBlob: any = new Blob([evt.target.result], {type});
            imgBlob.name = name;
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
            alert(e.toString());
            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }


  getFileName(fileString) {
    return fileString.replace(/^.*[\\\/]/, '');
  }


  getFileExtenstion(fileString) {
    return fileString.substr(fileString.lastIndexOf('.') + 1);
  }



}
