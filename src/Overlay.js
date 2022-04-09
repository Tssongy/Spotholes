import './Overlay.css'


function Overlay({ showAbout, setShowAbout}) {
    return (
        <div className='overlay'>
            <div className="header-nav-container">
                <nav>
                    <h1 id='brand-name'>Spotholes</h1>
                    <ul className="nav-list">
                        <li onClick={() => setShowAbout(true)}>About</li>
                        <li>Log in</li>
                    </ul>
                </nav>
            </div>
            {showAbout && <div className="about">
                <h1>Welcome to Spotholes!</h1>
                <span class="material-icons close-btn" onClick={() => setShowAbout(false)}>
                    close
                </span>
                <p className='desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, ut aspernatur! Magnam nostrum harum consequuntur distinctio dolorem similique reprehenderit minima, et impedit adipisci sit a quae, quaerat libero illo! Itaque.</p>
                <section className="stats">
                    <div className='stats-container'>
                        <h6>Active Users</h6>
                        <p>1000</p>
                    </div>
                    <div className='stats-container'>
                        <h6>Potholes Reported</h6>
                        <p>2500</p>
                    </div>
                </section>
                <span className="start-btn"onClick={() => setShowAbout(false)}>Get started</span>
            </div>}
        </div>
    )
}

export default Overlay