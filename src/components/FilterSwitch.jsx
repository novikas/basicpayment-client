import * as React from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

export class FilterSwitch extends React.Component {
  render() {
    const { value, handleChange, options, name } = this.props
    
    return (
      <ToggleButtonGroup
        style={{ margin: '5px' }}
        type="radio"
        value={value}
        name={name}
        onChange={(value) => { handleChange(value) }}
      >
        {options.map((option, idx) => <ToggleButton key={idx} value={option.value}>{option.name}</ToggleButton>)}
      </ToggleButtonGroup>
    );
  }
}
