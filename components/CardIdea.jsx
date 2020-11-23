export default function CardIdea({ id, name, status }) {
  return (
    <>
      <div className="col mb-4" data-id-idea={id}>
        <div className="card">
          <img src="download.jpeg" className="card-img-top" alt="..." />
          <div className="card-body d-flex justify-content-between">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">
              <small className="text-muted">{status}</small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
