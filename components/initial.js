import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ListView,
  Animated
} from 'react-native';
import { FavoritesModal, FavoritesButton } from './favorites';
import { SearchBar, SearchResults } from './search';

var {height, width} = Dimensions.get('window');

class Initial extends Component {
  constructor(props) {
    super(props);
    const favoritesDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const searchDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      modalVisible: false,
      favoritesData: favoritesDataSource.cloneWithRows(['32 West St., Philadelphia, Massachusetts', '41 West St., Philadelphia, Massachusetts', '321 Capitol Hill, Philadelphia, Massachusetts', 'Penndel St., Philadelphia, Massachusetts', 'Ann Borough Dr., Philadelphia, Massachusetts']),
      searchData: searchDataSource.cloneWithRows([]),
      headerHeight: new Animated.Value(1),
      searchResultsValue: ""
    };
    this.openSearchResults = this.openSearchResults.bind(this);
    this.closeSearchResults = this.closeSearchResults.bind(this);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
    this.onChangeSearchResults = this.onChangeSearchResults.bind(this);
    this._onPressSearchItem = this._onPressSearchItem.bind(this);
    this._onSelectSearchItem = this._onSelectSearchItem.bind(this);
    this._onPressFavoriteItem = this._onPressFavoriteItem.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }

  openSearchResults() {
    Animated.timing(
      this.state.headerHeight, {
        toValue: 10
      }
    ).start()
  }

  closeSearchResults() {
    Animated.timing(
      this.state.headerHeight, {
        toValue: 1
      }
    ).start()
  }

  _closeModal() {
    this.setState({ modalVisible: false });
  }

  onChangeSearchResults(data) {
    this.setState({ searchData: this.state.searchData.cloneWithRows(data) });
  }

  onChangeSearchText(text) {
    this.setState({ searchResultsValue: text });
  }

  _onPressSearchItem(rowData) {
    this.close();
    this.setState({ searchResultsValue: rowData.address })
  }

  _onSelectSearchItem(rowData) {
    this.closeSearchResults();
    this.setState({ searchResultsValue: rowData.address });
  }

  _onPressFavoriteItem(rowData) {
    this.setState({ modalVisible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <FavoritesModal
          visible={this.state.modalVisible}
          data={this.state.favoritesData}
          onSelect={this._onPressFavoriteItem}
          onRequestClose={this._closeModal} />
        <Animated.View style={[
            {flex: this.state.headerHeight}, styles.header
          ]}>
          <View style={styles.headerRow}>
            <SearchBar data={this.state.searchData} value={this.state.searchResultsValue} onChangeText={this.onChangeSearchText}  onChangeResultsData={this.onChangeSearchResults} open={this.openSearchResults} close={this.closeSearchResults} />
            <FavoritesButton onPress={() => this.setState({ modalVisible: true })} />
          </View>
          <SearchResults data={this.state.searchData} onSelect={this._onSelectSearchItem} />
        </Animated.View>
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
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height / 6,
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
  headerRow: {
    flexDirection: 'row',
  },
  map: {
    position: 'absolute',
    top: (height / 6) - 4,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default Initial;
