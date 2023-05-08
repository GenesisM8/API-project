import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/SpotsIndex";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import SpotShow from "./components/SpotShow";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path = '/'>
          <SpotsIndex/>
        </Route>
        <Route exact path = '/spots/:spotId'>
          <SpotShow/>
        </Route>
        </Switch>}
    </>
  );
}

export default App;