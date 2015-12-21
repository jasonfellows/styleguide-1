import ListEmptyState from '../components/lists/list-empty-state';
import React from 'react';
import Styleguide from '../styleguide';

export default React.createClass({
  displayName: "TablesPage",

  render() {
    return (
      <Styleguide>
        <div title="Tables" description="The table styles for Namely">

          <h3 className="mb0">Basic Tables</h3>

          <table className="mb5">
            <thead>
              <tr className="secondary">
                <th></th>
                <th colSpan="3">Second tier header</th>
              </tr>
              <tr>
                <th>Name</th>
                <th className="center">Number</th>
                <th>Status</th>
                <th>Header</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h5 className="mb0 blue-70">Lorem ipsum</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis dictum nulla, quis hendrerit felis. Suspendisse potenti</p></td>
                <td className="center">4</td>
                <td><span className='yellow'>Pending</span></td>
                <td>lorem</td>
              </tr>
              <tr>
                <td>more</td>
                <td className="center">150</td>
                <td><span className='green'>Approved</span></td>
                <td>ipsum</td>
              </tr>
              <tr>
                <td>more</td>
                <td className="center">0.2</td>
                <td><span className='orange'>Declined</span></td>
                <td>dolor</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mb0">Sortable Tables</h3>
          <table className="mb5">
            <thead>
              <tr>
                <th><a href="#" className="block">First</a></th>
                <th><a href="#" className="block">Last</a></th>
                <th><a href="#" className="block">Start Date</a></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John</td>
                <td>Smith</td>
                <td>2014-01-01</td>
              </tr>
              <tr>
                <td>Chuck</td>
                <td>D</td>
                <td>2013-03-15</td>
              </tr>
              <tr>
                <td>Flava</td>
                <td>Flav</td>
                <td>2012-06-28</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mb0">Empty State</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th className="center">Number</th>
                <th>Status</th>
                <th>Header</th>
              </tr>
            </thead>
          </table>
          <ListEmptyState buttonLabel="Add The Thing"
                          buttonLink="#"
                          message="You don't have any of these things!" />
        </div>
      </Styleguide>
    );
  }
});
