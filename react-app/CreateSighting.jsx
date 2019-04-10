import React from 'react'
import { Link } from "react-router-dom"
import sightings from './service/sighting'

export default
class CreateSighting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.fileInput = React.createRef();
    this.notes = React.createRef();
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

  submit(e) {
    e.preventDefault()
    
    sightings
      .compressFileList(this.fileInput.current.files)
      .catch(err => console.log('Error compressing images', err))
      .then(images => sightings.create({images, notes: this.notes.current.value}))
      .catch(err => console.log('Error creating sighting', err))
      .then(res => console.log('created sighting', res))
  }

  displayImagePreviews() {
    let selectedImageUrls = []
    const fileList = this.fileInput.current.files
    for (var i = 0; i < fileList.length; i++) {
      selectedImageUrls.push(URL.createObjectURL(fileList.item(i)))
    }

    this.setState({selectedImageUrls})
  }
  
}