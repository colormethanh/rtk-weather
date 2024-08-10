"use client"
import Image from 'next/image';
import styles from './page.module.css';
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
