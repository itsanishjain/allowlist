import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../src/utils/firebase";

const Home = () => {
  useEffect(() => {
    getDocs(collection(db, "test")).then((snapshot) =>
      snapshot.docs.map((doc) => console.log(doc.data()))
    );
  }, []);

  return <div>Home Page</div>;
};

export default Home;
