/**
 * Generate a random color
 * @return color {Number}
 */
export function randomColor(): number {
  // Make sure R, G, B do not belongs to [170, 255] at the same time
  // in which case the color might be too bright as a background-color
  var red = Math.random() * 170;
  var green = Math.random() * 170;
  var blue = Math.random() * (red > 85 && green > 85 ? 85 : 170);
  return red * 170 * 170 + green * 170 + blue;
}

/**
 * Translate a number to a color object
 * whose R, G, B belongs to [0, 85] and [170, 255]
 * @param color
 * @return color
 */
function getColorRGB(color: number) {
  color = ~~color;
  var blue = color % 170;
  color = ~~(color / 170);
  var green = color % 170;
  color = ~~(color / 170);
  var red = color % 170;
  if (red > 85) red += 85;
  if (green > 85) green += 85;
  if (blue > 85) blue += 85;
  return {
    r: red,
    g: green,
    b: blue,
  };
}

/**
 * 获得背景颜色
 * @param color
 */
export function getColor(color: number): string {
  const rgb = getColorRGB(color);

  return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
}

/**
 * 获得前景颜色
 * @param color
 */
export function getTextColor(color: number): string {
  const rgb = getColorRGB(color);

  var y = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  return y > 127 ? 'black' : 'white';
}
