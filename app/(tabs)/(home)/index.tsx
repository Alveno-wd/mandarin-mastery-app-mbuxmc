
import React from "react";
import { Stack, Link } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const features = [
    {
      title: "Interactive Lessons",
      description: "Learn Mandarin through structured lessons covering greetings, numbers, and common phrases",
      route: "/lessons",
      icon: "book.fill",
      color: colors.primary,
    },
    {
      title: "Vocabulary Review",
      description: "Practice with flashcards and review all the words you've learned",
      route: "/vocabulary",
      icon: "text.book.closed.fill",
      color: colors.secondary,
    },
    {
      title: "Track Progress",
      description: "Monitor your learning journey and see how many words you've mastered",
      route: "/profile",
      icon: "chart.bar.fill",
      color: colors.accent,
    }
  ];

  const handleFeaturePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Learn Mandarin",
          }}
        />
      )}
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroEmoji}>🇨🇳</Text>
            <Text style={styles.heroTitle}>Welcome to Mandarin Learning</Text>
            <Text style={styles.heroSubtitle}>
              Start your journey to mastering Mandarin Chinese with interactive lessons and vocabulary practice
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Features</Text>
            {features.map((feature, index) => (
              <Link key={index} href={feature.route as any} asChild>
                <Pressable style={styles.featureCard} onPress={handleFeaturePress}>
                  <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                    <IconSymbol name={feature.icon as any} color={colors.card} size={28} />
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </View>
                  <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
                </Pressable>
              </Link>
            ))}
          </View>

          {/* Quick Stats */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Quick Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>4</Text>
                <Text style={styles.statLabel}>Lessons</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>30+</Text>
                <Text style={styles.statLabel}>Words</Text>
              </View>
            </View>
          </View>

          {/* Getting Started */}
          <View style={styles.gettingStartedSection}>
            <Text style={styles.sectionTitle}>Getting Started</Text>
            <View style={styles.gettingStartedCard}>
              <Text style={styles.gettingStartedText}>
                - Start with the Greetings lesson to learn basic phrases
              </Text>
              <Text style={styles.gettingStartedText}>
                - Practice numbers to build your foundation
              </Text>
              <Text style={styles.gettingStartedText}>
                - Use flashcards to review and memorize vocabulary
              </Text>
              <Text style={styles.gettingStartedText}>
                - Mark words as mastered to track your progress
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 24,
  },
  heroEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  featuresSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  statsSection: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  gettingStartedSection: {
    marginBottom: 32,
  },
  gettingStartedCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  gettingStartedText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 28,
    marginBottom: 8,
  },
});
