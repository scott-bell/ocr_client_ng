
export class DocumentModel {
  id: string;
  filename: string;
  desc: string;
  language: string;
  profile: string;
  status: string;
  text_type: string;
  image_source: string;
  export_format: string;
  deleting: boolean = false;
  ocring: boolean = false;

  constructor(id: string,
  filename: string,
  desc: string,
  language: string,
  profile: string,
  status: string,
  text_type: string,
  image_source: string,
  export_format: string) {
    this.id = id;
    this.filename = filename;
    this.desc = desc;
    this.language = language;
    this.profile = profile;
    this.status = status;
    this.text_type = text_type;
    this.image_source = image_source;
    this.export_format = export_format;
  }

  canDelete() {
    return ((!this.deleting) && (!this.isOCRRunning()))
  }
  canProcess() {
    return ((!this.deleting) && (this.status == "NEW"))
  }
  isOCRRunning() {
    return ( (this.status == "PENDING") || (this.status == "QUEUED")
    )
  }

  canDownload() {
    return this.status == "COMPLETE";
  }
}
