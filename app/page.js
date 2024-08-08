"use client"
import Image from 'next/image'
import styles from './page.module.css'
import SearchBar from './components/SearchBar'

export default function Home() {
  return (
    <main>
      <article>
        <SearchBar />
        <div id="weather-panel-container" className="row">
          <div
            className="col col-12 weather-panel text-center d-flex justify-content-around"
          ></div>
        </div>
        <div className="modal fade" id="project-modal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Modal body text goes here.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
        <a
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#project-modal"
          id="ghost-btn"
          href="#"
        >
        </a>
      </article>
    </main>
  )
}
