import React from "react";

export function ErrorPageWithoutStyle({ error }) {
  if (__DEV__ && error) {
    return (
      <>
        <h1>{error.name}</h1>
        <pre>{error.stack}</pre>
      </>
    );
  }

  return (
    <>
      <h1>Error</h1>
      <p>Sorry, a critical error occurred on this page.</p>
    </>
  );
}

ErrorPageWithoutStyle.defaultProps = {
  error: null,
};

export default function ErrorPage(props) {
  return ErrorPageWithoutStyle(props);
}
