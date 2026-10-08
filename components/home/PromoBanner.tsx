import blueDiversification from "@/assets/images/blue-diversification.png";
import greatDiversification from "@/assets/images/great-diversification.png";
import { spacing } from "@/theme/tokens";
import { Image } from "expo-image";
import { radius } from "@/theme/tokens";
import { Dimensions, FlatList, Pressable, StyleSheet, View } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const LIST_PAD = spacing.screen;
/** Leave room so the next banner peeks (~24px). */
const BANNER_WIDTH = SCREEN_WIDTH - LIST_PAD * 2 - 24;
const BANNER_HEIGHT = Math.round(BANNER_WIDTH * (110 / 320));
const BANNER_GAP = spacing.small;

type PromoBannerItem = {
  id: string;
  image: typeof greatDiversification;
};

const PROMO_BANNERS: PromoBannerItem[] = [
  { id: "great-diversification", image: greatDiversification },
  { id: "blue-diversification", image: blueDiversification },
];

type PromoBannerCarouselProps = {
  onBannerPress?: (id: string) => void;
};

export function PromoBanner({ onBannerPress }: PromoBannerCarouselProps) {
  return (
    <FlatList
      horizontal
      data={PROMO_BANNERS}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={BANNER_WIDTH + BANNER_GAP}
      snapToAlignment="start"
      disableIntervalMomentum
      // Parent FlatList already pads horizontally; pull left so peeks use that inset.
      style={{ marginHorizontal: -LIST_PAD }}
      contentContainerStyle={{
        paddingHorizontal: LIST_PAD,
        gap: BANNER_GAP,
      }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onBannerPress?.(item.id)}
          style={styles.bannerWrap}
        >
          <Image
            source={item.image}
            style={styles.bannerImage}
            contentFit="cover"
          />
        </Pressable>
      )}
      ListFooterComponent={<View style={{ width: 0 }} />}
    />
  );
}

const styles = StyleSheet.create({
  bannerWrap: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: radius.medium,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
});
