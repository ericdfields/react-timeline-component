## About

SVG Timeline built in react. For showing dates on a line. 

Takes a simple set of data like this:

```javascript

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

/* … inside a react component's render render() … */

<TimelineComponent data={ dates }/>

```

Looks like this:

![image of timeline component in browser](http://ericdfields.s3.amazonaws.com/img/timeline-app-component-screenshot.png)

The name of the event(s) show up when you hover over the dots.

## Purpose

I needed it. Couldn't find anything else like it. Didn't really publish something open source in a long time.

## Running

npm run dev

## License

MIT