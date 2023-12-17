import React from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useSelector } from "react-redux/";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.userInfo);

  const { books } = useSelector((state) => state.bookInfo);

  console.log(books);

  const getRandomBooks = (count) => {
    const totalBooks = books.length;
    const randomBooks = [];

    while (randomBooks.length < count) {
      const randomIndex = Math.floor(Math.random() * totalBooks);
      const randomBook = books[randomIndex];

      if (!randomBooks.includes(randomBook)) {
        randomBooks.push(randomBook);
      }
    }
    return randomBooks;
  };
  const randomBooks = getRandomBooks(4);
  console.log(randomBooks);
  return user?.role === "admin" ? (
    <UserLayout title="dashboard">
      {user?.role === "admin" ? (
        <div className="dashboard">
          <Container>
            <Row>
              <h3>New</h3>
              <Col className="py-4 gap-3 shadow rounded bg-white d-flex justify-content-center flex-wrap">
                {books
                  .filter((book) => book.isNew)
                  .map((book) => (
                    <Link to={`/book/${book._id}`} key={book._id}>
                      <div
                        className="card d-flex justify-content-center align-items-center shadow"
                        style={{ width: "12rem" }}
                      >
                        <img
                          src={book.thumbnail}
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body text-center">
                          <p className="card-title">{book.author}</p>
                          <p className="card-title">{book.publishYear}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </Col>
            </Row>
            <Row className="shadow gap-3 mt-4">
              <Col className="shadow bg-white rounded py-3">
                <h5>Recomended</h5>
                <Table striped bordered hover>
                  <tbody>
                    {randomBooks.map((book, i) => (
                      <tr>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.publishYear}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              <Col className="shadow bg-white rounded py-3">
                <h5>Popular Authors</h5>
                <Table striped bordered hover>
                  <tbody>
                    {randomBooks.map((book, i) => (
                      <tr>
                        <td>{book.author}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              <Col className="shadow bg-white rounded py-3">
                <h5>Popular reads</h5>
                <Table>
                  <tbody>
                    {randomBooks.map((book, i) => (
                      <tr>
                        <td>{book.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <h1>unauthorised</h1>
      )}
    </UserLayout>
  ) : (
    <h1>unathorized</h1>
  );
};

export default Dashboard;
