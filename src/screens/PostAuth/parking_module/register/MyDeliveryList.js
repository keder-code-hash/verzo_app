import React from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import FocusAwareStatusBar from "../../../../components/FocusAwareStatusBar";
import { Colors } from "../../../../global";

const MyDeliveryList = ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#4C4C4C" }}>
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      <View style={styles.screen}>
        <View
          style={{
            backgroundColor: Colors.WHITE,
            flexDirection: "row",
            paddingHorizontal: 16,
            position: "absolute",
            zIndex: 9999,
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{}}
              onPress={() => navigation.goBack()}
            >
              <Text>Back</Text>
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.BLACK,
                fontSize: 22,
                marginVertical: 10,
                marginLeft: 15,
              }}
            >
              Delivery List
            </Text>
          </View>
        </View>
      </View>
      <Text> this is a delivery list</Text>
    </KeyboardAvoidingView>
  );
};

export default MyDeliveryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SMOKEWHITE,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#F99025",
    justifyContent: "center",
    flex: 1,
    height: 150,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#F99025",
  },
  boxText: {
    color: Colors.WHITE,
    fontSize: 25,
    textAlign: "center",
  },
});
