import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export const BookTable = () => {
  const { books } = useSelector((state) => state.bookInfo);

  console.log(books);

  return (
    <div>
      <p className="d-flex justify-content-between">
        <label htmlFor=""> {books.length} books found!</label>
        <div>
          <Form.Control type="text" placeholder="search book by name" />
        </div>
      </p>{" "}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th>Book Info</th>

            <th>Book summary</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {books.map(
            (
              {
                thumbnail,
                name,
                _id,
                status,
                author,
                publishYear,
                description,
              },
              i
            ) => (
              <tr key={i}>
                <td> {i + 1}</td>
                <td>
                  <img src={thumbnail} alt="" width={"100rem"} />
                </td>
                <td>
                  <h4>{name}</h4>
                  <p>
                    {" "}
                    <span
                      className={
                        status === "active"
                          ? "bg-success p-2 rounded text-light"
                          : "bg-warning p-2 rounded  text-light"
                      }
                    >
                      {status}
                    </span>
                  </p>

                  <p>
                    {author} / {publishYear}
                  </p>
                </td>
                <td>{description.slice(0, 100)}...</td>
                <td>
                  <Link to={`/edit-book/${_id}`}>
                    <Button variant="warning">Edit</Button>
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};
