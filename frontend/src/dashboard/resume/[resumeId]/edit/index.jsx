/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import FormSection from "../../component/FormSection";
import ResumePreview from "../../component/ResumePreview";
import { ResumeContext } from "@/context/ResumeContext";
import dummy from "@/data/dummy";
import GlobalApi from "../../../../../service/GlobalApi";


const EditResume = () => {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  
  useEffect(()=>{
    // console.log(params.resumeId);
    //setResumeInfo(dummy);
    GetResumeInfo();

  },[])

  const GetResumeInfo=()=>{
    GlobalApi.GetResumeById(params.resumeId).then((resp)=>{
      console.log(resp.data.data.attributes);
      setResumeInfo(resp.data.data.attributes);
      
    })
  }
  return (
    <ResumeContext.Provider value={{resumeInfo,setResumeInfo}}>

    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10"> 
        <FormSection/>
        <ResumePreview/>
    </div>
    </ResumeContext.Provider>
  )
}

export default EditResume