import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({selectedItem, items, valueProperty = '_id', contentProperty = 'name', onItemSelect}) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map(item => (
        <li key={items[item][valueProperty]}
            className={'list-group-item' + (items[item] === selectedItem ? ' active' : '')}
            role="button"
            onClick={() => onItemSelect(items[item])}>
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  )
}

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}

GroupList.propTypes = {
  selectedItem: PropTypes.object,
  items: PropTypes.object.isRequired,
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
  onItemSelect: PropTypes.func.isRequired
}

export default GroupList
