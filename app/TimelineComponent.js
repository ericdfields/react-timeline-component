import React from 'react'

var moment = require('moment')
var _ = require('lodash')
var shortid = require('shortid')

function dateToLabel(date) {
  return moment(date).format('MMM DD YYYY').toUpperCase()
}

function sortDataByDates(dates) {
  return _.sortBy(dates,'date')
}

function diffMonthsBetweenDates(firstDate,lastDate) {
  return moment(lastDate).diff(moment(firstDate),'months')
}

class Circle extends React.Component {

  render() {
    const transform = `translate(${this.props.x},${this.props.y})`
    return (
      <path transform={ transform } d="M7 12c2.76 0 5-2.24 5-5S9.76 2 7 2 2 4.24 2 7s2.24 5 5 5z" 
      strokeOpacity=".492" stroke="#2A2A2A" strokeWidth=".5" fill="#FFF" fillRule="evenodd"/>
    )
  }

}

Circle.props = {
  x: 0,
  y: 0
}

class Label extends React.Component {

  render() {

    const { uniqueLabelsCount,value,index } = this.props

    return(
      <text x={ 0 } y={ 30 } 
            fontFamily="Verdana" 
            fontSize="9"
            width="100%">
        { dateToLabel(value) }
      </text>
    )
  }

}

export default class TimelineComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showingPopover: false
    }
  }

  showPopover() {
    alert('asdf')
    // this.setState({
    //   showingPopover: popoverId
    // })
  }

  hidePopover(popoverId) {
    this.setState({
      showingPopover: false
    })
  }

  render() {

    const SVG_WIDTH = 1000
    const SVG_HEIGHT = 40
    const SVG_VERTICAL_PADDING = 80
    const SVG_WORKING_WIDTH = SVG_WIDTH - (SVG_VERTICAL_PADDING * 2)
    const COLOR_A = '#6192cf'
    const COLOR_B = '#68c660'

    let sortedData = sortDataByDates(this.props.data)
    let sortedDataUniqByDate = _.uniq(sortedData,'date')
    // let uniqueDates = _.uniq(sortedData,'date').map( d => {return d.date} )
    let monthsBetweenExtremes = diffMonthsBetweenDates(sortedData[0].date, sortedData[sortedData.length - 1].date)

    let popoverIdPrefix = shortid.generate()

    const SVG_WIDTH_INTERVAL = SVG_WORKING_WIDTH / monthsBetweenExtremes

    function translateX(x) {
      return `translate(${x},0)`
    }

    function labelGroupPos(groupIndex) {
      if (sortedDataUniqByDate[groupIndex - 1] === undefined) {
        return -26
      } else {
        var totalMonthsSoFar = diffMonthsBetweenDates(sortedDataUniqByDate[0].date, sortedDataUniqByDate[groupIndex-1].date)
        var monthsBetweenThisDateAndLast = diffMonthsBetweenDates(sortedDataUniqByDate[groupIndex-1].date, sortedDataUniqByDate[groupIndex].date)
        return ((totalMonthsSoFar + monthsBetweenThisDateAndLast) * SVG_WIDTH_INTERVAL) - 26
      }
    }

    let monthMarkers = []
    for (var i = -1; i < monthsBetweenExtremes; i++) {
      if (monthsBetweenExtremes != 0) {
        monthMarkers.push(
          <rect width={ 1 } height={ 5 } y={ 0 } fill={ '#000000' } 
            x={ (SVG_WORKING_WIDTH / monthsBetweenExtremes) * (i+1) }
            key={ i } />
        )
      }
    }

    return (
      <div style={ {position: 'relative', height: '90px' } }>
        <svg width={ SVG_WIDTH } height={ SVG_HEIGHT }>
          <g transform={ translateX( SVG_VERTICAL_PADDING )}>
            <rect width={ SVG_WORKING_WIDTH } height={ 1 } />
            { sortedDataUniqByDate.map( (date, index) => {
                var popoverId = `${popoverIdPrefix}-${index}`
                return(
                  <g transform={ translateX( labelGroupPos(index) ) } key={ index }>
                    <Circle x={ 20 } y={ 4 } onClick={ this.showPopover.bind(this) } onmouseout={ this.hidePopover.bind(this) } />
                    <Label value={ date.date } index={ index } uniqueLabelsCount={ sortedDataUniqByDate.length } />
                  </g>
                )
              }
            )}
            { monthMarkers }
          </g>
        </svg>

        <div style={{ fontFamily: 'sans-serif', font: 'caption', fontWeight: 400, fontSize: 11, position: 'relative', left: `${SVG_VERTICAL_PADDING - 25}px` }}>
        { sortedDataUniqByDate.map( (date, index) => {
            return(
              <div style={ { 
                position: 'absolute', 
                left: labelGroupPos(index) + 'px', 
                border: '2px solid #979797', 
                backgroundColor: 'white', 
                padding: '.5em', 
                borderRadius: '6px',
                width: '100px',
                minHeight: '2em',
                display: this.state.showingPopover === `${popoverIdPrefix}-${index}` ? 'block' : 'none'
              } } key={ index }>
                {
                  _.where(sortedData, { date: date.date }).map( (item,itemIndex) => {
                    var textStyles = {
                      margin: '0 0 .5em 0',
                    }
                    return(
                      <div style={ textStyles } key={ itemIndex }>
                        { item.name }
                      </div>
                    )
                  })
                }
              </div>
            )
          }
        )}
        </div>

      </div>
    )
  }

}

