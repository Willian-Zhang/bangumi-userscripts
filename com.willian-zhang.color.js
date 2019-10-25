/* credit: https://github.com/micro-js/hsl-to-rgb/blob/master/lib/index.js */

function HSL2RGB (h, s, l) {
    // Achromatic
    if (s === 0) return [l, l, l]
    h /= 360
  
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s
    let p = 2 * l - q
  
    return [
      Math.round(hueToRgb(p, q, h + 1/3) * 255),
      Math.round(hueToRgb(p, q, h) * 255),
      Math.round(hueToRgb(p, q, h - 1/3) * 255)
    ]
}