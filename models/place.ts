import { Location } from "../configs/types";

export class Place {
  private id: string;
  private title: string;
  private imageUri: string;
  private address: string;
  private location: Location;

  constructor(
    title: string,
    imageUri: string,
    address: string,
    location: Location,
  ) {
    this.id = new Date().toString() + Math.random().toString();
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
  }
}
