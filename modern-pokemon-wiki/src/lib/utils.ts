import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Debounce utility for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for smooth interactions
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Format Pokemon names with special characters
export function formatPokemonName(name: string): string {
  switch (name) {
    case 'Farfetchd':
      return "Farfetch'd";
    case 'Nidoran Male':
      return 'Nidoran♂';
    case 'Nidoran Female':
      return 'Nidoran♀';
    default:
      return name;
  }
}

// Get correct Pokedex numbers
export function getCorrectDexNumber(name: string, currentNumber: number): number {
  switch (name) {
    case 'Nidoran Male':
      return 32;
    case 'Nidoran Female':
      return 29;
    case 'Farfetchd':
      return 83;
    default:
      return currentNumber;
  }
}

// Validate location coordinates
export function isValidLocation(x: number, y: number, mapWidth: number = 1680, mapHeight: number = 3815): boolean {
  return x >= 0 && x <= mapWidth && y >= 0 && y <= mapHeight;
}

// Get terrain type based on Z coordinate
export function getTerrainType(z: number): string {
  if (z > 7) return 'Subsolo';
  if (z < 7) return 'Montanha';
  return 'Planície';
}

// Calculate distance between two points
export function calculateDistance(
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): number {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Generate unique ID
export function generateId(prefix?: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
}

// Clamp value between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Linear interpolation
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

// Smooth step interpolation
export function smoothStep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

// Convert viewport coordinates to map coordinates
export function viewportToMapCoords(
  viewportX: number,
  viewportY: number,
  scale: number,
  panX: number,
  panY: number
): { x: number; y: number } {
  return {
    x: (viewportX / scale) - panX,
    y: (viewportY / scale) - panY
  };
}

// Convert map coordinates to viewport coordinates
export function mapToViewportCoords(
  mapX: number,
  mapY: number,
  scale: number,
  panX: number,
  panY: number
): { x: number; y: number } {
  return {
    x: (mapX + panX) * scale,
    y: (mapY + panY) * scale
  };
}

// Check if element is in viewport
export function isInViewport(
  elementX: number,
  elementY: number,
  elementSize: number,
  viewportWidth: number,
  viewportHeight: number,
  scale: number,
  panX: number,
  panY: number
): boolean {
  const screenCoords = mapToViewportCoords(elementX, elementY, scale, panX, panY);
  const margin = elementSize * scale;
  
  return (
    screenCoords.x + margin >= -margin &&
    screenCoords.x - margin <= viewportWidth + margin &&
    screenCoords.y + margin >= -margin &&
    screenCoords.y - margin <= viewportHeight + margin
  );
}

// Format number with thousands separator
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

// Convert bytes to human readable format
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Deep clone object
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  if (typeof obj === 'object') {
    const clonedObj = {} as { [key: string]: any };
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone((obj as { [key: string]: any })[key]);
      }
    }
    return clonedObj as T;
  }
  return obj;
}

// Local storage utilities
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Silently fail if localStorage is not available
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Silently fail if localStorage is not available
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch {
      // Silently fail if localStorage is not available
    }
  }
};