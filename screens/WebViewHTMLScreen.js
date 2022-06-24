import React from 'react';
import WebView from 'react-native-webview';
import {View, StyleSheet, SafeAreaView} from 'react-native';

const WebVieHTMLScreen = props => {
  const url = props.route.params.url;
  return (
    <SafeAreaView style={styles.safeView}>
      <WebView
        source={{html: url}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        allowsLinkPreview={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
});

export default WebVieHTMLScreen;
