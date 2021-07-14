import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import csc from 'country-state-city'
import "./account-edit-profile.scss"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CardFooter
} from "reactstrap"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { selectThemeColors } from "@utils"
import Select from "react-select"
import Cleave from 'cleave.js/react'

const AccountEditProfile = () => {
  const dispatch = useDispatch()
  
  // Get Store for auth
  const store = useSelector(state => state.auth)
  console.log(store)
  // States
  const [sex, setSex] = useState('M')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneCountryCode, setPhoneCountryCode] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [city, setCity] = useState('')
  
  useEffect(() => {
    if (store.userProfile && store.userProfile.length > 0) {
      const userProfile = store.userProfile[0]
      
      setSex(userProfile.sex)
      setName(userProfile.name)
      setPhone(userProfile.phone)
      setPhoneCountryCode(userProfile.phone_country_code)
      setFirstName(userProfile.first_name)
      setLastName(userProfile.last_name)
      setBirthDate(userProfile.birth_date)
      setCountry(userProfile.country)
      setCity(userProfile.city)
      setRegion(userProfile.region)
    }
  }, [store.userProfile])

  const dateOptions = { date: true, delimiter: '-', datePattern: ['Y', 'm', 'd'] }
  const allCountries = csc.getAllCountries()
  console.log(countryOptions)

  const [select1, setSelect1] = useState(true)
  const [select2, setSelect2] = useState(false)
  const [value, setValue] = useState()
  // const countryOptions = [
  //   { value: "UK", label: "UK" },
  //   { value: "USA", label: "USA" },
  //   { value: "Spain", label: "Spain" },
  //   { value: "France", label: "France" },
  //   { value: "Italy", label: "Italy" },
  //   { value: "Australia", label: "Australia" }
  // ]

  return (
    <Fragment>
      <Row className="justify-content-center">
        <Col>
          <Card className="card-transaction">
            <CardHeader className="wishlist-card-header">
              <CardTitle tag="h4">Edit profile</CardTitle>
            </CardHeader>

            <CardBody>
              <Row>
                <Col xs="12" xl="2" lg="3" md="12">
                  <Label for="sex">Sex:</Label>
                  <Button.Ripple
                    id='sex'
                    className="btn-divider-c"
                    color="primary"
                    outline
                    style={{ paddingLeft: "0px", paddingRight: "0px" }}
                  >
                    <div
                      className="btn-divider"
                      style={{
                        backgroundColor: sex === 'M' ? "#7367f0" : "",
                        color: sex === 'M' ? "white" : ""
                      }}
                    >
                      <span
                        onClick={() => {
                          setSex(sex === 'M' ? 'W' : 'M')
                        }}
                      >
                        {" "}
                        Dl.
                      </span>
                    </div>
                    <div
                      className="btn-divider"
                      style={{
                        backgroundColor: sex === 'W' ? "#7367f0" : "",
                        color: sex === 'W' ? "white" : ""
                      }}
                    >
                      <span
                        onClick={() => {
                          setSex(sex === 'M' ? 'W' : 'M')
                        }}
                      >
                        Dna.
                      </span>
                    </div>
                  </Button.Ripple>
                </Col>
                <Col xs="10" xl="7" lg="8" md="6">
                  <FormGroup>
                    <Label for="name">Nume de utilizator:</Label>
                    <Input
                      type="text"
                      id="name"
                      placeholder=""
                      defaultValue={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" xl="3" lg="3" md="6">
                  <FormGroup>
                    <Label for="phone">Phone:</Label>
                    <PhoneInput
                      id='phone'
                      value={phone}
                      onChange={setPhone}
                    />{" "}
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col xs="12" lg="5" xl="5" md="4">
                  <FormGroup>
                    <Label for="first_name">Prenume:</Label>
                    <Input
                      type="text"
                      id="first_name"
                      placeholder=""
                      defaultValue={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormGroup>
                </Col>

                <Col xs="12" lg="4" xl="4" md="4">
                  <FormGroup>
                    <Label for="last_name">Nume:</Label>
                    <Input
                      type="text"
                      id="last_name"
                      placeholder=""
                      defaultValue={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormGroup>
                </Col>

                <Col xs="12" lg="3" xl="3" md="4">
                  <FormGroup>
                    <Label for="birth_date">Data nasterii:</Label>
                    <Cleave 
                      className='form-control' 
                      id='birth_date' 
                      placeholder='2001-01-01' 
                      options={dateOptions} 
                      value={birthDate} 
                      onChange={(e) => setBirthDate(e.target.value)} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" lg="4" xl="4" md="4">
                  <FormGroup>
                    <Label for="basicInput">Tara:</Label>
                    <Select
                      theme={selectThemeColors}
                      isClearable={false}
                      id={`country`}
                      className="react-select"
                      classNamePrefix="select"
                      options={countryOptions}
                      defaultValue={countryOptions[0]}
                    />
                  </FormGroup>
                </Col>

                <Col xs="12" lg="4" xl="4" md="4">
                  <FormGroup>
                    <Label for="basicInput">Regiune:</Label>
                    <Select
                      theme={selectThemeColors}
                      isClearable={false}
                      id={`country`}
                      className="react-select"
                      classNamePrefix="select"
                      options={countryOptions}
                      defaultValue={countryOptions[0]}
                    />{" "}
                  </FormGroup>
                </Col>

                <Col xs="12" lg="4" xl="4" md="4">
                  <FormGroup>
                    <Label for="basicInput">Localitatea:</Label>
                    <Select
                      theme={selectThemeColors}
                      isClearable={false}
                      id={`country`}
                      className="react-select"
                      classNamePrefix="select"
                      options={countryOptions}
                      defaultValue={countryOptions[0]}
                    />{" "}
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter style={{ border: "none", padding: "0px" }}>
              <Row className="footer-btn">
                <Button.Ripple
                  color="primary"
                  outline
                  style={{
                    marginTop: "10px"
                  }}
                >
                  Cancel
                </Button.Ripple>

                <Button.Ripple
                  color="primary"
                  style={{
                    marginTop: "10px"
                  }}
                >
                  Save
                </Button.Ripple>
              </Row>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default AccountEditProfile
