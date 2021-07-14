import { Fragment, useState, useEffect } from "react"
import "./wishlists.scss"
import {
  Card,
  CardHeader,
  CardBody,
  Media,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Row,
  Col,
  CustomInput,
  CardFooter
} from "reactstrap"
import { Lock, Plus, Info, Unlock, Heart, X } from "react-feather"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getWishlistItems, deleteWishlistList } from "../store/actions"

const RenderWishlistList = () => {
  const history = useHistory()
  const [basicModal, setBasicModal] = useState(false)
  const [removeWishlist, setRemoveWishlist] = useState()
  const [userType, setUserType] = useState(null)

  const dispatch = useDispatch()
  const store = useSelector((state) => state.ecommerce)

  useEffect(() => {
    dispatch(getWishlistItems())
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"))
    if (data === null) {
      setUserType(false)
    } else {
      setUserType(true)
    }
  }, [])

  const handleCurrentWishlist = (name, visibility) => {
    localStorage.setItem('currentWishlistName', name)
    localStorage.setItem('currentWishlistPrivate', visibility)
  }

  const renderWishlist = () => {
    if (userType === true) {
      if (store.wishlist.data.length > 0) {
        return store.wishlist.data.map((item) => {
          const checkMe = item.active === 'Y' && true
          return  (
            <>
            <Row
              key={item.uid}
              id="wishlist-list-main-div"
              style={{ marginBottom: "18px", paddingTop: "14px" }}
            >
              <Col xs="12" sm="5" md="5" lg="5" xl="5">
                <Media>
                  {item.private === "Y" ? (
                    <Lock
                      size={33}
                      color="#ea5455"
                      style={{ marginRight: "40px" }}
                    />
                  ) : (
                    <Unlock
                      size={33}
                      color="#28c76f"
                      style={{ marginRight: "40px" }}
                    />
                  )}
                  <Link to={`/account/store/wishlists/${item.uid}/view`} onClick={() => handleCurrentWishlist(item.name, item.private)}>
                    <Media body>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <div>
                          <h6 className="transaction-title font-weight-bolder">
                            {item.name}
                          </h6>
                          <small style={{ color: "#6e6b7b" }}>
                            Total products {item.total_products}{" "}
                          </small>
                        </div>
                      </div>
                    </Media>
                  </Link>
                </Media>
              </Col>

              <Col xs="12" sm="4" md="4" lg="4" xl="4">
                <div id="wishlist-active-div">
                  <div>
                    <CustomInput
                      type="radio"
                      id="exampleCustomRadio"
                      name="customRadio"
                      inline
                      label={ item.active === 'Y' ? "Active" : 'Inactive' }
                      defaultChecked={checkMe}
                      
                    />
                  </div>
                  {
                    item.active && (
                      <p id="active-wishlist-subtitle">
                      My favourite items will be added here.
                    </p>
                    )
                  }
                </div>
              </Col>

              <Col xs="12" sm="3" md="3" lg="3" xl="3" id="wishlist-remove-btn">
                <Button
                  className="ml-0 remove-wishlist"
                  color="light"
                  onClick={() => {
                    setRemoveWishlist(item.uid)
                    setBasicModal(!basicModal)
                  }}
                >
                  <X size={14} className="mr-25" />
                  <span>Remove</span>
                </Button>
              </Col>
            </Row>
            <hr />
          </>
          ) 
        }
       )
      }
    }
  }

  const handleDeleteWishlistList = () => {
    dispatch(deleteWishlistList(removeWishlist))
    setRemoveWishlist("")
    setBasicModal(false)
  }

  return (
    <Fragment>
      {store.wishlist.data ? (
        <>
          <Row className="justify-content-center">
            <Col xs="12" sm="12" xl="10" lg="10" md="12">
              <Card className="card-transaction">
                <CardHeader
                  className="wishlist-card-header"
                  id="wishlist-title"
                >
                  <h2 className='wishlist-title0'>
                    <Heart size={30} style={{ marginRight: "14px" }} />
                    Wishlists
                  </h2>
                </CardHeader>
                <CardBody>
                  {renderWishlist()}
                  </CardBody>
                <CardFooter className="addlist">
                  <Button.Ripple
                    color="success"
                    onClick={() => history.push("/account/store/wishlists/create")}
                  >
                    <Plus size={14} />
                    <span className="align-middle ml-25">Add List</span>
                  </Button.Ripple>
                </CardFooter>
              </Card>
            </Col>
          </Row>

          <Modal isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
            <ModalHeader
              id="modal-header"
              toggle={() => setBasicModal(!basicModal)}
            >
              Are you sure you want to delete this wish list?
            </ModalHeader>
            <ModalBody>
              <div className="modal-func">
                <Button
                  color="danger"
                  onClick={() => handleDeleteWishlistList()}
                >
                  Remove
                </Button>

                <Button
                  color="success"
                  onClick={() => {
                    setBasicModal(!basicModal)
                    setRemoveWishlist("")
                  }}
                >
                  Keep
                </Button>
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </Modal>
        </>
      ) : (
        <Alert color="info">
          <div className="alert-body">
            <Info size={14} />
            <span className="align-middle ml-50">Your Wishlist is empty</span>
          </div>
        </Alert>
      )}
    </Fragment>
  )
}

export default RenderWishlistList
