const Loader = ({ text = 'Loading...', fullPage = false }) => {
  if (fullPage) {
    return (
      <div className="loader-fullpage">
        <div className="loader-container">
          <div className="loader-spinner" />
          <span className="loader-text">{text}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="loader-container">
      <div className="loader-spinner" />
      <span className="loader-text">{text}</span>
    </div>
  );
};

export default Loader;
