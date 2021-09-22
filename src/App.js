import React, { useEffect, useMemo, useState } from "react";
import Button from "./components/Button";
import Post from "./components/Post";
import { getHot, getNews, getRising } from "./services/api";
import "./App.css";

const HOT = "HOT";
const NEWS = "NEWS";
const RISING = "RISING";

export default function App() {
  const [page, setPage] = useState(NEWS);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(false);

  const data = useMemo(() => {
    if (!loadMore) return topics.splice(0, 10);
    return topics;
  }, [topics, loadMore]);

  async function getTopics() {
    setLoading(true);
    let data = [];
    try {
      switch (page) {
        case HOT:
          data = await getHot().then((response) => response.data.data.children);
          break;
        case NEWS:
          data = await getNews().then(
            (response) => response.data.data.children
          );
          break;
        case RISING:
          data = await getRising().then(
            (response) => response.data.data.children
          );
          break;
        default:
          break;
      }
      setTopics(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTopics();
  }, [page]);

  return (
    <div className="container">
      <header className="app-header">
        <h1>
          REACT<span>JS</span>
        </h1>
      </header>
      <nav className="navbar">
        <Button
          label="Hot"
          onClick={() => setPage(HOT)}
          variant={page === HOT ? "primary" : "secondary"}
        />
        <Button
          label="News"
          onClick={() => setPage(NEWS)}
          variant={page === NEWS ? "primary" : "secondary"}
        />
        <Button
          label="Rising"
          onClick={() => setPage(RISING)}
          variant={page === RISING ? "primary" : "secondary"}
        />
      </nav>
      <main className="posts">
        {loading && <h2 className="loading">Loading...</h2>}
        {error && <h2 className="error">Failed to load data from server :/</h2>}
        {topics &&
          !loading &&
          !error &&
          data.map(({ data }) => {
            const date = new Date(data.created_utc * 1000).toLocaleDateString();
            const hour = new Date(data.created_utc * 1000).toLocaleTimeString();
            return (
              <>
                <hr />
                <Post
                  username={data.name}
                  title={data.title}
                  lastUpdated={date + " às " + hour}
                  domain={data.domain}
                />
              </>
            );
          })}
        {!loadMore && (
          <Button
            label="See more +"
            variant="primary"
            onClick={() => setLoadMore(true)}
          />
        )}
      </main>
    </div>
  );
}
