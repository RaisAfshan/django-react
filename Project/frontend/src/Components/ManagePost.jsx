import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Alert, Spinner, Image, Card } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";

const ManagePost = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/postBlog/`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handledelete = async (id) =>{
    if(!window.confirm("Are you sure you want to delete the post?"))return;
     try{
      await axios.delete(`http://127.0.0.1:8000/postBlog/${id}/`);
      setData(prevData => prevData.filter(post=>post.id!==id));
      alert("Post deleted successfully.");
     }catch(err){
        console.error("Delete error",err);
        alert("Failed to delete post.");
     }

  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container className="my-4">
      <h2 className="mb-4">Manage Posts</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <Card className="border-0 ">
          <Card.Body className="p-0">
            <Table
              striped
              bordered
              hover
              responsive
              variant=""
              className="rounded shadow overflow-hidden"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Caption</th>
                  <th>Created At</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((post, index) => (
                  <tr key={post.id}>
                    <td>{index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.caption}</td>
                    <td>
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      <Image
                        src={post.image}
                        alt={post.title}
                        style={{
                          width: "100px",
                          height: "auto",
                          objectFit: "cover",
                        }}
                        className="border-0"
                      />
                    </td>
                    <td>
                      <Link to={`/editpost/${post.id}`}>
                          <IconButton aria-label="edit" color="primary">
                        <EditIcon />
                      </IconButton>
                      </Link>
                
                       <IconButton aria-label="delete" color="error" onClick={()=>handledelete(post.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ManagePost;
