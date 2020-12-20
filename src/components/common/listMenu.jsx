import React, { Component } from "react";

class ListMenu extends Component {
  render() {
    const {
      items,
      currentItem,
      onItemClick,
      textProperty,
      valueProperty,
    } = this.props;
    return (
      <div className="list-group">
        <button
          className={
            currentItem.toLowerCase() === "all"
              ? "list-group-item list-group-item-dark list-group-item-action active"
              : "list-group-item list-group-item-dark list-group-item-action "
          }
          onClick={() => onItemClick("All")}
        >
          All Genres
        </button>
        {items.map((item) => (
          <button
            key={item[valueProperty]}
            className={
              item[textProperty] === currentItem
                ? "list-group-item list-group-item-dark active list-group-item-action"
                : "list-group-item  list-group-item-dark list-group-item-action"
            }
            onClick={() => onItemClick(item[textProperty])}
          >
            {item[textProperty]}
          </button>
        ))}
      </div>
    );
  }
}

export default ListMenu;
