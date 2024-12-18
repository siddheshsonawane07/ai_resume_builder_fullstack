/* eslint-disable no-unused-vars */
// import { useUser } from "@clerk/clerk-react"
import AddResume from "./components/AddResume"
import GlobalApi from "../../service/GlobalApi";
import { useContext, useEffect, useState } from "react";
import ResumeItem from "./components/ResumeItem";
import { UserContext } from "@/context/UserContext";


const Dashboard = () => {
  const {userInfo, setUserInfo} = useContext(UserContext);
  console.log(userInfo);
  const [resumeList,setResumeList] = useState([]);
  const user = "something";
  useEffect(()=>{
    user && GetResumesList();
  },[user])
  console.log(user);
  const GetResumesList=()=>{
    GlobalApi.GetUserResume(user?.primaryEmailAddress?.emailAddress).then((resp)=>{
      setResumeList(resp.data.data);

    })
  }
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h1 className="font-bold text-3xl">My Resume</h1>
      <p>Start Creating AI Resume for your next job role</p>
      <div className="grid grid-col-2  md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume/>
        {resumeList.length>0&&resumeList.map((resume,index)=>(
          <ResumeItem key={index} resume={resume} refreshData={GetResumesList}/>
        ))}

      </div>
    </div>
  )
}

export default Dashboard