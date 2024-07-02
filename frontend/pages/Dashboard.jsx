import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
  return(
    <>
      <Appbar/>
      <div className="px-1 py-1">
      <Balance/>
      <Users/>
      </div>
    </>
  )  
}