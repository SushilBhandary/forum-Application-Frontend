import { useState } from "react";
import Login from "./components/login";
import Signup from "./components/signup";

function App() {

  const [toSingup, setToSingup] = useState(false)

  return (
    <div >
      {toSingup ? <Signup setToSingup={setToSingup}/> : <Login setToSingup={setToSingup} />}
    </div>
  );
}

export default App;