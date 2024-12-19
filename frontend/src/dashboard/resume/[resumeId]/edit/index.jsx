import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../component/FormSection";
import ResumePreview from "../../component/ResumePreview";
import { ResumeContext } from "@/context/ResumeContext";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/utils/firebase_config";

const EditResume = () => {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const db = getFirestore(app);

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = async () => {
    try {
      // const resumeRef = doc(db, "resumes", params.resumeId);
      const resumeRef = doc(db, 'users', params.uid, 'resumes', params.resumeId);

      const resumeDoc = await getDoc(resumeRef);

      if (resumeDoc.exists()) {
        setResumeInfo(resumeDoc.data());
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching resume: ", error);
    }
  };

  return (
    <ResumeContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        {/* <ResumePreview /> */}
      </div>
    </ResumeContext.Provider>
  );
};

export default EditResume;
