import React from "react";
import "./styles.css";

function Post(props) {
  const { title, username, domain, lastUpdated } = props;

  return (
    <div className="post-container">
      <span className="img"></span>
      <div className="post">
        <h2 className="titulo">{title}</h2>
        <p className="descricao">
          sent day {lastUpdated} by <span>{username}</span>
        </p>
        <span className="dominio">{domain}</span>
      </div>
    </div>
  );
}

export default Post;
