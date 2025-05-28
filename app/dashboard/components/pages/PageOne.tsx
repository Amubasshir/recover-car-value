import React from 'react';
import { UserData } from '../../types/user';

interface PageOneProps {
  userData: UserData;
}

const PageOne: React.FC<PageOneProps> = ({ userData }) => {
  const { name, title, company, date } = userData;
  
  return (
    <div className="w-full h-[1056px] p-16 flex flex-col">
      <div className="flex-grow flex flex-col justify-center items-center text-center">
        <div className="w-24 h-24 bg-blue-600 rounded-full mb-8 flex items-center justify-center">
          <span className="text-3xl font-bold text-white">
            {name.split(' ').map(part => part[0]).join('')}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {title}
        </h1>
        
        <div className="w-20 h-1 bg-blue-600 my-6"></div>
        
        <p className="text-xl text-gray-600 mb-2">Prepared for</p>
        <h2 className="text-2xl font-semibold text-gray-800">{company}</h2>
        
        <div className="mt-12 text-gray-500">
          <p>Prepared on {date}</p>
        </div>
      </div>
      
      <footer className="text-sm text-gray-400 text-center border-t border-gray-200 pt-6">
        <p>CONFIDENTIAL DOCUMENT</p>
        <p>Page 1 of 3</p>
      </footer>
    </div>
  );
};

export default PageOne;