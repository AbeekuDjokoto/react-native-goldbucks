import { colors, radius, spacing } from "@/theme/tokens";
import { useRef } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from "react-native";

type OtpInputProps = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
};

const CELL_SIZE = 52;

export function OtpInput({ length = 6, value, onChange }: OtpInputProps) {
  const inputs = useRef<Array<TextInput | null>>([]);
  const digits = value.padEnd(length, " ").slice(0, length).split("");

  const updateDigit = (index: number, digit: string) => {
    const next = [...digits];
    next[index] = digit;
    onChange(next.join("").replace(/\s/g, "").slice(0, length));
    if (digit && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    index: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key !== "Backspace") return;
    if (digits[index]?.trim()) {
      updateDigit(index, "");
      return;
    }
    if (index > 0) {
      inputs.current[index - 1]?.focus();
      updateDigit(index - 1, "");
    }
  };

  return (
    <View style={styles.row}>
      {digits.map((digit, index) => {
        const char = digit.trim();
        return (
          <Pressable
            key={index}
            onPress={() => inputs.current[index]?.focus()}
            style={styles.cell}
          >
            <TextInput
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              value={char}
              onChangeText={(text) => {
                const next = text.replace(/\D/g, "").slice(-1);
                updateDigit(index, next);
              }}
              onKeyPress={(event) => handleKeyPress(index, event)}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.input}
              selectionColor={colors.brand.secondary.main}
            />
            {!char ? (
              <Text pointerEvents="none" style={styles.placeholder}>
                -
              </Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.xSmall,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  input: {
    ...StyleSheet.absoluteFillObject,
    textAlign: "center",
    fontFamily: "Satoshi-Bold",
    fontSize: 20,
    lineHeight: 24,
    color: colors.neutral[900],
    padding: 0,
  },
  placeholder: {
    fontFamily: "Satoshi-Regular",
    fontSize: 20,
    lineHeight: 24,
    color: colors.neutral[300],
  },
});
