import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { Colors } from "../../global";
import Header from "../../components/Header";
import { GETCALL, POSTCALL } from "../../global/server";
import CustomButton from "../../components/CustomButton";
import { retrieveData } from "../../utils/Storage";
import Spinner from "react-native-loading-spinner-overlay";
import { hideMessage, showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";

const About = ({ navigation }) => {
  const [loader, setLoader] = React.useState(false);
  const [about, setAbout] = React.useState("");
  const { dryCleanerProfile } = useSelector((state) => state.drycleanerreducer);

  const [openStatePicker, setOpenStatePicker] = useState(false);
  const [stateValue, setStateValue] = useState(null);
  const [states, setStates] = useState([]);

  const [openCityPicker, setOpenCityPicker] = useState(false);
  const [cityValue, setCityValue] = useState(null);
  const [cities, setCities] = useState([]);

  const country = "US";
  const [merchantCity, setMerchantCity] = useState("");
  const [merchantState, setMerchantState] = useState("");

  const fetchCityList = async () => {
    const cities = await GETCALL(
      `api/city-list?country=US&state=${stateValue}`
    );
    console.log(cities);
    if (cities) {
      let temp = [];
      cities.responseData.forEach((city, index) => {
        let obj = {
          label: city.cityName,
          value: city.cityName,
        };
        temp.push(obj);
      });
      setCities(temp);
    }
  };

  const fetchStateList = async () => {
    const states = await GETCALL("api/state-list?country=US");
    if (states) {
      let temp = [];
      states.responseData.forEach((state, index) => {
        let obj = {
          label: state.stateName,
          value: state.stateName,
        };
        temp.push(obj);
      });
      setStates(temp);
      console.log(states);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchStateList();
    }, [])
  );

  const updateMerchantProfile = async () => {
    setLoader(true);
    let data = await retrieveData("userdetails");
    let tempReducer = JSON.parse(JSON.stringify(dryCleanerProfile));
    let { availability, acceptItems, images } = tempReducer;

    if (data && data.token) {
      await POSTCALL(
        "api/update-my-dry-cleaner-profile",
        {
          acceptItems,
          availability,
          images,
          about,
          merchantCity,
          merchantState,
          country,
        },
        data.token
      );
      setLoader(false);
      showMessage({
        message: `Merchant Profile Updated Successfully!`,
        type: "success",
        style: {
          alignItems: "center",
        },
        autoHide: false,
      });
      setTimeout(() => {
        hideMessage();
        navigation.navigate("Home");
      }, 500);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#4C4C4C" }}>
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      {/* <Spinner visible={loader} textContent={'Loading...'} /> */}
      <View style={styles.screen}>
        <Header />
        <View style={{ marginTop: 20 }} />
        <View style={{ marginHorizontal: 32 }}>
          <Text style={{ color: "#000", fontSize: 22 }}>About</Text>
          <View style={{ height: 20 }} />
          <TextInput
            style={styles.textArea}
            value={
              dryCleanerProfile.about == "" ? about : dryCleanerProfile.about
            }
            onChangeText={(data) => {
              setAbout(data);
            }}
          />
          <View style={{ marginTop: 20 }} />
          <Text style={{ color: "#000", fontSize: 18 }}>Select State</Text>
          <View style={{ height: 20 }} />
          <DropDownPicker
            open={openStatePicker}
            value={stateValue}
            setValue={setStateValue}
            items={states}
            setItems={setStates}
            setOpen={setOpenStatePicker}
            zIndex={3000}
            zIndexInverse={1000}
            placeholder={"Select State"}
            placeholderStyle={{ color: Colors.BLACK }}
            onSelectItem={async (item) => {
              setMerchantState(item?.value);
              await fetchCityList();
            }}
          />

          <View style={{ marginTop: 20 }} />
          <Text style={{ color: "#000", fontSize: 18 }}>Select City</Text>
          <View style={{ height: 20 }} />
          <DropDownPicker
            open={openCityPicker}
            value={cityValue}
            setValue={setCityValue}
            items={cities}
            setItems={setCities}
            setOpen={setOpenCityPicker}
            zIndex={3000}
            zIndexInverse={1000}
            placeholder={"Select City"}
            placeholderStyle={{ color: Colors.BLACK }}
            onSelectItem={(item) => {
              setMerchantCity(item?.value);
            }}
          />

          <View style={{ height: 20 }} />
          <CustomButton
            customStyle={{
              backgroundColor: "#F99025",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              borderRadius: 25,
              marginHorizontal: 20,
            }}
            buttonText={"Finish"}
            onPress={() => {
              updateMerchantProfile();
            }}
            textStyle={{
              color: Colors.WHITE,
              fontSize: 20,
              fontWeight: "bold",
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default About;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F7F6F9",
    flex: 1,
  },
  textArea: {
    height: 100,
    borderRadius: 10,
    borderColor: "#F99025",
    borderWidth: 1,
    color: "black",
    textAlignVertical: "top",
    paddingHorizontal: 10,
  },
});
