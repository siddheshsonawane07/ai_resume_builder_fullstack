/* eslint-disable no-unused-vars */
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeContext } from "@/context/ResumeContext";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Skills = () => {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const { resumeId } = useParams();
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo.skills);
  }, []);
  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };
    GlobalApi.UpdateResumeDetails(resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast.success("Detailed Updated");
      },
      (error) => {
        console.log(error);
        setLoading(false);
        toast.error("Error updating");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);
  const AddNewSkill = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };
  const RemoveSkill = () => {
    if (skillsList.length > 1) {
      setSkillsList((skillsList) => skillsList.slice(0, -1));
    }
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your top professional skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border rounded-lg p-3 mt-3"
          >
            <div>
              <label className="text-xs">Name</label>
              <Input
                defaultValue={item.name}
                className="w-full"
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={AddNewSkill}
            className="text-primary"
          >
            {" "}
            + Add More Skills
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkill}
            className="text-primary"
          >
            {" "}
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Skills;
