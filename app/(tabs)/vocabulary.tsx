
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import * as Haptics from 'expo-haptics';

interface VocabularyItem {
  id: string;
  chinese: string;
  pinyin: string;
  english: string;
  category: string;
  mastered: boolean;
}

const vocabularyData: VocabularyItem[] = [
  { id: '1', chinese: '你好', pinyin: 'Nǐ hǎo', english: 'Hello', category: 'Greetings', mastered: false },
  { id: '2', chinese: '早上好', pinyin: 'Zǎoshang hǎo', english: 'Good morning', category: 'Greetings', mastered: false },
  { id: '3', chinese: '晚上好', pinyin: 'Wǎnshang hǎo', english: 'Good evening', category: 'Greetings', mastered: false },
  { id: '4', chinese: '再见', pinyin: 'Zàijiàn', english: 'Goodbye', category: 'Greetings', mastered: false },
  { id: '5', chinese: '一', pinyin: 'Yī', english: 'One', category: 'Numbers', mastered: false },
  { id: '6', chinese: '二', pinyin: 'Èr', english: 'Two', category: 'Numbers', mastered: false },
  { id: '7', chinese: '三', pinyin: 'Sān', english: 'Three', category: 'Numbers', mastered: false },
  { id: '8', chinese: '四', pinyin: 'Sì', english: 'Four', category: 'Numbers', mastered: false },
  { id: '9', chinese: '五', pinyin: 'Wǔ', english: 'Five', category: 'Numbers', mastered: false },
  { id: '10', chinese: '谢谢', pinyin: 'Xièxiè', english: 'Thank you', category: 'Common Phrases', mastered: false },
  { id: '11', chinese: '不客气', pinyin: 'Bù kèqì', english: 'You&apos;re welcome', category: 'Common Phrases', mastered: false },
  { id: '12', chinese: '对不起', pinyin: 'Duìbùqǐ', english: 'Sorry', category: 'Common Phrases', mastered: false },
  { id: '13', chinese: '爸爸', pinyin: 'Bàba', english: 'Father', category: 'Family', mastered: false },
  { id: '14', chinese: '妈妈', pinyin: 'Māma', english: 'Mother', category: 'Family', mastered: false },
];

export default function VocabularyScreen() {
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>(vocabularyData);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<'list' | 'flashcard'>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(vocabulary.map(item => item.category)))];
  
  const filteredVocabulary = selectedCategory === 'All' 
    ? vocabulary 
    : vocabulary.filter(item => item.category === selectedCategory);

  const masteredCount = vocabulary.filter(item => item.mastered).length;
  const totalCount = vocabulary.length;

  const handleFlipCard = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (currentCardIndex < filteredVocabulary.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  };

  const handlePreviousCard = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleMarkMastered = (id: string) => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    const updatedVocabulary = vocabulary.map(item =>
      item.id === id ? { ...item, mastered: !item.mastered } : item
    );
    setVocabulary(updatedVocabulary);
    console.log('Toggled mastered status for word:', id);
  };

  const handleModeSwitch = (newMode: 'list' | 'flashcard') => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setMode(newMode);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleCategoryChange = (category: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedCategory(category);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  if (mode === 'flashcard' && filteredVocabulary.length > 0) {
    const currentCard = filteredVocabulary[currentCardIndex];

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && (
          <Stack.Screen
            options={{
              title: 'Flashcards',
            }}
          />
        )}

        <View style={styles.flashcardContainer}>
          {/* Mode Switch */}
          <View style={styles.modeSwitch}>
            <Pressable
              style={[styles.modeSwitchButton, mode === 'list' && styles.modeSwitchButtonActive]}
              onPress={() => handleModeSwitch('list')}
            >
              <Text style={[styles.modeSwitchText, mode === 'list' && styles.modeSwitchTextActive]}>
                List
              </Text>
            </Pressable>
            <Pressable
              style={[styles.modeSwitchButton, mode === 'flashcard' && styles.modeSwitchButtonActive]}
              onPress={() => handleModeSwitch('flashcard')}
            >
              <Text style={[styles.modeSwitchText, mode === 'flashcard' && styles.modeSwitchTextActive]}>
                Flashcards
              </Text>
            </Pressable>
          </View>

          {/* Progress */}
          <Text style={styles.flashcardProgress}>
            {currentCardIndex + 1} / {filteredVocabulary.length}
          </Text>

          {/* Flashcard */}
          <Pressable style={styles.flashcard} onPress={handleFlipCard}>
            {!isFlipped ? (
              <View style={styles.flashcardContent}>
                <Text style={styles.flashcardChinese}>{currentCard.chinese}</Text>
                <Text style={styles.flashcardPinyin}>{currentCard.pinyin}</Text>
                <Text style={styles.flashcardHint}>Tap to reveal</Text>
              </View>
            ) : (
              <View style={styles.flashcardContent}>
                <Text style={styles.flashcardEnglish}>{currentCard.english}</Text>
                <View style={styles.flashcardCategory}>
                  <Text style={styles.flashcardCategoryText}>{currentCard.category}</Text>
                </View>
              </View>
            )}
          </Pressable>

          {/* Navigation */}
          <View style={styles.flashcardNavigation}>
            <Pressable
              style={[styles.flashcardNavButton, currentCardIndex === 0 && styles.flashcardNavButtonDisabled]}
              onPress={handlePreviousCard}
              disabled={currentCardIndex === 0}
            >
              <IconSymbol name="chevron.left" size={32} color={currentCardIndex === 0 ? colors.textSecondary : colors.primary} />
            </Pressable>

            <Pressable
              style={styles.masteredButton}
              onPress={() => handleMarkMastered(currentCard.id)}
            >
              <IconSymbol 
                name={currentCard.mastered ? 'star.fill' : 'star'} 
                size={32} 
                color={currentCard.mastered ? colors.accent : colors.textSecondary} 
              />
            </Pressable>

            <Pressable
              style={styles.flashcardNavButton}
              onPress={handleNextCard}
            >
              <IconSymbol name="chevron.right" size={32} color={colors.primary} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Vocabulary',
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Vocabulary</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalCount}</Text>
              <Text style={styles.statLabel}>Total Words</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.accent }]}>{masteredCount}</Text>
              <Text style={styles.statLabel}>Mastered</Text>
            </View>
          </View>
        </View>

        {/* Mode Switch */}
        <View style={styles.modeSwitch}>
          <Pressable
            style={[styles.modeSwitchButton, mode === 'list' && styles.modeSwitchButtonActive]}
            onPress={() => handleModeSwitch('list')}
          >
            <Text style={[styles.modeSwitchText, mode === 'list' && styles.modeSwitchTextActive]}>
              List
            </Text>
          </Pressable>
          <Pressable
            style={[styles.modeSwitchButton, mode === 'flashcard' && styles.modeSwitchButtonActive]}
            onPress={() => handleModeSwitch('flashcard')}
          >
            <Text style={[styles.modeSwitchText, mode === 'flashcard' && styles.modeSwitchTextActive]}>
              Flashcards
            </Text>
          </Pressable>
        </View>

        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {categories.map((category) => (
            <Pressable
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive
              ]}
              onPress={() => handleCategoryChange(category)}
            >
              <Text style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextActive
              ]}>
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Vocabulary List */}
        {filteredVocabulary.map((item) => (
          <View key={item.id} style={styles.vocabularyCard}>
            <View style={styles.vocabularyContent}>
              <Text style={styles.vocabularyChinese}>{item.chinese}</Text>
              <Text style={styles.vocabularyPinyin}>{item.pinyin}</Text>
              <Text style={styles.vocabularyEnglish}>{item.english}</Text>
              <View style={styles.vocabularyCategory}>
                <Text style={styles.vocabularyCategoryText}>{item.category}</Text>
              </View>
            </View>
            <Pressable
              style={styles.masteredIconButton}
              onPress={() => handleMarkMastered(item.id)}
            >
              <IconSymbol 
                name={item.mastered ? 'star.fill' : 'star'} 
                size={28} 
                color={item.mastered ? colors.accent : colors.textSecondary} 
              />
            </Pressable>
          </View>
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
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  modeSwitch: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  modeSwitchButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  modeSwitchButtonActive: {
    backgroundColor: colors.primary,
  },
  modeSwitchText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  modeSwitchTextActive: {
    color: colors.card,
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryScrollContent: {
    gap: 8,
  },
  categoryChip: {
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  categoryChipActive: {
    backgroundColor: colors.secondary,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  categoryChipTextActive: {
    color: colors.card,
  },
  vocabularyCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  vocabularyContent: {
    flex: 1,
  },
  vocabularyChinese: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  vocabularyPinyin: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  vocabularyEnglish: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  vocabularyCategory: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  vocabularyCategoryText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  masteredIconButton: {
    padding: 8,
  },
  flashcardContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  flashcardProgress: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  flashcard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 48,
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  flashcardContent: {
    alignItems: 'center',
  },
  flashcardChinese: {
    fontSize: 64,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  flashcardPinyin: {
    fontSize: 24,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  flashcardHint: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  flashcardEnglish: {
    fontSize: 32,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  flashcardCategory: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  flashcardCategoryText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  flashcardNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flashcardNavButton: {
    padding: 12,
  },
  flashcardNavButtonDisabled: {
    opacity: 0.3,
  },
  masteredButton: {
    padding: 12,
  },
});
