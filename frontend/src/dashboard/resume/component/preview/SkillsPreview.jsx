const SkillsPreview = ({ resumeInfo }) => {
  const skills = resumeInfo?.skills;

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm font-medium py-4">
        No skills data added.
      </div>
    );
  }

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-lg mb-4"
        style={{ textTransform: "uppercase", letterSpacing: "1px" }}
      >
        Skills
      </h2>
      <ul className="list-none p-0">
        {skills.map((skill, index) => (
          <li key={index} className="flex items-center mb-2">
            <span className="text-sm font-medium mr-2">
              {skill?.name || "Skill not specified"}
            </span>
            <span>
              {skill?.rating
                ? Array.from({ length: skill.rating }, () => "⭐").join(" ")
                : "No rating provided"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsPreview;
