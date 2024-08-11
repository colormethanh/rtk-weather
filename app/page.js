"use client"
import SearchBar from './components/SearchBar';
import WeatherPanel from './components/WeatherPanel';


export default function Home() {
  return (
    <main>
      <SearchBar />
      <WeatherPanel />
    </main>
  )
}
