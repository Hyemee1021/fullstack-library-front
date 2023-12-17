import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { CustomCarousel } from "../../components/caraousel/CustomCarousel";
import Container from "react-bootstrap/esm/Container";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CustomCard } from "../../components/custom-card/CustomCard";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
const Home = () => {
  const [filteredBooks, setFilterBooks] = useState([]);

  const { books } = useSelector((state) => state.bookInfo);
  console.log(books);

  useEffect(() => {
    const activeBooks = books.filter((book) => book.status === "active");
    setFilterBooks(activeBooks);
    // when there is nothing
  }, [books]);

  const handleOnSearch = (e) => {
    const { value } = e.target;
    const str = value.toLowerCase();

    const searchBooks = books.filter(
      (book) => book.status === "active" && book.name.toLowerCase.includes(str)
    );
    setFilterBooks(searchBooks);
  };
  return (
    <MainLayout>
      <div>
        {/* carousle */}
        <CustomCarousel />
        {/* booklist cart */}
        <Container className="mt-5" fluid>
          <Row>
            <Col className="d-flex justify-content-between">
              <label htmlFor="">{filteredBooks.length} books found!</label>
              <div>
                <Form.Control
                  onChange={handleOnSearch}
                  placeholder="Search book by name"
                />
              </div>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col className="d-flex justify-content-center  flex-wrap mt-5 gap-4">
              {/* book is an object - it will spread property og object */}
              {filteredBooks.map((book, i) => (
                <Link to={`/book/${book._id}`}>
                  <CustomCard {...book} />
                </Link>
              ))}

              {filteredBooks.length < 1 && (
                // <Link to={`/books/${book._id}`}></Link>
                <Alert variant="warning">No book found!</Alert>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Home;
