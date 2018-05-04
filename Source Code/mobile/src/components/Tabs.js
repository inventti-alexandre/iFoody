import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';

export default class Tabs extends Component {
  // Initialize State
  state = {
    // First tab is active by default
    activeTab: 0
  };

  // Pull children out of props passed from App component
  render({ children } = this.props) {
    return (
      <View style={styles.container}>

        {/* Content */}
        <View style={styles.contentContainer}>
          {children[this.state.activeTab]}
        </View>

        {/* Tabs row */}
        <View style={styles.tabsContainer}>
          {/* Pull props out of children, and pull title out of props */}
          {children.map(({ props: { title, iconName, iconType } }, index) =>
            <TouchableOpacity
              style={[
                // Default style for every tab
                styles.tabContainer,
                // Merge default style with styles.tabContainerActive for active tab
                index === this.state.activeTab ? styles.tabContainerActive : []
              ]}
              // Change active tab
              onPress={() => this.setState({ activeTab: index })}
              // Required key prop for components generated returned by map iterator
              key={index}
            >
              <View>
              <Icon name={iconName} type={iconType} />
                <Text style={styles.tabText}>
                  {title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Component container
  container: {
    flex: 1,                            // Take up all available space
  },
  // Tabs row container
  tabsContainer: {
    flexDirection: 'row',               // Arrange tabs in a row
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
  },
  // Individual tab container
  tabContainer: {
     flex: 1,                            // Take up equal amount of space for each tab
     paddingVertical: 7,
     borderBottomWidth: 3,               // Add thick border at the bottom
     borderBottomColor: 'transparent',   // Transparent border for inactive tabs
  },
  // Active tab container
  tabContainerActive: {
    borderBottomColor: '#000080',       // White bottom border for active tabs
  },
  // Tab text
  tabText: {
    color: 'black',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Content container
  contentContainer: {
    flex: 1                             // Take up all available space
  }
});
