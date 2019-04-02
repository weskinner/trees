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
        <div><input type="text" name="commonName" placeholder="Common Name" /></div>
        <div><label>leaf</label><input type="file" name="leaf" /></div>
        <div><label>tree</label><input type="file" name="tree" /></div>
        <div><input type="submit" /></div>
      </form>
    )
  }
}