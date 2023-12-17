import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getABookAction } from "./bookAction";
import { Container } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import { postBurrowAction } from "../burrow-history/burrowAction";

const BookLanding = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();

  const [showReview, setShowReview] = useState(false);

  const { selectedBook } = useSelector((state) => state.bookInfo);

  const { user } = useSelector((state) => state.userInfo);
  console.log(user);
  console.log(user?.fName);

  useEffect(() => {
    _id && dispatch(getABookAction(_id));
  }, [_id, dispatch]);

  const {
    thumbnail,
    name,
    author,
    publishYear,
    description,
    isAvailable,
    dueDate,
  } = selectedBook;

  const handleOnBurrow = () => {
    if (window.confirm("Are you sure you want to burrow this book?")) {
      //check joiValidation what data need to be sent
      const obj = {
        bookId: _id,
        bookName: name,
        thumbnail,
        userId: user._id,
        userName: user.fName,
      };
      dispatch(postBurrowAction(obj));
    }
  };
  return (
    <MainLayout>
      <Container>
        <Row className="mt-4 g-3">
          <Col md={5}>
            {" "}
            <img
              width="100%"
              src={thumbnail}
              alt="bookImage"
              className="shadow-lg img-thumbnail"
            />
          </Col>
          <Col className="" md={7}>
            <h1>{name}</h1>
            <p>
              {author} - {publishYear}
            </p>

            <p className="mb-5">
              <FaStar className="text-warning" />

              <FaStar className="text-warning" />
              <FaStar className="text-warning" />
              <FaStarHalfAlt className="text-warning" />
            </p>

            <p className="pt-5">Summary : {description?.slice(0, 200)}...</p>

            <p className="d-grid pt-2">
              {isAvailable ? (
                user?._id ? (
                  <Button onClick={handleOnBurrow}>Burrow Now</Button>
                ) : (
                  <Link to="login" className="d-grid">
                    <Button>log in to Burrow</Button>
                  </Link>
                )
              ) : (
                <Button variant="warning" disabled={true}>
                  Not Available, Available from : {dueDate?.slice(0, 10)}
                </Button>
              )}
            </p>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="border p-2 rounded">
            <div className="button-group">
              <ButtonGroup aria-label="Basic example">
                <Button variant="primary" onClick={() => setShowReview(false)}>
                  Description
                </Button>
                <Button variant="warning" onClick={() => setShowReview(true)}>
                  Review
                </Button>
              </ButtonGroup>
            </div>

            {showReview ? (
              <>
                <div className="d-flex gap-3 shadow mb-4 mt-4 p-4">
                  <div className="avatar">PA</div>
                  <div className="review ">
                    <h4>Best book</h4>
                    <p className="mb-3">
                      <span>
                        <FaStar className="text-warning" />

                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStarHalfAlt className="text-warning" />
                      </span>
                      {/*  */}

                      <small>5 days ago</small>
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Commodi dignissimos excepturi, saepe corporis architecto
                      iste, voluptas nobis consequuntur sequi repudiandae quasi
                      enim eligendi amet natus hic, iure vitae blanditiis velit.
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-3 shadow mb-4 mt-4  p-4">
                  <div className="avatar">PA</div>
                  <div className="review ">
                    <h4>Best book</h4>
                    <p className="mb-3">
                      <span>
                        <FaStar className="text-warning" />

                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStarHalfAlt className="text-warning" />
                      </span>
                      {/*  */}
                      <small>5 days ago</small>
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eveniet porro quod deserunt perferendis, consequuntur
                      consectetur repellat, reiciendis, soluta voluptatum
                      blanditiis magnam!
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-3 shadow mb-4 mt-4  p-4">
                  <div className="avatar">PA</div>
                  <div className="review ">
                    <h4>Best book</h4>
                    <p className="mb-3">
                      <span>
                        <FaStar className="text-warning" />

                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStarHalfAlt className="text-warning" />
                      </span>
                      {/*  */}
                      <small>5 days ago</small>
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eveniet porro quod deserunt perferendis, consequuntur
                      consectetur repellat, reiciendis, soluta voluptatum
                      blanditiis magnam!
                    </p>
                  </div>
                </div>
              </>
            ) : (
              description
            )}
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default BookLanding;
