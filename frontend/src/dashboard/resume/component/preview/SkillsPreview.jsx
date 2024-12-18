/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const SkillsPreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor:resumeInfo?.themeColor}} />
      <div className="grid grid-cols-2 gap-y-3 gap-x-24 my-4">
        {resumeInfo?.skills.map((skills,index)=>(
            <div key={index} className="flex items-center justify-between">
                <h2 className="text-xs">{skills.name}</h2>
                <div className="h-2 bg-gray-200 w-[120px] rounded-full">
                    <div className="h-2 rounded-full" style={{backgroundColor:resumeInfo?.themeColor, width:skills?.rating*20+'%'}}></div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPreview;
