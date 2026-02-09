import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transforms file size from bytes to readable format (B, KB, MB, GB, TB).
 *
 * Usage:
 *   {{ fileSize | fileSize }}           // Default: auto unit, 2 decimals
 *   {{ fileSize | fileSize:0 }}         // Auto unit, 0 decimals
 *   {{ fileSize | fileSize:2:'MB' }}    // Force MB, 2 decimals
 *
 * @param value - File size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @param unit - Unit: 'B', 'KB', 'MB', 'GB', 'TB' (default: auto)
 */
@Pipe({
  name: 'fileSize',
  standalone: true,
})
export class FileSizePipe implements PipeTransform {
  private readonly units = ['B', 'KB', 'MB', 'GB', 'TB'];
  private readonly k = 1024;

  transform(
    bytes: number | null | undefined,
    decimals = 2,
    unit?: 'B' | 'KB' | 'MB' | 'GB' | 'TB',
  ): string {
    if (bytes === null || bytes === undefined || isNaN(bytes)) {
      return '0 B';
    }

    if (bytes === 0) {
      return '0 B';
    }

    // If a specific unit is requested
    if (unit) {
      const unitIndex = this.units.indexOf(unit);
      if (unitIndex === -1) {
        return this.autoFormat(bytes, decimals);
      }
      const divisor = Math.pow(this.k, unitIndex);
      const value = bytes / divisor;
      return `${this.formatNumber(value, decimals)} ${unit}`;
    }

    // Auto-detect the best unit
    return this.autoFormat(bytes, decimals);
  }

  private autoFormat(bytes: number, decimals: number): string {
    const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(this.k));
    const unitIndex = Math.min(i, this.units.length - 1);
    const value = bytes / Math.pow(this.k, unitIndex);
    return `${this.formatNumber(value, decimals)} ${this.units[unitIndex]}`;
  }

  private formatNumber(value: number, decimals: number): string {
    return parseFloat(value.toFixed(decimals)).toString();
  }
}
