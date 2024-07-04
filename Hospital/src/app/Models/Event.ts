export class Event {
    id: number;
    doctorID: number;
    patientID: number;
    startDate: Date;
    endDate: Date;
  
    constructor(id: number, doctorID: number, patientID: number, startDate: Date, endDate: Date) {
      this.id = id;
      this.doctorID = doctorID;
      this.patientID = patientID;
      this.startDate = startDate;
      this.endDate = endDate;
    }
  }
  