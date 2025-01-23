import React from "react";

interface BreadcrumbProps {
  paths: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <nav className="text-sm text-gray-600 mb-4">
      {paths.map((path, index) => (
        <span key={index}>
          {index > 0 && <span className="mx-2">{`>`}</span>}
          {path}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
