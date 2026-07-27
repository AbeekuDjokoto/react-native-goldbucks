import { colors, radius, spacing } from "@/theme/tokens";
import type { ReactNode } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ModalProps,
} from "react-native";

type AuthBottomSheetProps = ModalProps & {
  visible: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function AuthBottomSheet({
  visible,
  onClose,
  title,
  description,
  children,
  actionLabel,
  onActionPress,
  ...props
}: AuthBottomSheetProps) {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      {...props}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
          <View style={styles.handle} />
          {children}
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {description ? <Text style={styles.description}>{description}</Text> : null}
          {actionLabel ? (
            <Pressable style={styles.action} onPress={onActionPress}>
              <Text style={styles.actionLabel}>{actionLabel}</Text>
            </Pressable>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(11, 8, 68, 0.45)",
  },
  sheet: {
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.small,
    paddingBottom: spacing.xxLarge,
    alignItems: "center",
  },
  handle: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.neutral[200],
    marginBottom: spacing.xLarge,
  },
  title: {
    marginTop: spacing.large,
    fontFamily: "Satoshi-Bold",
    fontSize: 20,
    color: colors.neutral[900],
    textAlign: "center",
  },
  description: {
    marginTop: spacing.xSmall,
    fontFamily: "Satoshi-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral[500],
    textAlign: "center",
  },
  action: {
    marginTop: spacing.xLarge,
    width: "100%",
    minHeight: 52,
    borderRadius: radius.xSmall,
    backgroundColor: colors.brand.secondary.main,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.medium,
  },
  actionLabel: {
    fontFamily: "Satoshi-Medium",
    fontSize: 16,
    color: colors.background,
  },
});
