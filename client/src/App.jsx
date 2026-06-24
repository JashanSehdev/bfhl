import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const data = input
        .split("\n")
        .map(item => item.trim())
        .filter(item => item);

      const res = await axios.post(
        "https://bajaj-oyr7.onrender.com/bfhl",
        { data }
      );

      setResponse(res.data);
    } catch (err) {
      setError("Failed to connect to API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>BFHL Hierarchy Analyzer</h1>

      <textarea
        rows={12}
        cols={50}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`A->B
A->C
B->D`}
      />

      <br />
      <br />

      <button onClick={handleSubmit}>
        Submit
      </button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {response && (
        <pre>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;