export default interface Users {
  uid: string;
  name: string;
  email: string;
  lastLogin: Date;
  notificationDevices?: string[];
}
