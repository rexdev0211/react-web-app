import { Fragment, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addWishlistList } from "../store/actions"

function CreateWishlistList() {
  const history = useHistory()

  const [wishlistName, setWishlistName] = useState("")
  const [wishlistKind, setWishlistKind] = useState("Publica")

  const dispatch = useDispatch()

  const createWishlist = () => {
    if (wishlistName) {
      const kind = wishlistKind === "Privata" ? "Y" : "P"
      dispatch(addWishlistList(wishlistName, kind))
      history.push("/account/store/wishlists")
    }
  }

  return (
    <Fragment>
      <Row className="justify-content-center">
        <Col xs="12" sm="12" lg="10" xl="10" md="10">
          <Card>
            <CardHeader style={{ paddingBottom: 0 }}>
              <h3 style={{ marginBottom: '7px' }}>Add new Wishlist</h3>
            </CardHeader>
            <CardBody>
              <Row style={{ marginBottom: "10px" }}>
                <Col xs="12" sm="12" lg="8" xl="8" md="8">
                  <FormGroup>
                    <Label for="basicInput" className="event-name">
                      Wishlist Name
                    </Label>
                    <Input
                      type="email"
                      id="basicInput"
                      placeholder=""
                      size="md"
                      onChange={(e) => setWishlistName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col
                  md="4"
                  lg="4"
                  xl="4"
                  sm="12"
                  xs="12"
                >
                  <FormGroup>
                    <Label for="select-default"> Visibility </Label>
                    <Input
                      type="select"
                      name="select"
                      id="select-default"
                      size="md"
                      onChange={(e) => setWishlistKind(e.target.value)}
                    >
                      <option>Publica</option>
                      <option>Privata</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <div
                className="button-group"
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                 <Button
                 className='cancel-wishlist-btn'
                  onClick={() => history.push("/account/store/wishlists")}
                  color="light">
                 Back
                </Button>
                <Button.Ripple color="primary" onClick={() => createWishlist()}>
                  Save Wishlist
                </Button.Ripple>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default CreateWishlistList
