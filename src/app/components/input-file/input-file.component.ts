import { Base } from "./../../model/base";
import { Component, OnInit } from "@angular/core";
import { Camera } from "@ionic-native/camera/ngx";
import { ModalController, Platform } from "@ionic/angular";
import { CameraOptions } from "@ionic-native/camera/ngx";
import { Base64 } from '@ionic-native/base64/ngx';

@Component({
  selector: "app-input-file",
  templateUrl: "./input-file.component.html",
  styleUrls: ["./input-file.component.scss"],
})
export class InputFileComponent  {
  data: any;
  constructor(
    private camera: Camera,
    public modalController: ModalController,
    public base: Base,
    private platform: Platform,
    private base64: Base64
  ) {}



  onFileSelected(event: any) {
    console.log(event);
    let files = event.target.files;
    let file = files[0];

    if (files && file) {
      let reader = new FileReader();

      reader.onload = this.converteToBase64Depois.bind(this);

      reader.readAsBinaryString(file);
    }
  }
  converteToBase64Depois(readerEvt) {
    const binaryString = readerEvt.target.result;
    console.log(readerEvt);
    this.data = btoa(binaryString);
  }

  addFoto(local: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: local,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):

        if (this.platform.is("android")) {
          console.log(imageData);
          let filePath: string = imageData;
          this.base64.encodeFile(filePath).then((base64File: string) => {
            console.log( 'file em base ' + base64File);
            this.data = base64File.toString().replace('data:image/*;charset=utf-8;base64,', '');
            console.log( 'file em base ' + this.data);
          }, (err) => {
            console.log(err);
          });
        } else {
          console.log(imageData);
          this.data = imageData;
        }
      },
      (err) => {
        // Handle error
      }
    );
  }

  selecionar() {
    this.close({ dismiss: true, valor: this.data });
  }

  closeAny() {
    this.modalController.dismiss({ dismiss: true, valor: null });
  }

  close(obj: any) {
    this.modalController.dismiss(obj);
  }
}
