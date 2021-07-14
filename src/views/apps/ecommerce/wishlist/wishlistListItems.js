import { Fragment, useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { deleteItemFromWishlist, getWishlistListItem } from "../store/actions"
import Select from "react-select"
import Rating from "react-rating"
import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  CardHeader,
  CardFooter,
  CardText
} from "reactstrap"
import { Lock, Star, ShoppingCart, Unlock, X, Share2 } from "react-feather"

import "@styles/base/pages/app-ecommerce.scss"
import "./wishlists.scss"

function RenderWishlistListItems() {
  const [openEdit, setOpenEdit] = useState(false)
  const [userType, setUserType] = useState(null)

  const options = [
    { value: "Public", label: "Public" },
    { value: "Private", label: "Private" }
  ]

  const { wishlist_uid } = useParams()
  const dispatch = useDispatch()
  const store = useSelector((state) => state.ecommerce)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"))
    if (data === null) {
      setUserType(false)
    } else {
      setUserType(true)
    }
  }, [])

  useEffect(() => {
    dispatch(getWishlistListItem(wishlist_uid))
  }, [])

  const removeWishlistItem = (wishlistUid, itemUid) => {
    dispatch(deleteItemFromWishlist(wishlistUid, itemUid))
  }

  const wishlistName = localStorage.getItem("currentWishlistName")
  const wishlistPrivate = localStorage.getItem("currentWishlistPrivate")

  const renderWishlistListItem = () => {
    if (userType === true) {
      if (store.wishlistList.length !== 0) {
        if (store.wishlistList.data.length !== 0 || store.wishlistList.data !== undefined) {
          return store.wishlistList.data.map((item) => {
            const isInStock = item.product.out_of_stock === "N"
            const InStock = isInStock ? "In Stock" : "Out of Stock"
            return (
              <Col sm="7" xs="10" lg="4" xl="3" md="5">
                <Card className="ecommerce-card" id="wishlistList-card">
                  <div className="item-img text-center mx-auto">
                    <Link to="/">
                      <img
                        className="img-fluid card-img-top"
                        style={{
                          width: "230px",
                          height: "220px",
                          marginTop: "12px"
                        }}
                        src={item.product.cover.original}
                        alt={item.product.cover.original}
                      />
                    </Link>
                  </div>
                  <CardBody style={{ paddingBottom: "10px" }}>
                    <div
                      className="item-wrapper"
                      style={{ textAlign: "center", marginBottom: "3px" }}
                    >
                      <div className="item-rating">
                        <ul className="unstyled-list list-inline">
                          <li>
                            <Rating
                              emptySymbol={
                                <Star size={27} fill="white" stroke="#ff9f43" />
                              }
                              fullSymbol={
                                <Star
                                  size={27}
                                  fill="#ff9f43"
                                  stroke="#ff9f43"
                                />
                              }
                              initialRating={item.product.rating}
                              readonly={true}
                            />
                          </li>
                          <li>
                            <span
                              style={{ marginLeft: "10px", color: "#7367f0" }}
                            >
                              {" "}
                              {item.product.total_reviews} Reviews
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h6 className="item-name" style={{ textAlign: "center" }}>
                      <Link className="text-body" to="/">
                        {item.product.name}
                      </Link>
                      <CardText tag="span" className="item-company"></CardText>
                    </h6>
                  </CardBody>
                  <div className="item-options text-center">
                    <div className="item-wrapper">
                      <div className="item-cost">
                        <p className="instock">{InStock}</p>
                        <h4 className="item-price" id="wishlist-item-price">
                          {item.product.price} RON
                        </h4>
                      </div>
                    </div>
                    <Button
                      style={{ width: "50%", color: "#5e5873" }}
                      className="btn-wishlist"
                      id="wishlistItems-remove-btn"
                      color="light"
                      onClick={() => removeWishlistItem(item.wishlist_uid, item.uid)}
                    >
                      <X size={14} className="mr-25" />

                      <span>Remove</span>
                    </Button>
                    <Button
                      id="wishlistItems-cart-btn"
                      style={{ width: "50%" }}
                      color="primary"
                      className="btn-cart move-cart"
                    >
                      <ShoppingCart className="mr-50" size={14} />
                      <span>View In Cart</span>
                    </Button>
                  </div>
                </Card>
              </Col>
            )
          })
        } 
      }
    }

    if (userType === false) {
      if (store.wishlistList.length !== 0) {
        if (
          store.wishlistList.data.items.length !== 0 ||
          store.wishlistList.data.items !== undefined
        ) {
          return store.wishlistList.data.items.map((item) => {
            const isInStock = item.product.out_of_stock === "N"
            const InStock = isInStock ? "In Stock" : "Out of Stock"
            return (
              <Col sm="7" xs="10" lg="4" xl="3" md="5">
                <Card className="ecommerce-card" id="wishlistList-card">
                  <div className="item-img text-center mx-auto">
                    <Link to="/">
                      <img
                        className="img-fluid card-img-top"
                        style={{
                          width: "230px",
                          height: "220px",
                          marginTop: "12px"
                        }}
                        src={item.product.cover.original}
                        alt={item.product.cover.original}
                      />
                    </Link>
                  </div>
                  <CardBody style={{ paddingBottom: "10px" }}>
                    <div
                      className="item-wrapper"
                      style={{ textAlign: "center", marginBottom: "3px" }}
                    >
                      <div className="item-rating">
                        <ul className="unstyled-list list-inline">
                          <li>
                            <Rating
                              emptySymbol={
                                <Star size={27} fill="white" stroke="#ff9f43" />
                              }
                              fullSymbol={
                                <Star
                                  size={27}
                                  fill="#ff9f43"
                                  stroke="#ff9f43"
                                />
                              }
                              initialRating={item.product.rating}
                              readonly={true}
                            />
                          </li>
                          <li>
                            <span
                              style={{ marginLeft: "10px", color: "#7367f0" }}
                            >
                              {" "}
                              {item.product.total_reviews} Reviews
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h6 className="item-name" style={{ textAlign: "center" }}>
                      <Link className="text-body" to="/">
                        {item.product.name}
                      </Link>
                      <CardText tag="span" className="item-company"></CardText>
                    </h6>
                  </CardBody>
                  <div className="item-options text-center">
                    <div className="item-wrapper">
                      <div className="item-cost">
                        <p className="instock">{InStock}</p>
                        <h4 className="item-price" id="wishlist-item-price">
                          {item.product.price} RON
                        </h4>
                      </div>
                    </div>
                    <Button
                      style={{ width: "50%", color: "#5e5873" }}
                      className="btn-wishlist"
                      id="wishlistItems-remove-btn"
                      color="light"
                      onClick={() => removeWishlistItem(item.wishlist_uid, item.uid)}
                    >
                      <X size={14} className="mr-25" />

                      <span>Remove</span>
                    </Button>
                    <Button
                      id="wishlistItems-cart-btn"
                      style={{ width: "50%" }}
                      color="primary"
                      className="btn-cart move-cart"
                    >
                      <ShoppingCart className="mr-50" size={14} />
                      <span>View In Cart</span>
                    </Button>
                  </div>
                </Card>
              </Col>
            )
          })
        }
      }
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader id="wishlist-products-id">
          <div className="wishlist-view-hg">
            {wishlistPrivate === "Y" ? (
              <Lock size={33} color="#ea5455" style={{ marginRight: "40px" }} />
            ) : (
              <Unlock
                size={33}
                color="#28c76f"
                style={{ marginRight: "40px" }}
              />
            )}
            <span className="wishlist-view-h" style={{ color: "#7367f0" }}>
              Wish list: {wishlistName}
            </span>
          </div>

          <div>
            <Button.Ripple
              color="light"
              style={{ border: "0px solid white", color: "#5e5873" }}
              onClick={() => setOpenEdit(!openEdit)}
            >
              Edit List
            </Button.Ripple>
          </div>
        </CardHeader>
        {openEdit && (
          <Row
            className="justify-content-center"
            style={{ paddingLeft: "2%", paddingRight: "2%", marginTop: "10px" }}
          >
            <Col xs="12" sm="6" md="7" lg="9" xl="9">
              <FormGroup>
                <Label for="basicInput"> Wishlist Name</Label>
                <Input type="email" id="basicInput" placeholder="" />
                <Button.Ripple
                  id="edit-list-btn"
                  color="light"
                  style={{
                    border: "0px solid white",
                    marginTop: "10px",
                    color: "#5e5873"
                  }}
                >
                  Cancel
                </Button.Ripple>
              </FormGroup>
            </Col>
            <Col xs="12" sm="6" md="5" lg="3" xl="3">
              <FormGroup>
                <Label for="basicInput">Visibility</Label>
                <Select options={options} defaultValue="Private" />

                <div className="cancelBtn" id="edit-list-btn">
                  <Button.Ripple
                    color="primary"
                    style={{
                      marginTop: "10px"
                    }}
                  >
                    Save Wishlist
                  </Button.Ripple>
                </div>
              </FormGroup>
            </Col>
            <Col
              xs="12"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button.Ripple
                id="hidden-edit-list-btn"
                color="light"
                style={{
                  border: "0px solid white",
                  marginTop: "10px",
                  color: "#5e5873"
                }}
              >
                Cancel
              </Button.Ripple>
              <div className="cancelBtn" id="hidden-edit-list-btn">
                <Button.Ripple
                  color="primary"
                  style={{
                    marginTop: "10px"
                  }}
                >
                  Save Wishlist
                </Button.Ripple>
              </div>
            </Col>
          </Row>
        )}
        <CardBody style={{ marginTop: "23px" }}>
        
          <Row className="justify-content-center">
          {renderWishlistListItem()}  
          </Row>
        
        </CardBody>

        <CardFooter
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "0px solid white"
          }}
        >
          <Button.Ripple
            style={{ border: "0px solid white", color: "#5e5873" }}
            color="light"
          >
            Back
          </Button.Ripple>
          <Button
            style={{ border: "0px solid white", color: "#5e5873" }}
            className="btn-cart"
            color="light"
          >
            <Share2 size={20} style={{ marginRight: "10px" }} />
            <span className="text-truncate">Share with friends</span>
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  )
}

export default RenderWishlistListItems
