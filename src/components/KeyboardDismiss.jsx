import { TouchableWithoutFeedback, Keyboard, View } from "react-native";

export default function KeyboardDismiss({ children }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
}