import './ErrorPage.css';
// Component for error page
const ErrorPage = ({errorType,errorMessage}) => {
  return (
    <div className="error-page-container">
      <h3> {errorType} error </h3>
      <p> {errorMessage}</p>
    </div>
  );
};
export default ErrorPage;
