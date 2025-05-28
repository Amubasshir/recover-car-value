import React from 'react';

const PageTwo: React.FC = () => {
  return (
    <div className="w-full h-[1056px] p-16 flex flex-col">
      <header className="border-b border-gray-200 pb-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Executive Summary</h2>
      </header>
      
      <div className="flex-grow">
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Overview</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            This document provides a comprehensive analysis of the current market trends and opportunities
            for growth in the technology sector. Our research indicates significant potential for
            expansion in cloud services, artificial intelligence, and sustainable technology solutions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The following pages outline our findings and recommendations based on extensive
            market research and industry analysis conducted over the past quarter.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Findings</h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-blue-800 mb-1">Market Growth</h4>
              <p className="text-gray-700">The global technology market is projected to grow by 15% in the next fiscal year.</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium text-green-800 mb-1">Innovation Opportunities</h4>
              <p className="text-gray-700">Three key areas show exceptional promise for innovation and market disruption.</p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
              <h4 className="font-medium text-amber-800 mb-1">Competitive Landscape</h4>
              <p className="text-gray-700">Current market leaders are vulnerable in emerging technology segments.</p>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Methodology</h3>
          <p className="text-gray-700 leading-relaxed">
            Our analysis combines quantitative market data with qualitative insights from industry experts.
            We examined over 200 companies across 15 countries to identify patterns and opportunities in
            the global technology ecosystem.
          </p>
        </section>
      </div>
      
      <footer className="text-sm text-gray-400 text-center border-t border-gray-200 pt-6">
        <p>CONFIDENTIAL DOCUMENT</p>
        <p>Page 2 of 3</p>
      </footer>
    </div>
  );
};

export default PageTwo;