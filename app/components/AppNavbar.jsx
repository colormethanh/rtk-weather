"use client"
import { useSelector, useDispatch } from "react-redux";
import { setCurrentLocation } from "../store/slices/locations";


export default function AppNavbar() {

  const currentLocation = useSelector((state) => {state.locations.currentLocation})

  const dispatch = useDispatch();
  
  const handleSetLocation = () => {
    console.log("Handling Location");
    const geolocation = navigator.geolocation;
    if (!geolocation) return alert("Geolocation is not supported. Sorry!");
  
    const onSuccess = (data) => {
      console.log(data);
      const { latitude, longitude } = data.coords;
      console.log({latitude, longitude})
      dispatch(setCurrentLocation({latitude, longitude}));
    };
    const onError = (error) => {
      console.log(error)
    };

    geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy:true});

  };


  return (
    <nav
        className="navbar navbar-expand-lg navbar-light bg-light navbar-brand-center mb-3"
      >
        <a className="navbar-brand ms-3" href="#">RTK Weather</a>
        <ul className="navbar-nav mx-auto">
          <li className="nav-item navbar-text" id="default-city-text">
            Default location: Not set
          </li>
        </ul>
        <a
          className="nav-link me-3 btn btn-primary"
          type="button"
          id="cur-loc-btn"
          href="#"
          onClick={handleSetLocation}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-geo-alt"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"
            />
            <path
              d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
            />
          </svg>
        </a>
      </nav>
  )
}