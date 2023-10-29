import React from 'react';
import { app } from '@mrpepper/firebase';

const Page: React.FC<any> = () => {
  return (
    <div>
      <div>
        Firebase: {app ? ' connected' : ' disconnected'}
      </div>
    </div>
  );
};

export default Page;
