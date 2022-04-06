import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css'


function View() {
    const [viewState, setViewState] = React.useState({
        longitude: 151.18,
        latitude: -33.87,
        zoom: 8
    })

    const [showPopup, setShowPopup] = React.useState(true);

  return (
      <section className="view-page">
        <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: '100vh', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      >

        <Marker longitude={151.18} latitude={-33.87}>
          <span class="material-icons">
            room
          </span>
        </Marker>

        {showPopup && (
          <Popup longitude={151.18} latitude={-33.87}
            anchor="left"
            onClose={() => setShowPopup(false)}>
            <div className="info-card">
              <label>Address</label>
              <h4>street/road name and lane number</h4>
              <label>Size</label>
              <h4>small/medium/large</h4>
              <label>Photo</label>
              <h4>if applicable</h4>
            </div>
          </Popup>)}

      </Map>
        {/* <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        /> */}
      </section>
  )
}

export default View