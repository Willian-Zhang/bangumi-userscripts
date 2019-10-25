/* credit: https://github.com/micro-js/hsl-to-rgb/blob/master/lib/index.js */

function HSL2RGB (h, s, l) {
    // Achromatic
    if (s === 0) return [l, l, l]
    h /= 360
  
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s
    let p = 2 * l - q
  
    return [
      Math.round(HUE2RGB(p, q, h + 1/3) * 255),
      Math.round(HUE2RGB(p, q, h) * 255),
      Math.round(HUE2RGB(p, q, h - 1/3) * 255)
    ]
}

function HUE2RGB (p, q, t) {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
  
    return p
}
