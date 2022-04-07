import React, { Component } from "react";
import { Card, Grid } from "semantic-ui-react";
import ContributionForm from "../../components/ContributionForm";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";


class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();

        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance : summary[1],
            requestCount : summary[2],
            approversCount : summary[3],
            manager : summary[4]
        };
    }

    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Column width={10}>
                        <h3>Campaign Details:</h3>
                        {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributionForm address={this.props.address}/> 
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }

    renderCards(){

        const {
            balance, manager, minimumContribution, requestCount, approversCount
        } = this.props

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become approver.',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: requestCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdrow money from the contract. Request must be approved by approvers.',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: approversCount,
                meta: 'Number of approvers',
                description: 'Number of people who have already donated to the campaign',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this  campaign has.',
                style: { overflowWrap: 'break-word'}
            }
        ]

        return <Card.Group items={items} itemsPerRow={2} />;
    }
}

export default CampaignShow;