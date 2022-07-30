import React from 'react';
import {FlatList, View} from "react-native";

export default class List extends React.PureComponent {

  // Gets the total height of the elements that come before
  // element with passed index
  getOffsetByIndex(index) {
    let offset = 0;
    for (let i = 0; i < index; i += 1) {
      const elementLayout = this._layouts[i];
      if (elementLayout && elementLayout.height) {
        offset += this._layouts[i].height;
      }
    }
    return offset;
  }

  // Gets the comment object and if it is a comment
  // is in the list, then scrolls to it
  scrollToComment(comment) {
    const { list } = this.props;
    const commentIndex = list.findIndex(({ id }) => id === comment.id);
    if (commentIndex !== -1) {
      const offset = this.getOffsetByIndex(commentIndex);
      this._flatList.current.scrollToOffset({ offset, animated: true });
    }
  }

  // Fill the list of objects with element sizes
  addToLayoutsMap(layout, index) {
    this._layouts[index] = layout;
  }

  render() {
    const { list } = this.props;

    return (
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          return (
            <View
              onLayout={({ nativeEvent: { layout } }) => {
                this.addToLayoutsMap(layout, index);
              }}
            >
              <Comment id={item.id} />
            </View>
          );
        }}
        ref={this._flatList}
      />
    );
  }
}
