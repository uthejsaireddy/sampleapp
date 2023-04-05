import './App.css';
import { BrowserRouter, HashRouter, Link, Route, Routes } from "react-router-dom";
import UrlShorterner from './components/urlshortenercomponent/UrlShorterner';
import { Suspense, useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  let url = window.location.href

  // const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    redirectToOriginal();
  }, [])


  const redirectToOriginal = async () => {




    try {

      if (url.includes("getOrgUrl")) {

        const response = await axios(
          // `http://localhost:8080/demo/urlShorterner/OriginalToShortUrl?originalUrl=${userInput}`
          `http://localhost:8080/demo/urlShorterner/AccessShortUrl?shortUrl=${url}`
        );

        console.log(response);

        let resp = response.data;

        if (resp.status == true) {
          // navigate(resp.OriginalUrl);
          setErrorMessage("");
          window.location.href = resp.OriginalUrl;
          <Link to={resp.OriginalUrl} /> 
        } else if(resp.status == false && resp.OriginalUrl == "expired") {
          setErrorMessage(<div className='errorStatusMsg'>{"URL EXPIRED !!!"}</div>);
        }else if(resp.status == false && resp.OriginalUrl == null){
          window.location.href = "http://localhost:3000";
        }

      }

    } catch (e) {
      console.log(e);
    }
  }




  return (
    <div className="App">
      {/* <Demo/> */}

      {errorMessage}

      <BrowserRouter>
        <Suspense >
          <Routes>
            <Route exact path="/" name="UrlShorterner" element={<UrlShorterner />} />
            {/* <Route
              exact
              path="/getOrgUrl/:value"
              name="Original Url Redirect"
              element={<OriginalUrlRedirect />}
            /> */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
