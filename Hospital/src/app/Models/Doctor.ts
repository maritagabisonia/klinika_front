export class Doctor {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    personalid: string;
    profession: string;
    photo: Blob;
    cv: Blob;
    roleId: number;
    role: string;
  
    constructor(data: any) {
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.personalid = data.personalId;
      this.profession = data.profession;
      this.photo = data.photo;
      this.cv = data.cv;
      this.roleId = data.roleId;
      this.role = data.role;
    }
  }
  