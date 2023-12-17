import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const CustomCard = ({ name, author, publishYear, thumbnail }) => {
  return (
    <Card className="gap-3" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={thumbnail} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {author} / {publishYear}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};
