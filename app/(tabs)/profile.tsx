
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

export default function ProfileScreen() {
  const achievements = [
    { id: '1', title: 'First Lesson', description: 'Complete your first lesson', completed: false, icon: 'star.fill' },
    { id: '2', title: 'Word Master', description: 'Master 10 vocabulary words', completed: false, icon: 'trophy.fill' },
    { id: '3', title: 'Dedicated Learner', description: 'Practice 7 days in a row', completed: false, icon: 'flame.fill' },
    { id: '4', title: 'Fluent Speaker', description: 'Complete all lessons', completed: false, icon: 'checkmark.seal.fill' },
  ];

  const stats = [
    { label: 'Lessons Completed', value: '0', icon: 'book.fill', color: colors.primary },
    { label: 'Words Mastered', value: '0', icon: 'star.fill', color: colors.accent },
    { label: 'Study Streak', value: '0 days', icon: 'flame.fill', color: colors.secondary },
    { label: 'Total Study Time', value: '0 min', icon: 'clock.fill', color: colors.primary },
  ];

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Profile',
          }}
        />
      )}
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <IconSymbol name="person.fill" size={48} color={colors.card} />
          </View>
          <Text style={styles.profileName}>Mandarin Learner</Text>
          <Text style={styles.profileLevel}>Beginner Level</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIconContainer, { backgroundColor: stat.color }]}>
                  <IconSymbol name={stat.icon as any} size={24} color={colors.card} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {achievements.map((achievement) => (
            <View 
              key={achievement.id} 
              style={[
                styles.achievementCard,
                achievement.completed && styles.achievementCardCompleted
              ]}
            >
              <View style={[
                styles.achievementIcon,
                achievement.completed && styles.achievementIconCompleted
              ]}>
                <IconSymbol 
                  name={achievement.icon as any} 
                  size={28} 
                  color={achievement.completed ? colors.accent : colors.textSecondary} 
                />
              </View>
              <View style={styles.achievementContent}>
                <Text style={[
                  styles.achievementTitle,
                  achievement.completed && styles.achievementTitleCompleted
                ]}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
              </View>
              {achievement.completed && (
                <IconSymbol name="checkmark.circle.fill" size={24} color={colors.accent} />
              )}
            </View>
          ))}
        </View>

        {/* Learning Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Learning Tips</Text>
          <View style={styles.tipCard}>
            <IconSymbol name="lightbulb.fill" size={24} color={colors.primary} />
            <Text style={styles.tipText}>
              Practice daily for at least 10 minutes to build consistency and improve retention
            </Text>
          </View>
          <View style={styles.tipCard}>
            <IconSymbol name="speaker.wave.2.fill" size={24} color={colors.secondary} />
            <Text style={styles.tipText}>
              Listen to native speakers and try to mimic their pronunciation and tone
            </Text>
          </View>
          <View style={styles.tipCard}>
            <IconSymbol name="pencil" size={24} color={colors.accent} />
            <Text style={styles.tipText}>
              Practice writing Chinese characters to improve your memory and recognition
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  profileLevel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  achievementsSection: {
    marginBottom: 32,
  },
  achievementCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    opacity: 0.6,
  },
  achievementCardCompleted: {
    opacity: 1,
    backgroundColor: colors.highlight,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementIconCompleted: {
    backgroundColor: colors.card,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  achievementTitleCompleted: {
    color: colors.text,
  },
  achievementDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  tipsSection: {
    marginBottom: 32,
  },
  tipCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginLeft: 12,
  },
});
