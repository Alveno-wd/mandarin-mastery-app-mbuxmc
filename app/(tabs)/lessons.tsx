
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import * as Haptics from 'expo-haptics';

interface Lesson {
  id: string;
  title: string;
  description: string;
  phrases: {
    chinese: string;
    pinyin: string;
    english: string;
  }[];
  completed: boolean;
}

const lessonsData: Lesson[] = [
  {
    id: '1',
    title: 'Greetings',
    description: 'Learn basic greetings in Mandarin',
    completed: false,
    phrases: [
      { chinese: '你好', pinyin: 'Nǐ hǎo', english: 'Hello' },
      { chinese: '早上好', pinyin: 'Zǎoshang hǎo', english: 'Good morning' },
      { chinese: '晚上好', pinyin: 'Wǎnshang hǎo', english: 'Good evening' },
      { chinese: '再见', pinyin: 'Zàijiàn', english: 'Goodbye' },
    ],
  },
  {
    id: '2',
    title: 'Numbers',
    description: 'Count from 1 to 10 in Mandarin',
    completed: false,
    phrases: [
      { chinese: '一', pinyin: 'Yī', english: 'One' },
      { chinese: '二', pinyin: 'Èr', english: 'Two' },
      { chinese: '三', pinyin: 'Sān', english: 'Three' },
      { chinese: '四', pinyin: 'Sì', english: 'Four' },
      { chinese: '五', pinyin: 'Wǔ', english: 'Five' },
      { chinese: '六', pinyin: 'Liù', english: 'Six' },
      { chinese: '七', pinyin: 'Qī', english: 'Seven' },
      { chinese: '八', pinyin: 'Bā', english: 'Eight' },
      { chinese: '九', pinyin: 'Jiǔ', english: 'Nine' },
      { chinese: '十', pinyin: 'Shí', english: 'Ten' },
    ],
  },
  {
    id: '3',
    title: 'Common Phrases',
    description: 'Essential phrases for daily conversation',
    completed: false,
    phrases: [
      { chinese: '谢谢', pinyin: 'Xièxiè', english: 'Thank you' },
      { chinese: '不客气', pinyin: 'Bù kèqì', english: 'You&apos;re welcome' },
      { chinese: '对不起', pinyin: 'Duìbùqǐ', english: 'Sorry' },
      { chinese: '没关系', pinyin: 'Méi guānxì', english: 'It&apos;s okay' },
      { chinese: '请', pinyin: 'Qǐng', english: 'Please' },
    ],
  },
  {
    id: '4',
    title: 'Family',
    description: 'Learn family member names',
    completed: false,
    phrases: [
      { chinese: '爸爸', pinyin: 'Bàba', english: 'Father' },
      { chinese: '妈妈', pinyin: 'Māma', english: 'Mother' },
      { chinese: '哥哥', pinyin: 'Gēge', english: 'Older brother' },
      { chinese: '姐姐', pinyin: 'Jiějie', english: 'Older sister' },
      { chinese: '弟弟', pinyin: 'Dìdi', english: 'Younger brother' },
      { chinese: '妹妹', pinyin: 'Mèimei', english: 'Younger sister' },
    ],
  },
];

export default function LessonsScreen() {
  const [lessons, setLessons] = useState<Lesson[]>(lessonsData);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleLessonPress = (lesson: Lesson) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    console.log('Selected lesson:', lesson.title);
    setSelectedLesson(lesson);
    setCurrentPhraseIndex(0);
    setShowTranslation(false);
  };

  const handleNextPhrase = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (selectedLesson && currentPhraseIndex < selectedLesson.phrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
      setShowTranslation(false);
    } else if (selectedLesson && currentPhraseIndex === selectedLesson.phrases.length - 1) {
      // Mark lesson as completed
      const updatedLessons = lessons.map(l => 
        l.id === selectedLesson.id ? { ...l, completed: true } : l
      );
      setLessons(updatedLessons);
      setSelectedLesson(null);
      console.log('Lesson completed:', selectedLesson.title);
    }
  };

  const handlePreviousPhrase = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(currentPhraseIndex - 1);
      setShowTranslation(false);
    }
  };

  const handleRevealTranslation = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setShowTranslation(true);
  };

  const handleBackToLessons = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedLesson(null);
    setCurrentPhraseIndex(0);
    setShowTranslation(false);
  };

  if (selectedLesson) {
    const currentPhrase = selectedLesson.phrases[currentPhraseIndex];
    const progress = ((currentPhraseIndex + 1) / selectedLesson.phrases.length) * 100;

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && (
          <Stack.Screen
            options={{
              title: selectedLesson.title,
              headerBackTitle: 'Lessons',
            }}
          />
        )}
        
        <View style={styles.lessonContainer}>
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {currentPhraseIndex + 1} / {selectedLesson.phrases.length}
            </Text>
          </View>

          {/* Phrase Card */}
          <View style={styles.phraseCard}>
            <Text style={styles.chineseText}>{currentPhrase.chinese}</Text>
            <Text style={styles.pinyinText}>{currentPhrase.pinyin}</Text>
            
            {showTranslation ? (
              <View style={styles.translationContainer}>
                <Text style={styles.englishText}>{currentPhrase.english}</Text>
              </View>
            ) : (
              <Pressable 
                style={styles.revealButton}
                onPress={handleRevealTranslation}
              >
                <Text style={styles.revealButtonText}>Reveal Translation</Text>
              </Pressable>
            )}
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navigationContainer}>
            <Pressable
              style={[styles.navButton, currentPhraseIndex === 0 && styles.navButtonDisabled]}
              onPress={handlePreviousPhrase}
              disabled={currentPhraseIndex === 0}
            >
              <IconSymbol name="chevron.left" size={24} color={currentPhraseIndex === 0 ? colors.textSecondary : colors.text} />
              <Text style={[styles.navButtonText, currentPhraseIndex === 0 && styles.navButtonTextDisabled]}>
                Previous
              </Text>
            </Pressable>

            <Pressable
              style={[styles.navButton, styles.nextButton]}
              onPress={handleNextPhrase}
            >
              <Text style={styles.nextButtonText}>
                {currentPhraseIndex === selectedLesson.phrases.length - 1 ? 'Complete' : 'Next'}
              </Text>
              <IconSymbol name="chevron.right" size={24} color={colors.card} />
            </Pressable>
          </View>

          {/* Back Button */}
          <Pressable style={styles.backButton} onPress={handleBackToLessons}>
            <Text style={styles.backButtonText}>Back to Lessons</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Lessons',
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
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Learn Mandarin</Text>
          <Text style={styles.headerSubtitle}>Choose a lesson to begin</Text>
        </View>

        {lessons.map((lesson) => (
          <Pressable
            key={lesson.id}
            style={styles.lessonCard}
            onPress={() => handleLessonPress(lesson)}
          >
            <View style={styles.lessonIconContainer}>
              <IconSymbol 
                name={lesson.completed ? 'checkmark.circle.fill' : 'book.fill'} 
                size={32} 
                color={lesson.completed ? colors.accent : colors.primary} 
              />
            </View>
            <View style={styles.lessonContent}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonDescription}>{lesson.description}</Text>
              <Text style={styles.lessonPhraseCount}>
                {lesson.phrases.length} phrases
              </Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </Pressable>
        ))}
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
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  lessonCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  lessonIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  lessonPhraseCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  lessonContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.card,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  phraseCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  chineseText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  pinyinText: {
    fontSize: 24,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  translationContainer: {
    backgroundColor: colors.highlight,
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  englishText: {
    fontSize: 20,
    color: colors.text,
    fontWeight: '500',
  },
  revealButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  revealButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
    marginLeft: 8,
  },
  navButtonTextDisabled: {
    color: colors.textSecondary,
  },
  nextButton: {
    backgroundColor: colors.primary,
  },
  nextButtonText: {
    fontSize: 16,
    color: colors.card,
    fontWeight: '600',
    marginRight: 8,
  },
  backButton: {
    backgroundColor: colors.card,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
});
