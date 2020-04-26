import React, {Component} from 'react';
import AdminLTE, {Sidebar, Navbar} from 'adminlte-2-react';
import Users from '../components/Users.component';
import Messages from '../components/Messages.component';
import Services from '../components/Services.component';

import {withRouter} from 'react-router-dom';

const { Item, Header, UserPanel } = Sidebar;
const {Entry} = Navbar;

class Dashboard extends Component {

  constructor(props){
      super(props);
      this.state = {};
  }

  componentDidMount() {
    const isLN = localStorage.getItem('LoggedIn')
    console.log('is logged in', isLN);
    let client = null;
    if(isLN){
      client = localStorage.getItem('client');
      console.log('client dash', client);
      this.props.updateClient(JSON.parse(client));
    }
  }

  logout = () =>{
    localStorage.clear();
    this.props.history.replace('/');
  }

  render() {
    // console.log("in dashboard", this.props.clientData.id);
    return (
      <AdminLTE title={["App", "Name"]} titleShort={["ap", "na"]} theme="blue" >
        <Navbar.Core>
          <Entry
            icon="fas-sign-out-alt" onClick = {this.logout}
          >
          </Entry>
        </Navbar.Core>
        <Sidebar.Core>
            <UserPanel username = {this.props.clientData.name} status = "status" imageUrl = "http://getdrawings.com/free-icon/my-profile-icon-67.png"/>
            <Header text="Options" icon="options-outline" />
            <Item key="users" text="Users" to="/client-users" />
            <Item key="messages" text="Messages" to="/client-messages"  />
            <Item key="services" text="Services" to="/client-services" />
        </Sidebar.Core>
        <Users path="/client-users" clientID = {this.props.clientData.id}/>
        <Messages path="/client-messages" clientID = {this.props.clientData.id}/>
        <Services path="/client-services" clientID = {this.props.clientData.id}/>
      </AdminLTE>
    );
  }
}
export default withRouter(Dashboard);
