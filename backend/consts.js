const fileColors = {
  doc: { color: '#B30099', icon: 'fas fa-file' },
  arc: { color: '#3300B3', icon: 'fas fa-archive' },
  pho: { color: '#33B300', icon: 'fas fa-image' },
  aud: { color: '#0066B3', icon: 'fas fa-music' },
  vid: { color: '#35C487', icon: 'fas fa-film' },
  oth: { color: '#B39900', icon: 'fas fa-copy' },
}

const types = {
  pdf: 'doc',
  doc: 'doc',
  docx: 'doc',
  xls: 'doc',
  xlsx: 'doc',
  ppt: 'doc',
  pptx: 'doc',

  zip: 'arc',
  rar: 'arc',
  '7z': 'arc',
  tar: 'arc',
  gz: 'arc',

  png: 'pho',
  svg: 'pho',
  jpg: 'pho',
  jpeg: 'pho',
  bmp: 'pho',
  gif: 'pho',

  mp3: 'aud',
  ogg: 'aud',

  mp4: 'vid',
  mkv: 'vid',
  avi: 'vid',
  mov: 'vid',
}

module.exports = { fileColors, types }
