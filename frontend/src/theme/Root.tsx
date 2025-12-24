import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Chatbot from '@site/src/components/Chatbot';

export default function Root({children}) {
  return (
    <>
      {children}
      <BrowserOnly>
        {() => <Chatbot />}
      </BrowserOnly>
    </>
  );
}
