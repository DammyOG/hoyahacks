import React from "react";
import { Card } from "./ui/card";
import DiscussionClip from "./discussionClip";

const TrendDiscussions = () => {
  return (
    <div className="w-full min-h-[70vh] flex item-center justify-center">
      <Card className="hidden lg:flex lg:flex-col w-[25rem] min-h-[70vh] max-h-[100vh] bg-white/10 rounded-[2rem] my-6  pt-8 gap-4 overflow-y-auto hide-scrollbar">
        <DiscussionClip
          name={"Example Name"}
          title={"dddd"}
          description={"ddfadf"}
          likeCount={10}
          starCount={0}
        />
        <DiscussionClip
          name={"Example Name"}
          title={"dddd"}
          description={"ddfadf"}
          likeCount={10}
          starCount={0}
        />
        <DiscussionClip
          name={"Sample Name"}
          title={"dddd"}
          description={"ddfadf"}
          likeCount={10}
          starCount={0}
        />
        <DiscussionClip
          name={"Example Name"}
          title={"dddd"}
          description={"ddfadf"}
          likeCount={10}
          starCount={0}
        />
        <DiscussionClip
          name={"Sample Name"}
          title={"dddd"}
          description={"ddfadf"}
          likeCount={10}
          starCount={0}
        />
        <DiscussionClip
          name={"Example Name"}
          title={"dddd"}
          description={"ddfadf"}
          likeCount={10}
          starCount={0}
        />
        <DiscussionClip
          name={"Sample Name"}
          title={"dddd"}
          description={"ddfadf"}
          likeCount={10}
          starCount={0}
        />
      </Card>
    </div>
  );
};

export default TrendDiscussions;
