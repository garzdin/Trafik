import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight,
  Image,
  ListView
} from 'react-native';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this._onSearchTextChange = this._onSearchTextChange.bind(this);
    this.searchResults = this.searchResults.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  _onSearchTextChange(text) {
    this.props.onChangeText(text)
    this.searchResults(text);
    if (text.length <= 0) {
      this.close()
    } else {
      if (this.props.data.getRowCount() > 0) {
        this.open();
      } else {
        this.close()
      }
    }
  }

  searchResults(text) {
    let encodedText = encodeURIComponent(text);
    fetch(`http://localhost:3000/geocode?address=${encodedText}`)
    .then((response) => response.json())
    .then((responseJson) => {
      var results = [];
      responseJson.forEach((result) => {
        results.push({
          'address': result.formatted_address,
          'location': results.geometry ? results.geometry.location : null
        });
      });
      this.props.onChangeResultsData(results);
    });
  }

  open() {
    this.props.open();
  }

  close() {
    this.props.close();
  }

  render() {
    return (
      <View style={styles.search}>
        <View style={styles.searchIcon}>
          <Image source={require('./assets/search.png')}/>
        </View>
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          value={this.props.value}
          style={styles.searchBox}
          placeholder="Where do you want to go?"
          onChangeText={this._onSearchTextChange} />
      </View>
    );
  }
}

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this._renderRowSearch = this._renderRowSearch.bind(this);
  }

  _renderRowSearch(rowData, sectionID, rowID, highlightRow) {
    return (
      <View style={styles.searchListRow}>
        <TouchableHighlight
          onPress={() => this.props.onSelect(rowData)}
          underlayColor='#F9F9F9'
          style={styles.searchListRowText}>
          <Text>{rowData.address}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor='#F9F9F9'
          style={styles.searchListRowStar}>
          <Image source={require('./assets/favorites-not.png')}/>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.searchResultsList}>
        <ListView
          enableEmptySections={true}
          renderHeader={() => {
            return (<View style={styles.searchResultsHeader}>
              <Image
                style={styles.searchResultsHeaderIcon}
                source={require('./assets/burger.png')}/>
              <Text style={styles.searchResultsHeaderText}>Results</Text>
            </View>)
          }}
          dataSource={this.props.data}
          renderRow={this._renderRowSearch} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  searchBox: {
    flex: 10,
    height: 52,
    paddingLeft: 12,
    fontSize: 14
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
  searchResultsList: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 4,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 25/255,
    shadowRadius: 4
  },
  searchResultsHeader: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 12,
    marginBottom: 12
  },
  searchResultsHeaderIcon: {
    marginTop: 5,
    marginRight: 6
  },
  searchResultsHeaderText: {
    color: '#BEBEBE'
  },
  searchListRow: {
    flex: 1,
    flexDirection: 'row',
    margin: 12
  },
  searchListRowText: {
    flex: 6
  },
  searchListRowStar: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
});

export {
  SearchBar,
  SearchResults
}
