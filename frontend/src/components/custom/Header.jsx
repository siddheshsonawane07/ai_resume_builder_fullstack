import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { UserButton, useUser } from "@clerk/clerk-react"



const Header = () => {
    const {isSignedIn} = useUser();
  return (
    <div className="p-3 px-5 flex justify-between shadow-sm">
        <Link to='/'>
          <div className="flex justify-center align-middle items-center gap-3">
          <img src="/logo.svg"/>
          <h1 id="headingTitle">Clever<span id="cv">CV</span></h1>
          </div>
        </Link>
        {isSignedIn?
            <div className="flex gap-4 items-center">
                <Link to={'/dashboard'}><Button variant={'outline'}>Dashboard</Button></Link>
                <UserButton/>
            </div>
            : 
        <Link to={'/auth/sign-in'}><Button>Get Started</Button></Link>

        }
        
    </div>
  )
}

export default Header