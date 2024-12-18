/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeContext } from "@/context/ResumeContext";
import { useContext, useState } from "react";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const PersonalDetailForm = ({enableNext}) => { 
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [formData, setFormData] = useState();
  const [loading,setLoading] = useState(false);

  const params = useParams();
  const handleInputChange = (e) => {
    enableNext(false)
    const {name,value} = e.target;

    setFormData({
        ...formData,
        [name]:value
    })

    setResumeInfo({
        ...resumeInfo,
        [name]:value
    })
    
  };
  const onSave=(e)=>{
      e.preventDefault();
      setLoading(true)
    const data ={
        data: formData,
    }
    GlobalApi.UpdateResumeDetails(params?.resumeId,data).then((resp)=>{
        console.log(resp);
        enableNext(true);
        setLoading(false)
        toast.success("Detail Updated")
    },(error)=>{
        setLoading(false)
    })

  }
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-col-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}> {loading?<Loader2 className="animate-spin"/>:'Save'}</Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailForm;
