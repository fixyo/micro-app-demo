import React, {useContext} from "react";
import { AppContext } from "../..";

const Home = () => {
  const globalState = useContext(AppContext)

  return <section style={{ padding: 20 }}>
    <h3>userName: {globalState.user?.name} </h3>
  </section>
}

export default Home;