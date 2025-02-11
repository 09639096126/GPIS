import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordWrap'
})
export class WordWrapPipe implements PipeTransform {
  transform(value: string, wordsPerLine: number): string {
    if (!value) return value;

    const words = value.split(' ');
    let result = '';
    
    for (let i = 0; i < words.length; i++) {
      if (i > 0 && i % wordsPerLine === 0) {
        result += '\n';
      }
      result += words[i] + ' ';
    }

    return result.trim();
  }
}
