import React from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { BookTable } from "../../components/books/BookTable";
import { Link } from "react-router-dom";
const Book = () => {
  return (
    <UserLayout title="Books">
      <div className="book">
        <div className="text-end mb-3">
          <Link to="/new-book" className="text-light">
            <Button variant="primary"> Add new button </Button>
          </Link>
        </div>
        {/* book list */}
        <BookTable />
      </div>
    </UserLayout>
  );
};

export default Book;
