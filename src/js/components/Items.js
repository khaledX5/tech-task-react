import React from "react";
import { Card ,Form, Button } from 'react-bootstrap';



export default class Items extends React.Component {
    constructor(props) {
        super(props);
        console.log('props' , props);

        this.state = {
          Items: props.items,
          checkedItems:[]
        };
        this.addToCart = this.addToCart.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.viewCart = this.viewCart.bind(this);

      }
      viewCart(){
        this.props.handleTheState('cart')
      }
      handleChange(item_id , e){
        console.log('handleChange', e.target.checked); // Never gets logged
        console.log('item_id', item_id); // Never gets logged
        let checkedItems = this.state.checkedItems;
        if(e.target.checked) checkedItems.push(item_id);
        else {
          let index = checkedItems.indexOf(item_id);
          if (index > -1) {
            checkedItems.splice(index, 1);
          }
          console.log(checkedItems);
        }
        this.setState({checkedItems});
        console.log('checkedItems', checkedItems)
      }
     
      addToCart() {
        let checkedItems = this.state.checkedItems;
        if(checkedItems.length == 0) return alert('nothing selected');
        else {
        let selectedItems = checkedItems.map(item => ({ item_id:item,quantity:1}))
        console.log('selectedItms',selectedItems);
        fetch('https://stark-cliffs-99356.herokuapp.com/api/cart/create', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id:886,
                items:selectedItems
            })
          })
          .then(response=> response.json())
          .then(response=> {
            if(response.error) alert(response.error)
            else   this.props.handleTheState('cart')
       
          })
        }
      }
  render() {
    const { Items } = this.state;
    if(Items == null) return( <div ></div>)


    console.log('items' , Items);
    return (
      <div class="row">

          <div class="col-md-2">
          </div>
          <div class="col-md-10">
            <Button  class="float-right" onClick={this.viewCart.bind( this  )}> My Cart</Button>
          </div>
      {Items.map((item, index) =>{
                
return (
    <div class="col-md-6">

    <Card style={{ width:'18rem' }}>
  <Card.Body>
    <Card.Title>{item.name} </Card.Title>
    <Card.Subtitle className="mb-2 text-muted"> {item.price} EGP</Card.Subtitle>
    <Card.Text>
    {item.description}

    </Card.Text>
    {/* onClick={this.addToCart.bind( this ,item.id )} */}
    <Form.Check type="checkbox" label="Check me out" onChange={this.handleChange.bind(this , item.id)}/>
  </Card.Body>
</Card>
</div>
)

})}
    <Button  onClick={this.addToCart.bind( this  )}> Add to cart</Button>
      </div>
    );
  }
}
