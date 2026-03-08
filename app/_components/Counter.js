"use client";
import { useState } from "react";

export default function Counter({ users }) {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <p>there are {users.length} of users</p>
      <button onClick={() => setCounter((c) => c + 1)}>{counter}</button>
    </div>
  );
}
