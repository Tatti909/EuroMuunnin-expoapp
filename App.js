import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {Picker } from '@react-native-picker/picker';

export default function App() {
 const[rates, setRates] = useState({});
 const[currency, setCurrency] = useState('USD');
 const [amount, setAmount] = useState("100");
 const [result, setResult] = useState("");

 useEffect(() => {
  fetch("https://api.apilayer.com/exchangerates_data/latest?base=EUR", {
    headers: { apikey: "aybgzkVZRCxNNFxe65rg7rgXU6QBNibv" },
  })
  .then((r) => r.json())
  .then((data) => {
    setRates(data.rates);
    setCurrency(Object.keys(data.rates)[0] || "USD");
  })
  .catch(() => {});
}, []);

const convert = () => {
  const a = Number(amount.replace(",", "."));
  if (!a) return setResult("0.00 €");
  if (currency === "EUR") return setResult(a.toFixed(2) + " €");

  const rate = rates[currency];
  const eur = a / rate;
  setResult(eur.toFixed(2) + " €");
};

const codes = Object.keys(rates);

return (
  <View style={{ padding: 20, marginTop: 50}}>
    <Text style= {{fontSize: 24}}>{result || "-"}</Text>

    <TextInput
    value={amount}
    onChangeText={setAmount}
    keyboardType="numeric"
    placeholder="Summa"
    style={{ borderWidth: 1, padding: 8, marginTop: 15}}
    />

    <Picker selectedValue= {currency} onValueChange={setCurrency}>
    <Picker.Item label="EUR" value="EUR" />
    {codes.map((c) => (
      <Picker.Item label={c} value={c} key={c} />
    ))}
    </Picker>
  
    <Button title="Convert to EUR" onPress={convert} />
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
