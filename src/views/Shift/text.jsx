```
import { useState, useEffect } from 'react'
import './App.css'
import Card from '@mui/material/Card';
import { CardContent, Grid } from '@mui/material';
import axios from "axios";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const baseURL = "https://jsonplaceholder.typicode.com/posts";
const baseURL1 = "https://640ea4ce4ed25579dc38cc50.mockapi.io/Clock/1";
const baseURL1_ = "https://640ea4ce4ed25579dc38cc50.mockapi.io/Clock/:1";
function App() {
  const [post, setPost] = useState(null);
  const [isClockedIn, setIsClockedIn] = useState(true);
  useEffect(() => {
    axios.get(`${baseURL}/1`).then((response) => {
      setPost(response.data);
    });
    axios.get(baseURL1).then((response) => {
      console.log(response.data.isClockedIn,'[[[[]]]]')
      setIsClockedIn(response.data.isClockedIn);
    })
  }, []);
  console.log(isClockedIn);


  function createPost() {
    axios
      .post(baseURL, {
        title: "HANDStOGEtHER tECH",
        body: "This is a new post. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quod repellendus, praesentium quo exercitationem sapiente labore enim ipsa amet nobis!"
      })
      .then((response) => {
        setPost(response.data);
      });
  }
  function updatePost() {
    axios
      .put(`${baseURL}/1`, {
        title: "Hello World!",
        body: "This is an updated post."
      })
      .then((response) => {
        setPost(response.data);
      });
  }
  function deletePost() {
    axios
      .delete(`${baseURL}/1`)
      .then(() => {
        alert("Post deleted!");
        setPost(null)
      });
  }
  if (!post) return "NO POst AVailable";
  return (<>
    <Grid container sx={{ justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <Card sx={{ maxWidth: 400 }} key={post.id}>
        <CardContent>
          <h2 style={{ textAlign: 'center' }}>POST - 1</h2>
          <div>
            <h3>{post.title}</h3>
            <Divider />
            <p>{post.body}</p>
          </div>
          <Divider />
          <br />
          <ButtonGroup>
            <Button variant="contained" onClick={createPost}>Add Post</Button>
            <Button variant="contained" onClick={updatePost}>Update Post</Button>
            <Button variant="contained" onClick={deletePost}>Delete Post</Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </Grid>
    <Grid container sx={{ justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <Card sx={{ maxWidth: 400 }} key={post.id}>
        <CardContent>
          <Button variant="contained" onClick={()=>{
            setIsClockedIn(!isClockedIn);
            axios.put(baseURL1_,{
              isClockedIn:isClockedIn
            }).then((response)=>{
              console.log(response.data);
            }).catch((err)=>{
              console.log(err);
            })  
          }}>{isClockedIn?"TRUE":"FALSE"}</Button>
        </CardContent>
      </Card>
    </Grid>
  </>


  )
}


export default App


```