import "./QuestShowTags.css"

const QuestShowTags = ({ tags }) => {
  return (
    <div className="quest-show-tags">
      {tags.map((tag) => (
        <div key={tag} className={`quest-show-tag quest-show-tag-${tag}`}>
          {tag}
        </div>
      ))}
    </div>
  );
};

export default QuestShowTags; 
