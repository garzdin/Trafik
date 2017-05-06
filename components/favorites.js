import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight,
  Image,
  Modal,
  ListView
} from 'react-native';

var {height, width} = Dimensions.get('window');

class FavoritesModal extends Component {
  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight
        onPress={() => this.props.onSelect(rowData)}
        underlayColor='#F9F9F9'>
        <View style={styles.favoritesModalListRow}>
          <Text style={styles.favoritesModalListRowText}>{rowData}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => this.props.onRequestClose()}>
        <View style={styles.favoritesModal}>
          <ListView
            renderHeader={() => {
              return (<View style={styles.favoritesModalHeader}>
                <Image
                  style={styles.favoritesModalHeaderIcon}
                  source={require('./assets/burger.png')}/>
                <Text style={styles.favoritesModalHeaderText}>Favorites</Text>
              </View>)
            }}
            style={styles.favoritesModalList}
            dataSource={this.props.data}
            renderRow={this._renderRow} />
        </View>
      </Modal>
    );
  }
}

class FavoritesButton extends Component {
  render() {
    return (
      <View style={styles.favorites}>
        <TouchableHighlight
          style={styles.favoritesButton}
          underlayColor='#F9F9F9'
          onPress={() => this.props.onPress()}>
          <Image source={require('./assets/favorites.png')}/>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  favoritesModal: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: height - 20,
    marginTop: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -4
    },
    shadowOpacity: 25/255,
    shadowRadius: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  favoritesModalHeader: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 12,
    marginBottom: 12
  },
  favoritesModalHeaderIcon: {
    marginTop: 5,
    marginRight: 6
  },
  favoritesModalHeaderText: {
    color: '#BEBEBE'
  },
  favoritesModalList: {
    flex: 1,
  },
  favoritesModalListRow: {
    margin: 12
  },
  favoritesModalListRowText: {
    color: '#6F6F6F',
    fontSize: 16
  },
  favorites: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginTop: 40,
    marginRight: 20,
    marginBottom: 20,
    height: 52,
    borderRadius: 26,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 25/255,
    shadowRadius: 4
  },
  favoritesButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26
  }
});

export {
  FavoritesModal,
  FavoritesButton
};
