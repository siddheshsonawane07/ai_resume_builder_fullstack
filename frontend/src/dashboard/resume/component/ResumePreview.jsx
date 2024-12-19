import { ResumeContext } from "@/context/ResumeContext"
import { useContext } from "react"
import PersonalDetailPreview from "./preview/PersonalDetailPreview"
import SummaryDetails from "./preview/SummaryDetails"
import ExperiencePreview from "./preview/ExperiencePreview"
import EducationalPreview from "./preview/EducationalPreview"
import SkillsPreview from "./preview/SkillsPreview"


const ResumePreview = () => {
    const {resumeInfo, setResumeInfo} = useContext(ResumeContext)
  return (
    <div className="shadow-lg h-full p-14 border-t-[20px]" style={{borderColor:resumeInfo?.themeColor}}>
        <PersonalDetailPreview resumeInfo={resumeInfo}/>
        <SummaryDetails resumeInfo={resumeInfo}/>
        <ExperiencePreview resumeInfo={resumeInfo}/>
        <EducationalPreview resumeInfo={resumeInfo}/>
        <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview