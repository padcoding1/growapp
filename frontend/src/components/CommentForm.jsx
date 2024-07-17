import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as commentService from "../services/plantService";
// import styles from './CommentForm.module.css';

const CommentForm = (props) => {
  const { commentId } = useParams();
  const [formData, setFormData] = useState({ text: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComment = async () => {
      const commentData = await commentService.show(commentId);
      setFormData(
        commentData.comments.find((comment) => comment._id === commentId),
      );
    };
    if (commentId) fetchComment();
  }, [commentId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (commentId) {
      commentService.updateComment(commentId, formData);
      navigate(`/plants/${commentId}`); //Which path again?
    } else {
      props.handleAddComment(formData);
    }
    setFormData({ text: "" });
  };

  if (commentId)
    return (
      <main>
        {/* className={styles.container}> */}
        <form onSubmit={handleSubmit}>
          <h1>Edit Comment</h1>
          <label htmlFor="text-input">Your comment:</label>
          <textarea
            required
            type="text"
            name="text"
            id="text-input"
            value={formData.text}
            onChange={handleChange}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </main>
    );

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
