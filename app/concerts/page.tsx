'use client'
import { useState, useEffect } from "react"

export default function ConcertsPage() {
  // State variables here
  const [concerts, setConcerts] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch function here
  async function fetchConcerts() {
    // API call code here
    // Update state with setConcerts() and setLoading()
    const apiKey = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=Minneapolis&size=20`
    const response = await fetch(url)
    const data = await response.json()
    setConcerts(data._embedded.events)
    setLoading(false)
  try {
    // all your fetch code here
    setConcerts(data._embedded.events)
    setLoading(false)
  } catch (error) {
    console.error('Error fetching concerts:', error)
    setLoading(false)
  }
}

  // useEffect here
  useEffect(() => {
    fetchConcerts()
  }, [])

  // Render logic here
  if (loading) {
    return <div>Loading...</div>
  }

  return (
  <div>
    <h1>Concerts</h1>
    {concerts.map((concert) => (
      <div key={concert.id}>
        <h2>{concert.name}</h2>
        <p>Venue: {concert._embedded.venues[0].name}</p>
        <p>Date: {concert.dates.start.localDate}</p>
      </div>
    ))}
  </div>
)
}