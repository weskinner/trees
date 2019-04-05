import React from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import imageCompression from 'browser-image-compression'  

export default
class CreateSighting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.fileInput = React.createRef();
    this.notes = React.createRef();
  }
  onUploadProgress(progressEvent) {
    if(progressEvent.lengthComputable) {
      const progress = (progressEvent.loaded / progressEvent.total) * 100;

      this.setState({showProgress: true, progress, progressTitle: 'Uploading'})
    }
  }
  displayImagePreviews() {
    let selectedImageUrls = []
    const fileList = this.fileInput.current.files
    for (var i = 0; i < fileList.length; i++) {
      selectedImageUrls.push(URL.createObjectURL(fileList.item(i)))
    }

    this.setState({selectedImageUrls})
  }
  submit(e) {
    e.preventDefault()
    const compressionOptions = { 
      maxSizeMB: 0.2,          // (default: Number.POSITIVE_INFINITY)
      maxWidthOrHeight: 800,   // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
      useWebWorker: true,      // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
      maxIteration: 10        // optional, max number of iteration to compress the image (default: 10)
    }
    
    console.log('compressing images')
    this.setState({showProgress: true, progress: 2, progressTitle: "Compressing Images"})
    const rawFileList = this.fileInput.current.files
    let compressionPromises = []
    for (var i = 0; i < rawFileList.length; i++) {
      let p = imageCompression(rawFileList.item(i), compressionOptions).then(f => {
        console.log('compressed', f)
        let progress = (i / rawFileList.length) * 100
        console.log('compression progress', progress)
        this.setState({progress})
        return f
      })

      compressionPromises.push(p)
    }

    Promise.all(compressionPromises)
      .catch(err => console.log('Error compressing images', err))
      .then(compressedFileList => {

        const formData = new FormData()
        for (var i = 0; i < compressedFileList.length; i++) {
          const file = compressedFileList[i]
          formData.append('imageFiles', file)
        }
        formData.append('notes', this.notes.current.value)
        
        axios.post('/api/sighting', formData, {onUploadProgress: this.onUploadProgress.bind(this)})
          .catch(err => console.log(err))
          .then(res => {
           
            console.log(res)
            this.setState({showProgress: false})
          })

      })
  }
  render() {
    return (
      <div>
        <h4>Create a New Sighting</h4>
        <div className="row">
          {this.state.selectedImageUrls &&
            this.state.selectedImageUrls.map((url,i) => <div key={i} className="col-1"><img src={url} className="img-fluid"/></div>)
          }
        </div>
        <form onSubmit={this.submit.bind(this)}>
          <div className="form-group">
            <label>Images</label>
            <input
              className="form-control-file" 
              ref={this.fileInput} 
              type="file" 
              accept="image/*" 
              multiple
              onChange={this.displayImagePreviews.bind(this)} />
          </div>
          <div className="form-group">
            <textarea ref={this.notes} placeholder="Notes..." className="form-control"></textarea>
          </div>
          <div className="form-group">
            <input className="form-control" type="submit" />
          </div>
          {this.state.showProgress &&
            <div>
              <div>{this.state.progressTitle}</div>
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: `${this.state.progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          }
        </form>
      </div>
    )
  }
}