import { icons } from "@/constants/icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type HomeHeaderProps = {
  user: HomeUser;
  onGiftPress?: () => void;
  onNotificationPress?: () => void;
};

const ICON_SIZE = 24;

export function HomeHeader({
  user,
  onGiftPress,
  onNotificationPress,
}: HomeHeaderProps) {
  return (
    <View style={styles.root}>
      <View style={styles.profile}>
        <View style={styles.avatarWrap}>
          {user.avatarUri ? (
            <Image
              source={{ uri: user.avatarUri }}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarInitial}>{user.name.charAt(0)}</Text>
            </View>
          )}
        </View>
        <View style={styles.greeting}>
          <Text style={styles.name}>Hello {user.name}</Text>
          <Text style={styles.tagline} numberOfLines={1}>
            {user.tagline}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={onGiftPress} hitSlop={8} style={styles.iconButton}>
          <Image
            source={icons.headerPromo}
            style={styles.icon}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          onPress={onNotificationPress}
          hitSlop={8}
          style={styles.iconButton}
        >
          <Image
            source={icons.headerBell}
            style={styles.icon}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 16,
    minWidth: 0,
  },
  avatarWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#D3D2DA",
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
  },
  avatarFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0B476",
  },
  avatarInitial: {
    fontFamily: "Satoshi-Bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  greeting: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
    color: "#212027",
    marginBottom: 4,
  },
  tagline: {
    fontFamily: "Satoshi-Regular",
    fontSize: 12,
    color: "#807F94",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});
