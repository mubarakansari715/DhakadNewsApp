# Swipe to Refresh Implementation Guide

## Overview

This guide will help you implement swipe-to-refresh functionality on your home page in the DhakadNewsApp. The implementation will use React Native's built-in `RefreshControl` component to add pull-to-refresh functionality to your existing `ScrollView`.

## Current State Analysis

Your `HomeScreen.js` currently:

- Uses a `ScrollView` to display content
- Has two main data fetching functions: `getBrakingNews()` and `getNewsByCategory()`
- Already has loading states and error handling
- Uses `useState` for managing component state

## Implementation Steps

### Step 1: Import RefreshControl

Add `RefreshControl` to your existing imports in `screens/HomeScreen.js`:

```javascript
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl, // Add this import
} from "react-native";
```

### Step 2: Add Refresh State

Add a new state variable to manage the refresh status:

```javascript
export default function HomeScreen() {
  const [brakingNews, setBrakingNews] = useState([]);
  const [newsByCategory, setNewsByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false); // Add this line
```

### Step 3: Create Refresh Handler

Add a function to handle the refresh action:

```javascript
const onRefresh = async () => {
  setRefreshing(true);
  try {
    // Refresh both breaking news and category news
    await Promise.all([getBrakingNews(), getNewsByCategory()]);
  } catch (error) {
    console.error("Error during refresh:", error);
  } finally {
    setRefreshing(false);
  }
};
```

### Step 4: Update Data Fetching Functions

Modify your existing data fetching functions to not show the main loading state during refresh:

```javascript
const getBrakingNews = async (isRefresh = false) => {
  try {
    if (!isRefresh) {
      setIsLoading(true);
    }
    setHasError(false);
    setErrorMessage("");

    const url = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&language=en&size=5&image=1&removeDuplicate=1`;
    console.log("API calling :: ", url);

    const response = await axios.get(url, {
      timeout: 10000,
    });

    if (response && response.data && response.data.results) {
      setBrakingNews(response.data.results);
    } else {
      throw new Error("Invalid response format from API");
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    setHasError(true);

    if (
      error.message.includes("Network Error") ||
      error.code === "NETWORK_ERROR"
    ) {
      setErrorMessage(
        "Network connection error. Please check your internet connection."
      );
    } else {
      setErrorMessage("Failed to load news. Please try again later.");
    }
  } finally {
    if (!isRefresh) {
      setIsLoading(false);
    }
  }
};

const getNewsByCategory = async (categoryName, isRefresh = false) => {
  try {
    if (!isRefresh) {
      setNewsByCategory([]);
    }
    let selectedCategory = "";
    if (categoryName) {
      console.log("Use Effect :: ", categoryName);
      selectedCategory = `&category=${categoryName}`;
    }
    const url = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&language=en&size=10&image=1&removeDuplicate=1${selectedCategory}`;
    console.log("API calling :: getNewsByCategory :: ", url);
    const response = await axios.get(url, {
      timeout: 10000,
    });

    if (response && response.data && response.data.results) {
      setNewsByCategory(response.data.results);
    } else {
      throw new Error("Invalid response format from API");
    }
  } catch (error) {
    setErrorMessage("Failed to load news. Please try again later.");
  }
};
```

### Step 5: Update the onRefresh Function

Update the refresh handler to pass the refresh flag:

```javascript
const onRefresh = async () => {
  setRefreshing(true);
  try {
    // Refresh both breaking news and category news
    await Promise.all([getBrakingNews(true), getNewsByCategory(null, true)]);
  } catch (error) {
    console.error("Error during refresh:", error);
  } finally {
    setRefreshing(false);
  }
};
```

### Step 6: Add RefreshControl to ScrollView

Update your ScrollView to include the RefreshControl:

```javascript
return (
  <View style={styles.container}>
    <Header />
    <Searchbar />
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Colors.tint]} // Android
          tintColor={Colors.tint} // iOS
          title="Pull to refresh" // iOS
          titleColor={Colors.black} // iOS
        />
      }
    >
      <BrakingNews newsList={brakingNews.slice(0, 5)} />
      <Categories selectedCategory={onCategoryChanged} />

      {newsByCategory.length ? (
        <NewsList newsList={newsByCategory} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Loader size={"large"} />
        </View>
      )}
    </ScrollView>
  </View>
);
```

### Step 7: Update onCategoryChanged Function

Update the category change handler to work with the new refresh parameter:

```javascript
const onCategoryChanged = (selectedCategory) => {
  getNewsByCategory(selectedCategory, false);
};
```

## Complete Updated HomeScreen.js

Here's how your complete `HomeScreen.js` should look after implementing swipe-to-refresh:

```javascript
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/home/Header";
import Searchbar from "../components/home/Searchbar";
import axios from "axios";
import BrakingNews from "../components/home/BrakingNews";
import { Colors } from "../constants/Colors";
import Categories from "../components/home/Categories";
import NewsList from "../components/home/NewsList";
import Loader from "../components/Loader";

export default function HomeScreen() {
  const [brakingNews, setBrakingNews] = useState([]);
  const [newsByCategory, setNewsByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const getBrakingNews = async (isRefresh = false) => {
    try {
      if (!isRefresh) {
        setIsLoading(true);
      }
      setHasError(false);
      setErrorMessage("");

      const url = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&language=en&size=5&image=1&removeDuplicate=1`;
      console.log("API calling :: ", url);

      const response = await axios.get(url, {
        timeout: 10000,
      });

      if (response && response.data && response.data.results) {
        setBrakingNews(response.data.results);
      } else {
        throw new Error("Invalid response format from API");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setHasError(true);

      if (
        error.message.includes("Network Error") ||
        error.code === "NETWORK_ERROR"
      ) {
        setErrorMessage(
          "Network connection error. Please check your internet connection."
        );
      } else {
        setErrorMessage("Failed to load news. Please try again later.");
      }
    } finally {
      if (!isRefresh) {
        setIsLoading(false);
      }
    }
  };

  const handleRetry = () => {
    getBrakingNews();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([getBrakingNews(true), getNewsByCategory(null, true)]);
    } catch (error) {
      console.error("Error during refresh:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getBrakingNews();
    getNewsByCategory();
  }, []);

  const onCategoryChanged = (selectedCategory) => {
    getNewsByCategory(selectedCategory, false);
  };

  const getNewsByCategory = async (categoryName, isRefresh = false) => {
    try {
      if (!isRefresh) {
        setNewsByCategory([]);
      }
      let selectedCategory = "";
      if (categoryName) {
        console.log("Use Effect :: ", categoryName);
        selectedCategory = `&category=${categoryName}`;
      }
      const url = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&language=en&size=10&image=1&removeDuplicate=1${selectedCategory}`;
      console.log("API calling :: getNewsByCategory :: ", url);
      const response = await axios.get(url, {
        timeout: 10000,
      });

      if (response && response.data && response.data.results) {
        setNewsByCategory(response.data.results);
      } else {
        throw new Error("Invalid response format from API");
      }
    } catch (error) {
      setErrorMessage("Failed to load news. Please try again later.");
    }
  };

  // Show error state
  if (hasError) {
    return (
      <View style={styles.container}>
        <Header />
        <Searchbar />
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Unable to Load News</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.tint} />
          <Text style={styles.loadingText}>Loading latest news...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <Searchbar />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.tint]}
            tintColor={Colors.tint}
            title="Pull to refresh"
            titleColor={Colors.black}
          />
        }
      >
        <BrakingNews newsList={brakingNews.slice(0, 5)} />
        <Categories selectedCategory={onCategoryChanged} />

        {newsByCategory.length ? (
          <NewsList newsList={newsByCategory} />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Loader size={"large"} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// ... rest of your styles remain the same
```

## Features Added

1. **Pull-to-Refresh**: Users can pull down on the home screen to refresh both breaking news and category news
2. **Visual Feedback**: Shows a loading spinner during refresh
3. **Platform-Specific Styling**: Different colors and titles for iOS and Android
4. **Non-Blocking Refresh**: The main loading state doesn't interfere with the refresh action
5. **Error Handling**: Maintains existing error handling during refresh

## Testing

1. **Pull Down**: Pull down on the home screen to trigger refresh
2. **Visual Feedback**: You should see a loading spinner at the top
3. **Data Update**: Both breaking news and category news should refresh
4. **Error Handling**: Test with poor network connection to ensure error handling works

## Customization Options

You can customize the refresh control by modifying these properties:

- `colors`: Array of colors for Android refresh indicator
- `tintColor`: Color for iOS refresh indicator
- `title`: Text shown during refresh on iOS
- `titleColor`: Color of the title text on iOS
- `progressBackgroundColor`: Background color of the refresh indicator
- `size`: Size of the refresh indicator (Android only)

## Notes

- The refresh functionality works on both iOS and Android
- The implementation maintains your existing error handling and loading states
- The refresh action updates both breaking news and category news simultaneously
- The main loading state is preserved for initial app load
- All existing functionality remains intact

This implementation provides a smooth, native-feeling pull-to-refresh experience that users expect in modern mobile applications.
