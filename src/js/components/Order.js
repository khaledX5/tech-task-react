import React from "react";
import { Form , Badge , Button ,Row ,Col } from 'react-bootstrap';


export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        // console.log('props' , props);

        this.state = {
          cart : null,
          totalPurchase: 0,
          address:"",
          phone:""
        };
        this.handleTheState = this.handleTheState.bind(this);
        this.onChange = this.onChange.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);

      }
      componentDidMount() {
        fetch('https://stark-cliffs-99356.herokuapp.com/api/cart/view', {mode: 'cors'})
          .then(response => response.json())
          .then(data => {
            console.log('dattta', data.items);
            this.setState({ carts:data.items  , 
            totalPurchase:data.totalPurchase})
          });
      }
      onChange(name ,e){
        console.log('name' , name);
        console.log('e' , e.target.value);
        this.setState({[name]:e.target.value})
      }
      handleTheState(){
        this.props.handleTheState('cart')
      }
      confirmOrder(){
        if(this.state.address == "" || this.state.phone == ""  ) alert('please insert phone and address')
        else {
        
                fetch('https://stark-cliffs-99356.herokuapp.com/api/confirm/order',  {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    address:this.state.address,
                    phone:this.state.phone
                  })
                })
                .then(response => response.json())
                .then(res => {
                  if(res.error ) alert(res.error)
                  else alert('Order Submitted with success')
                  this.props.handleTheState('items')
                });
            }
      }
     
   
     
  render() {
    const { carts ,totalPurchase } = this.state;
    if(carts == null) return( <div > nothing to represent </div>)

    return (  
      <div className="row"> 
        
        <div class="row">

        <div class="col-md-2">
        </div>
        <div class="col-md-10">

        <Form>
        <Form.Row>
          <Form.Group controlId="phone">
            <Form.Label>phone</Form.Label>
            <Form.Control type="text" placeholder="phone" onChange={this.onChange.bind(this , 'phone')} />
          </Form.Group>
          </Form.Row>

          <Form.Row>
          <Form.Group controlId="address">
            <Form.Label>address</Form.Label>
            <Form.Control placeholder="address" onChange={this.onChange.bind(this , 'address')} />
          </Form.Group>
          </Form.Row>

      </Form>

        </div>
      </div>
    <div class="col-md-12">
      <Button variant="info">
          <h4>
            Total purchase : <Badge variant="light">{totalPurchase} EGP</Badge>
            <span className="sr-only">unread messages</span>
          </h4>
      </Button>
    </div>
        <div class="col-md-10 ">
          <Button variant="primary float-right" onClick={this.confirmOrder.bind( this  )}>
              Confirm Order
          </Button>
          <Button  class="float-right "  variant="light float-right" onClick={this.handleTheState.bind( this  )}> Cancel</Button>
        </div>
     

      </div>
    );
  }
}
