export class Place {
  private id: string;
  private title: string;
  private imageUri: string;
  private address: string;
  private location: {
    lat: number;
    lng: number;
  };

  constructor(
    title: string,
    imageUri: string,
    address: string,
    location: { lat: number; lng: number },
  ) {
    this.id = new Date().toString() + Math.random().toString();
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
  }
}
