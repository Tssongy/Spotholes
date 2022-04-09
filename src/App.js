// import React, {useState} from "react";
import './App.css';
import './Landing.css'
import './NewPothole.css'
import Landing from './Landing';
import MapView from './MapView';
import * as React from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'


function App() {
  // state management
  const [viewState, setViewState] = React.useState({
    longitude: 151.18,
    latitude: -33.87,
    zoom: 11,
    maxBounds: [
      [104.87, -45.62],
      [175.70, -4.75]
    ]
  })
  const [currentPlaceId, setCurrentPlaceId] = React.useState(null)
  const [potholeData, setPotholeData] = React.useState([])
  const [newPothole, setNewPothole] = React.useState(null)
  const [location, setLocation] = React.useState(null);
  const [size, setSize] = React.useState(null);
  const [photo, setPhoto] = React.useState('https://ichef.bbci.co.uk/news/976/cpsprodpb/F4AD/production/_117773626_mediaitem117773622.jpg');
  const [userName, setUserName] = React.useState('anon');
  const [showAbout, setShowAbout] = React.useState(true)
  const [showNav, setShowNav] = React.useState(false)
  // const [date, setDate] = React.useState('2022-04-06');



  const handleMarkerClick = (lng, lat, id) => {
    setCurrentPlaceId(null)
    setTimeout(() => {
      setCurrentPlaceId(id)
    }, 0)
    setViewState({
      ...viewState, 
      longitude: lng, 
      latitude: lat
    })
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
      {/* <Landing /> */}
      {/* <About /> */}
      <MapView 
        viewState={viewState}
        currentPlaceId={currentPlaceId}
        potholeData={potholeData}
        newPothole={newPothole}
        location={location}
        size={size}
        photo={photo}
        userName={userName}
        handleAddClick={handleAddClick}
        handleMarkerClick={handleMarkerClick}
        handleSubmit={handleSubmit}
        setViewState={setViewState}
        setNewPothole={setNewPothole}
        setSize={setSize}
        setPhoto={setPhoto}
        showAbout={showAbout}
        setShowAbout={setShowAbout}
        showNav={showNav}
        setShowNav={setShowNav}
      />
    </div>
  );
}

export default App;
