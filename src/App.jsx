import './App.css';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
function App() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
  };

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState(JSON.parse(localStorage.getItem('emp')) || [])
  const [edit, setEdit] = useState("")


  const handalSuubmit = (e) => {
    e.preventDefault();
    console.log(`edit ID ${edit.id}`);
    if (edit) {
      let up = data.map((val) => {
        if (val.id === edit.id) {
          return {
            ...val,
            fname: fname,
            lname: lname,
            email: email
          }
        }
        return val
      })
      localStorage.setItem('emp', JSON.stringify(up));
      setData(up);
      setEdit("");
    } else {
      let obj = {
        id: Math.floor(Math.random() * 100),
        fname, lname, email
      }

      let GetData = JSON.parse(localStorage.getItem('emp')) || [];
      let mrg = [...GetData, obj]
      localStorage.setItem('emp', JSON.stringify(mrg));
      setData(mrg);

    }
    setFname("");
    setLname("");
    setEmail("");
    handleClose();

  }

  const EditUser = (id) => {
    let Ed = data.find((val) => {
      return val.id == id
    })
    setEdit(Ed)
    handleShow();
  }

  const DeletUser = (id) => {
    console.log(id);
    let Del = data.filter(item => item.id !== id)
    localStorage.setItem('emp', JSON.stringify(Del));
    setData(Del)
  }
  useEffect(() => {
    if (edit) {
      setFname(edit.fname)
      setLname(edit.lname)
      setEmail(edit.email)
    }
  }, [edit])
  return (
    <Container>
      <Row>
        <Button variant="primary" onClick={handleShow} className='w-25'>
          Launch demo modal
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>


            <Form onSubmit={handalSuubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" onChange={(e) => setFname(e.target.value)} value={fname} />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail" >
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" onChange={(e) => setLname(e.target.value)} value={lname} />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>


              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit" >
                Submit
              </Button>
            </Form>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" >
              Close
            </Button>

          </Modal.Footer>
        </Modal>


        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((val, i) => {
                i++
                return (
                  <tr>
                    <td>{i}</td>
                    <td>{val.fname}</td>
                    <td>{val.lname}</td>
                    <td>{val.email}</td>
                    <td>
                      <button type="button" className='btn btn-danger' onClick={() => DeletUser(val.id)}>Delete</button>
                      <button type="button" className='btn btn-success mx-4' onClick={() => EditUser(val.id)}>Edit</button>
                    </td>
                  </tr>
                )
              })
            }


          </tbody>
        </Table>
      </Row>
    </Container>
  )
}

export default App;
