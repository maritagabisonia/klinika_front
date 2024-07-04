import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safePipe',
  standalone: true
})
export class SafePipePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: Blob, type: string): SafeUrl {
    let objectUrl = URL.createObjectURL(value);
    switch (type) {
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      default:
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    }
  }

}
