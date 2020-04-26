import React, { Component } from 'react';

import {
  Content, Row, Box, SimpleTable, Col, Label, Inputs, Button,
} from 'adminlte-2-react';

class Services extends Component {
  constructor(props){
    super(props);
    this.state = {
      services: [{
        id: null,
        details: '',
        user: '',
        req_date: '',
        status: {
          type: '',
          text: ''
        },
        res_date: ''
      }]
    }
  }

  componentDidMount() {
    const isLN = localStorage.getItem('LoggedIn')
    console.log('is logged in', isLN);
    let token = null;
    if(isLN){
      token = localStorage.getItem('token');
      console.log(token);
    }
    fetch('/services',{
      method: 'post',
      headers: {'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token}
    })
      .then(response => {
        return response.json();
      }) 
      .then(res =>{
        console.log(res);
        this.loadServices(res);
      });
  }

  loadServices = (res) =>{
    let Type, Text, Res_date;
    let x = {};
    console.log("type of i",typeof(i))
    let data = [];
    res.forEach((r) =>{
      console.log(r);
      if(r.is_resolved===1){
        Type = 'success';
        Text = 'resolved';
        Res_date = r.resolved_at;
      } else {
        Type = 'warning';
        Text = 'not resolved';
        Res_date = null;
      }
      x = {
        id: r.id,
        details: r.details,
        user: r.name,
        req_date: r.time_received,
        status: {
          type: Type,
          text: Text
        },
        res_date: Res_date
      }
      data.push(x);
    })
    this.setState({services: data});
  }

  render() {
    
    const responsiveColumns = [{ title: 'Service ID', data: 'id' },
      { title: 'Service Details', data: 'details' },
      { title: 'User', data: 'user' },
      { title: 'Request Date', data: 'req_date' },
      { title: 'Status', data: 'status', render: data2 => <Label type={data2.type}>{data2.text}</Label> },
      { title: 'Resolved At', data: 'res_date' }];
    const responsiveData = this.state.services;

    return (
      <Content title="Service Request Info">
        <Row>
          <Col xs={12}>
            <Box noPadding customOptions={<Inputs.Text size="sm" buttonRight={<Button iconClass="fa-search" />} width="130px" placeholder="Search" />}>
              <SimpleTable
                columns={responsiveColumns}
                data={responsiveData}
              />
            </Box>
          </Col>
        </Row>
      </Content>
    );
  }
}

export default Services;