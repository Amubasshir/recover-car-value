import React from 'react';
import { UserData } from '../../types/user';

interface PageThreeProps {
  userData: UserData;
}

const PageThree: React.FC<PageThreeProps> = ({ userData }) => {
  const { name, email, phone, company } = userData;
  
  return (
    <div className="w-full h-[1056px] p-16 flex flex-col">
      <header className="border-b border-gray-200 pb-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Next Steps</h2>
      </header>
      
      <div className="flex-grow">
        <section className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommendations</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3 mt-0.5">
                1
              </div>
              <p>Schedule a follow-up meeting to discuss implementation details.</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3 mt-0.5">
                2
              </div>
              <p>Review the proposed timeline and adjust according to your organization's needs.</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3 mt-0.5">
                3
              </div>
              <p>Identify key stakeholders who should be involved in the next phase.</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3 mt-0.5">
                4
              </div>
              <p>Consider the budgetary implications and prepare necessary approvals.</p>
            </li>
          </ul>
        </section>
        
        <section className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Timeline</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-gray-700">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Phase</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Timeline</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">Deliverables</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4">Discovery</td>
                  <td className="py-3 px-4">2-3 weeks</td>
                  <td className="py-3 px-4">Requirements document</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Planning</td>
                  <td className="py-3 px-4">1-2 weeks</td>
                  <td className="py-3 px-4">Project plan</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Implementation</td>
                  <td className="py-3 px-4">4-6 weeks</td>
                  <td className="py-3 px-4">Working solution</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Review</td>
                  <td className="py-3 px-4">1 week</td>
                  <td className="py-3 px-4">Final report</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">{name}</h4>
                <p className="text-gray-700 mb-3">Account Manager for {company}</p>
                
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{email}</p>
                  <p>{phone}</p>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200">
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <footer className="text-sm text-gray-400 text-center border-t border-gray-200 pt-6">
        <p>CONFIDENTIAL DOCUMENT</p>
        <p>Page 3 of 3</p>
      </footer>
    </div>
  );
};

export default PageThree;