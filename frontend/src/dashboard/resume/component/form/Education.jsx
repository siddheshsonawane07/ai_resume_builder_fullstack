/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ResumeContext } from "@/context/ResumeContext"
import { LoaderCircle } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import GlobalApi from "../../../../../service/GlobalApi"
import { toast } from "sonner"


const Education = () => {
    const [loading,setLoading] = useState(false);
    const {resumeInfo,setResumeInfo} = useContext(ResumeContext);
    const params = useParams();
    // eslint-disable-next-line no-unused-vars
    const[educationlist, setEducationList] = useState([
        {
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:'',

        }
    ])
    useEffect(()=>{
        resumeInfo&&setEducationList(resumeInfo.education)
    },[])

    const handleChange=(index,e)=>{
        const newEntries = educationlist.slice();
        const {name,value} = e.target;
        newEntries[index][name] = value;
        setEducationList(newEntries); 

    }
    const AddNewEducation=()=>{
        setEducationList([...educationlist,{
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:'',

        }])

    }
    
    const RemoveEducation=()=>{
        if(educationlist.length > 1){

            setEducationList(educationlist=>educationlist.slice(0,-1))
        }
    }
    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                education: educationlist.map(({ id, ...rest }) => rest),
            }
        }

        GlobalApi.UpdateResumeDetails(params.resumeId,data).then(resp=>{
            console.log(resp)
            setLoading(false);
            toast.success("Details Updated")
            
        },(error)=>{
            setLoading(false);
            toast.error("Failed to Update")
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            education: educationlist,
        })
      },[educationlist])

  
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add your educational details</p>
        <div>
            {educationlist?.map((item,index)=>(
                <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                    <div className="col-span-2">
                        <label>University Name</label>
                        <Input name="universityName" defaultValue={item.universityName} onChange={(e)=>handleChange(index,e)}/>
                    </div>
                    <div>
                        <label>Degree</label>
                        <Input name="degree" defaultValue={item.degree} onChange={(e)=>handleChange(index,e)}/>
                    </div>
                    <div>
                        <label>Major</label>
                        <Input name="major" defaultValue={item.major} onChange={(e)=>handleChange(index,e)}/>
                    </div>
                    <div>
                        <label>Start Date</label>
                        <Input type="date" defaultValue={item.startDate} name="startDate" onChange={(e)=>handleChange(index,e)}/>
                    </div>
                    <div>
                        <label>End Date</label>
                        <Input type="date" defaultValue={item.endDate} name="endDate" onChange={(e)=>handleChange(index,e)}/>
                    </div>
                    <div className="col-span-2">
                        <label>Description</label>
                        <Textarea name="description" defaultValue={item.description} onChange={(e)=>handleChange(index,e)}/>
                    </div>
                </div>
            ))}
        </div>
        <div className="flex justify-between">
            <div className="flex gap-3">
            <Button variant='outline' onClick={AddNewEducation} className='text-primary'> + Add More Education</Button>
            <Button variant='outline' onClick={RemoveEducation} className='text-primary'> - Remove</Button>
            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
        
    </div>
  )
}

export default Education