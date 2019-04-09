import React from 'react'
import { Link } from "react-router-dom"

export default
class Sighting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const sighting = {
      id: 1,
      date: (new Date()).toDateString(),
      author: {
        id: 1,
        username: 'william-skinner',
        imageUrl: 'https://secure.gravatar.com/avatar/279725bb8978ba26f13e39287bae42f0'
      },
      images: [
        {url: "http://cdn.shopify.com/s/files/1/0059/8835/2052/products/Sawtooth-Oak_450_a_grande.jpg?v=1549676643"},
        {url: "https://www.qdma.com/wp-content/uploads/2016/06/sawtooth_lead_574_398_s.jpg"},
        {url: "https://dnr.wi.gov/topic/Invasives/fact/images/SawtoothOak.jpg"},
        {url: "http://media.al.com/living_impact/photo/11862073-large.jpg"},
        {url: "http://www.namethatplant.net/Images/ImagesFire/rtw/rtw_castanea_dentata_2.jpg"}
      ],
      notes: "Quercus acutissima, the sawtooth oak, is an Asian species of oak native to China, Korea, Japan, Indochina and the Himalayas. It is widely planted in many lands and has become naturalized in parts of North America. Quercus acutissima is closely related to the Turkey oak, classified with it in Quercus sect.",
      identifications: [
        {
          id: 1,
          species: 'Quercus acutissima',
          commonName: 'Sawtooth Oak',
          votes: 3 
        },
        {
          id: 2,
          species: 'Quercus brantii',
          commonName: 'Brant\'s Oak',
          votes: 1
        }
      ],
      comments: [
        {
          id: 1,
          author: {
            id: 1,
            username: 'william-skinner'
          },
          value: 'This tree is shite!'
        }
      ]
    }

    const acceptedIdentification = {
          id: 1,
          species: 'Quercus acutissima',
          commonName: 'Sawtooth Oak',
          votes: 3 
        }

    const identifications = sighting.map(s => {
      return (
        <tr>
          <td>{s.species}</td>
          <td>{s.commonName}</td>
          <td>{s.votes}</td>
        </tr>
        )
    })

    return (
      <div>
        <div className="row">
          <div className="col-3">
            <div className="row">
              <div className="col">
                <img src={sighting.images[0].url} alt="Primary Sighting Image" className="img-fluid"/>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <img src={sighting.images[1].url} alt="Alternate Sighting Image" className="img-fluid"/>
              </div>
              <div className="col-4">
                <img src={sighting.images[2].url} alt="Alternate Sighting Image" className="img-fluid"/>
              </div>
              <div className="col-4">
                <img src={sighting.images[3].url} alt="Alternate Sighting Image" className="img-fluid"/>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div>
              <h3>Author</h3>
              <div className="row">
                <dt className="col-sm-3">Username</dt>
                <dd className="col-sm-9"><img src={sighting.author.imageUrl} alt="Author Image"/>{sighting.author.username}</dd>
              </div>
              <div className="row">
                <dt className="col-sm-3">Captured On</dt>
                <dd className="col-sm-9">{sighting.createdOn}</dd>
              </div>
            </div>
            <div>
              <h3>Accepted Identification</h3>
              <div className="row">
                <dt className="col-sm-3">Species</dt>
                <dd className="col-sm-9">{acceptedIdentification.species}</dd>
              </div>
              <div className="row">
                <dt className="col-sm-3">Common Name</dt>
                <dd className="col-sm-9">{acceptedIdentification.commonName}</dd>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h3>Notes</h3>
            <p>{sighting.notes}</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h3>Identifications</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Species</th>
                  <th>Common Name</th>
                  <th>Votes</th>
                </tr>
              </thead>
              <tbody>
                {identifications}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col">
            comments
          </div>
        </div>
      </div>
    )
  }
}