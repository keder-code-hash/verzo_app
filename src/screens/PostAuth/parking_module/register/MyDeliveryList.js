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

const OrderCard = ({ user, order }) => {
  return (
    <View style={styles.card}>
      <View style={styles.section}>
        <Text style={styles.title}>User Details:</Text>
        <Text>Name: {user.name}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Address: {user.address}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Order Details:</Text>
        <Text>Order ID: {order.id}</Text>
        <Text>Product: {order.product}</Text>
        <Text>Quantity: {order.quantity}</Text>
        <Text>Total: ${order.total}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Confirm" onPress={showConfirmation} />
        <Button title="Cancel" onPress={handleCancel} />
      </View>
    </View>
  );
};

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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});
