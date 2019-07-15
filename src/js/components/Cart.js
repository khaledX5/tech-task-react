import React from "react";
import { Card , Badge , Button } from 'react-bootstrap';


export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        // console.log('props' , props);

        this.state = {
          cart : null,
          totalPurchase: 0
        };
        // this.addToCart = this.addToCart.bind(this);
        this.handleTheState = this.handleTheState.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
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
      handleTheState(){
        this.props.handleTheState('items')
      }
      confirmOrder(){
        this.props.handleTheState('order')
      }
      deleteCard(cartId){

        console.log('ddd', cartId)
        fetch(`https://stark-cliffs-99356.herokuapp.com/api/cart/${cartId}/delete`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
        .then(response=> response.json())
        .then(response=> {
            if(response.error) alert(response.error)
            else  alert('Cart Removed Successfully')

            fetch('https://stark-cliffs-99356.herokuapp.com/api/cart/view', {mode: 'cors'})
            .then(response => response.json())
            .then(data => {
                console.log('dattta', data.items);
                this.setState({ carts:data.items  , 
                totalPurchase:data.totalPurchase})
            });
        })
      }
      onChange(cartId , e){
          let carts = this.state.carts;
          if(isNaN(Number(e.target.value))) {
            alert('please insert valid number')
            return ;  
          }
          carts = carts.map(cart => {
            if(cart.id == cartId) cart.quantity =Number(e.target.value);
            return cart;
          })
          this.setState({carts });
          fetch(`https://stark-cliffs-99356.herokuapp.com/api/cart/${cartId}/update`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity:Number(e.target.value)
            })
          })
          .then(response=> response.json())
          .then(response=> {
            if(response.error) alert(response.error)
            else  alert('quantity updated successfully')
            fetch('https://stark-cliffs-99356.herokuapp.com/api/cart/view', {mode: 'cors'})
            .then(response => response.json())
            .then(data => {
              console.log('dattta', data.items);
              this.setState({ carts:data.items  , 
              totalPurchase:data.totalPurchase})
            });
          })
      }
     
  render() {
    const { carts ,totalPurchase } = this.state;
    if(carts == null) return( <div > nothing to represent </div>)


    console.log('carts' , carts);
    return (  
      <div> 
        <div class="row">
          <div class="col-md-10">
            <Button  class="float-right" onClick={this.handleTheState.bind( this  )}> Back To Items List</Button>
          </div>
        </div>
      <div class="row">

      {carts.map((cart, index) =>{
                
return (
    <div class="col-md-6">

<Card style={{ width:'18rem' }}>
    <Card.Body>
    <Button variant="outline-danger float-right"  onClick={this.deleteCard.bind(this , cart.id )}> x</Button>

      <Card.Title>{cart.item.name} </Card.Title>
      <Card.Subtitle className="mb-2 text-muted "> {cart.item.price} EGP</Card.Subtitle>
      <div className="mb-2 text-muted"> Quantity : {cart.quantity} </div>
      <Card.Text>
      {cart.item.description}

      </Card.Text>
      {/* onClick={this.addToCart.bind( this ,item.id )} */}
      <input type="text" pattern="[0-9]*" 
      value={cart.quantity}  onChange={this.onChange.bind(this , cart.id )}/>
    
      </Card.Body>
</Card>

</div>
)


})}
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
    </div>

      </div>
      </div>
    );
  }
}
