import { Loader2, PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const db = getFirestore();

  const onCreate = async () => {
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    setLoading(true);
    const resumeId = uuidv4();
    const data = {
      title: resumeTitle,
      resumeId: resumeId,
      userEmail: user?.email,
      userName: user?.name || "Anonymous",
    };

    try {
      // Save data to Firestore
      const docRef = await addDoc(collection(db, "resumes"), data);
      console.log("Document written with ID:", docRef.id);

      setLoading(false);
      setOpenDialog(false);

      // Navigate to the edit resume page
      navigate(`/dashboard/${user.email}/resume/${resumeId}/edit`);
    } catch (error) {
      console.error("Error adding document:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-14 py-24 border flex items-center justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-sm cursor-pointer border-dashed border-black"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex. Full Stack Developer"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
