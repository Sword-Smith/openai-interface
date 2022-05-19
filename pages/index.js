import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: input }),
    });
    const data = await response.json();
    setResult(data.result);
    setInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Enter a sentence that you want OpenAI to complete</h3>
        <form onSubmit={onSubmit}>
          <textarea
            name="input"
            placeholder="Enter a text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="10"
            cols={100}
          />
          <input type="submit" value="Generate response" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div >
  );
}
