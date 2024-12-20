import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeContext } from "@/context/ResumeContext";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "@/utils/firebase_config";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

const ExperienceForm = ({ resumeId, email, enableNext }) => {

  const [experiencList, setExperiencList] = useState([formField]);
  const {resumeInfo, setResumeInfo} = useContext(ResumeContext)
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    resumeInfo&&setExperiencList(resumeInfo?.experience)
    
},[])


  const handleChange = (index, event) => {
    const newEntries = experiencList.slice();
    const {name,value} = event.target;
    newEntries[index][name] = value;
    setExperiencList(newEntries); 
  };

  const AddNewExperience=()=>{
    setExperiencList([...experiencList,{
        title:'',
        companyName:'',
        city:'',
        state:'',
        startDate:'',
        endDate:'',
        workSummery:'',
    }])
  }

  const Removexperience=()=>{
    if(experiencList.length > 1){
        setExperiencList(experiencList=>experiencList.slice(0,-1))
    }
  }
  const handleRichTextEditor=(e,name,index)=>{
    const newEntries = experiencList.slice();
    newEntries[index][name] = e.target.value;
    setExperiencList(newEntries); 
  }

  useEffect(()=>{
    setResumeInfo({
        ...resumeInfo,
        experience:experiencList
    })
  },[experiencList])

  const onSave = async () => {
    setLoading(true);

    try {
      const db = getFirestore(app);
      const resumeRef = doc(db, `usersByEmail/${email}/resumes`, `resume-${resumeId}`);
      const data = { experience: experiencList };

      await setDoc(resumeRef, data, { merge: true });

      setLoading(false);
      toast.success("Details updated!");
      enableNext(true);
    } catch (error) {
      setLoading(false);
      console.error("Error saving to Firestore:", error);
      toast.error("Error updating details!");
    }
  };


  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous job experience</p>
        <div>
            {experiencList.map((item,index)=>(
                <div key={index}>
                    <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                        <div>
                            <label className="text-xs">Position Title</label>
                            <Input name="title" defaultValue={item.title} onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div>
                            <label className="text-xs">Company Name</label>
                            <Input name="companyName"  defaultValue={item.companyName} onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div>
                            <label className="text-xs">City</label>
                            <Input name="city" defaultValue={item.city} onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div>
                            <label className="text-xs">State</label>
                            <Input name="state" defaultValue={item.state} onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div>
                            <label className="text-xs">Start Date</label>
                            <Input type="date" name="startDate"  defaultValue={item.startDate} onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div>
                            <label className="text-xs">End Date</label>
                            <Input type="date"  defaultValue={item.endDate} name="endDate" onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div className="col-span-2">
                            <RichTextEditor
                            index={index}
                            defaultValue={item.workSummery}
                            onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummery',index)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="flex justify-between">
            <div className="flex gap-3">
            <Button variant='outline' onClick={AddNewExperience} className='text-primary'> + Add More Experience</Button>
            <Button variant='outline' onClick={Removexperience} className='text-primary'> - Remove</Button>
            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
       
      </div>
    </div>
  );
};

export default ExperienceForm;
