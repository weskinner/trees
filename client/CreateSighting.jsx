import React from 'react'
import { Link } from "react-router-dom"

export default
class CreateSighting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <form action="/submit" method="post" encType="multipart/form-data">
        <div className="form-group">
          <label>Image 1</label><input className="form-control-file" type="file" name="images" />
        </div>
        <div className="form-group">
          <label>Image 2</label><input className="form-control-file" type="file" name="images" />
        </div>
        <div className="form-group">
          <label>Image 3</label><input className="form-control-file" type="file" name="images" />
        </div>
        <div className="form-group">
          <input className="form-control" type="submit" />
        </div>
      </form>
    )
  }
}