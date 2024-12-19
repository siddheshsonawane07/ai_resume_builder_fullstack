import AddResume from "./components/AddResume";
import { useContext, useEffect, useState } from "react";
import ResumeItem from "./components/ResumeItem";
import { UserContext } from "@/context/UserContext";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../utils/firebase_config";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  const GetResumesList = async () => {
    try {
      const db = getFirestore(app);
      const resumesRef = collection(db, "resumes");
      const q = query(resumesRef, where("userEmail", "==", user?.email));
      const querySnapshot = await getDocs(q);

      const resumes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResumeList(resumes);
    } catch (error) {
      console.error("Error fetching resumes: ", error);
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h1 className="font-bold text-3xl">My Resume</h1>
      <p>Start Creating AI Resume for your next job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume) => (
            <ResumeItem key={resume.id} resume={resume} refreshData={GetResumesList} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
