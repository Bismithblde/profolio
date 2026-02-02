import React from "react";

interface LinkedInIconProps {
  className?: string;
}

const LinkedInIcon: React.FC<LinkedInIconProps> = ({
  className = "w-6 h-6",
}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.436-.103.25-.129.599-.129.948v5.421h-3.554s.05-8.736 0-9.646h3.554v1.364c.43-.664 1.199-1.608 2.928-1.608 2.136 0 3.745 1.394 3.745 4.389v5.501zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.708 0-.968.77-1.708 1.958-1.708 1.187 0 1.927.74 1.927 1.708 0 .95-.74 1.708-1.97 1.708zm1.946 11.019H3.39V9.807h3.893v10.645zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default LinkedInIcon;
