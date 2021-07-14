import { Fragment, useState } from "react"
import Breadcrumbs from "@components/breadcrumbs"
import "./wishlists.scss"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Media,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap"
import CardFooter from "reactstrap/lib/CardFooter"
import { Lock, Plus, Unlock } from "react-feather"

const Wishlists = () => {
  const [basicModal, setBasicModal] = useState(false)

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Wishlists"
        breadCrumbParent="Pages"
        breadCrumbActive="Wishlists"
      />

      <Card className="card-transaction">
        <CardHeader className="wishlist-card-header">
          <CardTitle tag="h4">Wish lists</CardTitle>
        </CardHeader>
        <hr />
        <CardBody>
          <div className="transaction-item">
            <Media>
              <Lock size={33} color="#ea5455" style={{ marginRight: "40px" }} />
              <Media body>
                <h6 className="transaction-title font-weight-bolder">
                  Personal
                </h6>
                <small>Total products 2</small>
              </Media>
            </Media>

            <div
              className={"font-weight-bolder text-danger remove-wishlist"}
              onClick={() => setBasicModal(!basicModal)}
            >
              Remove
            </div>
          </div>
          <hr />
          <div className="transaction-item">
            <Media>
              <Unlock
                size={33}
                color="#28c76f"
                style={{ marginRight: "40px" }}
              />
              <Media body>
                <h6 className="transaction-title font-weight-bolder">
                  {" "}
                  asdasdasd{" "}
                </h6>
                <small>Total products 2</small>
              </Media>
            </Media>

            <div
              className={"font-weight-bolder text-danger remove-wishlist"}
              onClick={() => setBasicModal(!basicModal)}
            >
              Remove
            </div>
          </div>
          <hr />
          <div className="transaction-item">
            <Media>
              <Lock size={33} color="#ea5455" style={{ marginRight: "40px" }} />
              <Media body>
                <h6 className="transaction-title font-weight-bolder">
                  Personal
                </h6>
                <small>Total products 2</small>
              </Media>
            </Media>

            <div
              className={"font-weight-bolder text-danger remove-wishlist"}
              onClick={() => setBasicModal(!basicModal)}
            >
              Remove
            </div>
          </div>
          <hr />
          <div className="transaction-item">
            <Media>
              <Unlock
                size={33}
                color="#28c76f"
                style={{ marginRight: "40px" }}
              />
              <Media body>
                <h6 className="transaction-title font-weight-bolder">
                  {" "}
                  asdasdasd{" "}
                </h6>
                <small>Total products 2</small>
              </Media>
            </Media>

            <div
              className={"font-weight-bolder text-danger remove-wishlist"}
              onClick={() => setBasicModal(!basicModal)}
            >
              Remove
            </div>
          </div>
          <hr />
        </CardBody>

        <CardFooter className="addlist">
          <Button.Ripple color="success">
            <Plus size={14} />
            <span className="align-middle ml-25">Add List</span>
          </Button.Ripple>
        </CardFooter>
      </Card>

      <Modal isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
        <ModalHeader
          id="modal-header"
          toggle={() => setBasicModal(!basicModal)}
        >
          Are you sure you want to delete this wish list?
        </ModalHeader>
        <ModalBody>
          <div className="modal-func">
            <Button color="danger" onClick={() => setBasicModal(!basicModal)}>
              Remove
            </Button>

            <Button color="success" onClick={() => setBasicModal(!basicModal)}>
              Keep
            </Button>
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default Wishlists
