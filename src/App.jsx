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
      console.log(`${apiUrl}`);
      const today = new Date().toDateString();
      const localKey = `NASA-${today}`;
      const cachedData = localStorage.getItem(localKey);
      if (cachedData) {
        const resJson = JSON.parse(cachedData);
        if (isMounted) {
          setData(resJson);
          setLoading(false);
        }
        return;
      }
      let resJson = {};
      try {
        const res = await fetch(apiUrl);
        resJson = await res.json();
        if (!resJson.error)
          localStorage.setItem(localKey, JSON.stringify(resJson));
      } catch (err) {
        resJson = { error: err.message };
        setData(resJson);
      } finally {
        if (isMounted) {
          setData(resJson);
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
  if (!data || data.error) return <p>Error loading data.</p>;
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
