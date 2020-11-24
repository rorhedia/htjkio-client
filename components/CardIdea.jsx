import Link from "next/link";

export default function CardIdea({ id, name, status, image }) {
  let img =
    image ||
    "https://htjkio.s3.us-east-2.amazonaws.com/2020-11-24T02%3A35%3A24.414Z-default.png";

  return (
    <>
      <Link
        href={{
          pathname: "/ideas/[id]",
          query: { id },
        }}
      >
        <a>
          <div className="col mb-4" data-id-idea={id}>
            <div className="card">
              <img src={img} className="card-img-top" alt="..." />
              <div className="card-body d-flex justify-content-between">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">
                  <small className="text-muted">{status}</small>
                </p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
}
