import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";

function Detail(props) {
  const [book, setBook] = useState({})

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  const {id} = useParams()
  useEffect(() => {
    API.getBook(id)
      .then(res => setBook(res.data))
      .catch(err => console.log(err));
  }, [])

  return (
      <container fluid>
        <row>
          <col size="md-12">
         
              <h1>
                {book.title} by {book.author}
              </h1>
           
          </col>
        </row>
        <row>
          <col size="md-10 md-offset-1">
            <article>
              <h1>Synopsis</h1>
              <p>
                {book.synopsis}
              </p>
            </article>
          </col>
        </row>
        <row>
          <col size="md-2">
            <link to="/">← Back to Authors</link>
          </col>
        </row>
      </container>
    );
  }


export default Detail;
