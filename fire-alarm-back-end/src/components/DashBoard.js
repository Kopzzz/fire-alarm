import React, { useState, useEffect } from "react"
import { Navbar, Container, Button } from "react-bootstrap"
import { Place } from "./DashBoardCard"
import Popup from "./Popup"
import PopUpAlert from "./PopUpAlert"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFire } from "@fortawesome/free-solid-svg-icons"

const DashBoard = () => {

  // const typetoken = window.localStorage.getItem('typetoken')
  // const accessToken = window.localStorage.getItem('accesstoken')
  const [placeData, setPlaceData] = useState([])
  const [buttonPopup, setButtonPopup] = useState(false)
  const [isEmergency, setIsEmergency] = useState(false)

  useEffect(() => {
    setInterval(getData, 1000)
  }, [])

  useEffect(() => {
    let temp = false
    placeData.forEach((place) => {
      if (place.emergency) temp = true
    })
    setIsEmergency(temp)
  }, [placeData])

  const getData = async () => {
    const response = await axios.get(
      "https://ecourse.cpe.ku.ac.th/exceed15/api/fire-alarm/get-record"
    )

    // const response = await (new Promise((resolve, reject) => {
    //   resolve({
    //     "data": { "room": [{ "number": 1, "place": "IUP Bar", "current_flame": false, "current_gas": 100.0, "current_temp": 30.0, "ref_gas": 2000, "ref_temp": 50, "flame_notification": true, "gas_notification": true, "temp_notification": false, "line_notification": true, "emergency": false }, { "number": 2, "place": "New Bar", "current_flame": false, "current_gas": 2100.0, "current_temp": 30.0, "ref_gas": 2000.0, "ref_temp": 50.0, "flame_notification": true, "gas_notification": true, "temp_notification": true, "line_notification": true, "emergency": true }] }
    //   });
    // }))


    // const response = await axios.get("data.json")
    setPlaceData(response.data.room)
  }

  return (
    <div className="dashboardPage">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="dashboardPage-header"href="#home">
            <span style={{ color: "#ff9900" }}>
              <FontAwesomeIcon icon={faFire} />
            </span>{" "}
            Fire Alarm
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="sign-in-name">
              Signed in as: <a href="#login">Full Name</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        <div className="d-flex justify-content-end">
          <Button
            className="my-3 button-emer"
            variant={isEmergency ? "danger" : "outline-secondary"}
            onClick={() => setButtonPopup(true)}
          >
            EMERGENCY
          </Button>
        </div>
        <Popup
          trigger={buttonPopup}
          closePopup={() => {
            setButtonPopup(false)
          }}
        >
          <PopUpAlert
            places={placeData.filter((m) => {
              if (m.emergency) return m.place
            })}
          />
        </Popup>
        <div className="row">
          {placeData.map((r) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <Place place={r} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashBoard
