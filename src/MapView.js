import * as React from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl, useMap, MapProvider } from 'react-map-gl';
import * as timeago from 'timeago.js';
import Overlay from './Overlay';
import './MapView.css'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'




function MapView({ viewState, currentPlaceId, potholeData, newPothole, location, size, photo, userName, handleAddClick, handleMarkerClick, handleSubmit, setViewState, setNewPothole, setSize, setPhoto, showAbout, setShowAbout, showNav, setShowNav}) {
  const mapRef = React.useRef();
  

  return (
    <section className="view-page">
      <div className="view-map" style={showAbout?{filter: "blur(5px)"}:{filter: 'none'}}>
      {/* <MapProvider> */}
      <Map
        ref={mapRef}
        onLoad={() => {
          const directions = new MapboxDirections({
            accessToken: process.env.local.REACT_APP_MAPBOX,
            interactive: false
          })
          !showNav && mapRef.current.addControl(
            directions,
            'bottom-left'
          )
          setShowNav(true)
        }}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: '100%', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.local.REACT_APP_MAPBOX}
        onDblClick={handleAddClick}
      >
        {potholeData.map((pothole, id) => (
          <>
            <Marker 
              longitude={pothole.lng} 
              latitude={pothole.lat}
              style={{color:'red'}}
              >
              <span key={id}
                className="material-icons" 
                onClick={() => handleMarkerClick(pothole.lng, pothole.lat, id)}
                style={pothole.size==='large' ? {fontSize: '3em'}:
                       pothole.size==='medium' ? {fontSize: '2em'}: 
                        {fontSize: '1.5em'}}
                // style={{fontSize: '50px'}}
                >
                room
              </span>
            </Marker>
            {id === currentPlaceId && (
              <Popup 
                longitude={pothole.lng} 
                latitude={pothole.lat}
                anchor="left"
              >
                <div className="info-card">
                  <label>Location</label>
                  <p>{pothole.location}</p>
                  <label>Size</label>
                  <p>{pothole.size}</p>
                  <label>Photo</label>
                  <img src={pothole.photo} alt="image not available" />
                  <label>Reported by</label>
                  <p>{pothole.username} <i>{timeago.format(pothole.date)}</i></p>
                </div>
              </Popup>)}
            </>
        ))}

        {newPothole && (
          <>
            <Marker longitude={newPothole.lng} latitude={newPothole.lat}>
              <span className="material-icons">
                room
              </span>
            </Marker>
            <Popup 
              longitude={newPothole.lng} 
              latitude={newPothole.lat}
              anchor="left"
              onClose={() => setNewPothole(null)}
              offset={4}
            >
              <form className='new-pothole' onSubmit={handleSubmit}>
                <label>Location: </label>
                <p>{newPothole.location}</p>
                <label>Size: </label>
                <select name="size" onChange={(e) => setSize(e.target.value)}>
                  <option value="">Select size</option>
                  <option value="small">small</option>
                  <option value="medium">medium</option>
                  <option value="large">large</option>
                </select>
                {/* <input 
                  type="text" 
                  placeholder='small/medium/large'
                  onChange={(e) => setSize(e.target.value)}
                /> */}
                <label>Photo: </label>
                <input 
                  type="text" 
                  placeholder='Insert URL' 
                  onChange={(e) => setPhoto(e.target.value)}
                  />
                <button className='submit-btn'>Submit</button>
              </form>
            </Popup>
          </>
        )}
        <NavigationControl 
          position='bottom-right'
          showCompass={false}
        />
        <GeolocateControl 
          position='bottom-right'
        />
        {/* <NavigateButton 
        showNav={showNav}
        setShowNav={setShowNav}
      
        
        /> */}
        
        
        
      </Map>
      {/* </MapProvider> */}
      </div>
      <Overlay 
        showAbout={showAbout}
        setShowAbout={setShowAbout}
      />
    </section>
  )
}

// function NavigateButton({ showNav, setShowNav }) {
//   const {current: map} = useMap();
//   const directions = new MapboxDirections({
//     accessToken: process.env.REACT_APP_MAPBOX,
//     interactive: false
//   })
//   // console.log(showNav)
//   // console.log(map)

  

//   const handleNavClick = () => {

    
//     // console.log('showNav is ' + showNav)
//     // if(showNav){
//     //     // map.removeControl(directions)
//     //     setShowNav(false)
//     document.querySelector('.mapboxgl-ctrl-bottom-left').innerHTML=''
//     // }
//     // else {
//     //   map.addControl(
//     //     directions,
//     //     'top-left'
//     //   );
//     //   setShowNav('true')
//     // }
//     // !showNav && map.addControl(
//     //   directions,
//     //   'bottom-left'
//     // )

//     // setShowNav(true)

//   };



//   return <button className="go-btn" onClick={handleNavClick}>
//     <span class="material-icons">
//       directions_car
//     </span>
//   </button>
// }

export default MapView