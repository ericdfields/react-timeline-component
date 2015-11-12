import React from 'react'
import TimelineComponent from './TimelineComponent'

export default class AppComponent extends React.Component {
  render() {

    const dates = [
      {
        date: '2013-06-16',
        name: 'Referral date'
      },
      {
        date: '2015-02-16',
        name: 'Some rando date'
      },
      {
        date: '2015-02-16',
        name: 'Another thing'
      },
      {
        date: '2015-10-01',
        name: 'Current shipping date'
      }
    ]

    const dates2 = [
      {
        date: '2013-06-16',
        name: 'Referral date'
      },
      {
        date: '2015-02-16',
        name: 'Some rando date'
      },
      {
        date: '2015-02-16',
        name: 'Another thing'
      }
    ]

    const dates3 = [
      {
        date: '2013-06-16',
        name: 'Referral date'
      }
    ]

    return (
      <div>
        <h1>Timeline App</h1>
        <TimelineComponent data={ dates }/>
        <TimelineComponent data={ dates2 }/>
        <TimelineComponent data={ dates3 }/>
      </div>
    )
  }
}