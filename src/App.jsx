import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Sidebar from "./components/SideBar";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Track if component is mounted

    async function fetchApiData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
      const today = new Date().toDateString();
      const localKey = `NASA-${today}`;
      const cachedData = localStorage.getItem(localKey);

      if (cachedData) {
        const resJson = JSON.parse(cachedData);
        console.log("Fetched from cache");
        if (isMounted) {
          setData(resJson);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(apiUrl);
        const resJson = await res.json();
        localStorage.setItem(localKey, JSON.stringify(resJson));
        console.log("Fetched from API");
        if (isMounted) {
          setData(resJson);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchApiData();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, []); // Empty dependency array ensures this runs only once

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      {loading ? (
        <div className="loadingState">
          <i className="fa-solid fa-gear fa-spin"></i>
        </div>
      ) : (
        <Main data={data} />
      )}
      {showModal && (
        <Sidebar handleToggleModal={handleToggleModal} data={data} />
      )}
      {data && <Footer handleToggleModal={handleToggleModal} data={data} />}
    </>
  );
}

export default App;
