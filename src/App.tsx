import React from 'react';
import FileDropBox from './components/DropBox';
import HeaderBox from './components/HeaderBox';
import RequirementBox from './components/RequirementsBox';

const PageLayout: React.FC = () => {
  return (
    <div className="flex flex-col content-center text-center">
      <HeaderBox />

        <div className="flex p-4">
          
            <FileDropBox />
            <RequirementBox />

          
        </div>


     
    

      
    </div>
  );
};

export default PageLayout;