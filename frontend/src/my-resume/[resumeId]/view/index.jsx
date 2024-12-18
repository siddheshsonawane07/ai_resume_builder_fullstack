import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeContext } from "@/context/ResumeContext";
import ResumePreview from "@/dashboard/resume/component/ResumePreview";
import { useEffect, useState } from "react";
import GlobalApi from "../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  useEffect(() => {
    GetResumeInfo();
  }, []);
  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };

  return (
    <ResumeContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-5 mx-10 md:mx-20 lg:mx-36 ">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ulimate AI generated Resume is ready!!!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can share your
            unique resume url with your friends and family
          </p>
          <div className="flex justify-between m-auto mt-6 mb-1 w-52 ">
            <Button onClick={HandleDownload}>Download</Button>

            <RWebShare
              data={{
                text: "Hello Everyone, this is my resume please open URL to see",
                url: "https://clevercv-strapi-backend.onrender.com"+"/my-resume/"+resumeId+"/view",
                title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button variant="outline" className="text-primary border-primary">
                Share
              </Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div id="print-area" className="my-5 mx-10 md:mx-20 lg:mx-36">
        <ResumePreview />
      </div>
    </ResumeContext.Provider>
  );
};

export default ViewResume;
