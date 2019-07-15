import React from "react";

import Items from "./Items";
import Cart from "./Cart";
import Order from "./Order";

export default class Content extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: null,
          showing_page:'items',
        };
        this.handleTheState = this.handleTheState.bind(this);
      }
      handleTheState(page){
        console.log('page',page)
        this.setState({ showing_page:page })
      }
      componentDidMount() {
        fetch('https://stark-cliffs-99356.herokuapp.com/api/items', {mode: 'cors'})
          .then(response => response.json())
          .then(data => this.setState({ data:data.data }));
      }
  render() {
    const { data , showing_page} = this.state;
    console.log('data' , data);
    if(data == null) return( <div ></div>)
    return (
      <div>
      {showing_page =='items' ?   <Items  items = {data} handleTheState={this.handleTheState}/> : null}
      {showing_page =='cart' ?  <Cart handleTheState={this.handleTheState} /> : null}
      {showing_page =='order' ?  <Order handleTheState={this.handleTheState} /> : null}
        </div>
    );
  }
}
