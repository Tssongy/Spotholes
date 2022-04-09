import './Overlay.css'
import reportImg from './images/report.png'
import directionsImg from './images/directions.png'


function Overlay({ showAbout, setShowAbout, showLogin, setShowLogin, showSignup, setShowSignup, handleSignup, currentUserName, setCurrentUserName, handleLogout, handleLogin, errorMsg, setErrorMsg, showInstructions, setShowInstructions }) {
    return (
        <div className='overlay'>
            <div className="header-nav-container">
                <nav>
                    <h1 id='brand-name'>Spotholes</h1>
                    <ul className="nav-list">
                        <li 
                            onClick={() => {
                                setErrorMsg('')
                                setShowAbout(true)
                                setShowLogin(false)
                                setShowSignup(false)
                            }}
                            >
                                About
                        </li>
                        {currentUserName === 'anon' ? <li 
                        onClick={() => {
                            setErrorMsg('')
                            setShowAbout(false)
                            setShowLogin(true)
                            setShowSignup(false)
                        }}
                        >
                            Log in
                        </li> : <li 
                        onClick={handleLogout}
                        >
                            Logout
                            </li>}
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
                <span 
                    className="start-btn"
                    onClick={() => {
                        setShowAbout(false)
                        setShowInstructions(true)
                    }}
                    >
                        Get started
                    </span>
            </div>}

            {showInstructions && <div className="instructions">
                <h1>How to use</h1>
                <span class="material-icons close-btn" onClick={() => setShowInstructions(false)}>
                    close
                </span>
                
                <section className="stats">
                    
                    <div className='stats-container'>
                        <h4>Double click on the map to report</h4>
                        <img src={reportImg} alt="" />
                    </div>
                    <div className='stats-container'>
                        <h4>Get detailed directions pothole-free</h4>
                        <img src={directionsImg} alt="" />
                    </div>  
                </section>
                <p>To keep track of your reports, <span onClick={() => {setShowInstructions(false) 
                    setShowLogin(true)}}>Log in</span> or <span onClick={() => {setShowInstructions(false) 
                        setShowSignup(true)}}>Sign up</span></p>
            </div>}



            {(showLogin) && <div className="log-in">
                <h1>Login:</h1>
                <span class="material-icons close-btn" onClick={() => setShowLogin(false)}>
                    close
                </span>
                <form action="" onSubmit={handleLogin}>
                    <div className="error">{errorMsg}</div>
                    <fieldset>
                        <label for="">Email:</label>
                        <input type="text" name="email"/>
                    </fieldset>  
                    <fieldset>
                        <label for="">Password:</label>
                        <input type="password" name="password"/>
                    </fieldset>  
                    <button>Login
                    </button>
                </form>
                <p>
                    Don't have an account? Sign up <span 
                        className='get-sign-up-btn'
                        onClick={() => {
                            setErrorMsg('')
                            setShowLogin(false)
                            setShowSignup(true)
                            setShowAbout(false)
                        }}>
                        here
                    </span>
                </p>
            </div>}

            {showSignup && <div className="sign-up">
                <h1>Sign up:</h1>
                <span class="material-icons close-btn" onClick={() => setShowSignup(false)}>
                    close
                </span>
                <form action="" onSubmit={handleSignup}>
                    <fieldset>
                        <label for=""> User name:</label>
                        <input type="text" name="name"/>
                    </fieldset>   
                    <fieldset>
                        <label for=""> Email:</label>
                        <input type="text" name="email"/>
                    </fieldset>   
                    <fieldset>
                        <label for="">Password:</label>
                        <input type="password" name="password"/>
                    </fieldset>   
                    <button>Sign Up</button>
                </form>
            </div>}
        </div>
    )
}

export default Overlay