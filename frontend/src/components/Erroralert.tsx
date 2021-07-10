interface PropsComponent {
  message: string;
}

function ErrorAlert(props: PropsComponent) {
  return (
    <div className="alert alert-danger" role="alert">
      <strong>Error: </strong>
      {props.message}
    </div>
  );
}

export default ErrorAlert;
