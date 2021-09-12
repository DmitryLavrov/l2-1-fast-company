import React from 'react'
import PropTypes, {oneOfType} from 'prop-types'

const GroupList = (props) => {
  return (
    <ul className="list-group">
      {Array.isArray(props.items)
        ? <ItemsArray {...props}/>
        : <ItemsObject {...props}/>}
    </ul>
  )
}

const ItemsArray = ({selectedItem, items, valueProperty, contentProperty, onItemSelect}) => {
  return (<>
    {items.map(item => (
      <li key={item[valueProperty]}
          className={'list-group-item' + (item === selectedItem ? ' active' : '')}
          role="button"
          onClick={() => onItemSelect(item)}>
        {item[contentProperty]}
      </li>
    ))}
  </>)
}

const ItemsObject = ({selectedItem, items, valueProperty, contentProperty, onItemSelect}) => {
  return (<>
    {Object.keys(items).map(item => (
      <li key={items[item][valueProperty]}
          className={'list-group-item' + (items[item] === selectedItem ? ' active' : '')}
          role="button"
          onClick={() => onItemSelect(items[item])}>
        {items[item][contentProperty]}
      </li>
    ))}
  </>)
}

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}

GroupList.propTypes = {
  selectedItem: PropTypes.object,
  items: oneOfType([PropTypes.object.isRequired, PropTypes.array.isRequired]),
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
  onItemSelect: PropTypes.func.isRequired
}

ItemsArray.propTypes = {
  ...GroupList.propTypes,
  items: PropTypes.array.isRequired
}

ItemsObject.propTypes = {
  ...GroupList.propTypes,
  items: PropTypes.object.isRequired
}

export default GroupList
