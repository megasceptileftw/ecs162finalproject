'use client'

import { useState, useEffect } from 'react'

export default function DummyEntries() {
  const [dummyData, setDummyData] = useState([])

  const fetchDummyData = async () => {
    const response = await fetch('/api/dummy');
    if (!response.ok) {
      console.error('Failed to fetch dummy data');
      return;
    }

    const data = await response.json();
    setDummyData(data);
    console.log('dummyData: ', dummyData)
  }

  const addDummyEntry = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get('text');

    const response = await fetch('/api/dummy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      console.error('Failed to add dummy entry');
      return;
    }

    fetchDummyData();
    e.target.reset();
  }

  useEffect(() => {
    fetchDummyData();
  }, []);

  return (
    <div>
      <h2>My Dummy Data</h2>
      {dummyData.map((item) => (
        <div key={item.id}>
          <p>{item.text}</p>
        </div>
      ))}

      <form onSubmit={addDummyEntry}>
        <input type="text" name="text" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}