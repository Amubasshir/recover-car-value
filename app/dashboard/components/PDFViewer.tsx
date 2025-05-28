import React from 'react';
import PageOne from './pages/PageOne';
import PageTwo from './pages/PageTwo';
import PageThree from './pages/PageThree';
import { UserData } from '../types/user';

interface PDFViewerProps {
  currentPage: number;
  userData: UserData;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ currentPage, userData }) => {
  return (
    <div id="pdf-document\" className="bg-white">
      {/* {currentPage === 1 && <PageOne userData={userData} />} */}
      {currentPage === 2 && <PageTwo />}
      {/* {currentPage === 3 && <PageThree userData={userData} />} */}
    </div>
  );
};

export default PDFViewer;