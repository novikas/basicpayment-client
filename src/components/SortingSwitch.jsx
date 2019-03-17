import * as React from 'react'

export class SortingSwitch extends React.Component {
  render() {
    const { title, direction, toggleDirection, name } = this.props
    return (
      <button
        style={{
          padding: 0,
          border: 'none',
          font: 'inherit',
          color: 'inherit',
          backgroundColor: 'transparent',
          outline: 'none',
        }}
        onClick={() => toggleDirection(name)}
      >
        {title}&nbsp;
        {
          direction 
          ? <span>&#8593;</span>
          : <span>&#8595;</span>
        }
      </button>
    )
  }
}
