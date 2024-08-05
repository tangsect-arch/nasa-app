import React from "react";

export default function Main({ data } = props) {
  return (
    <div className="imgContainer">
      {data.media_type === "image" ? (
        <img src={data.hdurl} alt={data.title} className="bgImage" />
      ) : (
        <iframe
          title="space-video"
          src={data.url}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="bgVideo"
        />
      )}
      {data.copyright && (
        <div className="copyright">&copy; {data.copyright}</div>
      )}
    </div>
  );
}
