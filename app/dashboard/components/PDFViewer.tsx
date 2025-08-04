import React from 'react';
import { UserData } from '../types/user';
import PageTwo from './pages/PageTwo';

interface PDFViewerProps {
  currentPage: number;
  userData: UserData;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ currentPage, userData }) => {
  return (
    <div id="pdf-document\" className="bg-white">
      {currentPage === 2 && <PageTwo />}
    </div>
  );
};

export default PDFViewer;