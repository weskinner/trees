import superagent from '../lib/superagent'
import imageCompression from 'browser-image-compression'

export default {
  create,
  compressFileList
}

function create(sighting) {
  var req = superagent.post('/api/sighting')

  for (var i = 0; i < sighting.images.length; i++) {
    const file = sighting.images[i]
    req.attach('imageFiles', file)
  }
  req.field('notes', sighting.notes)

  return req
}

function compressFileList(rawFileList) {
  const compressionOptions = { 
    maxSizeMB: 0.2,          // (default: Number.POSITIVE_INFINITY)
    maxWidthOrHeight: 800,   // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
    useWebWorker: true,      // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
    maxIteration: 10        // optional, max number of iteration to compress the image (default: 10)
  }

  console.log('compressing images')
  let compressionPromises = []
  for (var i = 0; i < rawFileList.length; i++) {
    let p = imageCompression(rawFileList.item(i), compressionOptions).then(f => {
      console.log('compressed', f.name)
      return f
    })

    compressionPromises.push(p)
  }

  return Promise.all(compressionPromises)
}