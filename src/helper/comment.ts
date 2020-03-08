import { Comment } from '../types';
import { uuid } from './uuid';
import { randomColor } from './color';

export function generateNewComment(x: number, y: number): Comment {
  return {
    id: uuid(),
    x,
    y,
    ua: window.navigator.userAgent,
    time: new Date(),
    color: randomColor(),
  };
}
