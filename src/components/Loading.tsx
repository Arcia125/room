import React from 'react';

const Loading: React.FunctionComponent<{
  isLoading: boolean;
  error: Error;
}> = ({ isLoading, error }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    console.error(error);
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};

export { Loading };
