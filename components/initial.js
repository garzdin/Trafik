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

class Initial extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['32 West St., Philadelphia, Massachusetts', '41 West St., Philadelphia, Massachusetts', '321 Capitol Hill, Philadelphia, Massachusetts', 'Penndel St., Philadelphia, Massachusetts', 'Ann Borough Dr., Philadelphia, Massachusetts']),
      favoritesModalVisible: false
    };
    this._renderRow = this._renderRow.bind(this);
    this._onPressFavoriteItem = this._onPressFavoriteItem.bind(this);
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight
        onPress={() => this._onPressFavoriteItem(rowData)}
        underlayColor='#F9F9F9'>
        <View style={styles.favoritesModalListRow}>
          <Text style={styles.favoritesModalListRowText}>{rowData}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  _onPressFavoriteItem(rowData) {
    this.setState({ favoritesModalVisible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.favoritesModalVisible}>
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
              dataSource={this.state.dataSource}
              renderRow={this._renderRow} />
          </View>
        </Modal>
        <View style={styles.header}>
          <View style={styles.search}>
            <View style={styles.searchIcon}>
              <Image source={require('./assets/search.png')}/>
            </View>
            <TextInput
              style={styles.searchBox}
              placeholder="Where do you want to go?" />
          </View>
          <View style={styles.favorites}>
            <TouchableHighlight
              style={styles.favoritesButton}
              underlayColor='#F9F9F9'
              onPress={() => {
                this.setState({ favoritesModalVisible: true });
              }}>
              <Image source={require('./assets/favorites.png')}/>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.map}>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#00B8FF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 25/255,
    shadowRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  search: {
    flex: 5,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginTop: 40,
    marginLeft: 20,
    marginRight: 5,
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
  searchBox: {
    flex: 10,
    height: 52,
    paddingLeft: 12,
    fontSize: 14,
  },
  searchIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 26,
    borderBottomLeftRadius: 26,
    paddingLeft: 12
  },
  favoritesButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26
  },
  map: {
    flex: 5
  }
});

export default Initial;
