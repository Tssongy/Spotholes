// import React, {useState} from "react";
import './App.css';
import './Landing.css'
import './NewPothole.css'
import Landing from './Landing';
// import View from './View';
import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import axios from 'axios'
import * as timeago from 'timeago.js';

function App() {
  // state management
  const [viewState, setViewState] = React.useState({
    longitude: 151.18,
    latitude: -33.87,
    zoom: 11
  })
  const [currentPlaceId, setCurrentPlaceId] = React.useState(null)
  const [potholeData, setPotholeData] = React.useState([])
  const [newPothole, setNewPothole] = React.useState(null)
  const [showPopup, setShowPopup] = React.useState(false);
  const [location, setLocation] = React.useState(null);
  const [size, setSize] = React.useState(null);
  const [photo, setPhoto] = React.useState(null);
  const [userName, setUserName] = React.useState('anon');
  // const [date, setDate] = React.useState('2022-04-06');



  const handleMarkerClick = (lng, lat, id) => {
    setCurrentPlaceId(null)
    setTimeout(() => {
      setCurrentPlaceId(id)
    }, 0)
    // setShowPopup(false)
    // setTimeout(() => {
    //   setShowPopup(true)
    // }, 0)
    setViewState({...viewState, longitude: lng, latitude: lat})
  }

  const handleAddClick = (e) => {
    const {lng, lat} = e.lngLat
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX}`)
    .then((res) =>
      setNewPothole({
        lat,
        lng,
        location: res.data.features[0].place_name
      })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPotholeData = {
      lat: newPothole.lat,
      lng: newPothole.lng,
      location: location === null ? newPothole.location:location,
      size,
      photo,
      userName,
      date: new Date()
    }
    console.log(newPotholeData.date)

    axios.post('/potholeData', newPotholeData)
        .then((res) => {
          console.log(res)
          setPotholeData([...potholeData, res.data])
        })
        .then(() => setNewPothole(null))
        .catch((err) => {
          console.log(err)
        })
  }


  React.useEffect(() => {
    axios.get('/potholeData')
        .then(res => res.data)
        .then(data => setPotholeData(data))
        .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <Landing />
      {/* <View /> */}
      <section className="view-page">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: '100%', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onDblClick={handleAddClick}
      >
        {potholeData.map((pothole, id) => (
          <>
            <Marker longitude={pothole.lng} latitude={pothole.lat}>
              <span key={id}
                className="material-icons" 
                onClick={() => handleMarkerClick(pothole.lng, pothole.lat, id)}
                >
                room
              </span>
            </Marker>
            {id === currentPlaceId && (
              <Popup longitude={pothole.lng} latitude={pothole.lat}
                anchor="bottom"
                
                >
                <div className="info-card">
                  <label>Address</label>
                  <h4>{pothole.location}</h4>
                  <label>Size</label>
                  <h4>{pothole.size}</h4>
                  <label>Photo</label>
                  <h4>{pothole.photo}</h4>
                  <label>Reported by</label>
                  <h4>{pothole.username}</h4>
                  <label>date</label>
                  <h4>{timeago.format(pothole.date)}</h4>
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
            <Popup longitude={newPothole.lng} latitude={newPothole.lat}
            anchor="left"
            onClose={() => setNewPothole(null)}
            offset={4}
            >
              <form className='new-pothole' onSubmit={handleSubmit}>
                <h3>Add a pothole!</h3>
                <label>location: </label>
                <textarea 
                  type="text" 
                  value={newPothole.location}
                  // onChange={(e) => setLocation(e.target.value)}
                  disabled={true}
                />
                <label>Size: </label>
                <input 
                  type="text" 
                  placeholder='small/medium/large'
                  onChange={(e) => setSize(e.target.value)}
                />
                <label>Photo: </label>
                <input 
                  type="text" 
                  placeholder='Insert URL' 
                  onChange={(e) => setPhoto(e.target.value)}
                  />
                <button>Submit</button>
              </form>
            </Popup>
          </>
        )}

      </Map>
      </section>
    </div>
  );
}

export default App;
