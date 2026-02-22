import { Location } from "../configs/types";

export class Place {
  private id: number;
  private title: string;
  private imageUri: string;
  private address: string;
  private location: Location;

  constructor(
    id: number,
    title: string,
    imageUri: string,
    address: string,
    location: Location,
  ) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
  }

  getPlaceData() {
    return {
      id: this.id,
      title: this.title,
      imageUri: this.imageUri,
      address: this.address,
      location: this.location,
    };
  }
}
