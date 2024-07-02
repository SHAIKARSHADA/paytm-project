import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signup = () => {
  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ email, setEmail] = useState("")
  const [ password, setPassword ] = useState("")
 return(
  <>
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2  h-max px-4">
        <Heading label={"Sign up"}/>  
        <SubHeading label={"Enter your information to create an account"}/>
        <InputBox onChange={(e) => {
          setFirstName(e.taget.value)
        }} label={"First name"} placeholder={"John"}/>
        <InputBox onChange={(e) => {
          setLastName(e.taget.value)
           }} label={"Last name"} placeholder={"Doe"}/>
        <InputBox onChange={(e) => {
          setEmail(e.taget.value)
           }} label={"Email"} placeholder={"JohnDoe123@gmail.com"}/>
        <InputBox onChange={(e) => {
          setPassword(e.taget.value)
           }} label={"Password"} placeholder={"1234568"}/>
        <div className="pt-4">
        <Button label={"Sign up"}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
        </div>
      </div>
    </div>    
  </>
 ) 
}