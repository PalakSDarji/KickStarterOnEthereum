import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {

    state = {
        minimumContribution: '',
        errorMessage: '',
        showLoading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({showLoading: true, errorMessage: ''});
        
        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });
            Router.pushRoute('/');
        }
        catch(err){
            this.setState({showLoading: false});
            this.setState({errorMessage: err.message});
        }
        
        this.setState({showLoading: false});
    };

    render (){
        return (
          <Layout>
            <h3>Create a Campaign!</h3>

            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>Minimum Contribution</label>
                <Input
                  label="wei"
                  labelPosition="right"
                  value={this.state.minimumContribution}
                  onChange={(event) => {
                    let value = null;

                    if (event.target.value) {
                      value = parseInt(event.target.value, 10);
                      if (isNaN(value)) {
                        this.setState({ showInvalidError: true });
                      } else {
                        this.setState({
                          minimumContribution: value,
                        });
                      }
                    }
                  }}
                />
              </Form.Field>

              <Message error header="Oops!" content={this.state.errorMessage} />
              <Button primary loading={this.state.showLoading}>Create!</Button>
            </Form>
          </Layout>
        );
        
    }
}

export default CampaignNew;