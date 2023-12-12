import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [randomColor, setRandomColor] = useState("");
  const [colorName, setColorName] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "https://stoic-quotes.com/api/quote";

  const colors = [
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "black",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgreen",
    "darkgrey",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategrey",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dimgrey",
    "dodgerblue",
    "firebrick",
    "floralwhite",
    "forestgreen",
    "fuchsia",
    "gainsboro",
    "ghostwhite",
    "gold",
    "goldenrod",
    "gray",
    "green",
    "greenyellow",
    "grey",
    "honeydew",
    "hotpink",
    "indianred",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lavenderblush",
    "lawngreen",
    "lemonchiffon",
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgreen",
    "lightgrey",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategrey",
    "lightsteelblue",
    "lightyellow",
    "lime",
    "limegreen",
    "linen",
    "magenta",
    "maroon",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "navy",
    "oldlace",
    "olive",
    "olivedrab",
    "orange",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "purple",
    "rebeccapurple",
    "red",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "silver",
    "skyblue",
    "slateblue",
    "slategray",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "teal",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "white",
    "whitesmoke",
    "yellow",
    "yellowgreen",
  ];

  const [quotes, setQuotes] = useState([]);
  //const [refreshing, setRefreshing] = useState(false);

  const [apiData, setAPIData] = useState(undefined);
  const getAPIdata = async () => {
    const url = "https://stoic-quotes.com/api/quote";
    let result = await fetch(url);
    let myData = await result.json();
    setAPIData(myData);
    //console.log(result);
    //console.warn(result);
  };

  useEffect(() => {
    getAPIdata();
  }, []);

  function randomColorPicker() {
    let random = Math.floor(Math.random() * colors.length);
    //console.log(colors[random]);
    setColorName(colors[random]);
    return colors[random];
  }

  const refreshFunction = useCallback(() => {
    setRefreshing(true);
    setRandomColor(randomColorPicker());
    //fetchData();
    getAPIdata();
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="black" />
        <View style={{ height: "100%" }}>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              padding: 5,
              backgroundColor: randomColor,
              alignItems: "center",
              //justifyContent: "center",
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshFunction}
              />
            }
          >
            <Text style={styles.titleText}>
              Pull to refresh the backgroundColor. These are total 148 colors
              from the React native docs
            </Text>
            <Text style={styles.colorName}>Color: {colorName}</Text>
            {apiData ? (
              <View>
                {/* <Text style={{ fontSize: 20 }}>{apiData.id}</Text> */}
                <Text style={{ fontSize: 20 }}>{apiData.text}</Text>
                <Text style={{ fontSize: 20, textAlign: "right" }}>
                  {apiData.author}
                </Text>
              </View>
            ) : null}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  SafeAreaView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "white",
    padding: 10,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 0.5,
  },
  colorName: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    backgroundColor: "white",
    padding: 10,
    margin: 20,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 0.5,
  },
  quoteBlocks: {
    height: "35%",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
