import React from 'react'
import { Link } from "react-router-dom"

export default
class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sightings: [
        {commonName: "Oak", leafFile: {}, treeFile: {}}
      ]
    }
  }
  componentDidMount() {
    // get data
  }
  render() {
    const sightings = this.state.sightings.map((s,i) => {
      return (
        <tr key={i}>
          <td>{s.commonName}</td>
          <td><img src={'uploads/' + s.leafFile.filename} width="100" height="100" /></td>
          <td><img src={'uploads/' + s.treeFile.filename} width="100" height="100" /></td>
        </tr>
      )
    })

    return (
      <div>
        <h2>All Sightings</h2>
        <Link to="/sighting">Create Sighting</Link>
        <table>
          <thead>
            <tr>
              <th>Common Name</th>
              <th>Leaf</th>
              <th>Tree</th>
            </tr>
          </thead>
          <tbody>
            {sightings}
          </tbody>
        </table>
      </div>
    )
  }
}