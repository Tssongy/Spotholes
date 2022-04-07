import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css'


function View() {
  // state management
  const [viewState, setViewState] = React.useState({
      longitude: 151.18,
      latitude: -33.87,
      zoom: 8
  })

  // const [currentPlaceId, setCurrentPlaceId] = React.useState(null)

  const [showPopup, setShowPopup] = React.useState(false);

  const handleMarkerClick = () => {
    setShowPopup(true)
  }
    
  return (
    <section className="view-page">
      <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: '100%', height: '100vh'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    >

      <Marker longitude={151.18} latitude={-33.87}>
        <span 
          class="material-icons" 
          onClick={handleMarkerClick}
          >
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
            <label>Reported by</label>
            <h4>Username on date</h4>
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